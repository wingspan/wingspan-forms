/** @jsx React.DOM */
define([
    'react', 'wingspan-forms'
], function (React, Forms) {
    'use strict';


    var options = [{ id: 'male', display: 'Male'}, { id: 'female', display: 'Female'}];


    var PrettyJson = React.createClass({
        render: function () {
            return (<pre>{JSON.stringify(this.props.value, undefined, 2)}</pre>);
        }
    });

    var MyForm = React.createClass({
        getDefaultProps: function () {
            return {
                value: {}, // form value
                onChange: undefined
            };
        },
        render: function () {
            var fieldInfoFirstName= {label: 'First Name'};
            return (
                <div className="MyForm">
                    <div className="formTitle">Form</div>
                    <FormField fieldInfo={fieldInfoFirstName}>
                        <KendoText value={this.props.value.firstName}
                            onChange={_.partial(this.props.onChange, 'firstName')} />
                    </FormField>
                    <FormField fieldInfo={_.object([['label', 'Last Name']])}>
                        <KendoText type="text" value={this.props.value.lastName}
                            onChange={_.partial(this.props.onChange, 'lastName')} />
                    </FormField>
                    <FormField fieldInfo={_.object([['label', 'Gender']])}>
                        <KendoComboBox
                            value={this.props.value.gender}
                            onChange={_.partial(this.props.onChange, 'gender')}
                            dataSource={options}
                            valueField="id"
                            displayField="display" />
                    </FormField>
                </div>
            );
        }
    });

    var App = React.createClass({

        componentWillMount: function () {
            window.app = this; // save ref for dev console
        },

        getInitialState: function () {
            return {
                forms: [
                    {
                        firstName: 'Alice',
                        lastName: 'Armstrong',
                        gender: 'female'
                    },
                    {
                        firstName: 'Bob',
                        lastName: 'Barnaby',
                        gender: 'male'
                    },
                    {
                        firstName: 'Cindy',
                        lastName: 'Crawford',
                        gender: 'female'
                    }
                ]
            };
        },

        onChange: function (formIndex, field, value) {
        	var forms = _.clone(this.state.forms);
        	var newForm = _.clone(this.state.forms[formIndex]);

        	newForm[field] = value;
        	forms[formIndex] = newForm;

        	this.setState({ forms: forms });
        },

        render: function() {

            var forms = _.map(this.state.forms, function (form, i) {
                return (<MyForm value={form} onChange={_.partial(this.onChange, i)} />);
            }.bind(this));

            var forms2 = _.map(this.state.forms, function (form, i) {
                return (<MyForm value={form} onChange={_.partial(this.onChange, i)} />);
            }.bind(this));

            var text = "function deepCopy (tree) { return JSON.parse(JSON.stringify(tree)); }\n\
var nextState = deepCopy(app.state);\n\
nextState.forms.push({});\n\
app.setState(nextState);";

            return (
                <div className="App" >
                    <div>{forms}</div>
                    <div>{forms2}</div>
                    <div>
                        <PrettyJson value={this.state} />
                        <p>Try this in the javascript console:</p>
                        <pre>{text}</pre>
                        <p><a href="https://github.com/wingspan/wingspan-forms/blob/master/examples/form-twins/webapp/js/Page.js">
                        The source to this example is available here.</a></p>
                    </div>
                </div>
            );
        }

    });



    var FormField = Forms.FormField;
    var KendoText = Forms.KendoText;
    var KendoComboBox = Forms.KendoComboBox;


    function entrypoint() {
        React.renderComponent(<App />, document.getElementById('root'));
    }

    return {
        entrypoint: entrypoint
    };
});
