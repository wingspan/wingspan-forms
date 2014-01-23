/** @jsx React.DOM */
define([
    'underscore', 'react', 'jquery', 'wingspan-forms',
    'underscore-string'
], function (_, React, $, Forms) {
    'use strict';


    var FormField = Forms.FormField;
    var KendoText = Forms.KendoText;
    var MultilineText = Forms.MultilineText;
    var MultiSelect = Forms.MultiSelect;
    var KendoComboBox = Forms.KendoComboBox;
    var KendoNumber = Forms.KendoNumber;
    var KendoDate = Forms.KendoDate;
    var KendoDatetime = Forms.KendoDatetime;
    var CheckBox = Forms.CheckBox;
    var Radio = Forms.Radio;
    var RadioGroup = Forms.RadioGroup;
    var SwitchBox = Forms.SwitchBox;
    var Carousel = Forms.Carousel;
    var KendoGrid = Forms.KendoGrid;


    function entrypoint(componentRoot, sitemapData, idUri, locale) {

        var dataSource = [{ id: 10, name: 'Dustin'}, { id: 11, name: 'Jon'}, { id: 12, name: 'Paul'}];

        var content = (
            <div>
                <div class="formTitle">Dialog Launch</div>

                <div class="formButtons">
                    <button class="primaryButton" onClick={$.noop}>Simple Dialog</button>
                    <button class="primaryButton" onClick={$.noop}>Default Grid Dialog</button>
                    <button class="primaryButton" onClick={$.noop}>Template Grid Dialog</button>
                    <button class="primaryButton" onClick={$.noop}>Textarea Dialog</button>
                </div>


                <div class="formTitle">Default Text Input (all styling variation and tooltips are mocked here)</div>

                <div class="formFieldTitle">This is a field title (styled same as formLabel but no form validation rules are applied, lives outside of formField)</div>

                <FormField fieldInfo={_.object([['label', 'normal text input with tooltip'], ['helpText', 'info tooltip']])} isValid={[true, '']} layout="formField">
                    <KendoText value="Hello World!" />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'invalid text input with tooltip no error tooltip'], ['helpText', 'info tooltip']])} isValid={[false, '']} layout="formField">
                    <KendoText value="Hello World!" />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'invalid text input with tooltip with error tooltip'], ['helpText', 'info tooltip']])} isValid={[false, 'error tooltip']} layout="formField">
                    <KendoText value="Hello World!" />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'readonly text input with tooltip'], ['helpText', 'info tooltip'], ['readOnly', true]])} isValid={[true, '']} layout="formField">
                    <KendoText value="Hello World!" />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'disabled text input with tooltip'], ['helpText', 'info tooltip'], ['disabled', true]])} isValid={[true, '']} layout="formField">
                    <KendoText value="Hello World!" />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'normal text input no tooltip']])} isValid={[true, '']} layout="formField">
                    <KendoText value="Hello World!" />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'invalid text input no tooltip error tooltip']])} isValid={[false, 'error tooltip']} layout="formField">
                    <KendoText value="Hello World!" />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'invalid text input no tooltip no error tooltip']])} isValid={[false, '']} layout="formField">
                    <KendoText value="Hello World!" />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'readonly text input no tooltip'], ['readOnly', true]])} isValid={[true, '']} layout="formField">
                    <KendoText value="Hello World!" />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'disabled text input no tooltip'], ['disabled', true]])} isValid={[true, '']} layout="formField">
                    <KendoText value="Hello World!" />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'normal text input with tooltip inline 300px'], ['helpText', 'info tooltip']])} isValid={[true, '']} layout="formFieldInline" width="300px">
                    <KendoText value="Hello World!" />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'normal text input with tooltip inline 30%'], ['helpText', 'info tooltip']])} isValid={[true, '']} layout="formFieldInline" width="30%">
                    <KendoText value="Hello World!" />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'invalid text input with tooltip inline 30%'], ['helpText', 'info tooltip']])} isValid={[false, 'error tooltip']} layout="formFieldInline" width="30%">
                    <KendoText value="Hello World!" />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'normal text input with tooltip nowrap'], ['helpText', 'info tooltip']])} isValid={[true, '']} layout="formFieldNoWrap">
                    <KendoText value="Hello World!" />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'invalid text input with tooltip nowrap'], ['helpText', 'info tooltip']])} isValid={[false, 'error tooltip']} layout="formFieldNoWrap">
                    <KendoText value="Hello World!" />
                </FormField>

                <div class="formFieldTitle">Example of inline elements with no labels, and other complex alignment offsets</div>

                <div class="formInlineGroup">
                    <FormField fieldInfo={_.object([['label', 'Address / Line 2']])} isValid={[true, '']} layout="formFieldInline" width="25%">
                        <KendoText value="Hello World!" />
                    </FormField>
                    <FormField fieldInfo={_.object([['label', 'Address / Line 2']])} isValid={[true, '']} layout="formFieldInline" width="25%">
                        <KendoText value="Hello World!" />
                    </FormField>
                    <FormField fieldInfo={_.object([['label', '']])} isValid={[true, '']} layout="formFieldInline" width="25%">
                        <KendoText value="Hello World!" />
                    </FormField>
                    <FormField fieldInfo={_.object([['label', '']])} isValid={[true, '']} layout="formFieldInline" width="25%">
                        <KendoText value="Hello World!" />
                    </FormField>
                </div>

                {/* empty label would be used for 2 line fields potentially, offset example shown below */}
                <div class="formInlineGroup">
                    <FormField fieldInfo={_.object([])} isValid={[true, '']} layout="formFieldInline" width="25%">
                        <KendoText value="Hello World!" />
                    </FormField>
                    <FormField fieldInfo={_.object([])} isValid={[true, '']} layout="formFieldInline formFieldOffset" width="25%" marginLeft="25%">
                        <KendoText value="Hello World!" />
                    </FormField>
                    <FormField fieldInfo={_.object([])} isValid={[true, '']} layout="formFieldInline" width="25%">
                        <KendoText value="Hello World!" />
                    </FormField>
                </div>

                {/* if marginLeft is used on first element in inline group, then unique class "formFieldOffset" needed so that padding left can be applied */}
                <div class="formInlineGroup">
                    <FormField fieldInfo={_.object([])} isValid={[true, '']} layout="formFieldInline formFieldOffset" width="25%" marginLeft="50%">
                        <KendoText value="Hello World!" />
                    </FormField>
                    <FormField fieldInfo={_.object([])} isValid={[true, '']} layout="formFieldInline" width="25%">
                        <KendoText value="Hello World!" />
                    </FormField>
                </div>
                {/* maybe if marginLeft is not 0, then add formFieldOffset class to the field automatically in formField.js */}


                <div class="formTitle">Default Textarea</div>

                <FormField fieldInfo={_.object([['label', 'normal textarea']])} isValid={[true, '']} layout="formField" >
                    <MultilineText value="Hello World!" />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'invalid textarea']])} isValid={[false, '']} layout="formField" >
                    <MultilineText value="Hello World!" />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'ReadOnly textarea'], ['readOnly', true]])} isValid={[true, '']} layout="formField" >
                    <MultilineText value="Hello World!" />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'disabled textarea'], ['disabled', true]])} isValid={[true, '']} layout="formField" >
                    <MultilineText value="Hello World!" />
                </FormField>

                <div class="formTitle">Default Multiselect</div>

                <FormField fieldInfo={_.object([['label', 'normal multiselect']])} isValid={[true, '']} layout="formField" >
                    <MultiSelect selectors={dataSource} />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'invalid multiselect']])} isValid={[false, '']} layout="formField" >
                    <MultiSelect selectors={dataSource} />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'readOnly multiselect'], ['readOnly', true]])} isValid={[true, '']} layout="formField" >
                    <MultiSelect selectors={dataSource} />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'disabled multiselect'], ['disabled', true]])} isValid={[true, '']} layout="formField" >
                    <MultiSelect selectors={dataSource} />
                </FormField>

                <div class="formTitle">Kendo ComboBox</div>

                <FormField fieldInfo={_.object([['label', 'normal combo']])} isValid={[true, '']} layout="formField" >
                    <KendoComboBox displayField="name" valueField="id" dataSource={dataSource} value={dataSource[0]} />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'invalid combo']])} isValid={[false, '']} layout="formField" >
                    <KendoComboBox displayField="name" valueField="id" dataSource={dataSource} value={dataSource[0]} />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'readOnly combo'], ['readOnly', true]])} isValid={[true, '']} layout="formField" >
                    <KendoComboBox displayField="name" valueField="id" readonly={true} dataSource={dataSource} value={dataSource[0]} />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'disabled combo'], ['disabled', true]])} isValid={[true, '']} layout="formField" >
                    <KendoComboBox displayField="name" valueField="id" disabled={true} dataSource={dataSource} value={dataSource[0]} />
                </FormField>

                <div class="formTitle">Kendo Numeric</div>

                <FormField fieldInfo={_.object([['label', 'normal numeric']])} isValid={[true, '']} layout="formField" >
                    <KendoNumber value="!" />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'invalid numeric']])} isValid={[false, '']} layout="formField" >
                    <KendoNumber value="" />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'ReadOnly numeric'], ['readOnly', true]])} isValid={[true, '']} layout="formField" >
                    <KendoNumber value="" />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'disabled numeric'], ['disabled', true]])} isValid={[true, '']} layout="formField" >
                    <KendoNumber value="" />
                </FormField>

                <div class="formTitle">Datepicker</div>

                <FormField fieldInfo={_.object([['label', 'normal date']])} isValid={[true, '']} layout="formField" >
                    <KendoDate value="" />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'invalid date']])} isValid={[false, '']} layout="formField" >
                    <KendoDate value="" />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'ReadOnly date'], ['readOnly', true]])} isValid={[true, '']} layout="formField" >
                    <KendoDate value="" />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'disabled date'], ['disabled', true]])} isValid={[true, '']} layout="formField" >
                    <KendoDate value="" />
                </FormField>

                <div class="formTitle">Datetimepicker</div>

                <FormField fieldInfo={_.object([['label', 'normal datetime']])} isValid={[true, '']} layout="formField" >
                    <KendoDatetime value="" />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'invalid datetime']])} isValid={[false, '']} layout="formField" >
                    <KendoDatetime value="" />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'ReadOnly datetime'], ['readOnly', true]])} isValid={[true, '']} layout="formField" >
                    <KendoDatetime value="" />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'disabled datetime'], ['disabled', true]])} isValid={[true, '']} layout="formField" >
                    <KendoDatetime value="" />
                </FormField>

                <div class="formTitle">Custom Checkboxes</div>

                <FormField fieldInfo={_.object([['label', 'normal checkbox']])} isValid={[true, '']} layout="formField">
                    <CheckBox label="Checkbox Label" value={true} />
                    <CheckBox label="Checkbox Label" value={true} />
                    <CheckBox label="Checkbox Label" value={true} />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'normal checkbox']])} isValid={[true, '']} layout="formField">
                    <CheckBox label="Checkbox Label" value={false} />
                    <CheckBox label="Checkbox Label" value={false} />
                    <CheckBox label="Checkbox Label" value={false} />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'normal checkbox multiline']])} isValid={[true, '']} layout="formField">
                    <CheckBox label="Checkbox Label" value={false} /><br />
                    <CheckBox label="Checkbox Label" value={false} /><br />
                    <CheckBox label="Checkbox Label" value={false} />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'normal checkbox one disabled']])} isValid={[true, '']} layout="formField">
                    <CheckBox label="Checkbox Label" value={false} />
                    <CheckBox label="Checkbox Label" value={false} />
                    <CheckBox label="Checkbox Label" value={false} disabled={true} />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'invalid checkbox']])} isValid={[false, '']} layout="formField">
                    <CheckBox label="Checkbox Label" value={true} />
                    <CheckBox label="Checkbox Label" value={true} />
                    <CheckBox label="Checkbox Label" value={true} />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'invalid checkbox']])} isValid={[false, '']} layout="formField">
                    <CheckBox label="Checkbox Label" value={false} />
                    <CheckBox label="Checkbox Label" value={false} />
                    <CheckBox label="Checkbox Label" value={false} />
                </FormField>


                <FormField fieldInfo={_.object([['label', 'readonly checkbox'], ['readOnly', true]])} isValid={[true, '']} layout="formField">
                    <CheckBox label="Checkbox Label" value={true} />
                    <CheckBox label="Checkbox Label" value={true} />
                    <CheckBox label="Checkbox Label" value={true} />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'readonly checkbox'], ['readOnly', true]])} isValid={[true, '']} layout="formField">
                    <CheckBox label="Checkbox Label" value={false} />
                    <CheckBox label="Checkbox Label" value={false} />
                    <CheckBox label="Checkbox Label" value={false} />
                </FormField>


                <FormField fieldInfo={_.object([['label', 'disabled checkbox'], ['disabled', true]])} isValid={[true, '']} layout="formField">
                    <CheckBox label="Checkbox Label" value={true} />
                    <CheckBox label="Checkbox Label" value={true} />
                    <CheckBox label="Checkbox Label" value={true} />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'disabled checkbox'], ['disabled', true]])} isValid={[true, '']} layout="formField">
                    <CheckBox label="Checkbox Label" value={false} />
                    <CheckBox label="Checkbox Label" value={false} />
                    <CheckBox label="Checkbox Label" value={false} />
                </FormField>

                <div class="formTitle">Custom Radios</div>

                <FormField fieldInfo={_.object([['label', 'normal radio']])} isValid={[true, '']} layout="formField">
                    <RadioGroup value="2">
                        <Radio value="1" name="test">Radio Label</Radio>
                        <Radio value="2" name="test">Radio Label</Radio>
                        <Radio value="3" name="test">Radio Label</Radio>
                    </RadioGroup>
                </FormField>

                <FormField fieldInfo={_.object([['label', 'normal radio multiline']])} isValid={[true, '']} layout="formField">
                    <RadioGroup value="2">
                        <Radio value="1" name="test2">Radio Label</Radio><br />
                        <Radio value="2" name="test2">Radio Label</Radio><br />
                        <Radio value="3" name="test2">Radio Label</Radio>
                    </RadioGroup>
                </FormField>

                <FormField fieldInfo={_.object([['label', 'normal radio one disabled']])} isValid={[true, '']} layout="formField">
                    <RadioGroup value="2">
                        <Radio value="1" name="test3">Radio Label</Radio>
                        <Radio value="2" name="test3">Radio Label</Radio>
                        <Radio value="3" name="test3" disabled={true}>Radio Label</Radio>
                    </RadioGroup>
                </FormField>

                <FormField fieldInfo={_.object([['label', 'invalid radio']])} isValid={[false, '']} layout="formField">
                    <RadioGroup value="2">
                        <Radio value="1" name="test4">Radio Label</Radio>
                        <Radio value="2" name="test4">Radio Label</Radio>
                        <Radio value="3" name="test4">Radio Label</Radio>
                    </RadioGroup>
                </FormField>

                <FormField fieldInfo={_.object([['label', 'invalid radio']])} isValid={[false, '']} layout="formField">
                    <RadioGroup value="2">
                        <Radio value="1" name="test5">Radio Label</Radio>
                        <Radio value="2" name="test5">Radio Label</Radio>
                        <Radio value="3" name="test5">Radio Label</Radio>
                    </RadioGroup>
                </FormField>


                <FormField fieldInfo={_.object([['label', 'readonly radio'], ['readOnly', true]])} isValid={[true, '']} layout="formField">
                    <RadioGroup value="2">
                        <Radio value="1" name="test6">Radio Label</Radio>
                        <Radio value="2" name="test6">Radio Label</Radio>
                        <Radio value="3" name="test6">Radio Label</Radio>
                    </RadioGroup>
                </FormField>

                <FormField fieldInfo={_.object([['label', 'readonly radio'], ['readOnly', true]])} isValid={[true, '']} layout="formField">
                    <RadioGroup value="2">
                        <Radio value="1" name="test7">Radio Label</Radio>
                        <Radio value="2" name="test7">Radio Label</Radio>
                        <Radio value="3" name="test7">Radio Label</Radio>
                    </RadioGroup>
                </FormField>


                <FormField fieldInfo={_.object([['label', 'disabled radio'], ['disabled', true]])} isValid={[true, '']} layout="formField">
                    <RadioGroup value="2">
                        <Radio value="1" name="test8">Radio Label</Radio>
                        <Radio value="2" name="test8">Radio Label</Radio>
                        <Radio value="3" name="test8">Radio Label</Radio>
                    </RadioGroup>
                </FormField>

                <FormField fieldInfo={_.object([['label', 'disabled radio'], ['disabled', true]])} isValid={[true, '']} layout="formField">
                    <RadioGroup value="2">
                        <Radio value="1" name="test9">Radio Label</Radio>
                        <Radio value="2" name="test9">Radio Label</Radio>
                        <Radio value="3" name="test9">Radio Label</Radio>
                    </RadioGroup>
                </FormField>


                <div class="formTitle">Custom Switchbox Checkbox</div>

                <FormField fieldInfo={_.object([['label', 'normal switchbox']])} isValid={[true, '']} layout="formField">
                    <SwitchBox value={true} />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'normal switchbox']])} isValid={[true, '']} layout="formField">
                    <SwitchBox value={false} />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'invalid switchbox']])} isValid={[false, '']} layout="formField">
                    <SwitchBox value={true} />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'invalid switchbox']])} isValid={[false, '']} layout="formField">
                    <SwitchBox value={false} />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'readonly switchbox'], ['readOnly', true]])} isValid={[true, '']} layout="formField">
                    <SwitchBox value={true} readonly={true} />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'readonly switchbox'], ['readOnly', true]])} isValid={[true, '']} layout="formField">
                    <SwitchBox value={false} disabled={true} />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'disabled switchbox'], ['disabled', true]])} isValid={[true, '']} layout="formField">
                    <SwitchBox value={true} disabled={true} />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'disabled switchbox'], ['disabled', true]])} isValid={[true, '']} layout="formField">
                    <SwitchBox value={false} disabled={true} />
                </FormField>


                <div class="formTitle">Grid Form Fields</div>

                <FormField fieldInfo={_.object([['label', 'normal grid']])} isValid={[true, '']} layout="formField">
                    <KendoGrid dataSource={{data:[{name: "test"},{name: "test"}]}} columns={[{ field:"name" }]}/>
                </FormField>

                <FormField fieldInfo={_.object([['label', 'inline grid']])} isValid={[true, '']} layout="formFieldInline" width="25%">
                    <KendoGrid dataSource={{data:[{name: "test"},{name: "test"}]}} columns={[{ field:"name" }]}/>
                </FormField>

                <FormField fieldInfo={_.object([['label', 'inline grid']])} isValid={[true, '']} layout="formFieldInline" width="25%">
                    <KendoGrid dataSource={{data:[{name: "test"},{name: "test"}]}} columns={[{ field:"name" }]}/>
                </FormField>

                <FormField fieldInfo={_.object([['label', 'nowrap grid']])} isValid={[true, '']} layout="formFieldNoWrap">
                    <KendoGrid dataSource={{data:[{name: "test"},{name: "test"}]}} columns={[{ field:"name" }]}/>
                </FormField>


                <div class="formTitle">Buttons</div>

                <div class="formButtons">

                    <button class="primaryButton">Primary Button</button>

                    <button class="secondaryButton">Secondary Button</button>

                    <button class="primaryButton buttonDisabled">Disabled Primary Button</button>

                    <button class="secondaryButton buttonDisabled">Disabled Secondary Button</button>

                </div>

                <div class="formTitle">Inline Form Heights, fields should clear if forced to next line, if they get hung up height is off and css needs to be adjusted</div>

                <FormField fieldInfo={_.object([['label', 'normal text']])} isValid={[true, '']} layout="formFieldInline" width="200px">
                    <KendoText value="Hello World!" />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'normal combo']])} isValid={[true, '']} layout="formFieldInline" width="200px">
                    <KendoComboBox displayField="name" valueField="id" dataSource={dataSource} value={dataSource[0]} />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'normal numeric']])} isValid={[true, '']} layout="formFieldInline" width="200px">
                    <KendoNumber value="!" />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'normal date']])} isValid={[true, '']} layout="formFieldInline" width="200px">
                    <KendoDate value="" />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'normal datetime']])} isValid={[true, '']} layout="formFieldInline" width="200px">
                    <KendoDatetime value="" />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'normal text']])} isValid={[true, '']} layout="formFieldInline" width="200px">
                    <KendoText value="Hello World!" />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'normal combo']])} isValid={[true, '']} layout="formFieldInline" width="200px">
                    <KendoComboBox displayField="name" valueField="id" dataSource={dataSource} value={dataSource[0]} />
                </FormField>



                <div class="formClear"></div>

                <FormField fieldInfo={_.object([['label', 'normal textarea']])} isValid={[true, '']} layout="formFieldInline" width="200px">
                    <MultilineText value="Hello World!" />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'normal multiselect']])} isValid={[true, '']} layout="formFieldInline" width="200px">
                    <MultiSelect selectors={dataSource} />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'normal textarea']])} isValid={[true, '']} layout="formFieldInline" width="200px">
                    <MultilineText value="Hello World!" />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'normal multiselect']])} isValid={[true, '']} layout="formFieldInline" width="200px">
                    <MultiSelect selectors={dataSource} />
                </FormField>

                <div class="formTitle">Complex Example</div>

                <div class="formColumn formColumnFirst" style={{width: "60%"}}>

                    <div class="formInlineGroup">

                        <FormField fieldInfo={_.object([['label', 'normal text inline']])} isValid={[true, '']} layout="formFieldInline" width="25%">
                            <KendoText value="Hello World!" />
                        </FormField>

                        <FormField fieldInfo={_.object([['label', 'normal text inline']])} isValid={[true, '']} layout="formFieldInline" width="25%">
                            <KendoText value="Hello World!" />
                        </FormField>

                        <FormField fieldInfo={_.object([['label', 'normal text inline']])} isValid={[true, '']} layout="formFieldInline" width="25%">
                            <KendoText value="Hello World!" />
                        </FormField>

                        <FormField fieldInfo={_.object([['label', 'normal text inline']])} isValid={[true, '']} layout="formFieldInline" width="25%">
                            <KendoText value="Hello World!" />
                        </FormField>

                    </div>

                    <FormField fieldInfo={_.object([['label', 'normal text nowrap']])} isValid={[true, '']} layout="formFieldNoWrap">
                        <KendoText value="Hello World!" />
                    </FormField>

                    <FormField fieldInfo={_.object([['label', 'normal text nowrap']])} isValid={[true, '']} layout="formFieldNoWrap">
                        <KendoText value="Hello World!" />
                    </FormField>

                    <FormField fieldInfo={_.object([['label', 'normal text nowrap']])} isValid={[true, '']} layout="formFieldNoWrap">
                        <KendoText value="Hello World!" />
                    </FormField>

                    <div class="formInlineGroup">

                        <FormField fieldInfo={_.object([['label', 'normal text inline']])} isValid={[true, '']} layout="formFieldInline" width="25%">
                            <KendoText value="Hello World!" />
                        </FormField>

                        <FormField fieldInfo={_.object([['label', 'normal text inline']])} isValid={[true, '']} layout="formFieldInline" width="25%">
                            <KendoText value="Hello World!" />
                        </FormField>

                        <FormField fieldInfo={_.object([['label', 'normal text inline']])} isValid={[true, '']} layout="formFieldInline" width="50%">
                            <KendoText value="Hello World!" />
                        </FormField>

                    </div>

                    <div class="formInlineGroup">

                        <FormField fieldInfo={_.object([['label', 'normal text inline']])} isValid={[true, '']} layout="formFieldInline" width="50%">
                            <KendoText value="Hello World!" />
                        </FormField>

                        <FormField fieldInfo={_.object([['label', 'normal text inline']])} isValid={[true, '']} layout="formFieldInline" width="25%">
                            <KendoText value="Hello World!" />
                        </FormField>

                        <FormField fieldInfo={_.object([['label', 'normal text inline']])} isValid={[true, '']} layout="formFieldInline" width="25%">
                            <KendoText value="Hello World!" />
                        </FormField>

                    </div>


                </div>

                <div class="formColumn" style={{width: "40%"}}>

                    <div class="formInlineGroup">

                        <FormField fieldInfo={_.object([['label', 'normal text inline']])} isValid={[true, '']} layout="formFieldInline" width="25%">
                            <KendoText value="Hello World!" />
                        </FormField>

                        <FormField fieldInfo={_.object([['label', 'normal text inline']])} isValid={[true, '']} layout="formFieldInline" width="25%">
                            <KendoText value="Hello World!" />
                        </FormField>

                        <FormField fieldInfo={_.object([['label', 'normal text inline']])} isValid={[true, '']} layout="formFieldInline" width="25%">
                            <KendoText value="Hello World!" />
                        </FormField>

                        <FormField fieldInfo={_.object([['label', 'normal text inline']])} isValid={[true, '']} layout="formFieldInline" width="25%">
                            <KendoText value="Hello World!" />
                        </FormField>

                    </div>

                    <FormField fieldInfo={_.object([['label', 'normal text nowrap']])} isValid={[true, '']} layout="formFieldNoWrap">
                        <KendoText value="Hello World!" />
                    </FormField>

                    <FormField fieldInfo={_.object([['label', 'normal text nowrap']])} isValid={[true, '']} layout="formFieldNoWrap">
                        <KendoText value="Hello World!" />
                    </FormField>

                    <FormField fieldInfo={_.object([['label', 'normal text nowrap']])} isValid={[true, '']} layout="formFieldNoWrap">
                        <KendoText value="Hello World!" />
                    </FormField>

                    <div class="formInlineGroup">

                        <FormField fieldInfo={_.object([['label', 'normal text inline']])} isValid={[true, '']} layout="formFieldInline" width="25%">
                            <KendoText value="Hello World!" />
                        </FormField>

                        <FormField fieldInfo={_.object([['label', 'normal text inline']])} isValid={[true, '']} layout="formFieldInline" width="25%">
                            <KendoText value="Hello World!" />
                        </FormField>

                        <FormField fieldInfo={_.object([['label', 'normal text inline']])} isValid={[true, '']} layout="formFieldInline" width="50%">
                            <KendoText value="Hello World!" />
                        </FormField>

                    </div>

                    <div class="formInlineGroup">

                        <FormField fieldInfo={_.object([['label', 'normal text inline']])} isValid={[true, '']} layout="formFieldInline" width="50%">
                            <KendoText value="Hello World!" />
                        </FormField>

                        <FormField fieldInfo={_.object([['label', 'normal text inline']])} isValid={[true, '']} layout="formFieldInline" width="25%">
                            <KendoText value="Hello World!" />
                        </FormField>

                        <FormField fieldInfo={_.object([['label', 'normal text inline']])} isValid={[true, '']} layout="formFieldInline" width="25%">
                            <KendoText value="Hello World!" />
                        </FormField>

                    </div>


                </div>

                <div class="formTitle">Missing: Custom Switch</div>

                <div class="formTitle">Missing: Kendo Select</div>

                <div class="formTitle">Outdated: Kendo Multiselect</div>

                <div class="formTitle">Missing: Kendo Timepicker</div>

                <div class="formTitle">Missing: Kendo Autocomplete</div>

                <div class="formTitle">Custom Carousel</div>
                <FormField fieldInfo={_.object([['label', 'normal carousel']])} isValid={[true, '']}>
                    <Carousel options={[1, 2, 3]} value={2} />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'disabled carousel']])} isValid={[true, '']}>
                    <Carousel options={[1, 2, 3]} value={2} disabled={true} />
                </FormField>

                <FormField fieldInfo={_.object([['label', 'invalid carousel']])} isValid={[true, '']}>
                    <Carousel options={[1, 2, 3]} value={2} isValid={[false, 'invalid']} />
                </FormField>

            </div>
            );

        React.renderComponent(content, $('[data-wspt="root"]')[0]);
    }

    return {
        entrypoint: entrypoint
    };
});
