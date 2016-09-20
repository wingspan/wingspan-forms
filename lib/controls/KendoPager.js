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

var PropTypes = _react2.default.PropTypes;

/*
    Kendo messages defaults:
    http://docs.telerik.com/kendo-ui/api/web/pager#configuration-messages

    messages: {
        display: '{0} - {1} of {2} items',
        empty: 'No items to display',
        page: 'Page',
        of: 'of {0}',
        itemsPerPage: 'items per page',
        first: 'Go to the first page',
        previous: 'Go to the previous page',
        next: 'Go to the next page',
        last: 'Go to the last page',
        refresh: 'Refresh'
    }
 */

var KendoPager = _react2.default.createClass({
    displayName: 'KendoPager',

    propTypes: {
        dataSource: PropTypes.object.isRequired,
        className: PropTypes.string,
        messages: PropTypes.object,
        onChange: PropTypes.func
    },

    getDefaultProps: function getDefaultProps() {
        return {
            className: 'k-pager-wrap',
            // Empty object means override none of kendo's defaults, which are shown above for convenience
            messages: {},
            change: _ReactCommon.noop
        };
    },

    componentDidMount: function componentDidMount() {
        var $el = (0, _ReactCommon.findWidget)(this);

        $el.kendoPager({
            dataSource: this.props.dataSource,
            messages: this.props.messages,
            change: this.props.onChange
        });
    },

    componentWillUnmount: function componentWillUnmount() {
        (0, _ReactCommon.findWidget)(this, 'kendoPager').destroy();
    },

    render: function render() {
        return _react2.default.createElement('div', { className: this.props.className });
    }
});

exports.default = KendoPager;