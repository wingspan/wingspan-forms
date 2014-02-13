define([
    'underscore', 'kendo', 'q',
    'Fixtures',
    'text!textassets/types/Contact.json'
], function (_, kendo, Q, Fixtures, ContactModel) {
    'use strict';

    var ContactModel = JSON.parse(ContactModel).data;
    var database = Fixtures.generateDatabase();


    var MockDatabaseTransport = kendo.Class.extend({
        read: function (request) {
            Q.delay(100).then(function () {

                _.filter(database, function (record) {
                    // for each facet
                    // record has any of the values for that facet
                    //
                });

                // Backend's job is to apply the filters and compute the facets

//                var filters = _.map(this.state.filters, function (fieldValues, fieldName) {
//                    var activeFieldValues = filterMap(fieldValues, function (pair) { return !!pair[1]; });
//                    return _.map(_.keys(activeFieldValues), function (fieldValue) {
//                        return { field: fieldName, operator: "eq", value: fieldValue };
//                    });
//                });
//                this.dataSource.filter({ logic: 'or', filters: _.flatten(filters) });

                var facetableFieldInfos = filterMap(ContactModel.properties, function (pair) { return !pair[1].hidden; });
                var facets = _.chain(facetableFieldInfos)
                    .map(function (fieldInfo, fieldName) {
                        var grouped = _.groupBy(database, fieldName);
                        var countsByVal = _.object(_.map(grouped, function (v, k) { return [k, v.length] }));
                        return [fieldName, countsByVal];
                    }).object().value();

                request.success({ results: database, facets: facets });
            }.bind(this)).done();
        }
    });

    function filterMap (record, predicate) {
        return _.object(_.filter(_.pairs(record), predicate));
    }

    return MockDatabaseTransport;
});
