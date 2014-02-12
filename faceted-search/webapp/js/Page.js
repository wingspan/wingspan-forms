/** @jsx React.DOM */
define([
    'underscore', 'react', 'jquery', 'kendo', 'wingspan-forms',
    'text!textassets/types/Contact.json',
    'text!textassets/contacts.json',
    'underscore-string'
], function (_, React, $, kendo, Forms, ContactModel, contacts) {
    'use strict';

    var ContactModel = JSON.parse(ContactModel).data;
    var contacts = JSON.parse(contacts).data;


    function entrypoint(rootElement) {

        var App = React.createClass({
            mixins: [Forms.TopStateMixin],

            getInitialState: function () {
                return {
                    filters: [] // { display: 'Name', value: 'name' }
                };
            },

            componentWillMount: function () {
                this.columns = [{ template: '#: lastName #' }, { template: '#: firstName #' }, { template: '#: phoneNumber #' }, { template: '#: contactGroup #' }, { template: '#: email #' }];
                //var data = _.filter(this.state.data, function (record) { return record.visible; });
                this.dataSource = new kendo.data.DataSource({ data: contacts });
            },

            componentDidUpdate: function () {
                //var data = _.filter(this.state.data, function (record) { return record.visible; });
                //this.dataSource.data(this.state.data);
            },

            render: function () {
                return (
                    <div className="App">
                        <KendoGrid dataSource={this.dataSource} columns={this.columns} />
                        <div className="facets">

                        </div>
                    </div>
                );
            }
        });

        React.renderComponent(<App />, rootElement);
    }


    var FormField = Forms.FormField;
    var KendoText = Forms.KendoText;
    var MultilineText = Forms.MultilineText;
    var MultiSelect = Forms.MultiSelect;
    var KendoComboBox = Forms.KendoComboBox;
    var KendoNumber = Forms.KendoNumber;
    var KendoDate = Forms.KendoDate;
    var KendoDatetime = Forms.KendoDatetime;
    var CheckBox = Forms.CheckBox;
    var Radio = Forms.Radio;
    var RadioGroup = Forms.RadioGroup;
    var SwitchBox = Forms.SwitchBox;
    var Carousel = Forms.Carousel;
    var KendoGrid = Forms.KendoGrid;


    return {
        entrypoint: entrypoint
    };
});
