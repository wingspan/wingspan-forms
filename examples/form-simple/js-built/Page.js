/** @jsx React.DOM */
define([
    'underscore', 'react', 'jquery', 'wingspan-forms'
], function (_, React, $, Forms) {
    'use strict';


    var SimpleFormMetadata = {
        firstName: { label: 'First Name' },
        lastName: { label: 'Last Name' },
        gender: { label: 'Gender' },
        age: { label: 'Age' },
        birthday: { label: 'Birthday'}
    };

    var MyForm = React.createClass({displayName: "MyForm",

        genderOptions: [{ value: 'male', label: 'Male'}, { value: 'female', label: 'Female'}],

        getInitialState: function () {
            return {
                firstName: '',
                lastName: '',
                gender: '',
                age: null,
                birthday: null
            };
        },

        render: function () {
            return (
                React.createElement("div", {className: "MyForm"}, 
                    React.createElement("div", null, 
                        React.createElement(FormField, {fieldInfo: SimpleFormMetadata.firstName, isValid: this.isFieldValid('firstName')}, 
                            React.createElement(KendoText, {value: this.state.firstName, onChange: _.partial(this.onFieldChange, 'firstName')})
                        ), 

                        React.createElement(FormField, {fieldInfo: SimpleFormMetadata.lastName, isValid: this.isFieldValid('lastName')}, 
                            React.createElement(KendoText, {value: this.state.lastName, onChange: _.partial(this.onFieldChange, 'lastName')})
                        ), 

                        React.createElement(FormField, {fieldInfo: SimpleFormMetadata.gender, isValid: this.isFieldValid('gender')}, 
                            React.createElement(KendoComboBox, {
                                dataSource: this.genderOptions, 
                                displayField: "label", 
                                valueField: "value", 
                                value: this.state.gender, 
                                onChange: _.partial(this.onFieldChange, 'gender')})
                        ), 

                        React.createElement(FormField, {fieldInfo: SimpleFormMetadata.age, isValid: this.isFieldValid('age')}, 
                            React.createElement(KendoNumericTextBox, {spinners: true, value: this.state.age, onChange: _.partial(this.onFieldChange, 'age')})
                        ), 

                        React.createElement(FormField, {fieldInfo: SimpleFormMetadata.birthday, isValid: this.isFieldValid('birthday')}, 
                            React.createElement(KendoDatePicker, {value: this.state.birthday, onChange: _.partial(this.onFieldChange, 'birthday')})
                        )

                    ), 
                    React.createElement("pre", null, JSON.stringify(this.state, undefined, 2))
                )
            );
        },

        onFieldChange: function (fieldName, value) {
            this.setState(_.object([[fieldName, value]]));
        },

        isFieldValid: function (fieldName) {
            var val = this.state[fieldName];

            return val !== null && val !== ''
                ? [true, '']
                : [false, 'This field is required.'];
        }
    });


    function entrypoint(rootEl) {
        React.renderComponent(React.createElement(MyForm, null), rootEl);
        Forms.ControlCommon.attachFormTooltips($(document.body));
    }


    var FormField = Forms.FormField;
    var KendoText = Forms.KendoText;
    var KendoComboBox = Forms.KendoComboBox;
    var KendoNumericTextBox = Forms.KendoNumericTextBox;
    var KendoDatePicker = Forms.KendoDatePicker;

    return {
        entrypoint: entrypoint
    };
});
