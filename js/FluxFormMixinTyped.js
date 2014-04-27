define([
    'underscore', 'q',
    'wingspan-data'
], function (_, Q, Data) {
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

    var FluxFormMixinTyped = {

        componentWillMount: function () {
            console.assert(this.formFields, 'Required to define the form; see SetOfficeStatusComponent for a working usage');
            console.assert(_.isFunction(this.isFieldValid), 'Need a field validation function');
        },

        isFormValid: function () {
            return (this.state.record
                ? _(this.formFields).chain().map(this.isFieldValid).map(_.first).reduce(and).value()
                : false);

        },

        getInitialState: function () {
            // Flux forms have a record and a typeinfo.
            // They know how to validate from the typeinfo, and the typeinfo is changed over time
            // to keep the validation info up to date. This is designed to work nicely with the AutoControl tag.
            return {
                record: null, // must not be empty object - for use with guard operator to render empty form
                recordTypeInfo: null
            };
        },

        onFieldChange: function (fieldName, newValue) {
            var self = this;

            var baseTypeInfo = this.state.recordTypeInfo; // hack - should be using the baseTypeInfo here.

            // When you setState, top level attributes are merged. Merge is not recursive.
            // So we have to merge the prev record with the new one manually.
            var nextRecord = _.extend({}, self.state.record, _.object([[fieldName, newValue]]));

            // Short circuit the instanceTypeInfo query if no dependencies changed, so we don't query every keypress
            var dependentFieldChanged = _.contains(baseTypeInfo.valueDependents, fieldName);

            var promise = (dependentFieldChanged
                ? this.instanceTypeInfo(nextRecord, baseTypeInfo)
                : Q(this.state.recordTypeInfo));

            promise
                .then(function (newTypeInfo) {
                    clearValuesNotInOptions(nextRecord, newTypeInfo);

                    var newSticky = self.state.sticky;
                    // if this field is stickied, update the sticky value
                    var stickiedFieldNames = _.keys(self.state.sticky || {});
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
                .then(function (nextState) { self.setState(nextState); })
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
                newTypeInfo.links = baseTypeInfo.links;

                // Create DataStores for any properties with options
                _.each(_.filter(newTypeInfo.properties, hasOptions), function (fieldInfo) {
                    fieldInfo.options.dataSource = getCachedStore(fieldInfo.options);
                });

                return newTypeInfo;
            }

            var dependentValues = _.pick(record, baseTypeInfo.valueDependents);

            return Data.ServiceClient.fetch(baseTypeInfo.links['self'], dependentValues)
                .then(updateTypeInfo)
                .then(this.postProcessTypeInfoHax || _.identity);
        }
    };


    return FluxFormMixinTyped;

});
