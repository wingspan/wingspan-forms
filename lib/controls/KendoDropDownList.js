'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SelectWidgetMixin = require('../mixins/SelectWidgetMixin');

var _SelectWidgetMixin2 = _interopRequireDefault(_SelectWidgetMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PropTypes = _react2.default.PropTypes;

var KendoDropDownList = _react2.default.createClass({
    displayName: 'KendoDropDownList',

    mixins: [(0, _SelectWidgetMixin2.default)('kendoDropDownList')],

    propTypes: {
        id: PropTypes.string,
        value: PropTypes.any,
        onChange: PropTypes.func,
        autoBind: PropTypes.bool,
        dataSource: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
        displayField: PropTypes.string,
        valueField: PropTypes.string,
        disabled: PropTypes.bool,
        readonly: PropTypes.bool,
        options: PropTypes.object,
        filter: PropTypes.string,
        optionLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        template: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
    },

    statics: {
        fieldClass: function fieldClass() {
            return 'formFieldCombobox';
        }
    },

    /*jshint ignore:start */
    render: function render() {
        return this.props.noControl ? _react2.default.createElement(
            'span',
            { id: this.props.id },
            this.renderValue()
        ) : _react2.default.createElement('input', { id: this.props.id });
    }
    /*jshint ignore:end */
});

exports.default = KendoDropDownList;