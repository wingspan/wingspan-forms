define([
    'underscore', 'react', 'react-dom', 'jquery',
    'wingspan-forms',
    './wingspan-cursor', './util',
    'json!../textassets/types/Contact.json',
    'json!../textassets/contacts.json'
], function (_, React, ReactDOM, $, Forms, Cursor,
             util, ContactModel, contacts) {
    'use strict';

    ContactModel = ContactModel.data;
    contacts = contacts.data;

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
                    <h2 className="header">Contacts List</h2>
                    <div className="main">
                        <MasterDetailDemo metadata={ContactModel} cursor={cursor.refine('MasterDetail')} />
                        <div className="box sidebar">
                            <h3>Application State</h3>
                            <pre>{JSON.stringify(cursor.value, undefined, 2)}</pre>
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
                cursor: undefined
            };
        },

        render: function () {

            var list = _.map(this.props.cursor.refine('database').value, function (record) {
                return (<li key={record.id} onClick={_.partial(this.onTargetChange, record.id)}>{record.lastName}</li>);
            }.bind(this));

            return (
                <div className="MasterDetailDemo">
                    <ol className="box sidebar">{list}</ol>
                    <div className="box content">
                        <AutoForm metadata={ContactModel} cursor={this.props.cursor.refine('form')} />
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
                    <Forms.AutoField
                        key={fieldInfo.name}
                        fieldInfo={fieldInfo}
                        value={fieldCursor.value}
                        onChange={fieldCursor.onChange} />);
            }.bind(this));

            return (<div className="AutoForm">{controls}</div>);
        }
    });


    function entrypoint(rootEl) {
        ReactDOM.render(<App/>, rootEl);
    }

    return {
        entrypoint: entrypoint
    };
});