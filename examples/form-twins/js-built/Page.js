/** @jsx React.DOM */
define([
    'react', 'wingspan-forms'
], function (React, Forms) {
    'use strict';


    var options = [{ id: 'male', display: 'Male'}, { id: 'female', display: 'Female'}];


    var PrettyJson = React.createClass({displayName: "PrettyJson",
        render: function () {
            return (React.createElement("pre", null, JSON.stringify(this.props.value, undefined, 2)));
        }
    });

    var MyForm = React.createClass({displayName: "MyForm",
        getDefaultProps: function () {
            return {
                value: {}, // form value
                onChange: undefined
            };
        },
        render: function () {
            var fieldInfoFirstName= {label: 'First Name'};
            return (
                React.createElement("div", {className: "MyForm"}, 
                    React.createElement("div", {className: "formTitle"}, "Form"), 
                    React.createElement(FormField, {fieldInfo: fieldInfoFirstName}, 
                        React.createElement(KendoText, {value: this.props.value.firstName, 
                            onChange: _.partial(this.props.onChange, 'firstName')})
                    ), 
                    React.createElement(FormField, {fieldInfo: _.object([['label', 'Last Name']])}, 
                        React.createElement(KendoText, {type: "text", value: this.props.value.lastName, 
                            onChange: _.partial(this.props.onChange, 'lastName')})
                    ), 
                    React.createElement(FormField, {fieldInfo: _.object([['label', 'Gender']])}, 
                        React.createElement(KendoComboBox, {
                            value: this.props.value.gender, 
                            onChange: _.partial(this.props.onChange, 'gender'), 
                            dataSource: options, 
                            valueField: "id", 
                            displayField: "display"})
                    )
                )
            );
        }
    });

    var App = React.createClass({displayName: "App",

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
                return (React.createElement(MyForm, {value: form, onChange: _.partial(this.onChange, i)}));
            }.bind(this));

            var forms2 = _.map(this.state.forms, function (form, i) {
                return (React.createElement(MyForm, {value: form, onChange: _.partial(this.onChange, i)}));
            }.bind(this));

            var text = "function deepCopy (tree) { return JSON.parse(JSON.stringify(tree)); }\n\
var nextState = deepCopy(app.state);\n\
nextState.forms.push({});\n\
app.setState(nextState);";

            return (
                React.createElement("div", {className: "App"}, 
                    React.createElement("div", null, forms), 
                    React.createElement("div", null, forms2), 
                    React.createElement("div", null, 
                        React.createElement(PrettyJson, {value: this.state}), 
                        React.createElement("p", null, "Try this in the javascript console:"), 
                        React.createElement("pre", null, text), 
                        React.createElement("p", null, React.createElement("a", {href: "https://github.com/wingspan/wingspan-forms/blob/master/examples/form-twins/webapp/js/Page.js"}, 
                        "The source to this example is available here."))
                    )
                )
            );
        }

    });



    var FormField = Forms.FormField;
    var KendoText = Forms.KendoText;
    var KendoComboBox = Forms.KendoComboBox;


    function entrypoint() {
        React.renderComponent(React.createElement(App, null), document.getElementById('root'));
    }

    return {
        entrypoint: entrypoint
    };
});
