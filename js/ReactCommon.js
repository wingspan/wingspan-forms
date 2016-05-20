
define([
    'underscore', 'jquery', 'react', 'react-dom'
], function (_, $, React, ReactDOM) {
    'use strict';

    function findWidget(component, name) {
        if (!name) {
            // Just return the jquery node (helps with componentDidMount)
            return $(ReactDOM.findDOMNode(component));
        }
        return $(ReactDOM.findDOMNode(component)).data(name);
    }

    function wrapItemsDiv(jsxs) {
        var acc = [];
        _.each(jsxs, function (jsx, i) {
            acc.push(React.createElement('div', {key: i}, jsx));
        });
        return acc;
    }

    return {
        findWidget: findWidget,
        wrapItemsDiv: wrapItemsDiv
    };
});
