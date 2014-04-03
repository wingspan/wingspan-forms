/** @jsx React.DOM */
define([
    'react', 'wingspan-forms'
], function (React, Forms) {
    'use strict';


    var options = [{ id: 'male', display: 'Male'}, { id: 'female', display: 'Female'}];


    var PrettyJson = React.createClass({displayName: 'PrettyJson',
        render: function () {
            return (React.DOM.pre(null, JSON.stringify(this.props.value, undefined, 2)));
        }
    });

    var MyForm = React.createClass({displayName: 'MyForm',
        getDefaultProps: function () {
            return {
                value: {}, // form value
                onChange: undefined
            };
        },
        render: function () {
            var fieldInfoFirstName= {label: 'First Name'};
            return (
                React.DOM.div( {className:"MyForm"}, 
                    React.DOM.div( {className:"formTitle"}, "Form"),
                    FormField( {fieldInfo:fieldInfoFirstName}, 
                        KendoText( {value:this.props.value.firstName,
                            onChange:_.partial(this.props.onChange, 'firstName')} )
                    ),
                    FormField( {fieldInfo:_.object([['label', 'Last Name']])}, 
                        KendoText( {type:"text", value:this.props.value.lastName,
                            onChange:_.partial(this.props.onChange, 'lastName')} )
                    ),
                    FormField( {fieldInfo:_.object([['label', 'Gender']])}, 
                        KendoComboBox(
                            {value:this.props.value.gender,
                            onChange:_.partial(this.props.onChange, 'gender'),
                            dataSource:options,
                            valueField:"id",
                            displayField:"display"} )
                    )
                )
            );
        }
    });

    var App = React.createClass({displayName: 'App',
        mixins: [Forms.TopStateMixin],

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
        render: function() {

            var forms = _.map(this.state.forms, function (form, i) {
                return (MyForm( {value:form, onChange:_.partial(this.onChange, 'forms', i)} ));
            }.bind(this));

            var text = "function deepCopy (tree) { return JSON.parse(JSON.stringify(tree)); }\n\
var nextState = deepCopy(app.state);\n\
nextState.forms.push({});\n\
app.setState(nextState);";

            return (
                React.DOM.div( {className:"App"} , 
                    React.DOM.div(null, forms),
                    React.DOM.div(null, 
                        PrettyJson( {value:this.state} ),
                        React.DOM.p(null, "Try this in the javascript console:"),
                        React.DOM.pre(null, text)
                    )
                )
            );
        }

    });



    var FormField = Forms.FormField;
    var KendoText = Forms.KendoText;
    var KendoComboBox = Forms.KendoComboBox;


    function entrypoint() {
        React.renderComponent(App(null ), document.getElementById('root'));
    }

    return {
        entrypoint: entrypoint
    };
});
