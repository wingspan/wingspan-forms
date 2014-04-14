define([
    'underscore'
], function (_) {
    'use strict';

    var FluxFormMixin = {
        componentWillMount: function () {
            console.assert(this.formFields, 'Required to define the form; see SetOfficeStatusComponent for a working usage');
            console.assert(_.isFunction(this.isFieldValid), 'Need a field validation function');
        },

        getInitialState: function () {
            return {
                record: undefined
            };
        },

        onFieldChange: function (fieldName, newValue) {
            // When you setState, top level attributes are merged. Merge is not recursive.
            // So we have to merge the prev record with the new one manually.
            var nextState = { record: this.state.record };
            nextState['record'][fieldName] = newValue;

            // if this field is stickied, update the sticky value
            var stickiedFieldNames = _.keys(this.state.sticky || {});
            if (_.contains(stickiedFieldNames, fieldName)) {
                _.extend(nextState, { sticky: this.state.sticky });
                nextState['sticky'][fieldName] = newValue;
            }

            this.setState(nextState);
        },

        isFormValid: function () {
            if (this.state.record) {
                // form is valid if each field is valid
                return _.chain(this.formFields)
                    .map(this.isFieldValid)
                    .map(_.first)
                    .reduce(and)
                    .value();
            }
            else {
                return false;
            }

            function and(a, b) { return a && b; }
        }
    };

    return FluxFormMixin;
});
