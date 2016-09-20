'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DateWidgetMixin = require('../mixins/DateWidgetMixin');

var _DateWidgetMixin2 = _interopRequireDefault(_DateWidgetMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * value interface is ISO-8601, with the date portion omitted.
 * HH:MM:SS
 */
var KendoTimePicker = _react2.default.createClass({
    displayName: 'KendoTimePicker',

    mixins: [(0, _DateWidgetMixin2.default)('kendoTimePicker')],

    statics: {
        fieldClass: function fieldClass() {
            return 'formFieldDatepicker';
        }
    },

    getDefaultProps: function getDefaultProps() {
        return {
            format: 'h:mm tt' // display format
        };
    },

    /*jshint ignore:start */
    render: function render() {
        return this.props.noControl ? _react2.default.createElement(
            'span',
            null,
            this.renderValue()
        ) : _react2.default.createElement('input', { type: 'text' });
    }
    /*jshint ignore:end */
});

exports.default = KendoTimePicker;