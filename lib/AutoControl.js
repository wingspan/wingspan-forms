'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _omit2 = require('lodash/omit');

var _omit3 = _interopRequireDefault(_omit2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _KendoComboBox = require('./controls/KendoComboBox');

var _KendoComboBox2 = _interopRequireDefault(_KendoComboBox);

var _KendoDatePicker = require('./controls/KendoDatePicker');

var _KendoDatePicker2 = _interopRequireDefault(_KendoDatePicker);

var _KendoDateTimePicker = require('./controls/KendoDateTimePicker');

var _KendoDateTimePicker2 = _interopRequireDefault(_KendoDateTimePicker);

var _KendoTimePicker = require('./controls/KendoTimePicker');

var _KendoTimePicker2 = _interopRequireDefault(_KendoTimePicker);

var _KendoMultiSelect = require('./controls/KendoMultiSelect');

var _KendoMultiSelect2 = _interopRequireDefault(_KendoMultiSelect);

var _KendoNumericTextBox = require('./controls/KendoNumericTextBox');

var _KendoNumericTextBox2 = _interopRequireDefault(_KendoNumericTextBox);

var _KendoText = require('./controls/KendoText');

var _KendoText2 = _interopRequireDefault(_KendoText);

var _MultilineText = require('./controls/MultilineText');

var _MultilineText2 = _interopRequireDefault(_MultilineText);

var _SwitchBox = require('./controls/SwitchBox');

var _SwitchBox2 = _interopRequireDefault(_SwitchBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TYPE_TO_CONTROL = {
    'text': _KendoText2.default,
    'text:multiLine': _MultilineText2.default,
    'number': _KendoNumericTextBox2.default,
    'date': _KendoDatePicker2.default,
    'datetime': _KendoDateTimePicker2.default,
    'time': _KendoTimePicker2.default,
    'boolean': _SwitchBox2.default
};
var EXCLUDE_FROM_CONTROL = ['fieldInfo', 'controlForField'];

var PropTypes = _react2.default.PropTypes;

var FieldInfoType = _react2.default.PropTypes.shape({
    "name": PropTypes.string.isRequired,
    "label": PropTypes.string,
    "dataType": PropTypes.string.isRequired,
    "placeholder": PropTypes.string,
    "helpText": PropTypes.string,
    "array": PropTypes.bool,
    "readOnly": PropTypes.bool,
    "required": PropTypes.bool,
    "multiLine": PropTypes.bool,
    "options": PropTypes.object,
    "maxLength": PropTypes.number,
    "minLength": PropTypes.number,
    "pattern": PropTypes.string,
    "maxValue": PropTypes.any,
    "minValue": PropTypes.any,
    "decimals": PropTypes.number,
    "stepValue": PropTypes.number
});

var AutoControl = _react2.default.createClass({
    displayName: 'AutoControl',


    statics: {
        controlForField: function controlForField(fieldInfo) {
            var dataType = fieldInfo.dataType;

            if (fieldInfo.options) {
                return fieldInfo.array ? _KendoMultiSelect2.default : _KendoComboBox2.default;
            }
            if (fieldInfo.multiLine) {
                dataType = dataType + ':multiLine';
            }

            return TYPE_TO_CONTROL[dataType];
        }
    },

    /* AutoControl will pass all unknown props to the generated control, but these are the common ones. */
    propTypes: {
        fieldInfo: FieldInfoType.isRequired,
        value: PropTypes.any,
        onChange: PropTypes.func,
        dataSource: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
        readonly: PropTypes.bool,
        controlForField: PropTypes.func
    },

    getDefaultProps: function getDefaultProps() {
        return {
            controlForField: function controlForField() {}
        };
    },

    render: function render() {
        var fieldInfo = this.props.fieldInfo;
        var Control = this.props.controlForField(fieldInfo) || AutoControl.controlForField(fieldInfo);
        var controlProps = (0, _omit3.default)(this.props, EXCLUDE_FROM_CONTROL);

        controlProps.name = fieldInfo.name; // to help with debugging in the presence of asynchronous rendering

        // Add placeholder text
        controlProps.placeholder = fieldInfo.placeholder;

        // Either fieldInfo or parent component can specify readonly status
        controlProps.readonly = this.props.readonly || fieldInfo.readOnly;

        // Add in some constraints from typeInfo
        controlProps.min = fieldInfo.minValue;
        controlProps.max = fieldInfo.maxValue;
        controlProps.step = fieldInfo.stepValue;
        controlProps.minLength = fieldInfo.minLength;
        controlProps.maxLength = fieldInfo.maxLength;

        if (fieldInfo.options) {
            // The DataSource can either be explicitly passed in or the widgets will use inline (array) data
            controlProps.dataSource = this.props.dataSource || fieldInfo.options.data;
            controlProps.valueField = fieldInfo.options.metadata.idProperty;
            controlProps.displayField = fieldInfo.options.metadata.nameProperty;

            controlProps.preventCustomValues = !fieldInfo.options.allowCustomValues;
        }

        return _react2.default.createElement(Control, controlProps);
    }
});

exports.default = AutoControl;