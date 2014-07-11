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

    var contactGroup = ContactModel.properties['contactGroup'];
    contactGroup.options.dataSource = contactGroup.options.data;

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
                    <div>
                        <ol>{list}</ol>
                        <AutoForm
                            metadata={ContactModel}
                            cursor={this.props.cursor.refine('form')} />
                        <button onClick={this.onSave}>Save</button>
                    </div>
                </div>
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