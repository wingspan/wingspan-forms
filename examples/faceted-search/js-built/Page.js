/** @jsx React.DOM */
define([
    'underscore', 'underscore.string', 'react', 'jquery', 'kendo', 'wingspan-forms',
    'util',
    'FacetDataStore',
    'text!textassets/types/Contact.json'
], function (_, str, React, $, kendo, Forms, util, FacetDataStore, ContactModel) {
    'use strict';

    ContactModel = JSON.parse(ContactModel).data;


    var App = React.createClass({displayName: "App",

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
            this.dataSource = new FacetDataStore();
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
            this.onChange(facet, nextFiltersForField);
        },

        onClearFilters: function () {
            this.setState({ filters: this.emptyFilters });
        },

        onClearFilter: function (facet, filter) {
            this.onChange(facet, _.difference(this.state.filters[facet], [filter]));
        },

        onChange: function (facet, value) {
            var newFilters = _.clone(this.state.filters);
            newFilters[facet] = value;

            this.setState({ filters: newFilters });
        },

        render: function () {

            var facetControls = _.map(this.state.facets, function (countsByVal/*work:6*/, facet/*contactGroup*/) {
                var nonZeroCountsByVal = util.filterMap(countsByVal, function (pair) {
                    return pair[1] !== 0;
                });
                var checkboxes = _.map(nonZeroCountsByVal, function (count, val) {
                    var controlId = str.sprintf('%s-%s', facet, val);
                    return (
                        React.createElement("div", {className: "facetFilterControl", key: controlId}, 
                            React.createElement(Forms.CheckBox, {label: val, id: controlId, value: _.contains(this.state.filters[facet], val), 
                                onChange: _.partial(this.onFilterToggle, facet, val)}), 
                            React.createElement("span", {className: "count"}, count)
                        )
                    );
                }.bind(this));
                return (
                    React.createElement(Forms.FormField, {key: facet, fieldInfo: _.object([['label', ContactModel.properties[facet].label]])}, 
                        checkboxes
                    )
                );
            }.bind(this));

            var filterControls = _.map(this.state.filters, function (filters, facet) {
                return _.map(filters, function (filter) {
                    var key = str.sprintf('%s-%s', facet, filter);
                    return (React.createElement("span", {className: "filter", key: key}, filter, React.createElement("i", {className: "closer", onClick: _.partial(this.onClearFilter, facet, filter)})));
                }.bind(this));
            }.bind(this));

            filterControls = _.flatten(filterControls);
            filterControls = (filterControls.length > 0
                ? (React.createElement("span", {className: "filters"}, React.createElement("span", {className: "trash", onClick: this.onClearFilters}), _.flatten(filterControls)))
                : (React.createElement("span", {className: "hint"}, "Use filters on the left to narrow results.")));

            return (
                React.createElement("div", {className: "App"}, 
                    React.createElement("div", {className: "table"}, 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "left"}), 
                            React.createElement("div", {className: "right"}, 
                                React.createElement("div", null, 
                                    React.createElement("div", {className: "filterControls"}, 
                                        filterControls
                                    )
                                )
                            )
                        ), 
                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "left"}, 
                                React.createElement("div", null, facetControls)
                            ), 
                            React.createElement("div", {className: "right"}, 
                                React.createElement("div", null, 
                                    React.createElement(Forms.KendoGrid, {
                                        className: "KendoGrid", 
                                        dataSource: this.dataSource, 
                                        columns: this.columns, 
                                        height: "400"})
                                )
                            )
                        )
                    ), 
                    React.createElement("pre", null, JSON.stringify(this.state, undefined, 2))
                )
            );
        }
    });


    function entrypoint(rootElement) {
        React.render(React.createElement(App, null), rootElement);
    }


    return {
        entrypoint: entrypoint
    };
});
