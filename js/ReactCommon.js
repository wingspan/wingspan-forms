/** @jsx React.DOM */
define([
    'underscore', 'react', './util/debug'
], function (_, React, debug) {
    'use strict';

    /* jshint ignore:start */

    function wrapItemsDiv(jsxs) {
        var acc = [];
        _.each(jsxs, function (jsx, i) {
            acc.push(<div key={i}>{jsx}</div>)
        });
        return acc;
    }

    /* jshint ignore:end */

    return {
        wrapItemsDiv: wrapItemsDiv
    };
});
