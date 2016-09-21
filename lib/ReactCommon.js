'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.noop = noop;
exports.isEmpty = isEmpty;
exports.isObject = isObject;
exports.isString = isString;
exports.findWidget = findWidget;
exports.wrapItemsDiv = wrapItemsDiv;
exports.widgetConfig = widgetConfig;
exports.eitherType = eitherType;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PropTypes = _react2.default.PropTypes;

function noop() {}

function isEmpty(thing) {
    return thing == null || thing === '';
}

function isObject(thing) {
    return (typeof thing === 'undefined' ? 'undefined' : _typeof(thing)) === "object" && !!thing;
}

function isString(thing) {
    return typeof thing === "string";
}

function findWidget(component, name) {
    if (!name) {
        // Just return the jquery node (helps with componentDidMount)
        return (0, _jquery2.default)(_reactDom2.default.findDOMNode(component));
    }
    return (0, _jquery2.default)(_reactDom2.default.findDOMNode(component)).data(name);
}

function wrapItemsDiv() {
    var jsxs = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

    return jsxs.map(function (jsx, i) {
        _react2.default.createElement('div', { key: i }, jsx);
    });
}

function widgetConfig(config, moreOptions) {
    for (var key in moreOptions) {
        if (moreOptions.hasOwnProperty(key) && !config.hasOwnProperty(key)) {
            config[key] = moreOptions[key];
        }
    }
    return config;
}

function eitherType(type1, type2) {
    type1 = isString(type1) ? PropTypes[type1] : type1;
    type2 = isString(type2) ? PropTypes[type2] : type2;

    return PropTypes.oneOfType([type1, type2]);
}