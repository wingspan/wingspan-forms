/** @jsx React.DOM */
define([
    'underscore', 'jquery', 'react', 'kendo',
    '../util/debug',
    '../ControlCommon'
], function (_, $, React, kendo, debug, ControlCommon) {
    'use strict';


    var KendoDate = React.createClass({

        fieldClass: 'formFieldDatepicker',

        getDefaultProps: function () {
            return {
                format: 'dd-MMM-yyyy',
                value: undefined,
                id: undefined,
                onChange: function () {},
                disabled: false,
                isValid: [true, ''],
                readonly: false,
                noControl: false
            };
        },

        /*jshint ignore:start */
        render: function () {
            return (this.props.noControl
                ? (<span>{this.props.value ? kendo.toString(this.props.value, this.props.format) : ''}</span>)
                : (<input id={this.props.id} type="text" />));
        },
        /*jshint ignore:end */

        componentDidMount: function (rootNode) {
            debug.verify(!!rootNode);

            if (this.props.noControl) {
                // Everything was done in JSX.
                return;
            }

            var $el = $(rootNode);
            debug.verify($el);

            $el.kendoDatePicker({
                change: this.onChange,
                format: this.props.format
            });

            ControlCommon.setKendoDateState(
                $el.data('kendoDatePicker'),
                this.props.value, this.props.disabled, this.props.readonly,
                this.props.max, this.props.min);
        },

        componentDidUpdate: function (prevProps, prevState, rootNode) {
            debug.verify(!!rootNode);

            if (this.props.noControl) {
                // Everything was done in JSX.
                return;
            }

            var $el = $(rootNode);
            debug.verify($el);

            ControlCommon.setKendoDateState(
                $el.data('kendoDatePicker'),
                this.props.value, this.props.disabled, this.props.readonly,
                this.props.max, this.props.min);
        },

        onChange: function (event) {
            var kendoWidget = event.sender;
            var val = kendoWidget.value();
            this.props.onChange(val);
        }
    });

    return KendoDate;
});
