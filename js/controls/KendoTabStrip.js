import kendo from 'kendo'
import React from 'react'
import { findWidget, isObject, wrapItemsDiv } from '../ReactCommon'

const $ = kendo.jQuery;

/**
 * Takes a "tabs" prop which is a map from title string to a JSX instance.
 * This component is not presently stateful so we don't get to control what is selected.
 */
var KendoTabStrip = React.createClass({

    componentWillMount: function () {
        console.assert(isObject(this.props.tabs) && Object.keys(this.props.tabs).length > 0);
    },

    componentWillUnmount: function () {
        this.tabStrip.unbind('select', this.onSelect);
    },

    componentDidMount: function () {
        var $el = findWidget(this);
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
        var keys = Object.keys(this.props.tabs);
        var lis = keys.map(function (title, index) {
            return index === 0
                ? (<li className="k-state-active" data-wspt-index={index} key={index}>{title}</li>)
                : (<li data-wspt-index={index} key={index}>{title}</li>);
        });

        return (
            <div>
                <ul>{lis}</ul>
                {wrapItemsDiv(keys.map(title => this.props.tabs[title]))}
            </div>
            );
    }
    /* jshint ignore:end */
});

export default KendoTabStrip;