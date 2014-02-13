/** @jsx React.DOM */
define([
    'underscore', 'react', 'wingspan-forms', 'kendo',
    'text!textassets/types/Contact.json',
    'text!textassets/contacts.json'
], function (_, React, Forms, kendo, ContactModel, contacts) {
    'use strict';

    var ContactModel = JSON.parse(ContactModel).data;
    var contacts = JSON.parse(contacts).data;


    var App = React.createClass({
        mixins: [Forms.TopStateMixin],

        getInitialState: function () {
            return {
                formValue: contacts[0]
            };
        },

        render: function () {
            return (
                <div className="App">
                    <AutoForm
                        model={ContactModel}
                        value={this.state.formValue}
                        onChange={_.partial(this.onChange, 'formValue')} />
                    <pre>{JSON.stringify(this.state, undefined, 2)}</pre>
                </div>
            );
        }
    });


    /**
     * Abstraction to dynamically render a form based on a JSON 'model' describing the form.
     */
    var AutoForm = React.createClass({

        getDefaultProps: function () {
            return {
                model: undefined,
                value: undefined,
                onChange: undefined
            };
        },

        componentWillMount: function () {
            // Initialize datastores for widgets that require one
            _.each(this.props.model.properties, function (fieldInfo) {
                if (fieldInfo.options) {
                    fieldInfo.options.dataSource = new kendo.data.DataSource(fieldInfo.options);
                }
            }.bind(this));
        },

        render: function () {
            var controls = _.map(this.props.model.properties, function (fieldInfo) {
                return (
                    <AutoField
                        fieldInfo={fieldInfo}
                        value={this.props.value[fieldInfo.name]}
                        onChange={_.partial(this.props.onChange, fieldInfo.name)} />
                    );
            }.bind(this));

            return (
                <div className="AutoForm" >
                    {controls}
                </div>
            );
        }
    });

    var AutoField = Forms.AutoField;


    function entrypoint(rootEl) {
        React.renderComponent(<App/>, rootEl);
    }

    return {
        entrypoint: entrypoint
    };
});
