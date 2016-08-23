import _ from 'lodash'
import React from 'react'
import { findWidget, isObject } from '../ReactCommon'

const PropTypes = React.PropTypes;

/**
 * Takes a "tabs" prop which is a map from title string to a JSX instance.
 * This component is not presently stateful so we don't get to control what is selected.
 */
var TabStrip = React.createClass({
    propTypes: {
        tabs: PropTypes.object.isRequired,
        selectedTab: PropTypes.number,
        onChange: PropTypes.func.isRequired,
        elideInactiveContent: PropTypes.bool
    },

    getDefaultProps: function () {
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

    componentWillMount: function () {
        console.assert(isObject(this.props.tabs) && Object.keys(this.props.tabs).length > 0);
        this.stableUniqueId = _.uniqueId('tab-');
    },

    /**
     * This fixes a problem with certain content that switches from hidden to shown.
     * My theory is that browsers don't flow hidden elements.  The particular case involves picking a Task transition that make metadata editable.
     * At the time this happens, the metadata are re-rendered but are not shown and the splitter gets confounded.  This is simply to force a reflow of the
     * content that is newly made visible.
     */
    componentDidUpdate: function () {
        findWidget(this).find('.k-content.k-state-active').resize();
    },

    /* jshint ignore:start */
    render: function () {
        var self = this;

        var keys = Object.keys(this.props.tabs),
            len = keys.length;
        var lis = keys.map(function (title, index) {
            var id = `${self.stableUniqueId}-${index}`;
            var classes = [
                index === 0 ? 'k-first' : null,
                index === len - 1 ? 'k-last' : null,
                'k-state-default',
                'k-item',
                index === self.props.selectedTab ? 'k-tab-on-top k-state-active' : null
            ];

            return (
                <li key={index} className={_.compact(classes).join(' ')} role="tab" aria-controls={id}>
                    <a className="k-link" onClick={_.partial(self.onTabClick, index)}>{title}</a>
                </li>);
        });

        var divs = keys.map(key => this.props.tabs[key])
            .map(function (jsx, index) {
                return (index === self.props.selectedTab
                    ? (<div key={index} className="k-content k-state-active" role="tabpanel" aria-expanded="true" style={VISIBLE}>{jsx}</div>)
                    : (<div key={index} className="k-content" aria-hidden="true" role="tabpanel" aria-expanded="false" style={HIDDEN}>{self.props.elideInactiveContent ? null : jsx}</div>));
            });

        var className = _.compact(['k-widget', 'k-header', 'k-tabstrip', this.props.className]).join(' ');
        return (
            <div data-role="tabstrip" tabIndex="0" className={className} role="tablist">
                <ul className="k-tabstrip-items k-reset">
                    {lis}
                </ul>
                {divs}
            </div>
        );
    },
    /* jshint ignore:end */

    onTabClick: function(index) {
        this.props.onChange(index);
    }
});

var VISIBLE = { display: 'block', height: 'auto', overflow: 'visible', opacity: 1 };
var HIDDEN = { height: 'auto', overflow: 'visible', opacity: 1, display: 'none' };

export default TabStrip;