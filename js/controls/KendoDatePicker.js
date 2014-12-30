/** @jsx React.DOM */
define([
    'underscore', 'react',
    'mixins/DateWidgetMixin',
    '../ImmutableOptimizations'
], function (_, React, DateWidgetMixin, ImmutableOptimizations) {
    'use strict';

    var KendoDatePicker = React.createClass({
        mixins: [
            DateWidgetMixin('kendoDatePicker'),
            ImmutableOptimizations(['onChange'])
        ],

        statics: {
            fieldClass: function () { return 'formFieldDatepicker'; }
        },

        getDefaultProps: function () {
            return {
                format: 'dd-MMM-yyyy'
            };
        },

        /*jshint ignore:start */
        render: function () {
            return (this.props.noControl
                ? (<span>{this.renderValue()}</span>)
                : (<input type="text" />));
        }
        /*jshint ignore:end */
    });

    return KendoDatePicker;
});
