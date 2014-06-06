/** @jsx React.DOM */
define([
    'underscore', 'jquery', 'react', 'kendo',
    '../ImmutableOptimizations'
], function (_, $, React, kendo, ImmutableOptimizations) {
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
            console.assert(this.props.dataSource);
            console.assert(this.props.columns);
            return (<div className={this.props.className} />);
        },

        componentDidMount: function () {
            var $rootNode = $(this.getDOMNode());
            void kendo;
            $rootNode.kendoGrid({
                dataSource: this.props.dataSource,
                height: this.props.height,
                columns: this.props.columns
            });
        },

        componentDidUpdate: function (prevProps, prevState) {
            var $el = $(this.getDOMNode());
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