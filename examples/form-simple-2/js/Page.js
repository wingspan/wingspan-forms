/** @jsx React.DOM */
define([
    'underscore', 'react', 'jquery', 'wingspan-forms'
], function (_, React, $, Forms) {
    'use strict';


    var fieldInfos = {
        firstName: { dataType: 'text', label: 'First Name', name: 'firstName' },
        lastName: { dataType: 'text', label: 'Last Name', name: 'lastName' },
        gender: { dataType: 'enum', label: 'Gender', name: 'gender',
                  options: {
                      metadata: { idProperty: 'value', nameProperty: 'label'},
                      data: [{ value: 'male', label: 'Male'}, { value: 'female', label: 'Female'}] }
                  },
        age: { dataType: 'number', label: 'Age', name: 'age' },
        birthday: { dataType: 'date', label: 'Birthday', name: 'birthday', maxValue: 'NOW' }
    };

    var MyForm = React.createClass({

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
            var controls = _.map(fieldInfos, function (fieldInfo) {
                return (
                    <AutoField
                        fieldInfo={fieldInfo}
                        value={this.state[fieldInfo.name]}
                        onChange={_.partial(this.onFieldChange, fieldInfo.name)}
                        isValid={this.isFieldValid(fieldInfo.name)} />
                );
            }.bind(this));

            return (
                <div className="MyForm">
                    <div>{controls}</div>
                    <pre>{JSON.stringify(this.state, undefined, 2)}</pre>
                </div>
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
        React.renderComponent(<MyForm/>, rootEl);
        Forms.ControlCommon.attachFormTooltips($(document.body));
    }


    var AutoField = Forms.AutoField;

    return {
        entrypoint: entrypoint
    };
});
