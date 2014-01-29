/** @jsx React.DOM */
define([
    'underscore', 'jquery', 'react', 'kendo',
    '../util/debug',
    '../ControlCommon'
], function (_, $, React, kendo, debug, ControlCommon) {
    'use strict';


    var KendoNumber = React.createClass({

        fieldClass: 'formFieldNumeric',

        getDefaultProps: function () {
            return {
                value: undefined,
                onChange: function () {},
                id: undefined,

                placeholder: '',
                decimals: undefined,
                format: '',
                spinners: false,
                step: 1,

                disabled: false,
                isValid: [true, ''],
                readonly: false,
                noControl: false
            };
        },

        /*jshint ignore:start */
        render: function () {
            return (this.props.noControl
                ? (<span>{kendo.toString(this.props.value, this.props.format)}</span>)
                // KendoNumeric requires multiple onChange handlers, because kendo change event doesn't happen
                // until blur. We need an event on each keyup on the input, as well as spin events on the widget.
                : (<input id={this.props.id} type="text" onChange={this.onInputChange} />));
        },
        /*jshint ignore:end */

        componentDidMount: function (rootNode) {
            var $el = $(rootNode);
            debug.verify($el);

            if (this.props.noControl) {
                // Everything was done in JSX.
                return;
            }

            $el.kendoNumericTextBox({
                format: this.props.format,
                min: this.props.min,
                max: this.props.max,
                step: this.props.step,
                spinners: this.props.spinners,
                // No change event - we get change events from the underlying react <input>,
                // because react gives us an onChange for each keystroke which is needed for flux
                spin: this.onSpinChange
            });

            ControlCommon.setKendoNumberState(
                $el.data('kendoNumericTextBox'),
                this.props.value, this.props.disabled, this.props.readonly);
        },

        componentDidUpdate: function (prevProps, prevState, rootNode) {
            var $el = $(rootNode);
            debug.verify($el);

            if (this.props.noControl) {
                // Everything was done in JSX.
                return;
            }

            var kendoWidget = $el.data('kendoNumericTextBox');

            if (prevProps.value !== this.props.value) {
                ControlCommon.setKendoNumberValue(kendoWidget, this.props.value);
            }
            if (
                (prevProps.disabled !== this.props.disabled) ||
                (prevProps.readonly !== this.props.readonly)
            ) {
                ControlCommon.setKendoDisabledReadonly(kendoWidget, this.props.disabled, this.props.readonly);
            }
        },

        onSpinChange: function (event) {
            var val = event.sender.value();
            this.props.onChange(val);
        },

        onInputChange: function (event) {
            if (this.props.readonly) {
                return;
            }
            var val = event.target.value;
            this.props.onChange(val);
        }
    });

    return KendoNumber;

});
