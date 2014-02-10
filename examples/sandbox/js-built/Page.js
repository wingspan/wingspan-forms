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


    function entrypoint(rootEl) {

        var dataSource = [{ id: 10, name: 'Dustin'}, { id: 11, name: 'Jon'}, { id: 12, name: 'Paul'}];

        var content = (
            React.DOM.div(null, 

                React.DOM.div( {className:"formTitle"}, "Default Text Input (all styling variation and tooltips are mocked here)"),

                React.DOM.div( {className:"formFieldTitle"}, "This is a field title (styled same as formLabel but no form validation rules are applied, lives outside of formField)"),

                FormField( {fieldInfo:_.object([['label', 'normal text input with tooltip'], ['helpText', 'info tooltip']]), isValid:[true, ''], layout:"formField"}, 
                    KendoText( {value:"Hello World!"} )
                ),

                FormField( {fieldInfo:_.object([['label', 'invalid text input with tooltip no error tooltip'], ['helpText', 'info tooltip']]), isValid:[false, ''], layout:"formField"}, 
                    KendoText( {value:"Hello World!"} )
                ),

                FormField( {fieldInfo:_.object([['label', 'invalid text input with tooltip with error tooltip'], ['helpText', 'info tooltip']]), isValid:[false, 'error tooltip'], layout:"formField"}, 
                    KendoText( {value:"Hello World!"} )
                ),

                FormField( {fieldInfo:_.object([['label', 'readonly text input with tooltip'], ['helpText', 'info tooltip'], ['readOnly', true]]), isValid:[true, ''], layout:"formField"}, 
                    KendoText( {value:"Hello World!"} )
                ),

                FormField( {fieldInfo:_.object([['label', 'disabled text input with tooltip'], ['helpText', 'info tooltip'], ['disabled', true]]), isValid:[true, ''], layout:"formField"}, 
                    KendoText( {value:"Hello World!"} )
                ),

                FormField( {fieldInfo:_.object([['label', 'normal text input no tooltip']]), isValid:[true, ''], layout:"formField"}, 
                    KendoText( {value:"Hello World!"} )
                ),

                FormField( {fieldInfo:_.object([['label', 'invalid text input no tooltip error tooltip']]), isValid:[false, 'error tooltip'], layout:"formField"}, 
                    KendoText( {value:"Hello World!"} )
                ),

                FormField( {fieldInfo:_.object([['label', 'invalid text input no tooltip no error tooltip']]), isValid:[false, ''], layout:"formField"}, 
                    KendoText( {value:"Hello World!"} )
                ),

                FormField( {fieldInfo:_.object([['label', 'readonly text input no tooltip'], ['readOnly', true]]), isValid:[true, ''], layout:"formField"}, 
                    KendoText( {value:"Hello World!"} )
                ),

                FormField( {fieldInfo:_.object([['label', 'disabled text input no tooltip'], ['disabled', true]]), isValid:[true, ''], layout:"formField"}, 
                    KendoText( {value:"Hello World!"} )
                ),

                FormField( {fieldInfo:_.object([['label', 'normal text input with tooltip inline 300px'], ['helpText', 'info tooltip']]), isValid:[true, ''], layout:"formFieldInline", width:"300px"}, 
                    KendoText( {value:"Hello World!"} )
                ),

                FormField( {fieldInfo:_.object([['label', 'normal text input with tooltip inline 30%'], ['helpText', 'info tooltip']]), isValid:[true, ''], layout:"formFieldInline", width:"30%"}, 
                    KendoText( {value:"Hello World!"} )
                ),

                FormField( {fieldInfo:_.object([['label', 'invalid text input with tooltip inline 30%'], ['helpText', 'info tooltip']]), isValid:[false, 'error tooltip'], layout:"formFieldInline", width:"30%"}, 
                    KendoText( {value:"Hello World!"} )
                ),

                FormField( {fieldInfo:_.object([['label', 'normal text input with tooltip nowrap'], ['helpText', 'info tooltip']]), isValid:[true, ''], layout:"formFieldNoWrap"}, 
                    KendoText( {value:"Hello World!"} )
                ),

                FormField( {fieldInfo:_.object([['label', 'invalid text input with tooltip nowrap'], ['helpText', 'info tooltip']]), isValid:[false, 'error tooltip'], layout:"formFieldNoWrap"}, 
                    KendoText( {value:"Hello World!"} )
                ),

                React.DOM.div( {className:"formFieldTitle"}, "Example of inline elements with no labels, and other complex alignment offsets"),

                React.DOM.div( {className:"formInlineGroup"}, 
                    FormField( {fieldInfo:_.object([['label', 'Address / Line 2']]), isValid:[true, ''], layout:"formFieldInline", width:"25%"}, 
                        KendoText( {value:"Hello World!"} )
                    ),
                    FormField( {fieldInfo:_.object([['label', 'Address / Line 2']]), isValid:[true, ''], layout:"formFieldInline", width:"25%"}, 
                        KendoText( {value:"Hello World!"} )
                    ),
                    FormField( {fieldInfo:_.object([['label', '']]), isValid:[true, ''], layout:"formFieldInline", width:"25%"}, 
                        KendoText( {value:"Hello World!"} )
                    ),
                    FormField( {fieldInfo:_.object([['label', '']]), isValid:[true, ''], layout:"formFieldInline", width:"25%"}, 
                        KendoText( {value:"Hello World!"} )
                    )
                ),

                /* empty label would be used for 2 line fields potentially, offset example shown below */
                React.DOM.div( {className:"formInlineGroup"}, 
                    FormField( {fieldInfo:_.object([]), isValid:[true, ''], layout:"formFieldInline", width:"25%"}, 
                        KendoText( {value:"Hello World!"} )
                    ),
                    FormField( {fieldInfo:_.object([]), isValid:[true, ''], layout:"formFieldInline formFieldOffset", width:"25%", marginLeft:"25%"}, 
                        KendoText( {value:"Hello World!"} )
                    ),
                    FormField( {fieldInfo:_.object([]), isValid:[true, ''], layout:"formFieldInline", width:"25%"}, 
                        KendoText( {value:"Hello World!"} )
                    )
                ),

                /* if marginLeft is used on first element in inline group, then unique class "formFieldOffset" needed so that padding left can be applied */
                React.DOM.div( {className:"formInlineGroup"}, 
                    FormField( {fieldInfo:_.object([]), isValid:[true, ''], layout:"formFieldInline formFieldOffset", width:"25%", marginLeft:"50%"}, 
                        KendoText( {value:"Hello World!"} )
                    ),
                    FormField( {fieldInfo:_.object([]), isValid:[true, ''], layout:"formFieldInline", width:"25%"}, 
                        KendoText( {value:"Hello World!"} )
                    )
                ),
                /* maybe if marginLeft is not 0, then add formFieldOffset class to the field automatically in formField.js */


                React.DOM.div( {className:"formTitle"}, "Default Textarea"),

                FormField( {fieldInfo:_.object([['label', 'normal textarea']]), isValid:[true, ''], layout:"formField"} , 
                    MultilineText( {value:"Hello World!"} )
                ),

                FormField( {fieldInfo:_.object([['label', 'invalid textarea']]), isValid:[false, ''], layout:"formField"} , 
                    MultilineText( {value:"Hello World!"} )
                ),

                FormField( {fieldInfo:_.object([['label', 'ReadOnly textarea'], ['readOnly', true]]), isValid:[true, ''], layout:"formField"} , 
                    MultilineText( {value:"Hello World!"} )
                ),

                FormField( {fieldInfo:_.object([['label', 'disabled textarea'], ['disabled', true]]), isValid:[true, ''], layout:"formField"} , 
                    MultilineText( {value:"Hello World!"} )
                ),

                React.DOM.div( {className:"formTitle"}, "Default Multiselect"),

                FormField( {fieldInfo:_.object([['label', 'normal multiselect']]), isValid:[true, ''], layout:"formField"} , 
                    MultiSelect( {selectors:dataSource} )
                ),

                FormField( {fieldInfo:_.object([['label', 'invalid multiselect']]), isValid:[false, ''], layout:"formField"} , 
                    MultiSelect( {selectors:dataSource} )
                ),

                FormField( {fieldInfo:_.object([['label', 'readOnly multiselect'], ['readOnly', true]]), isValid:[true, ''], layout:"formField"} , 
                    MultiSelect( {selectors:dataSource} )
                ),

                FormField( {fieldInfo:_.object([['label', 'disabled multiselect'], ['disabled', true]]), isValid:[true, ''], layout:"formField"} , 
                    MultiSelect( {selectors:dataSource} )
                ),

                React.DOM.div( {className:"formTitle"}, "Kendo ComboBox"),

                FormField( {fieldInfo:_.object([['label', 'normal combo']]), isValid:[true, ''], layout:"formField"} , 
                    KendoComboBox( {displayField:"name", valueField:"id", dataSource:dataSource, value:dataSource[0]} )
                ),

                FormField( {fieldInfo:_.object([['label', 'invalid combo']]), isValid:[false, ''], layout:"formField"} , 
                    KendoComboBox( {displayField:"name", valueField:"id", dataSource:dataSource, value:dataSource[0]} )
                ),

                FormField( {fieldInfo:_.object([['label', 'readOnly combo'], ['readOnly', true]]), isValid:[true, ''], layout:"formField"} , 
                    KendoComboBox( {displayField:"name", valueField:"id", readonly:true, dataSource:dataSource, value:dataSource[0]} )
                ),

                FormField( {fieldInfo:_.object([['label', 'disabled combo'], ['disabled', true]]), isValid:[true, ''], layout:"formField"} , 
                    KendoComboBox( {displayField:"name", valueField:"id", disabled:true, dataSource:dataSource, value:dataSource[0]} )
                ),

                React.DOM.div( {className:"formTitle"}, "Kendo Numeric"),

                FormField( {fieldInfo:_.object([['label', 'normal numeric']]), isValid:[true, ''], layout:"formField"} , 
                    KendoNumber( {value:"!"} )
                ),

                FormField( {fieldInfo:_.object([['label', 'invalid numeric']]), isValid:[false, ''], layout:"formField"} , 
                    KendoNumber( {value:""} )
                ),

                FormField( {fieldInfo:_.object([['label', 'ReadOnly numeric'], ['readOnly', true]]), isValid:[true, ''], layout:"formField"} , 
                    KendoNumber( {value:""} )
                ),

                FormField( {fieldInfo:_.object([['label', 'disabled numeric'], ['disabled', true]]), isValid:[true, ''], layout:"formField"} , 
                    KendoNumber( {value:""} )
                ),

                React.DOM.div( {className:"formTitle"}, "Datepicker"),

                FormField( {fieldInfo:_.object([['label', 'normal date']]), isValid:[true, ''], layout:"formField"} , 
                    KendoDate( {value:""} )
                ),

                FormField( {fieldInfo:_.object([['label', 'invalid date']]), isValid:[false, ''], layout:"formField"} , 
                    KendoDate( {value:""} )
                ),

                FormField( {fieldInfo:_.object([['label', 'ReadOnly date'], ['readOnly', true]]), isValid:[true, ''], layout:"formField"} , 
                    KendoDate( {value:""} )
                ),

                FormField( {fieldInfo:_.object([['label', 'disabled date'], ['disabled', true]]), isValid:[true, ''], layout:"formField"} , 
                    KendoDate( {value:""} )
                ),

                React.DOM.div( {className:"formTitle"}, "Datetimepicker"),

                FormField( {fieldInfo:_.object([['label', 'normal datetime']]), isValid:[true, ''], layout:"formField"} , 
                    KendoDatetime( {value:""} )
                ),

                FormField( {fieldInfo:_.object([['label', 'invalid datetime']]), isValid:[false, ''], layout:"formField"} , 
                    KendoDatetime( {value:""} )
                ),

                FormField( {fieldInfo:_.object([['label', 'ReadOnly datetime'], ['readOnly', true]]), isValid:[true, ''], layout:"formField"} , 
                    KendoDatetime( {value:""} )
                ),

                FormField( {fieldInfo:_.object([['label', 'disabled datetime'], ['disabled', true]]), isValid:[true, ''], layout:"formField"} , 
                    KendoDatetime( {value:""} )
                ),

                React.DOM.div( {className:"formTitle"}, "Custom Checkboxes"),

                FormField( {fieldInfo:_.object([['label', 'normal checkbox']]), isValid:[true, ''], layout:"formField"}, 
                    CheckBox( {label:"Checkbox Label", value:true} ),
                    CheckBox( {label:"Checkbox Label", value:true} ),
                    CheckBox( {label:"Checkbox Label", value:true} )
                ),

                FormField( {fieldInfo:_.object([['label', 'normal checkbox']]), isValid:[true, ''], layout:"formField"}, 
                    CheckBox( {label:"Checkbox Label", value:false} ),
                    CheckBox( {label:"Checkbox Label", value:false} ),
                    CheckBox( {label:"Checkbox Label", value:false} )
                ),

                FormField( {fieldInfo:_.object([['label', 'normal checkbox multiline']]), isValid:[true, ''], layout:"formField"}, 
                    CheckBox( {label:"Checkbox Label", value:false} ),React.DOM.br(null ),
                    CheckBox( {label:"Checkbox Label", value:false} ),React.DOM.br(null ),
                    CheckBox( {label:"Checkbox Label", value:false} )
                ),

                FormField( {fieldInfo:_.object([['label', 'normal checkbox one disabled']]), isValid:[true, ''], layout:"formField"}, 
                    CheckBox( {label:"Checkbox Label", value:false} ),
                    CheckBox( {label:"Checkbox Label", value:false} ),
                    CheckBox( {label:"Checkbox Label", value:false, disabled:true} )
                ),

                FormField( {fieldInfo:_.object([['label', 'invalid checkbox']]), isValid:[false, ''], layout:"formField"}, 
                    CheckBox( {label:"Checkbox Label", value:true} ),
                    CheckBox( {label:"Checkbox Label", value:true} ),
                    CheckBox( {label:"Checkbox Label", value:true} )
                ),

                FormField( {fieldInfo:_.object([['label', 'invalid checkbox']]), isValid:[false, ''], layout:"formField"}, 
                    CheckBox( {label:"Checkbox Label", value:false} ),
                    CheckBox( {label:"Checkbox Label", value:false} ),
                    CheckBox( {label:"Checkbox Label", value:false} )
                ),


                FormField( {fieldInfo:_.object([['label', 'readonly checkbox'], ['readOnly', true]]), isValid:[true, ''], layout:"formField"}, 
                    CheckBox( {label:"Checkbox Label", value:true} ),
                    CheckBox( {label:"Checkbox Label", value:true} ),
                    CheckBox( {label:"Checkbox Label", value:true} )
                ),

                FormField( {fieldInfo:_.object([['label', 'readonly checkbox'], ['readOnly', true]]), isValid:[true, ''], layout:"formField"}, 
                    CheckBox( {label:"Checkbox Label", value:false} ),
                    CheckBox( {label:"Checkbox Label", value:false} ),
                    CheckBox( {label:"Checkbox Label", value:false} )
                ),


                FormField( {fieldInfo:_.object([['label', 'disabled checkbox'], ['disabled', true]]), isValid:[true, ''], layout:"formField"}, 
                    CheckBox( {label:"Checkbox Label", value:true} ),
                    CheckBox( {label:"Checkbox Label", value:true} ),
                    CheckBox( {label:"Checkbox Label", value:true} )
                ),

                FormField( {fieldInfo:_.object([['label', 'disabled checkbox'], ['disabled', true]]), isValid:[true, ''], layout:"formField"}, 
                    CheckBox( {label:"Checkbox Label", value:false} ),
                    CheckBox( {label:"Checkbox Label", value:false} ),
                    CheckBox( {label:"Checkbox Label", value:false} )
                ),

                React.DOM.div( {className:"formTitle"}, "Custom Radios"),

                FormField( {fieldInfo:_.object([['label', 'normal radio']]), isValid:[true, ''], layout:"formField"}, 
                    RadioGroup( {value:"2"}, 
                        Radio( {value:"1", name:"test"}, "Radio Label"),
                        Radio( {value:"2", name:"test"}, "Radio Label"),
                        Radio( {value:"3", name:"test"}, "Radio Label")
                    )
                ),

                FormField( {fieldInfo:_.object([['label', 'normal radio multiline']]), isValid:[true, ''], layout:"formField"}, 
                    RadioGroup( {value:"2"}, 
                        Radio( {value:"1", name:"test2"}, "Radio Label"),React.DOM.br(null ),
                        Radio( {value:"2", name:"test2"}, "Radio Label"),React.DOM.br(null ),
                        Radio( {value:"3", name:"test2"}, "Radio Label")
                    )
                ),

                FormField( {fieldInfo:_.object([['label', 'normal radio one disabled']]), isValid:[true, ''], layout:"formField"}, 
                    RadioGroup( {value:"2"}, 
                        Radio( {value:"1", name:"test3"}, "Radio Label"),
                        Radio( {value:"2", name:"test3"}, "Radio Label"),
                        Radio( {value:"3", name:"test3", disabled:true}, "Radio Label")
                    )
                ),

                FormField( {fieldInfo:_.object([['label', 'invalid radio']]), isValid:[false, ''], layout:"formField"}, 
                    RadioGroup( {value:"2"}, 
                        Radio( {value:"1", name:"test4"}, "Radio Label"),
                        Radio( {value:"2", name:"test4"}, "Radio Label"),
                        Radio( {value:"3", name:"test4"}, "Radio Label")
                    )
                ),

                FormField( {fieldInfo:_.object([['label', 'invalid radio']]), isValid:[false, ''], layout:"formField"}, 
                    RadioGroup( {value:"2"}, 
                        Radio( {value:"1", name:"test5"}, "Radio Label"),
                        Radio( {value:"2", name:"test5"}, "Radio Label"),
                        Radio( {value:"3", name:"test5"}, "Radio Label")
                    )
                ),


                FormField( {fieldInfo:_.object([['label', 'readonly radio'], ['readOnly', true]]), isValid:[true, ''], layout:"formField"}, 
                    RadioGroup( {value:"2"}, 
                        Radio( {value:"1", name:"test6"}, "Radio Label"),
                        Radio( {value:"2", name:"test6"}, "Radio Label"),
                        Radio( {value:"3", name:"test6"}, "Radio Label")
                    )
                ),

                FormField( {fieldInfo:_.object([['label', 'readonly radio'], ['readOnly', true]]), isValid:[true, ''], layout:"formField"}, 
                    RadioGroup( {value:"2"}, 
                        Radio( {value:"1", name:"test7"}, "Radio Label"),
                        Radio( {value:"2", name:"test7"}, "Radio Label"),
                        Radio( {value:"3", name:"test7"}, "Radio Label")
                    )
                ),


                FormField( {fieldInfo:_.object([['label', 'disabled radio'], ['disabled', true]]), isValid:[true, ''], layout:"formField"}, 
                    RadioGroup( {value:"2"}, 
                        Radio( {value:"1", name:"test8"}, "Radio Label"),
                        Radio( {value:"2", name:"test8"}, "Radio Label"),
                        Radio( {value:"3", name:"test8"}, "Radio Label")
                    )
                ),

                FormField( {fieldInfo:_.object([['label', 'disabled radio'], ['disabled', true]]), isValid:[true, ''], layout:"formField"}, 
                    RadioGroup( {value:"2"}, 
                        Radio( {value:"1", name:"test9"}, "Radio Label"),
                        Radio( {value:"2", name:"test9"}, "Radio Label"),
                        Radio( {value:"3", name:"test9"}, "Radio Label")
                    )
                ),


                React.DOM.div( {className:"formTitle"}, "Custom Switchbox Checkbox"),

                FormField( {fieldInfo:_.object([['label', 'normal switchbox']]), isValid:[true, ''], layout:"formField"}, 
                    SwitchBox( {value:true} )
                ),

                FormField( {fieldInfo:_.object([['label', 'normal switchbox']]), isValid:[true, ''], layout:"formField"}, 
                    SwitchBox( {value:false} )
                ),

                FormField( {fieldInfo:_.object([['label', 'invalid switchbox']]), isValid:[false, ''], layout:"formField"}, 
                    SwitchBox( {value:true} )
                ),

                FormField( {fieldInfo:_.object([['label', 'invalid switchbox']]), isValid:[false, ''], layout:"formField"}, 
                    SwitchBox( {value:false} )
                ),

                FormField( {fieldInfo:_.object([['label', 'readonly switchbox'], ['readOnly', true]]), isValid:[true, ''], layout:"formField"}, 
                    SwitchBox( {value:true, readonly:true} )
                ),

                FormField( {fieldInfo:_.object([['label', 'readonly switchbox'], ['readOnly', true]]), isValid:[true, ''], layout:"formField"}, 
                    SwitchBox( {value:false, disabled:true} )
                ),

                FormField( {fieldInfo:_.object([['label', 'disabled switchbox'], ['disabled', true]]), isValid:[true, ''], layout:"formField"}, 
                    SwitchBox( {value:true, disabled:true} )
                ),

                FormField( {fieldInfo:_.object([['label', 'disabled switchbox'], ['disabled', true]]), isValid:[true, ''], layout:"formField"}, 
                    SwitchBox( {value:false, disabled:true} )
                ),


                React.DOM.div( {className:"formTitle"}, "Grid Form Fields"),

                FormField( {fieldInfo:_.object([['label', 'normal grid']]), isValid:[true, ''], layout:"formField"}, 
                    KendoGrid( {dataSource:{data:[{name: "test"},{name: "test"}]}, columns:[{ field:"name" }]})
                ),

                FormField( {fieldInfo:_.object([['label', 'inline grid']]), isValid:[true, ''], layout:"formFieldInline", width:"25%"}, 
                    KendoGrid( {dataSource:{data:[{name: "test"},{name: "test"}]}, columns:[{ field:"name" }]})
                ),

                FormField( {fieldInfo:_.object([['label', 'inline grid']]), isValid:[true, ''], layout:"formFieldInline", width:"25%"}, 
                    KendoGrid( {dataSource:{data:[{name: "test"},{name: "test"}]}, columns:[{ field:"name" }]})
                ),

                FormField( {fieldInfo:_.object([['label', 'nowrap grid']]), isValid:[true, ''], layout:"formFieldNoWrap"}, 
                    KendoGrid( {dataSource:{data:[{name: "test"},{name: "test"}]}, columns:[{ field:"name" }]})
                ),


                React.DOM.div( {className:"formTitle"}, "Buttons"),

                React.DOM.div( {className:"formButtons"}, 

                    React.DOM.button( {className:"primaryButton"}, "Primary Button"),

                    React.DOM.button( {className:"secondaryButton"}, "Secondary Button"),

                    React.DOM.button( {className:"primaryButton buttonDisabled"}, "Disabled Primary Button"),

                    React.DOM.button( {className:"secondaryButton buttonDisabled"}, "Disabled Secondary Button")

                ),

                React.DOM.div( {className:"formTitle"}, "Inline Form Heights, fields should clear if forced to next line, if they get hung up height is off and css needs to be adjusted"),

                FormField( {fieldInfo:_.object([['label', 'normal text']]), isValid:[true, ''], layout:"formFieldInline", width:"200px"}, 
                    KendoText( {value:"Hello World!"} )
                ),

                FormField( {fieldInfo:_.object([['label', 'normal combo']]), isValid:[true, ''], layout:"formFieldInline", width:"200px"}, 
                    KendoComboBox( {displayField:"name", valueField:"id", dataSource:dataSource, value:dataSource[0]} )
                ),

                FormField( {fieldInfo:_.object([['label', 'normal numeric']]), isValid:[true, ''], layout:"formFieldInline", width:"200px"}, 
                    KendoNumber( {value:"!"} )
                ),

                FormField( {fieldInfo:_.object([['label', 'normal date']]), isValid:[true, ''], layout:"formFieldInline", width:"200px"}, 
                    KendoDate( {value:""} )
                ),

                FormField( {fieldInfo:_.object([['label', 'normal datetime']]), isValid:[true, ''], layout:"formFieldInline", width:"200px"}, 
                    KendoDatetime( {value:""} )
                ),

                FormField( {fieldInfo:_.object([['label', 'normal text']]), isValid:[true, ''], layout:"formFieldInline", width:"200px"}, 
                    KendoText( {value:"Hello World!"} )
                ),

                FormField( {fieldInfo:_.object([['label', 'normal combo']]), isValid:[true, ''], layout:"formFieldInline", width:"200px"}, 
                    KendoComboBox( {displayField:"name", valueField:"id", dataSource:dataSource, value:dataSource[0]} )
                ),



                React.DOM.div( {className:"formClear"}),

                FormField( {fieldInfo:_.object([['label', 'normal textarea']]), isValid:[true, ''], layout:"formFieldInline", width:"200px"}, 
                    MultilineText( {value:"Hello World!"} )
                ),

                FormField( {fieldInfo:_.object([['label', 'normal multiselect']]), isValid:[true, ''], layout:"formFieldInline", width:"200px"}, 
                    MultiSelect( {selectors:dataSource} )
                ),

                FormField( {fieldInfo:_.object([['label', 'normal textarea']]), isValid:[true, ''], layout:"formFieldInline", width:"200px"}, 
                    MultilineText( {value:"Hello World!"} )
                ),

                FormField( {fieldInfo:_.object([['label', 'normal multiselect']]), isValid:[true, ''], layout:"formFieldInline", width:"200px"}, 
                    MultiSelect( {selectors:dataSource} )
                ),

                React.DOM.div( {className:"formTitle"}, "Complex Example"),

                React.DOM.div( {className:"formColumn formColumnFirst", style:{width: "60%"}}, 

                    React.DOM.div( {className:"formInlineGroup"}, 

                        FormField( {fieldInfo:_.object([['label', 'normal text inline']]), isValid:[true, ''], layout:"formFieldInline", width:"25%"}, 
                            KendoText( {value:"Hello World!"} )
                        ),

                        FormField( {fieldInfo:_.object([['label', 'normal text inline']]), isValid:[true, ''], layout:"formFieldInline", width:"25%"}, 
                            KendoText( {value:"Hello World!"} )
                        ),

                        FormField( {fieldInfo:_.object([['label', 'normal text inline']]), isValid:[true, ''], layout:"formFieldInline", width:"25%"}, 
                            KendoText( {value:"Hello World!"} )
                        ),

                        FormField( {fieldInfo:_.object([['label', 'normal text inline']]), isValid:[true, ''], layout:"formFieldInline", width:"25%"}, 
                            KendoText( {value:"Hello World!"} )
                        )

                    ),

                    FormField( {fieldInfo:_.object([['label', 'normal text nowrap']]), isValid:[true, ''], layout:"formFieldNoWrap"}, 
                        KendoText( {value:"Hello World!"} )
                    ),

                    FormField( {fieldInfo:_.object([['label', 'normal text nowrap']]), isValid:[true, ''], layout:"formFieldNoWrap"}, 
                        KendoText( {value:"Hello World!"} )
                    ),

                    FormField( {fieldInfo:_.object([['label', 'normal text nowrap']]), isValid:[true, ''], layout:"formFieldNoWrap"}, 
                        KendoText( {value:"Hello World!"} )
                    ),

                    React.DOM.div( {className:"formInlineGroup"}, 

                        FormField( {fieldInfo:_.object([['label', 'normal text inline']]), isValid:[true, ''], layout:"formFieldInline", width:"25%"}, 
                            KendoText( {value:"Hello World!"} )
                        ),

                        FormField( {fieldInfo:_.object([['label', 'normal text inline']]), isValid:[true, ''], layout:"formFieldInline", width:"25%"}, 
                            KendoText( {value:"Hello World!"} )
                        ),

                        FormField( {fieldInfo:_.object([['label', 'normal text inline']]), isValid:[true, ''], layout:"formFieldInline", width:"50%"}, 
                            KendoText( {value:"Hello World!"} )
                        )

                    ),

                    React.DOM.div( {className:"formInlineGroup"}, 

                        FormField( {fieldInfo:_.object([['label', 'normal text inline']]), isValid:[true, ''], layout:"formFieldInline", width:"50%"}, 
                            KendoText( {value:"Hello World!"} )
                        ),

                        FormField( {fieldInfo:_.object([['label', 'normal text inline']]), isValid:[true, ''], layout:"formFieldInline", width:"25%"}, 
                            KendoText( {value:"Hello World!"} )
                        ),

                        FormField( {fieldInfo:_.object([['label', 'normal text inline']]), isValid:[true, ''], layout:"formFieldInline", width:"25%"}, 
                            KendoText( {value:"Hello World!"} )
                        )

                    )


                ),

                React.DOM.div( {className:"formColumn", style:{width: "40%"}}, 

                    React.DOM.div( {className:"formInlineGroup"}, 

                        FormField( {fieldInfo:_.object([['label', 'normal text inline']]), isValid:[true, ''], layout:"formFieldInline", width:"25%"}, 
                            KendoText( {value:"Hello World!"} )
                        ),

                        FormField( {fieldInfo:_.object([['label', 'normal text inline']]), isValid:[true, ''], layout:"formFieldInline", width:"25%"}, 
                            KendoText( {value:"Hello World!"} )
                        ),

                        FormField( {fieldInfo:_.object([['label', 'normal text inline']]), isValid:[true, ''], layout:"formFieldInline", width:"25%"}, 
                            KendoText( {value:"Hello World!"} )
                        ),

                        FormField( {fieldInfo:_.object([['label', 'normal text inline']]), isValid:[true, ''], layout:"formFieldInline", width:"25%"}, 
                            KendoText( {value:"Hello World!"} )
                        )

                    ),

                    FormField( {fieldInfo:_.object([['label', 'normal text nowrap']]), isValid:[true, ''], layout:"formFieldNoWrap"}, 
                        KendoText( {value:"Hello World!"} )
                    ),

                    FormField( {fieldInfo:_.object([['label', 'normal text nowrap']]), isValid:[true, ''], layout:"formFieldNoWrap"}, 
                        KendoText( {value:"Hello World!"} )
                    ),

                    FormField( {fieldInfo:_.object([['label', 'normal text nowrap']]), isValid:[true, ''], layout:"formFieldNoWrap"}, 
                        KendoText( {value:"Hello World!"} )
                    ),

                    React.DOM.div( {className:"formInlineGroup"}, 

                        FormField( {fieldInfo:_.object([['label', 'normal text inline']]), isValid:[true, ''], layout:"formFieldInline", width:"25%"}, 
                            KendoText( {value:"Hello World!"} )
                        ),

                        FormField( {fieldInfo:_.object([['label', 'normal text inline']]), isValid:[true, ''], layout:"formFieldInline", width:"25%"}, 
                            KendoText( {value:"Hello World!"} )
                        ),

                        FormField( {fieldInfo:_.object([['label', 'normal text inline']]), isValid:[true, ''], layout:"formFieldInline", width:"50%"}, 
                            KendoText( {value:"Hello World!"} )
                        )

                    ),

                    React.DOM.div( {className:"formInlineGroup"}, 

                        FormField( {fieldInfo:_.object([['label', 'normal text inline']]), isValid:[true, ''], layout:"formFieldInline", width:"50%"}, 
                            KendoText( {value:"Hello World!"} )
                        ),

                        FormField( {fieldInfo:_.object([['label', 'normal text inline']]), isValid:[true, ''], layout:"formFieldInline", width:"25%"}, 
                            KendoText( {value:"Hello World!"} )
                        ),

                        FormField( {fieldInfo:_.object([['label', 'normal text inline']]), isValid:[true, ''], layout:"formFieldInline", width:"25%"}, 
                            KendoText( {value:"Hello World!"} )
                        )

                    )


                ),

                React.DOM.div( {className:"formTitle"}, "Missing: Custom Switch"),

                React.DOM.div( {className:"formTitle"}, "Missing: Kendo Select"),

                React.DOM.div( {className:"formTitle"}, "Outdated: Kendo Multiselect"),

                React.DOM.div( {className:"formTitle"}, "Missing: Kendo Timepicker"),

                React.DOM.div( {className:"formTitle"}, "Missing: Kendo Autocomplete"),

                React.DOM.div( {className:"formTitle"}, "Custom Carousel"),
                FormField( {fieldInfo:_.object([['label', 'normal carousel']]), isValid:[true, '']}, 
                    Carousel( {options:[1, 2, 3], value:2} )
                ),

                FormField( {fieldInfo:_.object([['label', 'disabled carousel']]), isValid:[true, '']}, 
                    Carousel( {options:[1, 2, 3], value:2, disabled:true} )
                ),

                FormField( {fieldInfo:_.object([['label', 'invalid carousel']]), isValid:[true, '']}, 
                    Carousel( {options:[1, 2, 3], value:2, isValid:[false, 'invalid']} )
                )

            )
        );

        React.renderComponent(content, rootEl);
    }

    return {
        entrypoint: entrypoint
    };
});
