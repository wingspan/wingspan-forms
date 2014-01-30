define([
    'underscore', 'react',
    './util/debug',
    './controls/KendoText',
    './controls/MultilineText',
    './controls/SwitchBox',
    './controls/KendoNumber',
    './controls/KendoDatetime',
    './controls/KendoDate',
    './controls/KendoComboBox',
    './controls/UserPicker',
    './ImmutableOptimizations'
], function (_, React, debug, KendoText, MultilineText, SwitchBox, KendoNumber, KendoDatetime, KendoDate, KendoComboBox,
             UserPicker, ImmutableOptimizations) {
    'use strict';

    var TYPE_TO_CONTROL = {
        'text' : KendoText,
        'text:multiLine' : MultilineText,
        'number' : KendoNumber,
        'date' : KendoDate,
        'datetime' : KendoDatetime,
        'boolean' : SwitchBox
    };
    var CONTROL_PROPS = ['id', 'value', 'onChange', 'isValid', 'disabled', 'noControl'];

    function controlForField(fieldInfo) {
        var dataType = fieldInfo.dataType;

        if (fieldInfo.options) {
            if (dataType === 'User') {
                return UserPicker;
            }
            else {
                return KendoComboBox;
            }
        }
        if (fieldInfo.multiLine) {
            dataType = dataType + ':multiLine';
        }

        return TYPE_TO_CONTROL[dataType];
    }

    var AutoControl = React.createClass({
        mixins: [ImmutableOptimizations],

        getDefaultProps: function () {
            return {
                value: undefined,
                onChange: undefined,
                id: undefined,
                fieldInfo: undefined,
                isValid: [true, ''],
                disabled: false,
                readonly: false,
                noControl: false
            };
        },

        render: function () {
            var fieldInfo = this.props.fieldInfo;
            var Control = controlForField(fieldInfo);
            var controlProps = _.pick(this.props, CONTROL_PROPS);

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
                controlProps.dataSource = fieldInfo.options.dataSource;
                controlProps.valueField = fieldInfo.options.metadata.idProperty;
                controlProps.displayField = fieldInfo.options.metadata.nameProperty;
            }

            return Control(controlProps);
        }
    });

    /**
     * Static method needed by FormField to determine the underlying field class for the generated control.
     *
     * @param fieldInfo
     * @returns {*}
     */
    AutoControl.fieldClassForField = function (fieldInfo) {
        return ((controlForField(fieldInfo) || {}).originalSpec || {}).fieldClass;
    };

    return AutoControl;
});

/*
    fieldInfo looks like this:

{
    "name": "tmfItemId",
    "label": "ID",
    "dataType": "text",
    "placeholder": "100.02",
    "helpText": "Unique identifier for the List Item (####.##)",
    "array": false,
    "readonly": false,
    "required": true,
    "multiLine": false,
    "options": null,
    "maxLength": 32,
    "minLength": 32,
    "pattern": "^[a-zA-Z0-9]{1,5}\\.[a-zA-Z0-9]{1,3}$",
    "maxValue": null,
    "minValue": null,
    "decimals": 0,
    "stepValue": 1.0
}
*/
