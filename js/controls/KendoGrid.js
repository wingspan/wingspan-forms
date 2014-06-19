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
                columns: undefined,
                rowTemplate: undefined
            };
        },

        render: function () {
            console.assert(this.props.dataSource);
            return (<div className={this.props.className} />);
        },

        componentDidMount: function () {
            var $rootNode = $(this.getDOMNode());
            void kendo;
            $rootNode.kendoGrid({
                dataSource: this.props.dataSource,
                height: this.props.height,
                columns: this.props.columns,
                rowTemplate: this.props.rowTemplate
            });
        },

        componentDidUpdate: function (prevProps, prevState) {
            var $el = $(this.getDOMNode());
            var kendoWidget = $el.data('kendoGrid');

            if (this.props.dataSource instanceof Array) {
                if (!_.isEqual(this.props.dataSource, prevProps.dataSource)) {
                    // This better be a datasource that was originally built from inline data.
                    // I don't know how to detect this to verify it.
                    kendoWidget.dataSource.data(this.props.dataSource);
                }
            }
            else if (prevProps.dataSource !== this.props.dataSource) {
                kendoWidget.setDataSource(this.props.dataSource);
            }
        }
    });

    return KendoGrid;
});