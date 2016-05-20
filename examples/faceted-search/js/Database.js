define([
    'underscore', 'kendo', 'q',
    './util',
    './Fixtures',
    'json!../textassets/types/Contact.json'
], function (_, kendo, Q, util, Fixtures, ContactModel) {
    'use strict';

    ContactModel = ContactModel.data;
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

            var results = _.filter(database, _.partial(whereClause, filters));

            var facetableFieldInfos = util.filterMap(ContactModel.properties, function (pair) { return !pair[1].hidden; });
            var applicableFieldNames = _.keys(facetableFieldInfos);
            var facets = _.chain(applicableFieldNames)
                .map(_.partial(computeFacet, database, filters))
                .object()
                .value();

            return { results: results, facets: facets };
        });
    }


    function computeFacet (database, filters, fieldName) {
        // want counts based on the results,
        // but want counts for all fields even if they aren't in the results
        var valuesForField = _.unique(_.pluck(database, fieldName));
        var counts = _.map(valuesForField, _.partial(count, database, filters, fieldName));
        var countsByValue = _.object(_.zip(valuesForField, counts));
        return [fieldName, countsByValue];
    }

    function count (database, allFilters, fieldName /*contactGroup*/, value /*work*/) {
        // all facets, excluding this fieldName's facets
        var applicableFieldNames = _.difference(_.keys(allFilters), [fieldName]);
        var applicableFilters = util.filterMap(allFilters, function (pair) { return _.contains(applicableFieldNames, pair[0]); });

        var results = _.filter(database, _.partial(whereClause, applicableFilters));
        var groupedResults = _.groupBy(results, fieldName);
        var countsByVal = _.object(_.map(groupedResults, function (v, k) { return [k, v.length]; })); // does too much work- computes all counts, not just the one we need
        return countsByVal[value] || 0; // results that were filtered out of the grid have zero count
    }

    function whereClause (filters, record) {
        // for each facet, any of the values (lastname: Getz + Smith)
        // all of the facets: (lastName: Getz + Smith) and (contactGroup: work)
        return _.every(_.map(filters, function (filter, facet) {
            if (filter.length === 0) return true; // no selection means all selections
            else return _.contains(filter, record[facet]);
        }), _.identity);
    }

    return { queryFacets: queryFacets };
});
