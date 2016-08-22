import kendo from 'kendo'
import React from 'react'
import { findWidget, noop } from '../ReactCommon'

const PropTypes = React.PropTypes;

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

const KendoPager = React.createClass({
    propTypes: {
        dataSource: PropTypes.object.isRequired,
        className: PropTypes.string,
        messages: PropTypes.object,
        onChange: PropTypes.func
    },

    getDefaultProps: function () {
        return {
            className: 'k-pager-wrap',
            // Empty object means override none of kendo's defaults, which are shown above for convenience
            messages: {},
            change: noop
        };
    },

    componentDidMount: function () {
        var $el = findWidget(this);

        $el.kendoPager({
            dataSource: this.props.dataSource,
            messages: this.props.messages,
            change: this.props.onChange
        });
    },

    componentWillUnmount: function () {
        findWidget(this, 'kendoPager').destroy();
    },

    render: function () {
        return (<div className={this.props.className} />);
    }
});

export default KendoPager;