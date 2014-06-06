define([
    'underscore'
], function (_) {
    'use strict';

    function ImmutableOptimizations (refFields) {
        return {
            shouldComponentUpdate: function (nextProps) {
                var valuesChanged = !_.isEqual(
                    _.omit(nextProps, refFields),
                    _.omit(this.props, refFields));

                var refsChanged = !_.every(refFields, function (field) {
                    return this.props[field] === nextProps[field];
                }.bind(this));

                return valuesChanged || refsChanged;
            }
        };
    }

    return ImmutableOptimizations;
});
