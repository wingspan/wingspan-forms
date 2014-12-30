/** @jsx React.DOM */
define([
    'underscore', 'react',
    'mixins/DateWidgetMixin',
    '../ImmutableOptimizations'
], function (_, React, DateWidgetMixin, ImmutableOptimizations) {
    'use strict';

    /**
     * value interface is ISO-8601, with the date portion omitted.
     * HH:MM:SS
     */
    var KendoTimePicker = React.createClass({
        mixins: [
            DateWidgetMixin('kendoTimePicker'),
            ImmutableOptimizations(['onChange'])
        ],

        statics: {
            fieldClass: function () { return 'formFieldDatepicker'; }
        },

        getDefaultProps: function () {
            return {
                format: 'h:mm tt' // display format
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

    return KendoTimePicker;
});
