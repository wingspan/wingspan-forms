define([
    'lodash', 'q', 'react',
    'wingspan-data',
    'wingspan-forms/Cursor'
], function (_, Q, React, Data, Cursor) {
    'use strict';

    var storeCache = {};

    function getCachedStore(options) {
        var cacheKey = options.url;

        if (_.isUndefined(cacheKey)) {
            return Data.DataStore.create(options);
        }
        else if (!storeCache[cacheKey]) {
            storeCache[cacheKey] = Data.DataStore.create(options);
        }

        return storeCache[cacheKey];
    }

    function hasOptions(fieldInfo) {
        return _.isObject(fieldInfo.options);
    }

    function clearValuesNotInOptions(record, typeInfo) {
        _.each(_.filter(typeInfo.properties, hasOptions), function (fieldInfo) {
            var dataSource = fieldInfo.options.dataSource;
            var currentValue = record[fieldInfo.name];

            if (!currentValue || !dataSource) {
                return;
            }
            if (_.isObject(currentValue)) {
                currentValue = currentValue[dataSource.reader.model.idField];
            }
            // If there are records in the store but the current value is not there, clear it.
            if (dataSource.total() > 0 && !dataSource.get(currentValue)) {
                record[fieldInfo.name] = null;
            }
        });
    }

    function and(a, b) { return a && b; }

    var FluxFormMixinTypedWithCursors = {
        propTypes: {
            //  Required to define the form; see SetOfficeStatusComponent for a working usage
            formFields: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,

            // Need a field validation function
            isFieldValid: React.PropTypes.func.isRequired,

            formCursor: React.PropTypes.instanceOf(Cursor).isRequired,
            dataSourcesCursor: React.PropTypes.instanceOf(Cursor).isRequired
        },

        componentWillMount: function () {
            this.resetStores(this.props.formCursor, this.props.dataSourcesCursor);
        },

        componentWillUpdate: function (nextProps, nextState) {
            this.resetStores(nextProps.formCursor, nextProps.dataSourcesCursor);
        },

        resetStores: function (formCursor, dataSourcesCursor) {
            // Create DataStores for any properties with options
            var properties = formCursor.value['recordTypeInfo']['properties'];
            _.each(_.filter(properties, hasOptions), function (fieldInfo) {
                dataSourcesCursor.refine(fieldInfo.name).onChange(getCachedStore(fieldInfo.options));
            }.bind(this));
        },

        isFormValid: function () {
            return (this.props.recordCursor.value
                ? _(this.props.formFields).chain().map(this.props.isFieldValid).map(_.first).reduce(and).value()
                : false);

        },

        onFieldChange: function (fieldName, newValue) {
            var self = this;

            var baseTypeInfo = this.props.formCursor.value['recordTypeInfo']; // hack - should be using the baseTypeInfo here.

            // When you setState, top level attributes are merged. Merge is not recursive.
            // So we have to merge the prev record with the new one manually.
            var nextRecord = _.extend({}, self.props.formCursor.value['record'], _.object([[fieldName, newValue]]));

            // Short circuit the instanceTypeInfo query if no dependencies changed, so we don't query every keypress
            var dependentFieldChanged = _.contains(baseTypeInfo.valueDependents, fieldName);

            var promise = (dependentFieldChanged
                ? this.instanceTypeInfo(nextRecord, baseTypeInfo)
                : Q(baseTypeInfo));

            promise
                .then(function (newTypeInfo) {
                    clearValuesNotInOptions(nextRecord, newTypeInfo);

                    var newSticky = _.cloneDeep(self.props.formCursor.value['sticky']);
                    // if this field is stickied, update the sticky value
                    var stickiedFieldNames = _.keys(newSticky || {});
                    if (_.contains(stickiedFieldNames, fieldName)) {
                        newSticky[fieldName] = newValue;
                    }

                    return {
                        record: nextRecord,
                        recordTypeInfo: newTypeInfo,
                        sticky: newSticky
                    };
                })
                .then(this.postFieldChange || _.identity) // Give clients a chance to alter record or type info before new state is set
                .then(function (nextState) { self.props.formCursor.onChange(nextState); })
                .done();
        },

        /**
         * Specialize a typeInfo to an instance of the typeInfo.
         *
         * Depends on flux methods like isFieldValid and the original type info.
         *
         * We need to track the original typeinfo from the server for now, in the cases where the server
         * tells us that a field is disabled or readonly. Specializing a typeinfo from an instance may
         * indicate that a field is disabled until its dependency is fulfilled, but this shouldn't override the server
         * if for example the server pins the field to be always disabled.
         *
         * Does immutable transformations on the typeinfo and returns a new typeinfo. We do appropriate
         * defensive clones to prevent mutation of the original typeinfo reference.
         *
         */
        instanceTypeInfo: function (record, baseTypeInfo) {
            console.assert(baseTypeInfo);

            function updateTypeInfo(newTypeInfo) {
                // preserve the baseTypeInfo links since newTypeInfo appears to come down without any
                newTypeInfo.links = baseTypeInfo.links;

                return newTypeInfo;
            }

            var dependentValues = _.pick(record, baseTypeInfo.valueDependents);

            return Data.ServiceClient.fetch(baseTypeInfo.links['self'], dependentValues)
                .then(updateTypeInfo)
                .then(this.postProcessTypeInfoHax || _.identity);
        }
    };

    return FluxFormMixinTypedWithCursors;
});
