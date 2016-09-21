import kendo from 'kendo'
import React from 'react'
import { findWidget, noop } from '../ReactCommon'


const KendoNumericTextBox = React.createClass({

    statics: { fieldClass: function () { return 'formFieldNumeric'; } },

    getDefaultProps: function () {
        return {
            onChange: noop,
            placeholder: '',
            format: '',
            spinners: false,
            step: 1,
            disabled: false,
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
        var $el = findWidget(this);

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

        var kendoWidget = findWidget(this, 'kendoNumericTextBox');

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

export default KendoNumericTextBox;