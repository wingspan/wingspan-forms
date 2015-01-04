/** @jsx React.DOM */
define([
    'underscore', 'react', 'jquery', 'wingspan-forms'
], function (_, React, $, Forms) {
    'use strict';


    var FormField = Forms.FormField;
    var KendoText = Forms.KendoText;
    var MultilineText = Forms.MultilineText;
    var MultiSelect = Forms.MultiSelect;
    var KendoAutoComplete = Forms.KendoAutoComplete;
    var KendoComboBox = Forms.KendoComboBox;
    var KendoMultiSelect = Forms.KendoMultiSelect;
    var KendoNumber = Forms.KendoNumericTextBox;
    var KendoDate = Forms.KendoDatePicker;
    var KendoTime = Forms.KendoTimePicker;
    var KendoDatetime = Forms.KendoDateTimePicker;
    var CheckBox = Forms.CheckBox;
    var Radio = Forms.Radio;
    var RadioGroup = Forms.RadioGroup;
    var SwitchBox = Forms.SwitchBox;
    var Carousel = Forms.Carousel;
    var KendoGrid = Forms.KendoGrid;

    var now = new Date().toISOString();

    function entrypoint(rootEl) {

        var dataSource = [{ id: 10, name: 'Dustin'}, { id: 11, name: 'Jon'}, { id: 12, name: 'Paul'}, { id: 14, name: 'Danny' }];

        var content = (
            React.createElement("div", null, 

                React.createElement("div", {className: "formTitle"}, "Default Text Input (all styling variation and tooltips are mocked here)"), 

                React.createElement("div", {className: "formFieldTitle"}, "This is a field title (styled same as formLabel but no form validation rules are applied, lives outside of formField)"), 

                React.createElement(FormField, {fieldInfo: { label: 'normal text input with tooltip', helpText: 'info tooltip'}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(KendoText, {value: "Hello World!"})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'invalid text input with tooltip no error tooltip', helpText: 'info tooltip'}, isValid: [false, ''], layout: "formField"}, 
                    React.createElement(KendoText, {value: "Hello World!"})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'invalid text input with tooltip with error tooltip', helpText: 'info tooltip'}, isValid: [false, 'error tooltip'], layout: "formField"}, 
                    React.createElement(KendoText, {value: "Hello World!"})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'readonly text input with tooltip', helpText: 'info tooltip', readOnly: true}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(KendoText, {value: "Hello World!"})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'disabled text input with tooltip', helpText: 'info tooltip', disabled: true}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(KendoText, {value: "Hello World!"})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'normal text input no tooltip'}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(KendoText, {value: "Hello World!"})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'invalid text input no tooltip error tooltip'}, isValid: [false, 'error tooltip'], layout: "formField"}, 
                    React.createElement(KendoText, {value: "Hello World!"})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'invalid text input no tooltip no error tooltip'}, isValid: [false, ''], layout: "formField"}, 
                    React.createElement(KendoText, {value: "Hello World!"})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'readonly text input no tooltip', readOnly: true}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(KendoText, {value: "Hello World!"})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'disabled text input no tooltip', disabled: true}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(KendoText, {value: "Hello World!"})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'normal text input with tooltip inline 300px', helpText: 'info tooltip'}, isValid: [true, ''], layout: "formFieldInline", width: "300px"}, 
                    React.createElement(KendoText, {value: "Hello World!"})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'normal text input with tooltip inline 30%', helpText: 'info tooltip'}, isValid: [true, ''], layout: "formFieldInline", width: "30%"}, 
                    React.createElement(KendoText, {value: "Hello World!"})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'invalid text input with tooltip inline 30%', helpText: 'info tooltip'}, isValid: [false, 'error tooltip'], layout: "formFieldInline", width: "30%"}, 
                    React.createElement(KendoText, {value: "Hello World!"})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'normal text input with tooltip nowrap', helpText: 'info tooltip'}, isValid: [true, ''], layout: "formFieldNoWrap"}, 
                    React.createElement(KendoText, {value: "Hello World!"})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'invalid text input with tooltip nowrap', helpText: 'info tooltip'}, isValid: [false, 'error tooltip'], layout: "formFieldNoWrap"}, 
                    React.createElement(KendoText, {value: "Hello World!"})
                ), 

                React.createElement("div", {className: "formFieldTitle"}, "Example of inline elements with no labels, and other complex alignment offsets"), 

                React.createElement("div", {className: "formInlineGroup"}, 
                    React.createElement(FormField, {fieldInfo: { label: 'Address / Line 2'}, isValid: [true, ''], layout: "formFieldInline", width: "25%"}, 
                        React.createElement(KendoText, {value: "Hello World!"})
                    ), 
                    React.createElement(FormField, {fieldInfo: { label: 'Address / Line 2'}, isValid: [true, ''], layout: "formFieldInline", width: "25%"}, 
                        React.createElement(KendoText, {value: "Hello World!"})
                    ), 
                    React.createElement(FormField, {fieldInfo: { label: ''}, isValid: [true, ''], layout: "formFieldInline", width: "25%"}, 
                        React.createElement(KendoText, {value: "Hello World!"})
                    ), 
                    React.createElement(FormField, {fieldInfo: { label: ''}, isValid: [true, ''], layout: "formFieldInline", width: "25%"}, 
                        React.createElement(KendoText, {value: "Hello World!"})
                    )
                ), 

                /* empty label would be used for 2 line fields potentially, offset example shown below */
                React.createElement("div", {className: "formInlineGroup"}, 
                    React.createElement(FormField, {fieldInfo: {}, isValid: [true, ''], layout: "formFieldInline", width: "25%"}, 
                        React.createElement(KendoText, {value: "Hello World!"})
                    ), 
                    React.createElement(FormField, {fieldInfo: {}, isValid: [true, ''], layout: "formFieldInline formFieldOffset", width: "25%", marginLeft: "25%"}, 
                        React.createElement(KendoText, {value: "Hello World!"})
                    ), 
                    React.createElement(FormField, {fieldInfo: {}, isValid: [true, ''], layout: "formFieldInline", width: "25%"}, 
                        React.createElement(KendoText, {value: "Hello World!"})
                    )
                ), 

                /* if marginLeft is used on first element in inline group, then unique class "formFieldOffset" needed so that padding left can be applied */
                React.createElement("div", {className: "formInlineGroup"}, 
                    React.createElement(FormField, {fieldInfo: {}, isValid: [true, ''], layout: "formFieldInline formFieldOffset", width: "25%", marginLeft: "50%"}, 
                        React.createElement(KendoText, {value: "Hello World!"})
                    ), 
                    React.createElement(FormField, {fieldInfo: {}, isValid: [true, ''], layout: "formFieldInline", width: "25%"}, 
                        React.createElement(KendoText, {value: "Hello World!"})
                    )
                ), 
                /* maybe if marginLeft is not 0, then add formFieldOffset class to the field automatically in formField.js */


                React.createElement("div", {className: "formTitle"}, "Default Textarea"), 

                React.createElement(FormField, {fieldInfo: { label: 'normal textarea'}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(MultilineText, {value: "Hello World!"})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'invalid textarea'}, isValid: [false, ''], layout: "formField"}, 
                    React.createElement(MultilineText, {value: "Hello World!"})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'ReadOnly textarea', readOnly: true}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(MultilineText, {value: "Hello World!"})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'disabled textarea', disabled: true}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(MultilineText, {value: "Hello World!"})
                ), 

                React.createElement("div", {className: "formTitle"}, "Default Multiselect"), 

                React.createElement(FormField, {fieldInfo: { label: 'normal multiselect'}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(MultiSelect, {selectors: dataSource})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'invalid multiselect'}, isValid: [false, ''], layout: "formField"}, 
                    React.createElement(MultiSelect, {selectors: dataSource})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'readOnly multiselect', readOnly: true}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(MultiSelect, {selectors: dataSource})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'disabled multiselect', disabled: true}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(MultiSelect, {selectors: dataSource})
                ), 

                React.createElement("div", {className: "formTitle"}, "Kendo KendoAutoComplete"), 

                React.createElement(FormField, {fieldInfo: { label: 'normal autocomplete'}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(KendoAutoComplete, {dataTextField: "name", dataSource: dataSource, value: dataSource[0].name})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'invalid autocomplete'}, isValid: [false, ''], layout: "formField"}, 
                    React.createElement(KendoAutoComplete, {dataTextField: "name", dataSource: dataSource, value: dataSource[0].name})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'readOnly autocomplete', readOnly: true}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(KendoAutoComplete, {dataTextField: "name", readonly: true, dataSource: dataSource, value: dataSource[0].name})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'disabled autocomplete', disabled: true}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(KendoAutoComplete, {dataTextField: "name", disabled: true, dataSource: dataSource, value: dataSource[0].name})
                ), 

                React.createElement("div", {className: "formTitle"}, "Kendo ComboBox"), 

                React.createElement(FormField, {fieldInfo: { label: 'normal combo'}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(KendoComboBox, {displayField: "name", valueField: "id", dataSource: dataSource, value: dataSource[0]})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'invalid combo'}, isValid: [false, ''], layout: "formField"}, 
                    React.createElement(KendoComboBox, {displayField: "name", valueField: "id", dataSource: dataSource, value: dataSource[0]})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'readOnly combo', readOnly: true}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(KendoComboBox, {displayField: "name", valueField: "id", readonly: true, dataSource: dataSource, value: dataSource[0]})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'disabled combo', disabled: true}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(KendoComboBox, {displayField: "name", valueField: "id", disabled: true, dataSource: dataSource, value: dataSource[0]})
                ), 

                React.createElement("div", {className: "formTitle"}, "Kendo MultiSelect"), 

                React.createElement(FormField, {fieldInfo: { label: 'normal multiselect'}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(KendoMultiSelect, {displayField: "name", valueField: "id", dataSource: dataSource, value: [dataSource[1]]})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'invalid multiselect'}, isValid: [false, ''], layout: "formField"}, 
                    React.createElement(KendoMultiSelect, {displayField: "name", valueField: "id", dataSource: dataSource, value: [dataSource[1]]})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'readOnly multiselect', readOnly: true}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(KendoMultiSelect, {displayField: "name", valueField: "id", readonly: true, dataSource: dataSource, value: [dataSource[1]]})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'disabled multiselect', disabled: true}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(KendoMultiSelect, {displayField: "name", valueField: "id", disabled: true, dataSource: dataSource, value: [dataSource[1]]})
                ), 

                React.createElement("div", {className: "formTitle"}, "Kendo Numeric"), 

                React.createElement(FormField, {fieldInfo: { label: 'normal numeric'}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(KendoNumber, {value: "!"})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'invalid numeric'}, isValid: [false, ''], layout: "formField"}, 
                    React.createElement(KendoNumber, {value: ""})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'ReadOnly numeric', readOnly: true}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(KendoNumber, {value: ""})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'disabled numeric', disabled: true}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(KendoNumber, {value: ""})
                ), 

                React.createElement("div", {className: "formTitle"}, "Kendo DatePicker"), 

                React.createElement(FormField, {fieldInfo: { label: 'normal date'}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(KendoDate, {value: now})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'invalid date'}, isValid: [false, ''], layout: "formField"}, 
                    React.createElement(KendoDate, {value: now})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'ReadOnly date', readOnly: true}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(KendoDate, {value: now, readonly: true})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'disabled date', disabled: true}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(KendoDate, {value: now, disabled: true})
                ), 

                React.createElement("div", {className: "formTitle"}, "Kendo DateTimePicker"), 

                React.createElement(FormField, {fieldInfo: { label: 'normal datetime'}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(KendoDatetime, {value: now})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'invalid datetime'}, isValid: [false, ''], layout: "formField"}, 
                    React.createElement(KendoDatetime, {value: now})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'ReadOnly datetime', readOnly: true}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(KendoDatetime, {value: now})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'disabled datetime', disabled: true}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(KendoDatetime, {value: now})
                ), 


                React.createElement("div", {className: "formTitle"}, "Kendo TimePicker"), 

                React.createElement(FormField, {fieldInfo: {label: 'normal timepicker'}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(KendoTime, {value: "23:11:09"})
                ), 
                React.createElement(FormField, {fieldInfo: {label: 'invalid timepicker'}, isValid: [false, ''], layout: "formField"}, 
                    React.createElement(KendoTime, {value: "23:12:09"})
                ), 
                React.createElement(FormField, {fieldInfo: {label: 'readonly timepicker'}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(KendoTime, {value: "23:13:09", readonly: true})
                ), 
                React.createElement(FormField, {fieldInfo: {label: 'disabled timepicker'}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(KendoTime, {value: "23:14:09", disabled: true})
                ), 


                React.createElement("div", {className: "formTitle"}, "Custom Checkboxes"), 

                React.createElement(FormField, {fieldInfo: { label: 'normal checkbox'}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(CheckBox, {label: "Checkbox Label", value: true}), 
                    React.createElement(CheckBox, {label: "Checkbox Label", value: true}), 
                    React.createElement(CheckBox, {label: "Checkbox Label", value: true})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'normal checkbox'}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(CheckBox, {label: "Checkbox Label", value: false}), 
                    React.createElement(CheckBox, {label: "Checkbox Label", value: false}), 
                    React.createElement(CheckBox, {label: "Checkbox Label", value: false})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'normal checkbox multiline'}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(CheckBox, {label: "Checkbox Label", value: false}), React.createElement("br", null), 
                    React.createElement(CheckBox, {label: "Checkbox Label", value: false}), React.createElement("br", null), 
                    React.createElement(CheckBox, {label: "Checkbox Label", value: false})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'normal checkbox one disabled'}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(CheckBox, {label: "Checkbox Label", value: false}), 
                    React.createElement(CheckBox, {label: "Checkbox Label", value: false}), 
                    React.createElement(CheckBox, {label: "Checkbox Label", value: false, disabled: true})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'invalid checkbox'}, isValid: [false, ''], layout: "formField"}, 
                    React.createElement(CheckBox, {label: "Checkbox Label", value: true}), 
                    React.createElement(CheckBox, {label: "Checkbox Label", value: true}), 
                    React.createElement(CheckBox, {label: "Checkbox Label", value: true})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'invalid checkbox'}, isValid: [false, ''], layout: "formField"}, 
                    React.createElement(CheckBox, {label: "Checkbox Label", value: false}), 
                    React.createElement(CheckBox, {label: "Checkbox Label", value: false}), 
                    React.createElement(CheckBox, {label: "Checkbox Label", value: false})
                ), 


                React.createElement(FormField, {fieldInfo: { label: 'readonly checkbox', readOnly: true}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(CheckBox, {label: "Checkbox Label", value: true}), 
                    React.createElement(CheckBox, {label: "Checkbox Label", value: true}), 
                    React.createElement(CheckBox, {label: "Checkbox Label", value: true})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'readonly checkbox', readOnly: true}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(CheckBox, {label: "Checkbox Label", value: false}), 
                    React.createElement(CheckBox, {label: "Checkbox Label", value: false}), 
                    React.createElement(CheckBox, {label: "Checkbox Label", value: false})
                ), 


                React.createElement(FormField, {fieldInfo: { label: 'disabled checkbox', disabled: true}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(CheckBox, {label: "Checkbox Label", value: true}), 
                    React.createElement(CheckBox, {label: "Checkbox Label", value: true}), 
                    React.createElement(CheckBox, {label: "Checkbox Label", value: true})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'disabled checkbox', disabled: true}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(CheckBox, {label: "Checkbox Label", value: false}), 
                    React.createElement(CheckBox, {label: "Checkbox Label", value: false}), 
                    React.createElement(CheckBox, {label: "Checkbox Label", value: false})
                ), 

                React.createElement("div", {className: "formTitle"}, "Custom Radios"), 

                React.createElement(FormField, {fieldInfo: { label: 'normal radio'}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(RadioGroup, {value: "2"}, 
                        React.createElement(Radio, {value: "1", name: "test"}, "Radio Label"), 
                        React.createElement(Radio, {value: "2", name: "test"}, "Radio Label"), 
                        React.createElement(Radio, {value: "3", name: "test"}, "Radio Label")
                    )
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'normal radio multiline'}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(RadioGroup, {value: "2"}, 
                        React.createElement(Radio, {value: "1", name: "test2"}, "Radio Label"), React.createElement("br", null), 
                        React.createElement(Radio, {value: "2", name: "test2"}, "Radio Label"), React.createElement("br", null), 
                        React.createElement(Radio, {value: "3", name: "test2"}, "Radio Label")
                    )
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'normal radio one disabled'}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(RadioGroup, {value: "2"}, 
                        React.createElement(Radio, {value: "1", name: "test3"}, "Radio Label"), 
                        React.createElement(Radio, {value: "2", name: "test3"}, "Radio Label"), 
                        React.createElement(Radio, {value: "3", name: "test3", disabled: true}, "Radio Label")
                    )
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'invalid radio'}, isValid: [false, ''], layout: "formField"}, 
                    React.createElement(RadioGroup, {value: "2"}, 
                        React.createElement(Radio, {value: "1", name: "test4"}, "Radio Label"), 
                        React.createElement(Radio, {value: "2", name: "test4"}, "Radio Label"), 
                        React.createElement(Radio, {value: "3", name: "test4"}, "Radio Label")
                    )
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'invalid radio'}, isValid: [false, ''], layout: "formField"}, 
                    React.createElement(RadioGroup, {value: "2"}, 
                        React.createElement(Radio, {value: "1", name: "test5"}, "Radio Label"), 
                        React.createElement(Radio, {value: "2", name: "test5"}, "Radio Label"), 
                        React.createElement(Radio, {value: "3", name: "test5"}, "Radio Label")
                    )
                ), 


                React.createElement(FormField, {fieldInfo: { label: 'readonly radio', readOnly: true}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(RadioGroup, {value: "2"}, 
                        React.createElement(Radio, {value: "1", name: "test6"}, "Radio Label"), 
                        React.createElement(Radio, {value: "2", name: "test6"}, "Radio Label"), 
                        React.createElement(Radio, {value: "3", name: "test6"}, "Radio Label")
                    )
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'readonly radio', readOnly: true}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(RadioGroup, {value: "2"}, 
                        React.createElement(Radio, {value: "1", name: "test7"}, "Radio Label"), 
                        React.createElement(Radio, {value: "2", name: "test7"}, "Radio Label"), 
                        React.createElement(Radio, {value: "3", name: "test7"}, "Radio Label")
                    )
                ), 


                React.createElement(FormField, {fieldInfo: { label: 'disabled radio', disabled: true}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(RadioGroup, {value: "2"}, 
                        React.createElement(Radio, {value: "1", name: "test8"}, "Radio Label"), 
                        React.createElement(Radio, {value: "2", name: "test8"}, "Radio Label"), 
                        React.createElement(Radio, {value: "3", name: "test8"}, "Radio Label")
                    )
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'disabled radio', disabled: true}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(RadioGroup, {value: "2"}, 
                        React.createElement(Radio, {value: "1", name: "test9"}, "Radio Label"), 
                        React.createElement(Radio, {value: "2", name: "test9"}, "Radio Label"), 
                        React.createElement(Radio, {value: "3", name: "test9"}, "Radio Label")
                    )
                ), 


                React.createElement("div", {className: "formTitle"}, "Custom Switchbox Checkbox"), 

                React.createElement(FormField, {fieldInfo: { label: 'normal switchbox'}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(SwitchBox, {value: true})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'normal switchbox'}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(SwitchBox, {value: false})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'invalid switchbox'}, isValid: [false, ''], layout: "formField"}, 
                    React.createElement(SwitchBox, {value: true})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'invalid switchbox'}, isValid: [false, ''], layout: "formField"}, 
                    React.createElement(SwitchBox, {value: false})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'readonly switchbox', readOnly: true}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(SwitchBox, {value: true, readonly: true})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'readonly switchbox', readOnly: true}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(SwitchBox, {value: false, disabled: true})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'disabled switchbox', disabled: true}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(SwitchBox, {value: true, disabled: true})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'disabled switchbox', disabled: true}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(SwitchBox, {value: false, disabled: true})
                ), 


                React.createElement("div", {className: "formTitle"}, "Grid Form Fields"), 

                React.createElement(FormField, {fieldInfo: { label: 'normal grid'}, isValid: [true, ''], layout: "formField"}, 
                    React.createElement(KendoGrid, {dataSource: {data:[{name: "test"},{name: "test"}]}, columns: [{ field:"name" }]})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'inline grid'}, isValid: [true, ''], layout: "formFieldInline", width: "25%"}, 
                    React.createElement(KendoGrid, {dataSource: {data:[{name: "test"},{name: "test"}]}, columns: [{ field:"name" }]})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'inline grid'}, isValid: [true, ''], layout: "formFieldInline", width: "25%"}, 
                    React.createElement(KendoGrid, {dataSource: {data:[{name: "test"},{name: "test"}]}, columns: [{ field:"name" }]})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'nowrap grid'}, isValid: [true, ''], layout: "formFieldNoWrap"}, 
                    React.createElement(KendoGrid, {dataSource: {data:[{name: "test"},{name: "test"}]}, columns: [{ field:"name" }]})
                ), 


                React.createElement("div", {className: "formTitle"}, "Buttons"), 

                React.createElement("div", {className: "formButtons"}, 

                    React.createElement("button", {className: "primaryButton"}, "Primary Button"), 

                    React.createElement("button", {className: "secondaryButton"}, "Secondary Button"), 

                    React.createElement("button", {className: "primaryButton buttonDisabled"}, "Disabled Primary Button"), 

                    React.createElement("button", {className: "secondaryButton buttonDisabled"}, "Disabled Secondary Button")

                ), 

                React.createElement("div", {className: "formTitle"}, "Inline Form Heights, fields should clear if forced to next line, if they get hung up height is off and css needs to be adjusted"), 

                React.createElement(FormField, {fieldInfo: { label: 'normal text'}, isValid: [true, ''], layout: "formFieldInline", width: "200px"}, 
                    React.createElement(KendoText, {value: "Hello World!"})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'normal combo'}, isValid: [true, ''], layout: "formFieldInline", width: "200px"}, 
                    React.createElement(KendoComboBox, {displayField: "name", valueField: "id", dataSource: dataSource, value: dataSource[0]})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'normal numeric'}, isValid: [true, ''], layout: "formFieldInline", width: "200px"}, 
                    React.createElement(KendoNumber, {value: "!"})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'normal date'}, isValid: [true, ''], layout: "formFieldInline", width: "200px"}, 
                    React.createElement(KendoDate, {value: ""})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'normal datetime'}, isValid: [true, ''], layout: "formFieldInline", width: "200px"}, 
                    React.createElement(KendoDatetime, {value: ""})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'normal text'}, isValid: [true, ''], layout: "formFieldInline", width: "200px"}, 
                    React.createElement(KendoText, {value: "Hello World!"})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'normal combo'}, isValid: [true, ''], layout: "formFieldInline", width: "200px"}, 
                    React.createElement(KendoComboBox, {displayField: "name", valueField: "id", dataSource: dataSource, value: dataSource[0]})
                ), 



                React.createElement("div", {className: "formClear"}), 

                React.createElement(FormField, {fieldInfo: { label: 'normal textarea'}, isValid: [true, ''], layout: "formFieldInline", width: "200px"}, 
                    React.createElement(MultilineText, {value: "Hello World!"})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'normal multiselect'}, isValid: [true, ''], layout: "formFieldInline", width: "200px"}, 
                    React.createElement(MultiSelect, {selectors: dataSource})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'normal textarea'}, isValid: [true, ''], layout: "formFieldInline", width: "200px"}, 
                    React.createElement(MultilineText, {value: "Hello World!"})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'normal multiselect'}, isValid: [true, ''], layout: "formFieldInline", width: "200px"}, 
                    React.createElement(MultiSelect, {selectors: dataSource})
                ), 

                React.createElement("div", {className: "formTitle"}, "Complex Example"), 

                React.createElement("div", {className: "formColumn formColumnFirst", style: {width: "60%"}}, 

                    React.createElement("div", {className: "formInlineGroup"}, 

                        React.createElement(FormField, {fieldInfo: { label: 'normal text inline'}, isValid: [true, ''], layout: "formFieldInline", width: "25%"}, 
                            React.createElement(KendoText, {value: "Hello World!"})
                        ), 

                        React.createElement(FormField, {fieldInfo: { label: 'normal text inline'}, isValid: [true, ''], layout: "formFieldInline", width: "25%"}, 
                            React.createElement(KendoText, {value: "Hello World!"})
                        ), 

                        React.createElement(FormField, {fieldInfo: { label: 'normal text inline'}, isValid: [true, ''], layout: "formFieldInline", width: "25%"}, 
                            React.createElement(KendoText, {value: "Hello World!"})
                        ), 

                        React.createElement(FormField, {fieldInfo: { label: 'normal text inline'}, isValid: [true, ''], layout: "formFieldInline", width: "25%"}, 
                            React.createElement(KendoText, {value: "Hello World!"})
                        )

                    ), 

                    React.createElement(FormField, {fieldInfo: { label: 'normal text nowrap'}, isValid: [true, ''], layout: "formFieldNoWrap"}, 
                        React.createElement(KendoText, {value: "Hello World!"})
                    ), 

                    React.createElement(FormField, {fieldInfo: { label: 'normal text nowrap'}, isValid: [true, ''], layout: "formFieldNoWrap"}, 
                        React.createElement(KendoText, {value: "Hello World!"})
                    ), 

                    React.createElement(FormField, {fieldInfo: { label: 'normal text nowrap'}, isValid: [true, ''], layout: "formFieldNoWrap"}, 
                        React.createElement(KendoText, {value: "Hello World!"})
                    ), 

                    React.createElement("div", {className: "formInlineGroup"}, 

                        React.createElement(FormField, {fieldInfo: { label: 'normal text inline'}, isValid: [true, ''], layout: "formFieldInline", width: "25%"}, 
                            React.createElement(KendoText, {value: "Hello World!"})
                        ), 

                        React.createElement(FormField, {fieldInfo: { label: 'normal text inline'}, isValid: [true, ''], layout: "formFieldInline", width: "25%"}, 
                            React.createElement(KendoText, {value: "Hello World!"})
                        ), 

                        React.createElement(FormField, {fieldInfo: { label: 'normal text inline'}, isValid: [true, ''], layout: "formFieldInline", width: "50%"}, 
                            React.createElement(KendoText, {value: "Hello World!"})
                        )

                    ), 

                    React.createElement("div", {className: "formInlineGroup"}, 

                        React.createElement(FormField, {fieldInfo: { label: 'normal text inline'}, isValid: [true, ''], layout: "formFieldInline", width: "50%"}, 
                            React.createElement(KendoText, {value: "Hello World!"})
                        ), 

                        React.createElement(FormField, {fieldInfo: { label: 'normal text inline'}, isValid: [true, ''], layout: "formFieldInline", width: "25%"}, 
                            React.createElement(KendoText, {value: "Hello World!"})
                        ), 

                        React.createElement(FormField, {fieldInfo: { label: 'normal text inline'}, isValid: [true, ''], layout: "formFieldInline", width: "25%"}, 
                            React.createElement(KendoText, {value: "Hello World!"})
                        )

                    )


                ), 

                React.createElement("div", {className: "formColumn", style: {width: "40%"}}, 

                    React.createElement("div", {className: "formInlineGroup"}, 

                        React.createElement(FormField, {fieldInfo: { label: 'normal text inline'}, isValid: [true, ''], layout: "formFieldInline", width: "25%"}, 
                            React.createElement(KendoText, {value: "Hello World!"})
                        ), 

                        React.createElement(FormField, {fieldInfo: { label: 'normal text inline'}, isValid: [true, ''], layout: "formFieldInline", width: "25%"}, 
                            React.createElement(KendoText, {value: "Hello World!"})
                        ), 

                        React.createElement(FormField, {fieldInfo: { label: 'normal text inline'}, isValid: [true, ''], layout: "formFieldInline", width: "25%"}, 
                            React.createElement(KendoText, {value: "Hello World!"})
                        ), 

                        React.createElement(FormField, {fieldInfo: { label: 'normal text inline'}, isValid: [true, ''], layout: "formFieldInline", width: "25%"}, 
                            React.createElement(KendoText, {value: "Hello World!"})
                        )

                    ), 

                    React.createElement(FormField, {fieldInfo: { label: 'normal text nowrap'}, isValid: [true, ''], layout: "formFieldNoWrap"}, 
                        React.createElement(KendoText, {value: "Hello World!"})
                    ), 

                    React.createElement(FormField, {fieldInfo: { label: 'normal text nowrap'}, isValid: [true, ''], layout: "formFieldNoWrap"}, 
                        React.createElement(KendoText, {value: "Hello World!"})
                    ), 

                    React.createElement(FormField, {fieldInfo: { label: 'normal text nowrap'}, isValid: [true, ''], layout: "formFieldNoWrap"}, 
                        React.createElement(KendoText, {value: "Hello World!"})
                    ), 

                    React.createElement("div", {className: "formInlineGroup"}, 

                        React.createElement(FormField, {fieldInfo: { label: 'normal text inline'}, isValid: [true, ''], layout: "formFieldInline", width: "25%"}, 
                            React.createElement(KendoText, {value: "Hello World!"})
                        ), 

                        React.createElement(FormField, {fieldInfo: { label: 'normal text inline'}, isValid: [true, ''], layout: "formFieldInline", width: "25%"}, 
                            React.createElement(KendoText, {value: "Hello World!"})
                        ), 

                        React.createElement(FormField, {fieldInfo: { label: 'normal text inline'}, isValid: [true, ''], layout: "formFieldInline", width: "50%"}, 
                            React.createElement(KendoText, {value: "Hello World!"})
                        )

                    ), 

                    React.createElement("div", {className: "formInlineGroup"}, 

                        React.createElement(FormField, {fieldInfo: { label: 'normal text inline'}, isValid: [true, ''], layout: "formFieldInline", width: "50%"}, 
                            React.createElement(KendoText, {value: "Hello World!"})
                        ), 

                        React.createElement(FormField, {fieldInfo: { label: 'normal text inline'}, isValid: [true, ''], layout: "formFieldInline", width: "25%"}, 
                            React.createElement(KendoText, {value: "Hello World!"})
                        ), 

                        React.createElement(FormField, {fieldInfo: { label: 'normal text inline'}, isValid: [true, ''], layout: "formFieldInline", width: "25%"}, 
                            React.createElement(KendoText, {value: "Hello World!"})
                        )

                    )


                ), 

                React.createElement("div", {className: "formTitle"}, "Custom Carousel"), 
                React.createElement(FormField, {fieldInfo: { label: 'normal carousel'}, isValid: [true, '']}, 
                    React.createElement(Carousel, {options: [1, 2, 3], value: 2})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'disabled carousel'}, isValid: [true, '']}, 
                    React.createElement(Carousel, {options: [1, 2, 3], value: 2, disabled: true})
                ), 

                React.createElement(FormField, {fieldInfo: { label: 'invalid carousel'}, isValid: [true, '']}, 
                    React.createElement(Carousel, {options: [1, 2, 3], value: 2, isValid: [false, 'invalid']})
                )

            )
        );

        React.renderComponent(content, rootEl);
        Forms.ControlCommon.attachFormTooltips($(rootEl));
    }

    return {
        entrypoint: entrypoint
    };
});
