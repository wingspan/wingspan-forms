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

var KendoTreeView = _react2.default.createClass({
    displayName: 'KendoTreeView',


    propTypes: {
        dataSource: PropTypes.object.isRequired,
        onExpand: PropTypes.func,
        onCollapse: PropTypes.func,
        onSelect: PropTypes.func
    },

    getDefaultProps: function getDefaultProps() {
        return {
            onExpand: _ReactCommon.noop,
            onCollapse: _ReactCommon.noop,
            onSelect: _ReactCommon.noop
        };
    },

    componentDidMount: function componentDidMount() {
        var $el = (0, _ReactCommon.findWidget)(this);

        function propCallback(callback) {
            // Return an event handler that invokes the callback with the relevant node data
            // The event can be canceled if the callback returns false
            return function (e) {
                if (callback(this.dataItem(e.node)) === false) {
                    e.preventDefault();
                }
            };
        }

        $el.kendoTreeView({
            dataSource: this.props.dataSource,
            expand: propCallback(this.props.onExpand),
            collapse: propCallback(this.props.onCollapse),
            select: propCallback(this.props.onSelect)
        });
    },

    componentWillUnmount: function componentWillUnmount() {
        (0, _ReactCommon.findWidget)(this, 'kendoTreeView').destroy();
    },

    componentDidUpdate: function componentDidUpdate(prevProps) {
        if (this.props.dataSource !== prevProps.dataSource) {
            (0, _ReactCommon.findWidget)(this, 'kendoTreeView').setDataSource(this.props.dataSource);
        }
    },

    /*jshint ignore:start */
    render: function render() {
        return _react2.default.createElement('div', { className: this.props.className });
    }
    /*jshint ignore:end */
});

exports.default = KendoTreeView;