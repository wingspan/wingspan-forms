/** @jsx React.DOM */
define([
    'underscore', 'jquery', 'react', 'kendo',
    '../util/debug',
    '../ReactCommon'
], function (_, $, React, kendo, debug, ReactCommon) {
    'use strict';

    void ReactCommon;
    /**
     * Takes a "tabs" prop which is a map from title string to a JSX instance.
     * This component is not presently stateful so we don't get to control what is selected.
     */
    var KendoTabStrip = React.createClass({

        componentWillMount: function () {
            debug.verify(_.isObject(this.props.tabs) && _.keys(this.props.tabs).length > 0);
        },

        componentWillUnmount: function () {
            this.tabStrip.unbind('select', this.onSelect);
        },

        componentDidMount: function (rootNode) {
            debug.verify(rootNode);
            var $el = $(rootNode);
            $el.kendoTabStrip({
                select: this.onSelect
            });
            this.tabStrip = $el.data('kendoTabStrip');
        },

        onSelect: function (event) {
            var item = $(event.item);
            var index = item.data('wspt-index');
            if (this.props.onChange && ! this.suppressEvents) {
//                this.props.onChange(index);
            }
        },

        /* jshint ignore:start */
        render: function () {

            var lis = [];
            _.each(_.keys(this.props.tabs), function (title, index) {
                var jsx = (index === 0
                    ? (<li className="k-state-active" data-wspt-index={index} key={index}>{title}</li>)
                    : (<li data-wspt-index={index} key={index}>{title}</li>));
                lis.push(jsx);
            });

            var content = ReactCommon.wrapItemsDiv(_.values(this.props.tabs));

//            if (this.tabStrip && this.props.selectedTab) {
//                this.suppressEvents = true;
//                this.tabStrip.select(this.props.selectedTab);
//                this.suppressEvents = false;
//            }

            return (
                <div>
                    <ul>{lis}</ul>
                    {content}
                </div>
                );
        }
        /* jshint ignore:end */
    });

    return KendoTabStrip;
});