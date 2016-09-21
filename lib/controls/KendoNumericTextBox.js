'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _kendo = require('kendo');

var _kendo2 = _interopRequireDefault(_kendo);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ReactCommon = require('../ReactCommon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KendoNumericTextBox = _react2.default.createClass({
    displayName: 'KendoNumericTextBox',


    statics: { fieldClass: function fieldClass() {
            return 'formFieldNumeric';
        } },

    getDefaultProps: function getDefaultProps() {
        return {
            onChange: _ReactCommon.noop,
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
    render: function render() {
        return this.props.noControl ? _react2.default.createElement(
            'span',
            null,
            _kendo2.default.toString(this.props.value, this.props.format)
        ) :
        // KendoNumeric requires multiple onChange handlers, because kendo change event doesn't happen
        // until blur. We need an event on each keyup on the input, as well as spin events on the widget.
        _react2.default.createElement('input', { id: this.props.id, type: 'text', onChange: this.onInputChange });
    },
    /*jshint ignore:end */

    componentDidMount: function componentDidMount() {
        var $el = (0, _ReactCommon.findWidget)(this);

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
        } else if (this.props.readonly) {
            $el.data('kendoNumericTextBox').readonly(true);
        }
    },

    componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
        if (this.props.noControl) {
            // Everything was done in JSX.
            return;
        }

        var kendoWidget = (0, _ReactCommon.findWidget)(this, 'kendoNumericTextBox');

        if (prevProps.value !== this.props.value) {
            kendoWidget.value(this.props.value);
        }

        if (this.props.disabled !== prevProps.disabled) {
            kendoWidget.enable(!this.props.disabled);
        } else if (this.props.readonly !== prevProps.readonly) {
            kendoWidget.readonly(this.props.readonly);
        }
    },

    onSpinChange: function onSpinChange(event) {
        var val = event.sender.value();
        this.props.onChange(val);
    },

    onInputChange: function onInputChange(event) {
        if (this.props.readonly) {
            return;
        }
        var val = event.target.value;
        this.props.onChange(val);
    }
});

exports.default = KendoNumericTextBox;