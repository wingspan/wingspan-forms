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

var ROOT_STYLE = {
    position: 'relative'
}; /* Copyright (c) 2015-2016 Wingspan Technology, Inc. */

var TOOLBAR_STYLE = {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 0,
    overflow: 'hidden',
    paddingLeft: '10px',
    backgroundColor: 'gray'
};

var HoverView = _react2.default.createClass({
    displayName: 'HoverView',

    propTypes: {
        enabled: _react2.default.PropTypes.bool
    },

    componentDidMount: function componentDidMount() {
        var _this = this;

        var $el = (0, _ReactCommon.findWidget)(this);

        this.onMouseEnter = function () {
            if (!_this.props.enabled) {
                return;
            }
            _kendo2.default.fx($el.find('.toolbar')).expand('vertical').stop().play();
        };
        this.onMouseLeave = function () {
            if (!_this.props.enabled) {
                return;
            }
            _kendo2.default.fx($el.find('.toolbar')).expand('vertical').stop().reverse();
        };

        $el.on('mouseenter', this.onMouseEnter);
        $el.on('mouseleave', this.onMouseLeave);
    },

    componentWillUnmount: function componentWillUnmount() {
        var $el = (0, _ReactCommon.findWidget)(this);

        $el.off('mouseenter', this.onMouseEnter);
        $el.off('mouseleave', this.onMouseLeave);
    },

    render: function render() {
        var kids = _react2.default.Children.toArray(this.props.children);

        return _react2.default.createElement(
            'div',
            { className: 'hoverPager', style: ROOT_STYLE },
            kids[0],
            _react2.default.createElement(
                'div',
                { className: 'toolbar', style: TOOLBAR_STYLE },
                kids[1]
            )
        );
    }
});

exports.default = HoverView;