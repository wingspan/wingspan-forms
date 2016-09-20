'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _partial2 = require('lodash/partial');

var _partial3 = _interopRequireDefault(_partial2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _ReactCommon = require('../ReactCommon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SwitchBox = _react2.default.createClass({
    displayName: 'SwitchBox',


    statics: { fieldClass: function fieldClass() {
            return 'formFieldSwitch';
        } },

    getDefaultProps: function getDefaultProps() {
        return {
            onChange: _ReactCommon.noop,
            labels: { 'yes': 'Yes', 'no': 'No' },
            disabled: false,
            readonly: false,
            noControl: false
        };
    },

    getDisplayValue: function getDisplayValue() {
        return !!this.props.value ? this.props.labels.yes : this.props.labels.no;
    },

    onKeyDown: function onKeyDown(e) {
        if (e.key === ' ') {
            if (!this.props.readonly) {
                this.props.onChange(!this.props.value);
            }
            // Prevent the default always so that the space key doesn't scroll the page.
            e.preventDefault();
        }
    },

    /*jshint ignore:start */
    render: function render() {
        var _this = this;

        var props = this.props;

        if (props.noControl) {
            return _react2.default.createElement("span", null, this.getDisplayValue());
        }

        var yes = props.value === true;
        var no = props.value === false;

        var toggle = function toggle(onChange, val) {
            // Prevent toggle if already in that state
            if (val !== _this.props.value) {
                return (0, _partial3.default)(onChange, val);
            }
        };

        var clickYes = props.readonly ? _ReactCommon.noop : toggle(props.onChange, true);
        var clickNo = props.readonly ? _ReactCommon.noop : toggle(props.onChange, false);

        return _react2.default.createElement(
            'div',
            { tabIndex: '0', className: 'switch', onKeyDown: this.onKeyDown },
            _react2.default.createElement(
                'ul',
                null,
                _react2.default.createElement(
                    'li',
                    { className: yes ? 'active' : '', onClick: clickYes },
                    _react2.default.createElement(
                        'span',
                        { className: yes ? 'pos' : '' },
                        props.labels.yes
                    )
                ),
                _react2.default.createElement(
                    'li',
                    { className: no ? 'active' : '', onClick: clickNo },
                    _react2.default.createElement(
                        'span',
                        { className: no ? 'neg' : '' },
                        props.labels.no
                    )
                )
            )
        );
    }
    /*jshint ignore:end */
});

exports.default = SwitchBox;