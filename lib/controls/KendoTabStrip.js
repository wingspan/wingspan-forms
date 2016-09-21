'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _kendo = require('kendo');

var _kendo2 = _interopRequireDefault(_kendo);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ReactCommon = require('../ReactCommon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $ = _kendo2.default.jQuery;

/**
 * Takes a "tabs" prop which is a map from title string to a JSX instance.
 * This component is not presently stateful so we don't get to control what is selected.
 */
var KendoTabStrip = _react2.default.createClass({
    displayName: 'KendoTabStrip',


    componentWillMount: function componentWillMount() {
        console.assert((0, _ReactCommon.isObject)(this.props.tabs) && Object.keys(this.props.tabs).length > 0);
    },

    componentWillUnmount: function componentWillUnmount() {
        this.tabStrip.unbind('select', this.onSelect);
    },

    componentDidMount: function componentDidMount() {
        var $el = (0, _ReactCommon.findWidget)(this);
        $el.kendoTabStrip({
            select: this.onSelect
        });
        this.tabStrip = $el.data('kendoTabStrip');
    },

    onSelect: function onSelect(event) {
        var item = $(event.item);
        var index = item.data('wspt-index');

        if (this.props.onChange && !this.suppressEvents) {
            //                this.props.onChange(index);
        }
    },

    /* jshint ignore:start */
    render: function render() {
        var _this = this;

        var keys = Object.keys(this.props.tabs);
        var lis = keys.map(function (title, index) {
            return index === 0 ? _react2.default.createElement(
                'li',
                { className: 'k-state-active', 'data-wspt-index': index, key: index },
                title
            ) : _react2.default.createElement(
                'li',
                { 'data-wspt-index': index, key: index },
                title
            );
        });

        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'ul',
                null,
                lis
            ),
            (0, _ReactCommon.wrapItemsDiv)(keys.map(function (title) {
                return _this.props.tabs[title];
            }))
        );
    }
    /* jshint ignore:end */
});

exports.default = KendoTabStrip;