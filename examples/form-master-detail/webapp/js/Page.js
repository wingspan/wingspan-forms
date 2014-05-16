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
                database: [],
                MasterDetail: {
                    form: {
                        lastName: '',
                        firstName: '',
                        phoneNumber: '',
                        contactGroup: ''
                    }
                }
            };
        },
        render: function () {
            var cursor = Cursor.build(this.state, this.setState.bind(this), util.deepClone);
            return this.transferPropsTo(
                <MasterDetailDemo metadata={ContactModel} cursor={cursor} />
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
            return (
                <div className="MasterDetailDemo">
                    <AutoForm
                        metadata={ContactModel}
                        cursor={this.props.cursor.refine('MasterDetail')} />
                    <pre>{JSON.stringify(this.props.cursor.value, undefined, 2)}</pre>
                </div>
            );
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
            var formCursor = this.props.cursor.refine('form');
            var controls = _.map(this.props.metadata.properties, function (fieldInfo) {
                var fieldCursor = formCursor.refine(fieldInfo.name);
                return (
                    <AutoField
                        fieldInfo={fieldInfo}
                        value={fieldCursor.value}
                        onChange={fieldCursor.onChange}
                    />);
            });

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