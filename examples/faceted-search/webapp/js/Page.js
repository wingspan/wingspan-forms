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
                    filters: _(ContactModel.properties).chain()
                        .map(function (fieldInfo, fieldName) { return [fieldName, {}]; })
                        .object()
                        .value()
                };
            },

            componentWillMount: function () {
                this.columns = [{ template: '#: lastName #' }, { template: '#: firstName #' }, { template: '#: phoneNumber #' }, { template: '#: contactGroup #' }, { template: '#: email #' }];
                this.dataSource = new kendo.data.DataSource({ data: contacts });
            },

            componentDidUpdate: function () {
                var filters = _.map(this.state.filters, function (fieldValues, fieldName) {
                    var activeFieldValues = filterMap(fieldValues, function (pair) { return !!pair[1]; });
                    return _.map(_.keys(activeFieldValues), function (fieldValue) {
                        return { field: fieldName, operator: "eq", value: fieldValue };
                    });
                });
                this.dataSource.filter({ logic: 'or', filters: _.flatten(filters) });
            },

            render: function () {

                var facets = _.chain(filterMap(ContactModel.properties, function (pair) { return !pair[1].hidden; }))
                    .map(function (fieldInfo, fieldName) {
                        return [fieldName, _.groupBy(contacts, fieldName)]
                    }).object().value();

                var facetControls = _.map(facets, function (facetVals, filterField) {
                    var checkboxes = _.map(facetVals, function (facetVal, facetName) {
                        return (
                            <div className="facetFilterControl" key={facetName}>
                                <CheckBox label={facetName} id={facetName} value={this.state.filters[filterField][facetName]}
                                        onChange={_.partial(this.onChange, 'filters', filterField, facetName)}/>
                                <span className="count">{facetVal.length}</span>
                            </div>
                        );
                    }.bind(this));
                    return (
                        <FormField fieldInfo={_.object([['label', ContactModel.properties[filterField].label]])}>
                            {checkboxes}
                        </FormField>
                    );
                }.bind(this));

                return (
                    <div className="App">
                        <div>
                            <div className="facets">
                                <div>{facetControls}</div>
                            </div>
                            <KendoGrid className="KendoGrid" dataSource={this.dataSource} columns={this.columns} height="600"/>
                        </div>
                        <pre>{JSON.stringify(this.state, undefined, 2)}</pre>
                    </div>
                );
            }
        });

        React.renderComponent(<App />, rootElement);
    }

    function filterMap (record, predicate) {
        return _.object(_.filter(_.pairs(record), predicate));
    };


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
