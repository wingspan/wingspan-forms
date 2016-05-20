define([
    'underscore', 'react', 'wingspan-forms', 'kendo',
    'json!../textassets/types/Contact.json',
    'json!../textassets/contacts.json'
], function (_, React, Forms, kendo, ContactModel, contacts) {
    'use strict';

    ContactModel = ContactModel.data;
    contacts = contacts.data;


    var App = React.createClass({

        getInitialState: function () {
            return {
                formValue: contacts[0]
            };
        },

        onChange: function (field, value) {
            var newFormValue = _.clone(this.state.formValue);
            newFormValue[field] = value;

            this.setState({ formValue: newFormValue });
        },

        render: function () {
            return (
                <div className="App">
                    <AutoForm
                        model={ContactModel}
                        value={this.state.formValue}
                        onChange={this.onChange} />
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
        React.render(<App/>, rootEl);
    }

    return {
        entrypoint: entrypoint
    };
});
