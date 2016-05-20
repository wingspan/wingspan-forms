define([
    'underscore'
], function (_) {
    'use strict';

    function filterMap (record, predicate) {
        return _.object(_.filter(_.pairs(record), predicate));
    }

    return {
        filterMap: filterMap
    };
});
