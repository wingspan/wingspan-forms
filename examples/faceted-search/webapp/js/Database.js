define([
    'underscore', 'kendo', 'q',
    'Fixtures',
    'text!textassets/types/Contact.json'
], function (_, kendo, Q, Fixtures, ContactModel) {
    'use strict';

    var ContactModel = JSON.parse(ContactModel).data;
    var database = Fixtures.generateDatabase();

    /*
    "filters": {
        "lastName": [],
        "firstName": ["Ernie", "Alice"],
        "contactGroup": ["family","friend"]
    }*/
    function queryFacets (filters) {
        return Q.delay(100).then(function () {
            // Backend's job is to apply the filters and compute the facets

            function whereClause (record) {
                // for each facet, any of the values (lastname: Getz + Smith)
                // all of the facets: (lastName: Getz + Smith) and (contactGroup: work)
                return _.every(_.map(filters, function (filter, facet) {
                    if (filter.length === 0) return true; // no selection means all selections
                    else return _.contains(filter, record[facet]);
                }), _.identity);
            }

            var facetableFieldInfos = filterMap(ContactModel.properties, function (pair) { return !pair[1].hidden; });
            var facets = _.chain(facetableFieldInfos)
                .map(function (fieldInfo, fieldName) {
                    var grouped = _.groupBy(database, fieldName);
                    var countsByVal = _.object(_.map(grouped, function (v, k) { return [k, v.length] }));
                    return [fieldName, countsByVal];
                }).object().value();

            return { results: _.filter(database, whereClause), facets: facets };
        });
    }


    function filterMap (record, predicate) {
        return _.object(_.filter(_.pairs(record), predicate));
    }

    return { queryFacets: queryFacets };
});
