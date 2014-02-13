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


    var App = React.createClass({displayName: 'App',
        mixins: [Forms.TopStateMixin],

        getInitialState: function () {
            this.emptyFilters = _.object(_.map(_.keys(ContactModel.properties), function (field) { return [field, []]; }));
            return {
                filters: this.emptyFilters,
                facets: {}
            };
        },

        componentWillMount: function () {
            this.columns = [
                { title: ContactModel.properties['firstName'].label, width: '20%', template: '#: firstName #' },
                { title: ContactModel.properties['lastName'].label, width: '20%', template: '#: lastName #' },
                { title: ContactModel.properties['contactGroup'].label, width: '15%', template: '#: contactGroup #' },
                //{ template: '#: phoneNumber #' },
                { title: ContactModel.properties['email'].label, template: '#: email #' }
            ];
            this.dataSource = new FacetDataStore({ transport: new MockDatabaseTransport() });
            this.dataSource._facetFilters = this.state.filters;
            this.dataSource.read().then(this.updateFacets).done();
        },

        componentWillUpdate: function (nextProps, nextState) {
            // if our filter state changed, we need to query for the facets
            if (!_.isEqual(this.state.filters, nextState.filters)) {
                this.dataSource._facetFilters = nextState.filters; // how to plumb this nicely?
                this.dataSource.read().then(this.updateFacets).done();
            }
        },

        updateFacets: function () {
            this.setState({ facets: this.dataSource.facets });
        },

        onFilterToggle: function (facet/*contactGroup*/, value/*work*/, isActive/*true*/) {
            var currentFiltersForField = this.state.filters[facet];
            var nextFiltersForField = (isActive ? _.union :_.difference)(currentFiltersForField, [value]);
            this.onChange('filters', facet, nextFiltersForField);
        },

        onClearFilters: function () {
            this.onChange('filters', this.emptyFilters);
        },

        onClearFilter: function (facet, filter) {
            this.onChange('filters', facet, _.difference(this.state.filters[facet], [filter]));
        },

        render: function () {

            var facetControls = _.map(this.state.facets, function (countsByVal/*work:6*/, facet/*contactGroup*/) {
                var checkboxes = _.map(countsByVal, function (count, val) {
                    return (
                        React.DOM.div( {className:"facetFilterControl", key:_.str.sprintf('%s-%s', facet, val)}, 
                            CheckBox( {label:val, id:val, value:_.contains(this.state.filters[facet], val),
                                onChange:_.partial(this.onFilterToggle, facet, val)}),
                            React.DOM.span( {className:"count"}, count)
                        )
                    );
                }.bind(this));
                return (
                    FormField( {key:facet, fieldInfo:_.object([['label', ContactModel.properties[facet].label]])}, 
                        checkboxes
                    )
                );
            }.bind(this));

            var filterControls = _.map(this.state.filters, function (filters, facet) {
                return _.map(filters, function (filter) {
                    var key = _.str.sprintf('%s-%s', facet, filter);
                    return (React.DOM.span( {className:"filter"}, filter,React.DOM.i( {className:"closer", onClick:_.partial(this.onClearFilter, facet, filter)} )));
                }.bind(this));
            }.bind(this));

            filterControls = _.flatten(filterControls);
            filterControls = (filterControls.length > 0
                ? (React.DOM.span( {className:"filters"}, React.DOM.span( {className:"trash", onClick:this.onClearFilters}),_.flatten(filterControls)))
                : (React.DOM.span( {className:"hint"}, "Use filters on the left to narrow results.")));

            return (
                React.DOM.div( {className:"App"}, 
                    React.DOM.div( {className:"table"}, 
                        React.DOM.div( {className:"row"}, 
                            React.DOM.div( {className:"left"}),
                            React.DOM.div( {className:"right"}, 
                                React.DOM.div(null, 
                                    React.DOM.div( {className:"filterControls"}, 
                                        filterControls
                                    )
                                )
                            )
                        ),
                        React.DOM.div( {className:"row"}, 
                            React.DOM.div( {className:"left"}, 
                                React.DOM.div(null, facetControls)
                            ),
                            React.DOM.div( {className:"right"}, 
                                React.DOM.div(null, 
                                    KendoGrid( {className:"KendoGrid", dataSource:this.dataSource,
                                    columns:this.columns, height:"400"} )
                                )
                            )
                        )
                    ),
                    React.DOM.pre(null, JSON.stringify(this.state, undefined, 2))
                )
            );
        }
    });


    function entrypoint(rootElement) {
        React.renderComponent(App(null ), rootElement);
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
