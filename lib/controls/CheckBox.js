'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _uniqueId2 = require('lodash/uniqueId');

var _uniqueId3 = _interopRequireDefault(_uniqueId2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ReactCommon = require('../ReactCommon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CheckBox = _react2.default.createClass({
    displayName: 'CheckBox',


    statics: { fieldClass: function fieldClass() {
            return 'formFieldCheckbox';
        } },

    getDefaultProps: function getDefaultProps() {
        return {
            value: undefined,
            onChange: _ReactCommon.noop,
            id: undefined,
            label: undefined, //checkbox label, not field label
            disabled: false,
            readonly: false
        };
    },

    componentWillMount: function componentWillMount() {
        this.stableUniqueId = this.props.id ? this.props.id : (0, _uniqueId3.default)();
    },

    /*jshint ignore:start */
    render: function render() {
        var props = this.props;

        if (props.noControl) {
            return _react2.default.createElement(
                'span',
                null,
                this.getDisplayValue()
            );
        }

        function onKeyDown(e) {
            if (e.key === ' ') {
                props.onChange(!props.value);
            }
        }
        return _react2.default.createElement(
            'span',
            { className: 'CheckBox', tabIndex: '0', onKeyDown: onKeyDown },
            _react2.default.createElement('input', { type: 'checkbox', id: this.stableUniqueId,
                checked: props.value, 'data-checked': props.value ? '' : null,
                onChange: this.onChange,
                disabled: props.disabled || props.readonly }),
            _react2.default.createElement(
                'label',
                { htmlFor: this.stableUniqueId },
                props.label
            )
        );
    },
    /*jshint ignore:end */

    onChange: function onChange(event) {
        var val = event.target.checked;
        this.props.onChange(val);
    },

    getDisplayValue: function getDisplayValue() {
        return !!this.props.value ? 'Yes' : 'No';
    }
});

exports.default = CheckBox;