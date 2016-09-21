'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Radio = require('./Radio');

var _Radio2 = _interopRequireDefault(_Radio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PropTypes = _react2.default.PropTypes;

var RadioGroup = _react2.default.createClass({
    displayName: "RadioGroup",

    propTypes: {
        name: PropTypes.string,
        value: PropTypes.any,
        onChange: PropTypes.func,
        dataSource: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.any,
            label: PropTypes.string
        })),
        className: PropTypes.string
    },

    statics: { fieldClass: function fieldClass() {
            return 'formFieldRadio';
        } },

    render: function render() {
        var props = this.props;
        var children;

        function renderRadio(option) {
            return _react2.default.createElement(_Radio2.default, {
                key: option.value,
                name: props.name,
                value: option.value,
                onChange: props.onChange,
                checked: option.value == props.value
            }, option.label);
        }

        function setRadioChecked(child) {
            if (!child.props.hasOwnProperty('value')) {
                return child;
            }
            // The use of double-equals is intentional here, so that numbers represented as strings will match.
            var checked = child.props.value == props.value;
            return _react2.default.cloneElement(child, { checked: checked });
        }

        if (props.dataSource) {
            children = props.dataSource.map(renderRadio);
        } else {
            children = _react2.default.Children.map(props.children, setRadioChecked);
        }

        return _react2.default.createElement("fieldset", { className: props.className }, children);
    }
});

exports.default = RadioGroup;