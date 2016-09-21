'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ReactCommon = require('../ReactCommon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Button = _react2.default.createClass({
    displayName: 'Button',


    getDefaultProps: function getDefaultProps() {
        return {
            onClick: _ReactCommon.noop,
            disabled: false,
            className: ''
        };
    },

    render: function render() {
        var classes = this.props.className;

        if (this.props.diabled) {
            classes += ' buttonDisabled';
        }
        return _react2.default.createElement(
            'button',
            { className: classes, onClick: this.props.onClick, disabled: this.props.disabled },
            this.props.children
        );
    }
});

exports.default = Button;