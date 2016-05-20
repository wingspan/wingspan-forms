
define([
    'underscore', 'react', 'kendo',
    '../ReactCommon',
    '../ImmutableOptimizations'
], function (_, React, kendo, Common, ImmutableOptimizations) {
    'use strict';


    var KendoNumericTextBox = React.createClass({
        mixins: [ImmutableOptimizations(['onChange'])],

        statics: { fieldClass: function () { return 'formFieldNumeric'; } },

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

        componentDidMount: function () {
            var $el = Common.findWidget(this);

            if (this.props.noControl) {
                // Everything was done in JSX.
                return;
            }

            $el.kendoNumericTextBox({
                value: this.props.value,
                format: this.props.format,
                min: this.props.min,
                max: this.props.max,
                step: this.props.step,
                spinners: this.props.spinners,
                // No change event - we get change events from the underlying react <input>,
                // because react gives us an onChange for each keystroke which is needed for flux
                spin: this.onSpinChange
            });

            if (this.props.disabled) {
                // disabled beats readonly
                $el.data('kendoNumericTextBox').enable(false);
            }
            else if (this.props.readonly) {
                $el.data('kendoNumericTextBox').readonly(true);
            }
        },

        componentDidUpdate: function (prevProps, prevState) {
            if (this.props.noControl) {
                // Everything was done in JSX.
                return;
            }

            var kendoWidget = Common.findWidget(this, 'kendoNumericTextBox');

            if (prevProps.value !== this.props.value) {
                kendoWidget.value(this.props.value);
            }

            if (this.props.disabled !== prevProps.disabled) {
                kendoWidget.enable(!this.props.disabled);
            }
            else if (this.props.readonly !== prevProps.readonly) {
                kendoWidget.readonly(this.props.readonly);
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

    return KendoNumericTextBox;

});
