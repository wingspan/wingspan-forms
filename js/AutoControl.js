import React from 'react'

import KendoComboBox from './controls/KendoComboBox'
import KendoDatePicker from './controls/KendoDatePicker'
import KendoDateTimePicker from './controls/KendoDateTimePicker'
import KendoTimePicker from './controls/KendoTimePicker'
import KendoMultiSelect from './controls/KendoMultiSelect'
import KendoNumericTextBox from './controls/KendoNumericTextBox'
import KendoText from './controls/KendoText'
import MultilineText from './controls/MultilineText'
import SwitchBox from './controls/SwitchBox'

var TYPE_TO_CONTROL = {
    'text' : KendoText,
    'text:multiLine' : MultilineText,
    'number' : KendoNumericTextBox,
    'date' : KendoDatePicker,
    'datetime' : KendoDateTimePicker,
    'time' : KendoTimePicker,
    'boolean' : SwitchBox
};
var EXCLUDE_FROM_CONTROL = ['fieldInfo', 'controlForField'];

var PropTypes = React.PropTypes;

var FieldInfoType = React.PropTypes.shape({
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

const AutoControl = React.createClass({

    statics: {
        controlForField: function (fieldInfo) {
            var dataType = fieldInfo.dataType;

            if (fieldInfo.options) {
                return fieldInfo.array ? KendoMultiSelect : KendoComboBox;
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

    getDefaultProps: function () {
        return {
            controlForField: function() {}
        };
    },

    render: function () {
        var fieldInfo = this.props.fieldInfo;
        var Control = this.props.controlForField(fieldInfo) || AutoControl.controlForField(fieldInfo);
        var controlProps = _.omit(this.props, EXCLUDE_FROM_CONTROL);

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

        return React.createElement(Control, controlProps);
    }
});

export default AutoControl;