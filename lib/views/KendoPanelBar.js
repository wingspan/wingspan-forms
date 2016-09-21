'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _isEqual2 = require('lodash/isEqual');

var _isEqual3 = _interopRequireDefault(_isEqual2);

var _kendo = require('kendo');

var _kendo2 = _interopRequireDefault(_kendo);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ReactCommon = require('../ReactCommon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Children = _react2.default.Children; /* Copyright (c) 2015-2016 Wingspan Technology, Inc. */

var PropTypes = _react2.default.PropTypes;

var NO_ANIMATION = false;

function panelsChanged(kids1, kids2) {
    var toTitle = function toTitle(c) {
        return c.props.title;
    };

    return !(0, _isEqual3.default)(Children.map(kids1, toTitle), Children.map(kids2, toTitle));
}

var KendoPanelBar = _react2.default.createClass({
    displayName: 'KendoPanelBar',

    /* Not supporting "contentUrls" or "dataSource" because React components are better content */
    propTypes: {
        animation: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
        className: PropTypes.string,
        expandMode: PropTypes.string
    },

    getDefaultProps: function getDefaultProps() {
        return {
            expandMode: 'multiple'
        };
    },

    componentDidMount: function componentDidMount() {
        var $el = (0, _ReactCommon.findWidget)(this);

        // The PanelBar is populated via the DOM generated by render
        $el.kendoPanelBar({
            animation: this.props.animation,
            expandMode: this.props.expandMode
        });

        // expand based on the 'data-expand' attribute used in render()
        $el.data('kendoPanelBar').expand($el.children('[data-expand=true]'));
    },

    componentWillUnmount: function componentWillUnmount() {
        // Don't destroy() because it destroys all kendo widgets owned by nested components.
        // findWidget(this, 'kendoPanelBar').destroy();
    },

    componentDidUpdate: function componentDidUpdate(prevProps) {
        // When new panels are added in an update, they need to be styled properly
        if (panelsChanged(this.props.children, prevProps.children)) {
            var panelBar = Common.findWidget(this, 'kendoPanelBar');

            panelBar._updateClasses(); // Forced to use this private method
            panelBar.expand(panelBar.element.children('[data-expand=true]'), NO_ANIMATION);
        }
    },

    render: function render() {
        var kids = Children.toArray(this.props.children);

        return _react2.default.createElement(
            'ul',
            { className: this.props.className },
            kids.filter(function (child) {
                return child.props.visible !== false;
            })
        );
    }
});

KendoPanelBar.Item = _react2.default.createClass({
    displayName: 'Item',

    propTypes: {
        title: PropTypes.string,
        expand: PropTypes.bool,
        visible: PropTypes.bool
    },

    render: function render() {
        return _react2.default.createElement(
            'li',
            { 'data-expand': this.props.expand },
            _react2.default.createElement(
                'span',
                { className: 'k-link k-header' },
                this.props.title
            ),
            _react2.default.createElement(
                'div',
                null,
                this.props.children
            )
        );
    }
});

exports.default = KendoPanelBar;