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
                <div>
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
        mixins: [Forms.TopStateMixin],

        getInitialState: function () {
            return {
                forms: [
                    {
                        firstName: 'Dustin',
                        lastName: 'Getz',
                        gender: ''
                    },
                    {
                        firstName: 'Dustin',
                        lastName: 'Getz',
                        gender: ''
                    }
                ]
            };
        },
        render: function() {

            var forms = _.map(this.state.forms, function (form, i) {
                return (<MyForm value={form} onChange={_.partial(this.onChange, 'forms', i)} />);
            }.bind(this));

            return (
                <div className="App" >
                    {forms}
                    <PrettyJson value={this.state} />
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
