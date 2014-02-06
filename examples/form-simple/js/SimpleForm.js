/** @jsx React.DOM */
define([
    'underscore', 'react', 'jquery', 'wingspan-forms',
    'SimpleFormMetadata'
], function (_, React, $, Forms, SimpleFormMetadata) {
    'use strict';


    var MyForm = React.createClass({

        genderOptions: [{ value: 'male', label: 'Male'}, { value: 'female', label: 'Female'}],

        getInitialState: function () {
            return {
                firstName: '',
                lastName: '',
                gender: ''
            };
        },

        render: function () {
            return (
                <div className="MyForm">
                    <div>
                        <div>
                            <FormField fieldInfo={SimpleFormMetadata.firstName} isValid={this.isFieldValid('firstName')}>
                                <KendoText value={this.state.firstName} onChange={_.partial(this.onFieldChange, 'firstName')} />
                            </FormField>

                            <FormField fieldInfo={SimpleFormMetadata.lastName} isValid={this.isFieldValid('lastName')}>
                                <KendoText value={this.state.lastName} onChange={_.partial(this.onFieldChange, 'lastName')} />
                            </FormField>

                            <FormField fieldInfo={SimpleFormMetadata.gender} isValid={this.isFieldValid('gender')}>
                                <KendoComboBox
                                    dataSource={this.genderOptions}
                                    displayField="label"
                                    valueField="value"
                                    value={this.state.gender}
                                    onChange={_.partial(this.onFieldChange, 'gender')} />
                            </FormField>
                        </div>
                        <pre>{JSON.stringify(this.state, undefined, 2)}</pre>
                    </div>
                </div>
            );
        },

        onFieldChange: function (fieldName, value) {
            this.setState(_.object([[fieldName, value]]));
        },

        isFieldValid: function (fieldName) {
            return _.isEmpty(this.state[fieldName])
                ? [false, 'This field is required.']
                : [true, ''];
        }
    });


    function entrypoint(rootEl) {
        React.renderComponent(<MyForm/>, rootEl);
    }


    var FormField = Forms.FormField;
    var KendoText = Forms.KendoText;
    var KendoComboBox = Forms.KendoComboBox;

    return {
        entrypoint: entrypoint
    };
});
