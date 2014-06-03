/** @jsx React.DOM */
define([
    'underscore', 'react', 'wingspan-forms', 'ReactCursor'
], function (_, React, Forms, Cursor) {
    'use strict';

    var FormField = Forms.FormField;
    var KendoText = Forms.KendoText;
    var KendoComboBox = Forms.KendoComboBox;
    var AutoControl = Forms.AutoControl;

    var fieldInfos = {
        firstName: { dataType: 'text', label: 'First Name', name: 'firstName' },
        lastName: { dataType: 'text', label: 'Last Name', name: 'lastName' },
        gender: {
            dataType: 'enum',
            label: 'Gender',
            name: 'gender',
            options: {
                metadata: { idProperty: 'id', nameProperty: 'label' },
                dataSource: [
                    { id: 'male', label: 'Male' },
                    { id: 'female', label: 'Female' }
                ]
            }
        },
        age: { dataType: 'number', label: 'Age', name: 'age' },
        birthday: { dataType: 'date', label: 'Birthday', name: 'birthday' }
    };

    var genders = fieldInfos.gender.options.dataSource;

    var PrettyJSON = React.createClass({
        render: function () {
            return <pre>{JSON.stringify(this.props.value, undefined, 2)}</pre>;
        }
    });

    var App = React.createClass({
        getInitialState: function () {
            return { firstName: '', lastName: '' };
        },
        render: function () {
            return (
                <div>
                    <input type="text" value={this.state.firstName} onChange={this.onChangeFirstName} />
                    <input type="text" value={this.state.lastName} onChange={this.onChangeLastName} />
                    <PrettyJSON value={this.state} />
                </div>
            );
        },
        onChangeFirstName: function (e) {
            this.setState({ firstName: e.target.value });
        },
        onChangeLastName: function (e) {
            this.setState({ lastName: e.target.value });
        }
    });

    function entrypoint() {
        React.renderComponent(<App />, document.getElementById('root'));
        Forms.ControlCommon.attachFormTooltips($('body'));
    }

    return {
        entrypoint: entrypoint
    };
});
