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
        propTypes: {
            dataSource: React.PropTypes.object.isRequired,
            className: React.PropTypes.string,
            messages: React.PropTypes.object,
            onChange: React.PropTypes.func
        },

        getDefaultProps: function () {
            return {
                className: 'k-pager-wrap',
                // Empty object means override none of kendo's defaults, which are shown above for convenience
                messages: {},
                change: $.noop
            };
        },

        render: function () {
            return React.DOM.div({ className: this.props.className });
        },

        componentDidMount: function () {
            $(this.getDOMNode()).kendoPager({
                dataSource: this.props.dataSource,
                messages: this.props.messages,
                change: this.props.onChange
            });
        }
    });

    return KendoPager;
});
