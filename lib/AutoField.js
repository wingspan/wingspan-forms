'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _omit2 = require('lodash/omit');

var _omit3 = _interopRequireDefault(_omit2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AutoControl = require('./AutoControl');

var _AutoControl2 = _interopRequireDefault(_AutoControl);

var _FormField = require('./FormField');

var _FormField2 = _interopRequireDefault(_FormField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EXCLUDE_FROM_CONTROL = ['isValid', 'layout'];

var PropTypes = _react2.default.PropTypes;

var AutoField = _react2.default.createClass({
    displayName: 'AutoField',


    propTypes: Object.assign({
        fieldInfo: PropTypes.object.isRequired,
        isValid: PropTypes.array,
        layout: PropTypes.string
    }, _AutoControl2.default.propTypes),

    getDefaultProps: function getDefaultProps() {
        return {
            isValid: [true, '']
        };
    },

    render: function render() {
        var controlProps = (0, _omit3.default)(this.props, EXCLUDE_FROM_CONTROL);

        return _react2.default.createElement(
            _FormField2.default,
            { fieldInfo: this.props.fieldInfo, isValid: this.props.isValid, layout: this.props.layout },
            _react2.default.createElement(_AutoControl2.default, controlProps)
        );
    }
});

exports.default = AutoField;