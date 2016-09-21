import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'

const PropTypes = React.PropTypes;

export function noop() {
}

export function isEmpty(thing) {
    return thing == null || thing === '';
}

export function isObject(thing) {
    return typeof thing === "object" && !!thing;
}

export function isString(thing) {
    return typeof thing === "string";
}

export function findWidget(component, name) {
    if (!name) {
        // Just return the jquery node (helps with componentDidMount)
        return $(ReactDOM.findDOMNode(component));
    }
    return $(ReactDOM.findDOMNode(component)).data(name);
}

export function wrapItemsDiv(jsxs = []) {
    return jsxs.map(function (jsx, i) {
        React.createElement('div', { key: i }, jsx);
    });
}

export function widgetConfig(config, moreOptions) {
    for (var key in moreOptions) {
        if (moreOptions.hasOwnProperty(key) && !config.hasOwnProperty(key)) {
            config[key] = moreOptions[key];
        }
    }
    return config;
}

export function eitherType(type1, type2) {
    type1 = isString(type1) ? PropTypes[type1] : type1;
    type2 = isString(type2) ? PropTypes[type2] : type2;

    return PropTypes.oneOfType([type1, type2]);
}

