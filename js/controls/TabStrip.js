/** @jsx React.DOM */
define([
    'underscore', 'jquery', 'react', 'kendo', 'wingspan-forms/util/debug',
    'wingspan-forms/ReactCommon'
], function (_, $, React, kendo, debug, ReactCommon) {
    'use strict';

    /**
     * Takes a "tabs" prop which is a map from title string to a JSX instance.
     * This component is not presently stateful so we don't get to control what is selected.
     */
    var TabStrip = React.createClass({

        getDefaultProps: function () {
            return {
                selectedTab: 0,
                /**
                 * This controls whether to render the content of inactive tabs.
                 * The reason for this is that some usages require state to persist in the hidden tabs.
                 * E.g. when correcting an Inbox task we need the task panel to persist to record the user's entries even when they switch over to the metadata tab.
                 */
                elideInactiveContent: true
            };
        },

        getInitialState: function () {
            return {
                activeIndex: this.props.selectedTab
            };
        },

        componentWillMount: function () {
            debug.verify(_.isObject(this.props.tabs) && _.keys(this.props.tabs).length > 0);
            this.stableUniqueId = _.uniqueId('tab-');
        },

        /**
         * This fixes
         */
        componentDidUpdate: function () {
            $(this.getDOMNode()).find('.k-content.k-state-active').resize();
        },

        /* jshint ignore:start */
        render: function () {
            var self = this;

            var lis = [];
            var keys = _.keys(this.props.tabs),
                len = keys.length;
            _.each(keys, function (title, index) {
                var id = _.str.sprintf('%s-%s', self.stableUniqueId, index);
                var classes = [
                    index === 0 ? 'k-first' : null,
                    index === len - 1 ? 'k-last' : null,
                    'k-state-default',
                    'k-item',
                    index === self.state.activeIndex ? 'k-tab-on-top k-state-active' : null
                ];

                lis.push((<li key={index} className={_.compact(classes).join(' ')} role="tab" aria-controls={id}><a className="k-link" onClick={_.partial(self.onTabClick, index)}>{title}</a></li>));
            });

            var divs = [];
            _.each(_.values(this.props.tabs), function (jsx, index) {
                var id = _.str.sprintf('%s-%s', self.stableUniqueId, index);
                var jsx = (index === self.state.activeIndex
                    ? (<div className="k-content k-state-active" role="tabpanel" aria-expanded="true" style={visibleStyle}>{jsx}</div>)
                    : (<div className="k-content" aria-hidden="true" role="tabpanel" aria-expanded="false" style={hiddenStyle}>{self.props.elideInactiveContent ? null : jsx}</div>));
                divs.push(jsx);
            });

            return (
                <div data-role="tabstrip" tabIndex="0" className="k-widget k-header k-tabstrip" role="tablist">
                    <ul className="k-tabstrip-items k-reset">
                        {lis}
                    </ul>
                    {divs}
                </div>
            );
        },
        /* jshint ignore:end */

        onTabClick: function(index) {
            this.setState({activeIndex: index}, _.noop);
        }
    });

    var styleDisplayBlock = {display: 'block'};
    var visibleStyle = { display: 'block', height: 'auto', overflow: 'visible', opacity: 1 };
    var hiddenStyle = { height: 'auto', overflow: 'visible', opacity: 1, display: 'none' };

    return TabStrip;
});