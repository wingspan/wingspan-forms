/** @jsx React.DOM */
define([
    'react', 'wingspan-forms', 'wingspan-cursor'
], function (React, Forms, Cursor) {
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
                cursor: undefined
            };
        },
        render: function () {
            return (
                <div className="MyForm">
                    <div className="formTitle">Form</div>
                    <FormField fieldInfo={{ label: 'First Name'}}>
                        <KendoText value={this.props.cursor.refine('firstName').value}
                            onChange={this.props.cursor.refine('firstName').onChange} />
                    </FormField>
                    <FormField fieldInfo={{ label: 'Last Name'}}>
                        <KendoText type="text" value={this.props.cursor.refine('lastName').value}
                            onChange={this.props.cursor.refine('lastName').onChange} />
                    </FormField>
                    <FormField fieldInfo={{ label: 'Gender'}}>
                        <KendoComboBox
                            value={this.props.cursor.refine('gender').value}
                            onChange={this.props.cursor.refine('gender').onChange}
                            dataSource={options}
                            valueField="id"
                            displayField="display" />
                    </FormField>
                </div>
            );
        },
        shouldComponentUpdate: function (nextProps) {
            return this.props.cursor.value !== nextProps.cursor.value;
        }
    });

    var App = React.createClass({
        componentWillMount: function () {
            window.app = this; // save ref for dev console
        },

        getInitialState: function () {
            return {
                forms: _.range(10).map(function (i) { return { "firstName": i, "lastName": "Armstrong", "gender": "female" }; })
            };
        },

        pendingState: function () {
            return this._pendingState || this.state;
        },

        render: function() {
            var cursor = Cursor.ReactCursor.build(this.state, this.pendingState, this.setState.bind(this));
            return (<View cursor={cursor} />);
        }

    });

    var View = React.createClass({

        render: function () {
            var renderForms = function (form, i) {
                var formCursor = this.props.cursor.refine('forms', i);
                return (<MyForm cursor={formCursor} />);
            }.bind(this);

            var forms = _.map(this.props.cursor.refine('forms').value, renderForms);
            var forms2 = _.map(this.props.cursor.refine('forms').value, renderForms);

            var text = "TODO: Provide Cursor instructions";

            return (
                <div className="App" >
                    <div>{forms}</div>
                    <div>{forms2}</div>
                    <div>
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
