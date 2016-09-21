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

var PropTypes = _react2.default.PropTypes;

function fireChange(props) {
    if (props.readonly) {
        return;
    }
    props.onChange(props.value);
}

/**
 * Careful:
 * This must be contained by a RadioGroup or it won't style right.
 */
var Radio = _react2.default.createClass({
    displayName: 'Radio',


    propTypes: {
        name: PropTypes.string.isRequired,
        value: PropTypes.any.isRequired,
        onChange: PropTypes.func,
        checked: PropTypes.bool,
        disabled: PropTypes.bool,
        readonly: PropTypes.bool
    },

    getDefaultProps: function getDefaultProps() {
        return {
            onChange: _ReactCommon.noop,
            disabled: false,
            readonly: false,
            checked: false
        };
    },

    componentWillMount: function componentWillMount() {
        this.stableUniqueId = (0, _uniqueId3.default)();
    },

    /*jshint ignore:start */
    render: function render() {
        // Disabled controls should not receive focus
        var tabIndex = this.props.disabled ? null : 0;

        return _react2.default.createElement(
            'span',
            { className: 'formRadio', tabIndex: tabIndex, onKeyDown: this.onKeyDown },
            _react2.default.createElement('input', { type: 'radio', name: this.props.name, id: this.stableUniqueId,
                value: this.props.value, onChange: this.onChange,
                checked: this.props.checked, 'data-checked': this.props.checked ? '' : null,
                disabled: this.props.disabled }),
            _react2.default.createElement(
                'label',
                { htmlFor: this.stableUniqueId },
                this.props.children
            )
        );
    },
    /*jshint ignore:end */

    onChange: function onChange() {
        fireChange(this.props);
    },

    onKeyDown: function onKeyDown(e) {
        if (e.key === ' ') {
            // Prevent the default always so that the space key doesn't scroll the page.
            e.preventDefault();

            fireChange(this.props);
        }
    }
});

exports.default = Radio;