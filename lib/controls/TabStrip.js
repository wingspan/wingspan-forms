'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _partial2 = require('lodash/partial');

var _partial3 = _interopRequireDefault(_partial2);

var _compact2 = require('lodash/compact');

var _compact3 = _interopRequireDefault(_compact2);

var _uniqueId2 = require('lodash/uniqueId');

var _uniqueId3 = _interopRequireDefault(_uniqueId2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ReactCommon = require('../ReactCommon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PropTypes = _react2.default.PropTypes;

/**
 * Takes a "tabs" prop which is a map from title string to a JSX instance.
 * This component is not presently stateful so we don't get to control what is selected.
 */
var TabStrip = _react2.default.createClass({
    displayName: 'TabStrip',

    propTypes: {
        tabs: PropTypes.object.isRequired,
        selectedTab: PropTypes.number,
        onChange: PropTypes.func.isRequired,
        elideInactiveContent: PropTypes.bool
    },

    getDefaultProps: function getDefaultProps() {
        return {
            selectedTab: 0,
            /**
             * This controls whether to render the content of inactive tabs.
             * The reason for this is that some usages require state to persist in the hidden tabs.
             * E.g. when correcting an Inbox task we need the task panel to persist to record the user's entries even when they switch over to the metadata tab.
             */
            elideInactiveContent: true,
            className: undefined
        };
    },

    componentWillMount: function componentWillMount() {
        console.assert((0, _ReactCommon.isObject)(this.props.tabs) && Object.keys(this.props.tabs).length > 0);
        this.stableUniqueId = (0, _uniqueId3.default)('tab-');
    },

    /**
     * This fixes a problem with certain content that switches from hidden to shown.
     * My theory is that browsers don't flow hidden elements.  The particular case involves picking a Task transition that make metadata editable.
     * At the time this happens, the metadata are re-rendered but are not shown and the splitter gets confounded.  This is simply to force a reflow of the
     * content that is newly made visible.
     */
    componentDidUpdate: function componentDidUpdate() {
        (0, _ReactCommon.findWidget)(this).find('.k-content.k-state-active').resize();
    },

    /* jshint ignore:start */
    render: function render() {
        var _this = this;

        var self = this;

        var keys = Object.keys(this.props.tabs),
            len = keys.length;
        var lis = keys.map(function (title, index) {
            var id = self.stableUniqueId + '-' + index;
            var classes = [index === 0 ? 'k-first' : null, index === len - 1 ? 'k-last' : null, 'k-state-default', 'k-item', index === self.props.selectedTab ? 'k-tab-on-top k-state-active' : null];

            return _react2.default.createElement(
                'li',
                { key: index, className: (0, _compact3.default)(classes).join(' '), role: 'tab', 'aria-controls': id },
                _react2.default.createElement(
                    'a',
                    { className: 'k-link', onClick: (0, _partial3.default)(self.onTabClick, index) },
                    title
                )
            );
        });

        var divs = keys.map(function (key) {
            return _this.props.tabs[key];
        }).map(function (jsx, index) {
            return index === self.props.selectedTab ? _react2.default.createElement(
                'div',
                { key: index, className: 'k-content k-state-active', role: 'tabpanel', 'aria-expanded': 'true', style: VISIBLE },
                jsx
            ) : _react2.default.createElement(
                'div',
                { key: index, className: 'k-content', 'aria-hidden': 'true', role: 'tabpanel', 'aria-expanded': 'false', style: HIDDEN },
                self.props.elideInactiveContent ? null : jsx
            );
        });

        var className = (0, _compact3.default)(['k-widget', 'k-header', 'k-tabstrip', this.props.className]).join(' ');
        return _react2.default.createElement(
            'div',
            { 'data-role': 'tabstrip', tabIndex: '0', className: className, role: 'tablist' },
            _react2.default.createElement(
                'ul',
                { className: 'k-tabstrip-items k-reset' },
                lis
            ),
            divs
        );
    },
    /* jshint ignore:end */

    onTabClick: function onTabClick(index) {
        this.props.onChange(index);
    }
});

var VISIBLE = { display: 'block', height: 'auto', overflow: 'visible', opacity: 1 };
var HIDDEN = { height: 'auto', overflow: 'visible', opacity: 1, display: 'none' };

exports.default = TabStrip;