define([
    './AutoControl',
    './FormField',
    './AutoField',
    './controls/Button',
    './controls/Carousel',
    './controls/CheckBox',
    './controls/KendoAutoComplete',
    './controls/KendoComboBox',
    './controls/KendoDatePicker',
    './controls/KendoDateTimePicker',
    './controls/KendoDropDownList',
    './controls/KendoGrid',
    './controls/KendoGridPicker',
    './controls/KendoListView',
    './controls/KendoMultiSelect',
    './controls/KendoNumericTextBox',
    './controls/KendoPager',
    './controls/KendoTabStrip',
    './controls/KendoText',
    './controls/KendoTimePicker',
    './controls/MultiSelect',
    './controls/MultilineText',
    './controls/Radio',
    './controls/RadioGroup',
    './controls/SwitchBox',
    './controls/TabStrip',
    './controls/PromiseButton',
    './controls/SearchBox',
    './ControlCommon',
    './FluxFormMixin',
    './ImmutableOptimizations'
], function (AutoControl, FormField, AutoField, Button, Carousel, CheckBox,
             KendoAutoComplete, KendoComboBox, KendoDatePicker, KendoDateTimePicker, KendoDropDownList, KendoGrid, KendoGridPicker,
             KendoListView, KendoMultiSelect, KendoNumericTextBox, KendoPager, KendoTabStrip, KendoText, KendoTimePicker,
             MultiSelect, MultilineText, Radio, RadioGroup, SwitchBox, TabStrip, PromiseButton, SearchBox,
             ControlCommon, FluxFormMixin, ImmutableOptimizations) {
    'use strict';

    // If the function arguments get out-of-sync with the require define(), the last argument might be undefined.
    console.assert(ImmutableOptimizations);

    // This module should never actually be used.  It exists only to collect all of the top-level modules into one
    // place so that the require optimizer can do a single-page optimization across the entire application
    //
    // It also must collect all of the items from the component registry.  They are needed because they do not
    // have any "hard" require references that the optimizer can see.
    //
    // Specifically, parameters to the container function do not need to be declared, and this body should not do anything
    return {
        AutoControl: AutoControl,
        FormField: FormField,
        AutoField: AutoField,
        Button: Button,
        Carousel: Carousel,
        CheckBox: CheckBox,
        KendoAutoComplete: KendoAutoComplete,
        KendoComboBox: KendoComboBox,
        KendoDatePicker: KendoDatePicker,
        KendoDateTimePicker: KendoDateTimePicker,
        KendoDropDownList: KendoDropDownList,
        KendoGrid: KendoGrid,
        KendoGridPicker: KendoGridPicker,
        KendoListView: KendoListView,
        KendoMultiSelect: KendoMultiSelect,
        KendoNumericTextBox: KendoNumericTextBox,
        KendoPager: KendoPager,
        KendoTabStrip: KendoTabStrip,
        KendoText: KendoText,
        KendoTimePicker: KendoTimePicker,
        MultiSelect: MultiSelect,
        MultilineText: MultilineText,
        Radio: Radio,
        RadioGroup: RadioGroup,
        SwitchBox: SwitchBox,
        TabStrip: TabStrip,
        PromiseButton: PromiseButton,
        SearchBox: SearchBox,
        ControlCommon: ControlCommon,
        FluxFormMixin: FluxFormMixin,
        ImmutableOptimizations: ImmutableOptimizations
    };
});
