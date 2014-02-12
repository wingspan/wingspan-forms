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
                    filters: [] // { filterField: 'name', filterValue: 'Dustin' }
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

                var facets = _.chain(ContactModel.properties)
                    .map(function (fieldInfo, fieldName) {
                        return [fieldName, _.groupBy(contacts, fieldName)]
                    }).object().value();

                var facetControls = _.map(facets, function (facetVals, filterField) {
                    var checkboxes = _.map(facetVals, function (facetVal, facetName) {
                        return (
                            <span key={facetName}>
                                <CheckBox label={facetName} id={facetName} value={false}
                                    onChange={_.partial(this.onFacetToggle)}/>
                                <span className="count">{facetVal.length}</span>
                            </span>
                        );
                    });
                    return (
                        <div>
                            <span>{filterField}</span>
                            {checkboxes}
                        </div>
                    );
                });

                return (
                    <div className="App">
                        <KendoGrid dataSource={this.dataSource} columns={this.columns} />
                        <div className="facets">
                            {facetControls}
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
