/** @jsx React.DOM */
define([
    'underscore', 'react', 'kendo', 'AutoForm',
    'text!textassets/types/Contact.json',
    'text!textassets/contacts.json'
], function (_, React, kendo, AutoForm, ContactModel, contacts) {
    'use strict';

    var ContactModel = JSON.parse(ContactModel).data;
    var contacts = JSON.parse(contacts).data;


    var CollectionEditor = React.createClass({
        getInitialState: function () {
            return {
                collection: this.props.collection, // source of truth/database state
                target: {} // value the editor is currently targetting
            };
        },

        render: function () {
            var list = _.map(this.props.collection, function (record) {
                return (<li><a href="#" onClick={_.partial(this.onTargetChange, record.id)}>{record.lastName}</a></li>);
            }.bind(this));

            return (
                <div>
                    <div className="simpleForm">
                        <div className="columnLeft">
                            <ol>{list}</ol>
                        </div>
                        <div className="columnRight">
                            <AutoForm model={ContactModel} value={this.state.target} onChange={this.onFormChange} />
                        </div>
                    </div>
                    <pre>{JSON.stringify(this.state.collection, undefined, 2)}</pre>
                </div>
            );
        },

        onTargetChange: function (id) {
            this.setState({ target: _.findWhere(this.state.collection, { id: id }) });
        },

        onFormChange: function (value) {
            var nextCollection = $.extend(true, [], this.state.collection);
            var nextRecord = _.findWhere(nextCollection, { id: value.id });
            _.extend(nextRecord, value, { revision: value.revision + 1 });

            this.setState({
                collection: nextCollection,
                target: nextRecord
            });
        }
    });



    function entrypoint(rootEl) {
        React.renderComponent(<CollectionEditor model={ContactModel} collection={contacts} />, rootEl);
    }

    return {
        entrypoint: entrypoint
    };
});
