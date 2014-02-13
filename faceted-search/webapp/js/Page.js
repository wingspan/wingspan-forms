/** @jsx React.DOM */
define([
    'underscore', 'react', 'jquery', 'kendo', 'wingspan-forms',
    'FacetDataStore',
    'MockDatabaseTransport',
    'text!textassets/types/Contact.json',
    'underscore-string'
], function (_, React, $, kendo, Forms, FacetDataStore, MockDatabaseTransport, ContactModel) {
    'use strict';

    var ContactModel = JSON.parse(ContactModel).data;


    var App = React.createClass({
        mixins: [Forms.TopStateMixin],

        getInitialState: function () {
            return {
                filters: _(ContactModel.properties).chain()
                    .map(function (fieldInfo, fieldName) { return [fieldName, {}]; })
                    .object()
                    .value(),
                facets: {}
            };
        },

        componentWillMount: function () {
            this.columns = [
                { template: '#: firstName #' },
                { template: '#: lastName #' },
                { template: '#: contactGroup #' },
                //{ template: '#: phoneNumber #' },
                { template: '#: email #' }
            ];
            this.dataSource = new FacetDataStore({ transport: new MockDatabaseTransport() });
            this.dataSource.read().then(this.updateFacets).done();
        },

        componentWillUpdate: function (nextProps, nextState) {
            // if our filter state changed, we need to query for the facets
            if (!_.isEqual(this.state.filters, nextState.filters)) {
                this.dataSource.read().then(this.updateFacets).done();
            }
        },

        updateFacets: function () {
            this.setState({ facets: this.dataSource.facets });
        },

        render: function () {

            var facetControls = _.map(this.state.facets, function (facetVals, filterField) {
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
                    <FormField key={filterField} fieldInfo={_.object([['label', ContactModel.properties[filterField].label]])}>
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


    function entrypoint(rootElement) {
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
