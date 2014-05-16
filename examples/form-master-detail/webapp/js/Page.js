/** @jsx React.DOM */
define([
    'underscore', 'react', 'wingspan-forms', 'wingspan-cursor',
    'util',
    'text!textassets/types/Contact.json',
    'text!textassets/contacts.json'
], function (_, React, Forms, Cursor,
             util, ContactModel, contacts) {
    'use strict';

    var ContactModel = JSON.parse(ContactModel).data;
    var contacts = JSON.parse(contacts).data;


    var App = React.createClass({
        getInitialState: function () {
            return {
                MasterDetail: {
                    database: contacts,
                    form: contacts[0]
                }
            };
        },
        render: function () {
            var cursor = Cursor.build(this.state, this.setState.bind(this), util.deepClone);
            return (
                <div className="App">
                    <MasterDetailDemo metadata={ContactModel} cursor={cursor.refine('MasterDetail')} />
                    <pre>{JSON.stringify(cursor.value, undefined, 2)}</pre>
                </div>
            );
        }
    });

    var MasterDetailDemo = React.createClass({
        getDefaultProps: function () {
            return {
                metadata: undefined,
                cursor: undefined
            };
        },

        render: function () {

            var list = _.map(this.props.cursor.refine('database').value, function (record) {
                return (<li><a href="javascript:void(0)" onClick={_.partial(this.onTargetChange, record.id)}>{record.lastName}</a></li>);
            }.bind(this));

            return (
                <div className="MasterDetailDemo">
                    <ol>{list}</ol>
                    <AutoForm
                        metadata={ContactModel}
                        cursor={this.props.cursor.refine('form')} />
                    <button onClick={undefined}>Save</button>
                </div>
            );
        },

        onTargetChange: function (recordId) {
            // dirty check here
            var record = _.findWhere(this.props.cursor.refine('database').value, { id: recordId });
            this.props.cursor.refine('form').onChange(record);
        }
    });


    var AutoForm = React.createClass({
        getDefaultProps: function () {
            return {
                metadata: undefined,
                cursor: undefined
            };
        },
        render: function () {
            var controls = _.map(this.props.metadata.properties, function (fieldInfo) {
                var fieldCursor = this.props.cursor.refine(fieldInfo.name);
                return (
                    <AutoField
                        fieldInfo={fieldInfo}
                        value={fieldCursor.value}
                        onChange={fieldCursor.onChange}
                    />);
            }.bind(this));

            return (<div className="AutoForm">{controls}</div>);
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