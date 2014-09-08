define([
    'underscore', 'jquery', 'react', 'kendo'
], function (_, $, React, kendo) {
    'use strict';

    void kendo;

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

    var KendoPager = React.createClass({

        getDefaultProps: function () {
            return {
                className: 'k-pager-wrap',
                // Empty object means override none of kendo's defaults, which are shown above for convenience
                messages: {}
            };
        },

        render: function () {
            console.assert(this.props.dataSource, 'Need a dataSource to page');
            return React.DOM.div({ className: this.props.className });
        },

        componentDidMount: function () {
            $(this.getDOMNode()).kendoPager({
                dataSource: this.props.dataSource,
                messages: this.props.messages
            });
        }
    });

    return KendoPager;
});
