/** @jsx React.DOM */
define([
    'underscore', 'react',
    'mixins/DateWidgetMixin',
    '../ImmutableOptimizations'
], function (_, React, DateWidgetMixin, ImmutableOptimizations) {
    'use strict';

    var KendoDateTimePicker = React.createClass({
        mixins: [
            DateWidgetMixin('kendoDateTimePicker'),
            ImmutableOptimizations(['onChange'])
        ],

        statics: {
            fieldClass: function () { return 'formFieldDatetimepicker'; }
        },

        getDefaultProps: function () {
            return {
                format: 'MM/dd/yyyy h:mm tt'
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

    return KendoDateTimePicker;
});
