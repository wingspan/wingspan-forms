/** @jsx React.DOM */
define([
    'underscore', 'react', 'jquery', 'wingspan-forms',
], function (_, React, $, Forms) {
    'use strict';


    var FormField = Forms.FormField;
    var KendoText = Forms.KendoText;
    var MultilineText = Forms.MultilineText;
    var MultiSelect = Forms.MultiSelect;
    var KendoAutoComplete = Forms.KendoAutoComplete;
    var KendoComboBox = Forms.KendoComboBox;
    var KendoMultiSelect = Forms.KendoMultiSelect;
    var KendoNumber = Forms.KendoNumber;
    var KendoDate = Forms.KendoDate;
    var KendoTime = Forms.KendoTime;
    var KendoDatetime = Forms.KendoDatetime;
    var CheckBox = Forms.CheckBox;
    var Radio = Forms.Radio;
    var RadioGroup = Forms.RadioGroup;
    var SwitchBox = Forms.SwitchBox;
    var Carousel = Forms.Carousel;
    var KendoGrid = Forms.KendoGrid;


    function entrypoint(rootEl) {

        var dataSource = [{ id: 10, name: 'Dustin'}, { id: 11, name: 'Jon'}, { id: 12, name: 'Paul'}, { id: 14, name: 'Danny' }];

        var content = (
            <div>

                <div className="formTitle">Default Text Input (all styling variation and tooltips are mocked here)</div>

                <div className="formFieldTitle">This is a field title (styled same as formLabel but no form validation rules are applied, lives outside of formField)</div>

                <FormField fieldInfo={{ label: 'normal text input with tooltip', helpText: 'info tooltip' }} isValid={[true, '']} layout="formField">
                    <KendoText value="Hello World!" />
                </FormField>

                <FormField fieldInfo={{ label: 'invalid text input with tooltip no error tooltip', helpText: 'info tooltip' }} isValid={[false, '']} layout="formField">
                    <KendoText value="Hello World!" />
                </FormField>

                <FormField fieldInfo={{ label: 'invalid text input with tooltip with error tooltip', helpText: 'info tooltip' }} isValid={[false, 'error tooltip']} layout="formField">
                    <KendoText value="Hello World!" />
                </FormField>

                <FormField fieldInfo={{ label: 'readonly text input with tooltip', helpText: 'info tooltip', readOnly: true }} isValid={[true, '']} layout="formField">
                    <KendoText value="Hello World!" />
                </FormField>

                <FormField fieldInfo={{ label: 'disabled text input with tooltip', helpText: 'info tooltip', disabled: true }} isValid={[true, '']} layout="formField">
                    <KendoText value="Hello World!" />
                </FormField>

                <FormField fieldInfo={{ label: 'normal text input no tooltip' }} isValid={[true, '']} layout="formField">
                    <KendoText value="Hello World!" />
                </FormField>

                <FormField fieldInfo={{ label: 'invalid text input no tooltip error tooltip' }} isValid={[false, 'error tooltip']} layout="formField">
                    <KendoText value="Hello World!" />
                </FormField>

                <FormField fieldInfo={{ label: 'invalid text input no tooltip no error tooltip' }} isValid={[false, '']} layout="formField">
                    <KendoText value="Hello World!" />
                </FormField>

                <FormField fieldInfo={{ label: 'readonly text input no tooltip', readOnly: true }} isValid={[true, '']} layout="formField">
                    <KendoText value="Hello World!" />
                </FormField>

                <FormField fieldInfo={{ label: 'disabled text input no tooltip', disabled: true }} isValid={[true, '']} layout="formField">
                    <KendoText value="Hello World!" />
                </FormField>

                <FormField fieldInfo={{ label: 'normal text input with tooltip inline 300px', helpText: 'info tooltip' }} isValid={[true, '']} layout="formFieldInline" width="300px">
                    <KendoText value="Hello World!" />
                </FormField>

                <FormField fieldInfo={{ label: 'normal text input with tooltip inline 30%', helpText: 'info tooltip' }} isValid={[true, '']} layout="formFieldInline" width="30%">
                    <KendoText value="Hello World!" />
                </FormField>

                <FormField fieldInfo={{ label: 'invalid text input with tooltip inline 30%', helpText: 'info tooltip' }} isValid={[false, 'error tooltip']} layout="formFieldInline" width="30%">
                    <KendoText value="Hello World!" />
                </FormField>

                <FormField fieldInfo={{ label: 'normal text input with tooltip nowrap', helpText: 'info tooltip' }} isValid={[true, '']} layout="formFieldNoWrap">
                    <KendoText value="Hello World!" />
                </FormField>

                <FormField fieldInfo={{ label: 'invalid text input with tooltip nowrap', helpText: 'info tooltip' }} isValid={[false, 'error tooltip']} layout="formFieldNoWrap">
                    <KendoText value="Hello World!" />
                </FormField>

                <div className="formFieldTitle">Example of inline elements with no labels, and other complex alignment offsets</div>

                <div className="formInlineGroup">
                    <FormField fieldInfo={{ label: 'Address / Line 2' }} isValid={[true, '']} layout="formFieldInline" width="25%">
                        <KendoText value="Hello World!" />
                    </FormField>
                    <FormField fieldInfo={{ label: 'Address / Line 2' }} isValid={[true, '']} layout="formFieldInline" width="25%">
                        <KendoText value="Hello World!" />
                    </FormField>
                    <FormField fieldInfo={{ label: '' }} isValid={[true, '']} layout="formFieldInline" width="25%">
                        <KendoText value="Hello World!" />
                    </FormField>
                    <FormField fieldInfo={{ label: '' }} isValid={[true, '']} layout="formFieldInline" width="25%">
                        <KendoText value="Hello World!" />
                    </FormField>
                </div>

                {/* empty label would be used for 2 line fields potentially, offset example shown below */}
                <div className="formInlineGroup">
                    <FormField fieldInfo={{}} isValid={[true, '']} layout="formFieldInline" width="25%">
                        <KendoText value="Hello World!" />
                    </FormField>
                    <FormField fieldInfo={{}} isValid={[true, '']} layout="formFieldInline formFieldOffset" width="25%" marginLeft="25%">
                        <KendoText value="Hello World!" />
                    </FormField>
                    <FormField fieldInfo={{}} isValid={[true, '']} layout="formFieldInline" width="25%">
                        <KendoText value="Hello World!" />
                    </FormField>
                </div>

                {/* if marginLeft is used on first element in inline group, then unique class "formFieldOffset" needed so that padding left can be applied */}
                <div className="formInlineGroup">
                    <FormField fieldInfo={{}} isValid={[true, '']} layout="formFieldInline formFieldOffset" width="25%" marginLeft="50%">
                        <KendoText value="Hello World!" />
                    </FormField>
                    <FormField fieldInfo={{}} isValid={[true, '']} layout="formFieldInline" width="25%">
                        <KendoText value="Hello World!" />
                    </FormField>
                </div>
                {/* maybe if marginLeft is not 0, then add formFieldOffset class to the field automatically in formField.js */}


                <div className="formTitle">Default Textarea</div>

                <FormField fieldInfo={{ label: 'normal textarea' }} isValid={[true, '']} layout="formField" >
                    <MultilineText value="Hello World!" />
                </FormField>

                <FormField fieldInfo={{ label: 'invalid textarea' }} isValid={[false, '']} layout="formField" >
                    <MultilineText value="Hello World!" />
                </FormField>

                <FormField fieldInfo={{ label: 'ReadOnly textarea', readOnly: true }} isValid={[true, '']} layout="formField" >
                    <MultilineText value="Hello World!" />
                </FormField>

                <FormField fieldInfo={{ label: 'disabled textarea', disabled: true }} isValid={[true, '']} layout="formField" >
                    <MultilineText value="Hello World!" />
                </FormField>

                <div className="formTitle">Default Multiselect</div>

                <FormField fieldInfo={{ label: 'normal multiselect' }} isValid={[true, '']} layout="formField" >
                    <MultiSelect selectors={dataSource} />
                </FormField>

                <FormField fieldInfo={{ label: 'invalid multiselect' }} isValid={[false, '']} layout="formField" >
                    <MultiSelect selectors={dataSource} />
                </FormField>

                <FormField fieldInfo={{ label: 'readOnly multiselect', readOnly: true }} isValid={[true, '']} layout="formField" >
                    <MultiSelect selectors={dataSource} />
                </FormField>

                <FormField fieldInfo={{ label: 'disabled multiselect', disabled: true }} isValid={[true, '']} layout="formField" >
                    <MultiSelect selectors={dataSource} />
                </FormField>

                <div className="formTitle">Kendo KendoAutoComplete</div>

                <FormField fieldInfo={{ label: 'normal autocomplete' }} isValid={[true, '']} layout="formField" >
                    <KendoAutoComplete dataTextField="name" dataSource={dataSource} value={dataSource[0].name} />
                </FormField>

                <FormField fieldInfo={{ label: 'invalid autocomplete' }} isValid={[false, '']} layout="formField" >
                    <KendoAutoComplete dataTextField="name" dataSource={dataSource} value={dataSource[0].name} />
                </FormField>

                <FormField fieldInfo={{ label: 'readOnly autocomplete', readOnly: true }} isValid={[true, '']} layout="formField" >
                    <KendoAutoComplete dataTextField="name" readonly={true} dataSource={dataSource} value={dataSource[0].name} />
                </FormField>

                <FormField fieldInfo={{ label: 'disabled autocomplete', disabled: true }} isValid={[true, '']} layout="formField" >
                    <KendoAutoComplete dataTextField="name" disabled={true} dataSource={dataSource} value={dataSource[0].name} />
                </FormField>

                <div className="formTitle">Kendo ComboBox</div>

                <FormField fieldInfo={{ label: 'normal combo' }} isValid={[true, '']} layout="formField" >
                    <KendoComboBox displayField="name" valueField="id" dataSource={dataSource} value={dataSource[0]} />
                </FormField>

                <FormField fieldInfo={{ label: 'invalid combo' }} isValid={[false, '']} layout="formField" >
                    <KendoComboBox displayField="name" valueField="id" dataSource={dataSource} value={dataSource[0]} />
                </FormField>

                <FormField fieldInfo={{ label: 'readOnly combo', readOnly: true }} isValid={[true, '']} layout="formField" >
                    <KendoComboBox displayField="name" valueField="id" readonly={true} dataSource={dataSource} value={dataSource[0]} />
                </FormField>

                <FormField fieldInfo={{ label: 'disabled combo', disabled: true }} isValid={[true, '']} layout="formField" >
                    <KendoComboBox displayField="name" valueField="id" disabled={true} dataSource={dataSource} value={dataSource[0]} />
                </FormField>

                <div className="formTitle">Kendo MultiSelect</div>

                <FormField fieldInfo={{ label: 'normal multiselect' }} isValid={[true, '']} layout="formField" >
                    <KendoMultiSelect displayField="name" valueField="id" dataSource={dataSource} value={[dataSource[1]]} />
                </FormField>

                <FormField fieldInfo={{ label: 'invalid multiselect' }} isValid={[false, '']} layout="formField" >
                    <KendoMultiSelect displayField="name" valueField="id" dataSource={dataSource} value={[dataSource[1]]} />
                </FormField>

                <FormField fieldInfo={{ label: 'readOnly multiselect', readOnly: true }} isValid={[true, '']} layout="formField" >
                    <KendoMultiSelect displayField="name" valueField="id" readonly={true} dataSource={dataSource} value={[dataSource[1]]} />
                </FormField>

                <FormField fieldInfo={{ label: 'disabled multiselect', disabled: true }} isValid={[true, '']} layout="formField" >
                    <KendoMultiSelect displayField="name" valueField="id" disabled={true} dataSource={dataSource} value={[dataSource[1]]} />
                </FormField>

                <div className="formTitle">Kendo Numeric</div>

                <FormField fieldInfo={{ label: 'normal numeric' }} isValid={[true, '']} layout="formField" >
                    <KendoNumber value="!" />
                </FormField>

                <FormField fieldInfo={{ label: 'invalid numeric' }} isValid={[false, '']} layout="formField" >
                    <KendoNumber value="" />
                </FormField>

                <FormField fieldInfo={{ label: 'ReadOnly numeric', readOnly: true }} isValid={[true, '']} layout="formField" >
                    <KendoNumber value="" />
                </FormField>

                <FormField fieldInfo={{ label: 'disabled numeric', disabled: true }} isValid={[true, '']} layout="formField" >
                    <KendoNumber value="" />
                </FormField>

                <div className="formTitle">Datepicker</div>

                <FormField fieldInfo={{ label: 'normal date' }} isValid={[true, '']} layout="formField" >
                    <KendoDate value="" />
                </FormField>

                <FormField fieldInfo={{ label: 'invalid date' }} isValid={[false, '']} layout="formField" >
                    <KendoDate value="" />
                </FormField>

                <FormField fieldInfo={{ label: 'ReadOnly date', readOnly: true }} isValid={[true, '']} layout="formField" >
                    <KendoDate value="" />
                </FormField>

                <FormField fieldInfo={{ label: 'disabled date', disabled: true }} isValid={[true, '']} layout="formField" >
                    <KendoDate value="" />
                </FormField>

                <div className="formTitle">Datetimepicker</div>

                <FormField fieldInfo={{ label: 'normal datetime' }} isValid={[true, '']} layout="formField" >
                    <KendoDatetime value="" />
                </FormField>

                <FormField fieldInfo={{ label: 'invalid datetime' }} isValid={[false, '']} layout="formField" >
                    <KendoDatetime value="" />
                </FormField>

                <FormField fieldInfo={{ label: 'ReadOnly datetime', readOnly: true }} isValid={[true, '']} layout="formField" >
                    <KendoDatetime value="" />
                </FormField>

                <FormField fieldInfo={{ label: 'disabled datetime', disabled: true }} isValid={[true, '']} layout="formField" >
                    <KendoDatetime value="" />
                </FormField>


                <div className="formTitle">Kendo TimePicker</div>

                <FormField fieldInfo={{label: 'timepicker'}} isValid={[true, '']} layout="formField" >
                    <KendoTime value="23:11:09" />
                </FormField>


                <div className="formTitle">Custom Checkboxes</div>

                <FormField fieldInfo={{ label: 'normal checkbox' }} isValid={[true, '']} layout="formField">
                    <CheckBox label="Checkbox Label" value={true} />
                    <CheckBox label="Checkbox Label" value={true} />
                    <CheckBox label="Checkbox Label" value={true} />
                </FormField>

                <FormField fieldInfo={{ label: 'normal checkbox' }} isValid={[true, '']} layout="formField">
                    <CheckBox label="Checkbox Label" value={false} />
                    <CheckBox label="Checkbox Label" value={false} />
                    <CheckBox label="Checkbox Label" value={false} />
                </FormField>

                <FormField fieldInfo={{ label: 'normal checkbox multiline' }} isValid={[true, '']} layout="formField">
                    <CheckBox label="Checkbox Label" value={false} /><br />
                    <CheckBox label="Checkbox Label" value={false} /><br />
                    <CheckBox label="Checkbox Label" value={false} />
                </FormField>

                <FormField fieldInfo={{ label: 'normal checkbox one disabled' }} isValid={[true, '']} layout="formField">
                    <CheckBox label="Checkbox Label" value={false} />
                    <CheckBox label="Checkbox Label" value={false} />
                    <CheckBox label="Checkbox Label" value={false} disabled={true} />
                </FormField>

                <FormField fieldInfo={{ label: 'invalid checkbox' }} isValid={[false, '']} layout="formField">
                    <CheckBox label="Checkbox Label" value={true} />
                    <CheckBox label="Checkbox Label" value={true} />
                    <CheckBox label="Checkbox Label" value={true} />
                </FormField>

                <FormField fieldInfo={{ label: 'invalid checkbox' }} isValid={[false, '']} layout="formField">
                    <CheckBox label="Checkbox Label" value={false} />
                    <CheckBox label="Checkbox Label" value={false} />
                    <CheckBox label="Checkbox Label" value={false} />
                </FormField>


                <FormField fieldInfo={{ label: 'readonly checkbox', readOnly: true }} isValid={[true, '']} layout="formField">
                    <CheckBox label="Checkbox Label" value={true} />
                    <CheckBox label="Checkbox Label" value={true} />
                    <CheckBox label="Checkbox Label" value={true} />
                </FormField>

                <FormField fieldInfo={{ label: 'readonly checkbox', readOnly: true }} isValid={[true, '']} layout="formField">
                    <CheckBox label="Checkbox Label" value={false} />
                    <CheckBox label="Checkbox Label" value={false} />
                    <CheckBox label="Checkbox Label" value={false} />
                </FormField>


                <FormField fieldInfo={{ label: 'disabled checkbox', disabled: true }} isValid={[true, '']} layout="formField">
                    <CheckBox label="Checkbox Label" value={true} />
                    <CheckBox label="Checkbox Label" value={true} />
                    <CheckBox label="Checkbox Label" value={true} />
                </FormField>

                <FormField fieldInfo={{ label: 'disabled checkbox', disabled: true }} isValid={[true, '']} layout="formField">
                    <CheckBox label="Checkbox Label" value={false} />
                    <CheckBox label="Checkbox Label" value={false} />
                    <CheckBox label="Checkbox Label" value={false} />
                </FormField>

                <div className="formTitle">Custom Radios</div>

                <FormField fieldInfo={{ label: 'normal radio' }} isValid={[true, '']} layout="formField">
                    <RadioGroup value="2">
                        <Radio value="1" name="test">Radio Label</Radio>
                        <Radio value="2" name="test">Radio Label</Radio>
                        <Radio value="3" name="test">Radio Label</Radio>
                    </RadioGroup>
                </FormField>

                <FormField fieldInfo={{ label: 'normal radio multiline' }} isValid={[true, '']} layout="formField">
                    <RadioGroup value="2">
                        <Radio value="1" name="test2">Radio Label</Radio><br />
                        <Radio value="2" name="test2">Radio Label</Radio><br />
                        <Radio value="3" name="test2">Radio Label</Radio>
                    </RadioGroup>
                </FormField>

                <FormField fieldInfo={{ label: 'normal radio one disabled' }} isValid={[true, '']} layout="formField">
                    <RadioGroup value="2">
                        <Radio value="1" name="test3">Radio Label</Radio>
                        <Radio value="2" name="test3">Radio Label</Radio>
                        <Radio value="3" name="test3" disabled={true}>Radio Label</Radio>
                    </RadioGroup>
                </FormField>

                <FormField fieldInfo={{ label: 'invalid radio' }} isValid={[false, '']} layout="formField">
                    <RadioGroup value="2">
                        <Radio value="1" name="test4">Radio Label</Radio>
                        <Radio value="2" name="test4">Radio Label</Radio>
                        <Radio value="3" name="test4">Radio Label</Radio>
                    </RadioGroup>
                </FormField>

                <FormField fieldInfo={{ label: 'invalid radio' }} isValid={[false, '']} layout="formField">
                    <RadioGroup value="2">
                        <Radio value="1" name="test5">Radio Label</Radio>
                        <Radio value="2" name="test5">Radio Label</Radio>
                        <Radio value="3" name="test5">Radio Label</Radio>
                    </RadioGroup>
                </FormField>


                <FormField fieldInfo={{ label: 'readonly radio', readOnly: true }} isValid={[true, '']} layout="formField">
                    <RadioGroup value="2">
                        <Radio value="1" name="test6">Radio Label</Radio>
                        <Radio value="2" name="test6">Radio Label</Radio>
                        <Radio value="3" name="test6">Radio Label</Radio>
                    </RadioGroup>
                </FormField>

                <FormField fieldInfo={{ label: 'readonly radio', readOnly: true }} isValid={[true, '']} layout="formField">
                    <RadioGroup value="2">
                        <Radio value="1" name="test7">Radio Label</Radio>
                        <Radio value="2" name="test7">Radio Label</Radio>
                        <Radio value="3" name="test7">Radio Label</Radio>
                    </RadioGroup>
                </FormField>


                <FormField fieldInfo={{ label: 'disabled radio', disabled: true }} isValid={[true, '']} layout="formField">
                    <RadioGroup value="2">
                        <Radio value="1" name="test8">Radio Label</Radio>
                        <Radio value="2" name="test8">Radio Label</Radio>
                        <Radio value="3" name="test8">Radio Label</Radio>
                    </RadioGroup>
                </FormField>

                <FormField fieldInfo={{ label: 'disabled radio', disabled: true }} isValid={[true, '']} layout="formField">
                    <RadioGroup value="2">
                        <Radio value="1" name="test9">Radio Label</Radio>
                        <Radio value="2" name="test9">Radio Label</Radio>
                        <Radio value="3" name="test9">Radio Label</Radio>
                    </RadioGroup>
                </FormField>


                <div className="formTitle">Custom Switchbox Checkbox</div>

                <FormField fieldInfo={{ label: 'normal switchbox' }} isValid={[true, '']} layout="formField">
                    <SwitchBox value={true} />
                </FormField>

                <FormField fieldInfo={{ label: 'normal switchbox' }} isValid={[true, '']} layout="formField">
                    <SwitchBox value={false} />
                </FormField>

                <FormField fieldInfo={{ label: 'invalid switchbox' }} isValid={[false, '']} layout="formField">
                    <SwitchBox value={true} />
                </FormField>

                <FormField fieldInfo={{ label: 'invalid switchbox' }} isValid={[false, '']} layout="formField">
                    <SwitchBox value={false} />
                </FormField>

                <FormField fieldInfo={{ label: 'readonly switchbox', readOnly: true }} isValid={[true, '']} layout="formField">
                    <SwitchBox value={true} readonly={true} />
                </FormField>

                <FormField fieldInfo={{ label: 'readonly switchbox', readOnly: true }} isValid={[true, '']} layout="formField">
                    <SwitchBox value={false} disabled={true} />
                </FormField>

                <FormField fieldInfo={{ label: 'disabled switchbox', disabled: true }} isValid={[true, '']} layout="formField">
                    <SwitchBox value={true} disabled={true} />
                </FormField>

                <FormField fieldInfo={{ label: 'disabled switchbox', disabled: true }} isValid={[true, '']} layout="formField">
                    <SwitchBox value={false} disabled={true} />
                </FormField>


                <div className="formTitle">Grid Form Fields</div>

                <FormField fieldInfo={{ label: 'normal grid' }} isValid={[true, '']} layout="formField">
                    <KendoGrid dataSource={{data:[{name: "test"},{name: "test"}]}} columns={[{ field:"name" }]}/>
                </FormField>

                <FormField fieldInfo={{ label: 'inline grid' }} isValid={[true, '']} layout="formFieldInline" width="25%">
                    <KendoGrid dataSource={{data:[{name: "test"},{name: "test"}]}} columns={[{ field:"name" }]}/>
                </FormField>

                <FormField fieldInfo={{ label: 'inline grid' }} isValid={[true, '']} layout="formFieldInline" width="25%">
                    <KendoGrid dataSource={{data:[{name: "test"},{name: "test"}]}} columns={[{ field:"name" }]}/>
                </FormField>

                <FormField fieldInfo={{ label: 'nowrap grid' }} isValid={[true, '']} layout="formFieldNoWrap">
                    <KendoGrid dataSource={{data:[{name: "test"},{name: "test"}]}} columns={[{ field:"name" }]}/>
                </FormField>


                <div className="formTitle">Buttons</div>

                <div className="formButtons">

                    <button className="primaryButton">Primary Button</button>

                    <button className="secondaryButton">Secondary Button</button>

                    <button className="primaryButton buttonDisabled">Disabled Primary Button</button>

                    <button className="secondaryButton buttonDisabled">Disabled Secondary Button</button>

                </div>

                <div className="formTitle">Inline Form Heights, fields should clear if forced to next line, if they get hung up height is off and css needs to be adjusted</div>

                <FormField fieldInfo={{ label: 'normal text' }} isValid={[true, '']} layout="formFieldInline" width="200px">
                    <KendoText value="Hello World!" />
                </FormField>

                <FormField fieldInfo={{ label: 'normal combo' }} isValid={[true, '']} layout="formFieldInline" width="200px">
                    <KendoComboBox displayField="name" valueField="id" dataSource={dataSource} value={dataSource[0]} />
                </FormField>

                <FormField fieldInfo={{ label: 'normal numeric' }} isValid={[true, '']} layout="formFieldInline" width="200px">
                    <KendoNumber value="!" />
                </FormField>

                <FormField fieldInfo={{ label: 'normal date' }} isValid={[true, '']} layout="formFieldInline" width="200px">
                    <KendoDate value="" />
                </FormField>

                <FormField fieldInfo={{ label: 'normal datetime' }} isValid={[true, '']} layout="formFieldInline" width="200px">
                    <KendoDatetime value="" />
                </FormField>

                <FormField fieldInfo={{ label: 'normal text' }} isValid={[true, '']} layout="formFieldInline" width="200px">
                    <KendoText value="Hello World!" />
                </FormField>

                <FormField fieldInfo={{ label: 'normal combo' }} isValid={[true, '']} layout="formFieldInline" width="200px">
                    <KendoComboBox displayField="name" valueField="id" dataSource={dataSource} value={dataSource[0]} />
                </FormField>



                <div className="formClear"></div>

                <FormField fieldInfo={{ label: 'normal textarea' }} isValid={[true, '']} layout="formFieldInline" width="200px">
                    <MultilineText value="Hello World!" />
                </FormField>

                <FormField fieldInfo={{ label: 'normal multiselect' }} isValid={[true, '']} layout="formFieldInline" width="200px">
                    <MultiSelect selectors={dataSource} />
                </FormField>

                <FormField fieldInfo={{ label: 'normal textarea' }} isValid={[true, '']} layout="formFieldInline" width="200px">
                    <MultilineText value="Hello World!" />
                </FormField>

                <FormField fieldInfo={{ label: 'normal multiselect' }} isValid={[true, '']} layout="formFieldInline" width="200px">
                    <MultiSelect selectors={dataSource} />
                </FormField>

                <div className="formTitle">Complex Example</div>

                <div className="formColumn formColumnFirst" style={{width: "60%"}}>

                    <div className="formInlineGroup">

                        <FormField fieldInfo={{ label: 'normal text inline' }} isValid={[true, '']} layout="formFieldInline" width="25%">
                            <KendoText value="Hello World!" />
                        </FormField>

                        <FormField fieldInfo={{ label: 'normal text inline' }} isValid={[true, '']} layout="formFieldInline" width="25%">
                            <KendoText value="Hello World!" />
                        </FormField>

                        <FormField fieldInfo={{ label: 'normal text inline' }} isValid={[true, '']} layout="formFieldInline" width="25%">
                            <KendoText value="Hello World!" />
                        </FormField>

                        <FormField fieldInfo={{ label: 'normal text inline' }} isValid={[true, '']} layout="formFieldInline" width="25%">
                            <KendoText value="Hello World!" />
                        </FormField>

                    </div>

                    <FormField fieldInfo={{ label: 'normal text nowrap' }} isValid={[true, '']} layout="formFieldNoWrap">
                        <KendoText value="Hello World!" />
                    </FormField>

                    <FormField fieldInfo={{ label: 'normal text nowrap' }} isValid={[true, '']} layout="formFieldNoWrap">
                        <KendoText value="Hello World!" />
                    </FormField>

                    <FormField fieldInfo={{ label: 'normal text nowrap' }} isValid={[true, '']} layout="formFieldNoWrap">
                        <KendoText value="Hello World!" />
                    </FormField>

                    <div className="formInlineGroup">

                        <FormField fieldInfo={{ label: 'normal text inline' }} isValid={[true, '']} layout="formFieldInline" width="25%">
                            <KendoText value="Hello World!" />
                        </FormField>

                        <FormField fieldInfo={{ label: 'normal text inline' }} isValid={[true, '']} layout="formFieldInline" width="25%">
                            <KendoText value="Hello World!" />
                        </FormField>

                        <FormField fieldInfo={{ label: 'normal text inline' }} isValid={[true, '']} layout="formFieldInline" width="50%">
                            <KendoText value="Hello World!" />
                        </FormField>

                    </div>

                    <div className="formInlineGroup">

                        <FormField fieldInfo={{ label: 'normal text inline' }} isValid={[true, '']} layout="formFieldInline" width="50%">
                            <KendoText value="Hello World!" />
                        </FormField>

                        <FormField fieldInfo={{ label: 'normal text inline' }} isValid={[true, '']} layout="formFieldInline" width="25%">
                            <KendoText value="Hello World!" />
                        </FormField>

                        <FormField fieldInfo={{ label: 'normal text inline' }} isValid={[true, '']} layout="formFieldInline" width="25%">
                            <KendoText value="Hello World!" />
                        </FormField>

                    </div>


                </div>

                <div className="formColumn" style={{width: "40%"}}>

                    <div className="formInlineGroup">

                        <FormField fieldInfo={{ label: 'normal text inline' }} isValid={[true, '']} layout="formFieldInline" width="25%">
                            <KendoText value="Hello World!" />
                        </FormField>

                        <FormField fieldInfo={{ label: 'normal text inline' }} isValid={[true, '']} layout="formFieldInline" width="25%">
                            <KendoText value="Hello World!" />
                        </FormField>

                        <FormField fieldInfo={{ label: 'normal text inline' }} isValid={[true, '']} layout="formFieldInline" width="25%">
                            <KendoText value="Hello World!" />
                        </FormField>

                        <FormField fieldInfo={{ label: 'normal text inline' }} isValid={[true, '']} layout="formFieldInline" width="25%">
                            <KendoText value="Hello World!" />
                        </FormField>

                    </div>

                    <FormField fieldInfo={{ label: 'normal text nowrap' }} isValid={[true, '']} layout="formFieldNoWrap">
                        <KendoText value="Hello World!" />
                    </FormField>

                    <FormField fieldInfo={{ label: 'normal text nowrap' }} isValid={[true, '']} layout="formFieldNoWrap">
                        <KendoText value="Hello World!" />
                    </FormField>

                    <FormField fieldInfo={{ label: 'normal text nowrap' }} isValid={[true, '']} layout="formFieldNoWrap">
                        <KendoText value="Hello World!" />
                    </FormField>

                    <div className="formInlineGroup">

                        <FormField fieldInfo={{ label: 'normal text inline' }} isValid={[true, '']} layout="formFieldInline" width="25%">
                            <KendoText value="Hello World!" />
                        </FormField>

                        <FormField fieldInfo={{ label: 'normal text inline' }} isValid={[true, '']} layout="formFieldInline" width="25%">
                            <KendoText value="Hello World!" />
                        </FormField>

                        <FormField fieldInfo={{ label: 'normal text inline' }} isValid={[true, '']} layout="formFieldInline" width="50%">
                            <KendoText value="Hello World!" />
                        </FormField>

                    </div>

                    <div className="formInlineGroup">

                        <FormField fieldInfo={{ label: 'normal text inline' }} isValid={[true, '']} layout="formFieldInline" width="50%">
                            <KendoText value="Hello World!" />
                        </FormField>

                        <FormField fieldInfo={{ label: 'normal text inline' }} isValid={[true, '']} layout="formFieldInline" width="25%">
                            <KendoText value="Hello World!" />
                        </FormField>

                        <FormField fieldInfo={{ label: 'normal text inline' }} isValid={[true, '']} layout="formFieldInline" width="25%">
                            <KendoText value="Hello World!" />
                        </FormField>

                    </div>


                </div>

                <div className="formTitle">Custom Carousel</div>
                <FormField fieldInfo={{ label: 'normal carousel' }} isValid={[true, '']}>
                    <Carousel options={[1, 2, 3]} value={2} />
                </FormField>

                <FormField fieldInfo={{ label: 'disabled carousel' }} isValid={[true, '']}>
                    <Carousel options={[1, 2, 3]} value={2} disabled={true} />
                </FormField>

                <FormField fieldInfo={{ label: 'invalid carousel' }} isValid={[true, '']}>
                    <Carousel options={[1, 2, 3]} value={2} isValid={[false, 'invalid']} />
                </FormField>

            </div>
        );

        React.renderComponent(content, rootEl);
        Forms.ControlCommon.attachFormTooltips($(rootEl));
    }

    return {
        entrypoint: entrypoint
    };
});
