'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ReactCommon = require('../ReactCommon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PropTypes = _react2.default.PropTypes;

var MultilineText = _react2.default.createClass({
    displayName: 'MultilineText',


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
        trimValue: PropTypes.bool
    },

    statics: { fieldClass: function fieldClass() {
            return 'formFieldTextarea';
        } },

    getDefaultProps: function getDefaultProps() {
        return {
            value: '',
            onChange: _ReactCommon.noop,
            placeholder: '',
            disabled: false,
            readonly: false,
            noControl: false,
            trimValue: true
        };
    },

    /* jshint ignore:start */
    render: function render() {
        if (this.props.noControl) {
            // Use a <pre> tag because there are newlines in the text that should be preserved.
            return _react2.default.createElement(
                'pre',
                null,
                this.props.value || ''
            );
        }
        return _react2.default.createElement('textarea', { id: this.props.id,
            className: 'k-textbox',
            value: this.props.value || '',
            onChange: this.onChange,
            onBlur: this.onBlur,
            placeholder: this.props.placeholder,
            readOnly: this.props.readonly,
            disabled: this.props.disabled });
    },
    /* jshint ignore:end */

    onBlur: function onBlur(event) {
        var val = event.target.value;

        // Only fire a change event if the trim() will change the value
        if (this.props.trimValue && val !== val.trim()) {
            this.props.onChange(val.trim());
        }

        if (this.props.onBlur) {
            this.props.onBlur(event);
        }
    },

    onChange: function onChange(event) {
        var val = event.target.value;

        if (this.props.maxLength && val.length > this.props.maxLength) {
            return;
        }
        this.props.onChange(val);
    }
});

exports.default = MultilineText;