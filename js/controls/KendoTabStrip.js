import kendo from 'kendo'
import React from 'react'
import { findWidget, wrapItemsDiv } from '../ReactCommon'

/**
 * Takes a "tabs" prop which is a map from title string to a JSX instance.
 * This component is not presently stateful so we don't get to control what is selected.
 */
var KendoTabStrip = React.createClass({

    componentWillMount: function () {
        console.assert(_.isObject(this.props.tabs) && Object.keys(this.props.tabs).length > 0);
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

        var lis = [];
        Object.keys(this.props.tabs).forEach(function (title, index) {
            var jsx = (index === 0
                ? (<li className="k-state-active" data-wspt-index={index} key={index}>{title}</li>)
                : (<li data-wspt-index={index} key={index}>{title}</li>));
            lis.push(jsx);
        });

        var content = wrapItemsDiv(_.values(this.props.tabs));

        return (
            <div>
                <ul>{lis}</ul>
                {content}
            </div>
            );
    }
    /* jshint ignore:end */
});

export default KendoTabStrip;