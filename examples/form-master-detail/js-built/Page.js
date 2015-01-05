/** @jsx React.DOM */
define([
    'underscore', 'react', 'jquery', 'wingspan-forms', 'wingspan-cursor',
    'util',
    'text!textassets/types/Contact.json',
    'text!textassets/contacts.json'
], function (_, React, $, Forms, Cursor,
             util, ContactModel, contacts) {
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

    var App = React.createClass({displayName: "App",
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
                React.createElement("div", {className: "App"}, 
                    React.createElement("h2", {className: "header"}, "Contacts List"), 
                    React.createElement("div", {className: "main"}, 
                        React.createElement(MasterDetailDemo, {metadata: ContactModel, cursor: cursor.refine('MasterDetail')}), 
                        React.createElement("div", {className: "box sidebar"}, 
                            React.createElement("h3", null, "Application State"), 
                            React.createElement("pre", null, JSON.stringify(cursor.value, undefined, 2))
                        )
                    ), 
                    React.createElement("div", {className: "footer"})
                )
            );
        }
    });

    var MasterDetailDemo = React.createClass({displayName: "MasterDetailDemo",
        getDefaultProps: function () {
            return {
                metadata: undefined,
                cursor: undefined
            };
        },

        render: function () {

            var list = _.map(this.props.cursor.refine('database').value, function (record) {
                return (React.createElement("li", {key: record.id, onClick: _.partial(this.onTargetChange, record.id)}, record.lastName));
            }.bind(this));

            return (
                React.createElement("div", {className: "MasterDetailDemo"}, 
                    React.createElement("ol", {className: "box sidebar"}, list), 
                    React.createElement("div", {className: "box content"}, 
                        React.createElement(AutoForm, {metadata: ContactModel, cursor: this.props.cursor.refine('form')}), 
                        React.createElement("button", {onClick: this.onSave}, "Save")
                    )
                )
            );
        },

        onTargetChange: function (recordId) {
            // dirty check here
            var record = _.findWhere(this.props.cursor.refine('database').value, { id: recordId });
            this.props.cursor.refine('form').onChange(record);
        },

        onSave: function () {
            var database = this.props.cursor.refine('database').value;
            var form = this.props.cursor.refine('form').value;
            var record = _.findWhere(database, { id: form.id });

            var nextRecord = merge(record, form, { revision: form['revision'] + 1 });

            // subtract out the stale record (old revision)
            // union in the new record into the nextCollection
            var nextCollection = util.differenceDeep(database, [record]);
            nextCollection = util.unionDeep(nextCollection, [nextRecord]);

            this.props.cursor.onChange({ database: nextCollection, form: nextRecord });
        }
    });


    var AutoForm = React.createClass({displayName: "AutoForm",

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
                    React.createElement(Forms.AutoField, {
                        key: fieldInfo.name, 
                        fieldInfo: fieldInfo, 
                        value: fieldCursor.value, 
                        onChange: fieldCursor.onChange}));
            }.bind(this));

            return (React.createElement("div", {className: "AutoForm"}, controls));
        }
    });


    function entrypoint(rootEl) {
        React.render(React.createElement(App, null), rootEl);
    }

    return {
        entrypoint: entrypoint
    };
});