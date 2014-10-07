/** @jsx React.DOM */
define([
    'underscore', 'jquery', 'react', 'kendo',
    '../ControlCommon',
    '../ImmutableOptimizations'
], function (_, $, React, kendo, ControlCommon, ImmutableOptimizations) {
    'use strict';

    function parseISODateTime(dateStr) {
        return new Date(Date.parse(dateStr));
    }

    var KendoDateTime = React.createClass({
        mixins: [ImmutableOptimizations(['onChange'])],

        statics: { fieldClass: function () { return 'formFieldDatetimepicker'; } },

        getDefaultProps: function () {
            return {
                value: undefined, // ISO 8601 string, NOT a js date instance
                onChange: $.noop,
                id: undefined,
                disabled: false,
                readonly: false,
                noControl: false,
                format: 'MM/dd/yyyy h:mm tt'
            };
        },

        /*jshint ignore:start */
        render: function () {
            return (this.props.noControl
                ? (<span>{this.props.value ? kendo.toString(parseISODateTime(this.props.value), this.props.format) : ''}</span>)
                : (<input id={this.props.id} type="text" />));
        },
        /*jshint ignore:end */

        componentDidMount: function () {

            if (this.props.noControl) {
                // Everything was done in JSX.
                return;
            }

            var $el = $(this.getDOMNode());

            $el.kendoDateTimePicker({
                change: this.onChange,
                format: this.props.format
            });

            ControlCommon.setKendoDateState(
                $el.data('kendoDateTimePicker'),
                parseISODateTime(this.props.value), this.props.disabled, this.props.readonly,
                this.props.max, this.props.min);
        },

        componentDidUpdate: function (prevProps, prevState) {

            if (this.props.noControl) {
                // Everything was done in JSX.
                return;
            }

            var $el = $(this.getDOMNode());

            ControlCommon.setKendoDateState(
                $el.data('kendoDateTimePicker'),
                parseISODateTime(this.props.value), this.props.disabled, this.props.readonly,
                this.props.max, this.props.min);
        },

        onChange: function (event) {
            var kendoWidget = event.sender;
            var val = kendoWidget.value();

            this.props.onChange(val ? val.toISOString() : '');
        }
    });

    return KendoDateTime;
});
