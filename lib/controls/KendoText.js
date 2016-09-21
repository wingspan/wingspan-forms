'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ReactCommon = require('../ReactCommon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PropTypes = _react2.default.PropTypes;

var KendoText = _react2.default.createClass({
    displayName: 'KendoText',


    propTypes: {
        id: PropTypes.string,
        value: PropTypes.string,
        onChange: PropTypes.func,
        placeholder: PropTypes.string,
        disabled: PropTypes.bool,
        readonly: PropTypes.bool,
        noControl: PropTypes.bool,
        minLength: PropTypes.number,
        maxLength: PropTypes.number,
        isPassword: PropTypes.bool,
        trimValue: PropTypes.bool
    },

    statics: { fieldClass: function fieldClass() {
            return 'formFieldInput';
        } },

    getDefaultProps: function getDefaultProps() {
        return {
            value: '',
            onChange: _ReactCommon.noop,
            placeholder: '',
            disabled: false,
            readonly: false,
            noControl: false,
            isPassword: false,
            trimValue: true
        };
    },

    render: function render() {
        var value = this.props.value || '';
        /*jshint ignore:start */
        if (this.props.noControl) {
            return _react2.default.createElement(
                'span',
                null,
                value
            );
        }
        return _react2.default.createElement('input', { id: this.props.id,
            type: this.props.isPassword ? 'password' : 'text',
            className: 'k-textbox',
            value: value,
            onChange: this.onChange,
            onBlur: this.onBlur,
            placeholder: this.props.placeholder,
            readOnly: this.props.readonly,
            disabled: this.props.disabled });
        /*jshint ignore:end */
    },

    onBlur: function onBlur(event) {
        var val = event.target.value;

        // Do not trim values for a password field since the whitespace may be intended
        if (this.props.trimValue && event.target.type === 'text') {
            // Only fire a change event if the trim() will change the value
            if (val !== val.trim()) {
                this.props.onChange(val.trim());
            }
        }
    },

    onChange: function onChange(event) {
        var val = event.target.value;

        if (this.props.readonly) {
            return;
        }
        if (this.props.maxLength && val.length > this.props.maxLength) {
            return;
        }
        this.props.onChange(val);
    }
});

exports.default = KendoText;