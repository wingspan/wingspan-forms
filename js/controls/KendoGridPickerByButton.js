/** @jsx React.DOM */
define([
    'underscore',
    'jquery',
    'kendo',
    'react',
    '../util/debug',
    '../util/util'
], function (_, $, kendo, React, debug, util) {
    'use strict';

    var $el = null;

    var KendoGridPickerByButton = React.createClass({
        getDefaultProps: function() {
            return {
                autoBind: true,
                editable: false,
                pageable: false,
                height: 250,
                onClick: function () {},
                value: []
            };
        },

        componentWillMount: function () {
            debug.verify(this.props.dataSource);
            debug.verify(this.props.columns);
            debug.verify(this.props.valueField);
            debug.verify(_.isArray(this.props.value));
        },

        componentWillReceiveProps: function (nextProps) {
            var cantChange = ['dataSource', 'editable', 'pageable'];
            debug.verify(_.isEqual(_.pick(nextProps, cantChange), _.pick(this.props, cantChange)), 'these props cant change after mount');
        },

        render: function () {
            return (<div className={this.props.className} />);
        },

        componentDidMount: function (rootNode) {
            debug.verify(!!rootNode);
            $el = $(rootNode);

            this.kendoGrid = $el.kendoGrid({
                dataSource: this.props.dataSource,
                height: this.props.height,
                columns: this.props.columns,
                sortable: this.props.sortable,
                editable: this.props.editable,
                pageable: this.props.pageable,
                autoBind: this.props.autoBind
            }).data("kendoGrid");

            $el.on('click', 'tr', this.onRowClick);
        },

        componentWillUnmount: function () {
            $el = null;
        },

        onRowClick: function (e) {
            // Get the record associated with this click event
            var $target = $(e.target);
            var $row = $target.closest('tr');
            var record = this.kendoGrid.dataItem($row);

            this.props.onClick(record.id);
        }
    });

    return KendoGridPickerByButton;
});
