/** @jsx React.DOM */
define([
    'underscore', 'react', 'jquery',
    'wingspan-forms',
    'util',
    'text!textassets/types/Contact.json',
    'text!textassets/contacts.json'
], function (_, React, $, Forms, util, ContactModel, contacts) {
    'use strict';

    ContactModel = JSON.parse(ContactModel).data;
    contacts = JSON.parse(contacts).data;

    function mergeInto(one, two) {
        if (two != null) {
            for (var key in two) {
                if (!two.hasOwnProperty(key)) {
                    continue;
                }
                one[key] = two[key];
            }
        }

        return one;
    }

    function merge(/* a, b, ... */) {
        return _.reduce(arguments, mergeInto, {});
    }

    var App = React.createClass({
        getInitialState: function () {
            return {
                MasterDetail: {
                    database: contacts,
                    selection: 0
                }
            };
        },

        onDataChange: function (masterDetail) {
            var nextMasterDetail = _.defaults(masterDetail, this.state.MasterDetail);
            this.setState({ MasterDetail: nextMasterDetail });
        },

        render: function () {
            return (
                <div className="App">
                    <h2 className="header">Contacts List</h2>
                    <div className="main">
                        <MasterDetailDemo metadata={ContactModel}
                            data={this.state.MasterDetail} onChange={this.onDataChange} />
                        <div className="box sidebar">
                            <h3>Application State</h3>
                            <pre>{JSON.stringify(this.state.MasterDetail, undefined, 2)}</pre>
                        </div>
                    </div>
                    <div className="footer"></div>
                </div>
            );
        }
    });


    var MasterDetailDemo = React.createClass({
        getDefaultProps: function () {
            return {
                metadata: undefined,
                data: undefined,
                onChange: undefined
            };
        },

        getInitialState: function () {
            return {
                form: this.props.data.database[this.props.data.selection]
            };
        },

        componentWillReceiveProps: function (nextProps) {
            this.setState({ form: nextProps.data.database[nextProps.data.selection]})
        },

        render: function () {
            var database = this.props.data.database;
            var list = database.map(function (record, index) {
                return (<li key={record.id} onClick={this.onTargetChange.bind(this, index)}>{record.lastName}</li>);
            }.bind(this));

            return (
                <div className="MasterDetailDemo">
                    <ol className="box sidebar">{list}</ol>
                    <div className="box content">
                        <AutoForm model={ContactModel} value={this.state.form} onChange={this.onFormChange} />
                        <button onClick={this.onSave}>Save</button>
                    </div>
                </div>
            );
        },

        onTargetChange: function (index) {
            this.props.onChange({ selection: index });
        },

        onFormChange: function (field, value) {
            var newFormValue = _.clone(this.state.form);
            newFormValue[field] = value;

            this.setState({ form: newFormValue });
        },

        onSave: function () {
            var database = this.props.data.database;
            var form = this.state.form;
            var record = _.findWhere(database, { id: form.id });

            var nextRecord = merge(record, form, { revision: form['revision'] + 1 });

            var nextCollection = _.clone(database);
            nextCollection[this.props.data.selection] = nextRecord;

            this.props.onChange({ database: nextCollection });
        }
    });


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
                    <Forms.AutoField key={fieldInfo.name} fieldInfo={fieldInfo}
                        value={this.props.value[fieldInfo.name]}
                        onChange={_.partial(this.props.onChange, fieldInfo.name)} />
                );
            }.bind(this));

            return (
                <div className="AutoForm">{controls}</div>
            );
        }
    });


    function entrypoint(rootEl) {
        React.renderComponent(<App/>, rootEl);
    }

    return {
        entrypoint: entrypoint
    };
});