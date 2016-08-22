import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'

const PropTypes = React.PropTypes;

export function noop() {

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

export function widgetPropTypes(customPropTypes) {
    return Object.assign({
        id: PropTypes.string,
        value: PropTypes.any,
        onChange: PropTypes.func
    }, customPropTypes);
}

