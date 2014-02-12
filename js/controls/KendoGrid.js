/** @jsx React.DOM */
define([
    'underscore', 'jquery', 'react', '../util/debug', 'kendo'
], function (_, $, React, debug, kendo) {
    'use strict';

    var KendoGrid = React.createClass({
        getDefaultProps: function () {
            return {
                className: '',
                height: 150, // TODO remove this
                dataSource: undefined,
                columns: undefined
            };
        },

        render: function () {
            debug.verify(this.props.dataSource);
            debug.verify(this.props.columns);
            return (<div className={this.props.className} />);
        },

        componentDidMount: function (rootNode) {
            var $rootNode = $(rootNode);
            void kendo;
            $rootNode.kendoGrid({
                dataSource: this.props.dataSource,
                height: this.props.height,
                columns: this.props.columns
            });
        },

        componentDidUpdate: function (prevProps, prevState, rootNode) {
            debug.verify(!!rootNode);
            var $el = $(rootNode);
            var kendoWidget = $el.data('kendoGrid');

            if (this.props.dataSource instanceof Array) {
                // This better be a datasource that was originally built from inline data.
                // I don't know how to detect this to verify it.
                kendoWidget.dataSource.data(this.props.dataSource);
            }
            else if (prevProps.dataSource !== this.props.dataSource) {
                kendoWidget.setDataSource(this.props.dataSource);
            }
        }
    });

    return KendoGrid;
});