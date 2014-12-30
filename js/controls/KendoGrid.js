/** @jsx React.DOM */
define([
    'underscore', 'jquery', 'react', 'kendo'
], function (_, $, React, kendo) {
    'use strict';

    void kendo;
    var PropTypes = React.PropTypes;

    function eitherType(type1, type2) {
        type1 = _.isString(type1) ? PropTypes[type1] : type1;
        type2 = _.isString(type2) ? PropTypes[type2] : type2;

        return PropTypes.oneOfType([type1, type2]);
    }

    function isCellSelection(selectable) {
        return _.isString(selectable) ? selectable.indexOf('cell') !== -1 : false;
    }

    function isMultiSelect(selectable) {
        return _.isString(selectable) ? selectable.indexOf('multiple') !== -1 : false;
    }

    function updateGridSelection(component, grid) {
        var selectors = _.pluck(component.props.value, 'id')
            .map(function (id) { return grid.dataSource.get(id); })
            .filter(function (dataItem) { return !!dataItem; })
            .map(function (dataItem) { return 'tr[data-uid="' + dataItem.uid + '"]'; });

        // Ignore change events while updating selection
        grid.unbind('change', component.onGridChange);

        // Clear the selection completely since we cannot de-select using grid.select()
        grid.clearSelection();

        if (selectors.length) {
            grid.select(selectors.join(', '));
        }

        grid.bind('change', component.onGridChange);
    }

    var KendoGrid = React.createClass({

        propTypes: {
            className: PropTypes.string,
            height: eitherType('number', 'string'),
            dataSource: eitherType(PropTypes.object.isRequired, PropTypes.array.isRequired),
            autoBind: PropTypes.bool,
            columns: PropTypes.array,
            rowTemplate: eitherType('string', 'func'),
            pageable: eitherType('bool', 'object'),
            scrollable: eitherType('bool', 'object'),
            selectable: eitherType('bool', 'string'),
            sortable: eitherType('bool', 'object'),
            options: PropTypes.object,
            value: PropTypes.any,
            onChange: PropTypes.func
        },

        getDefaultProps: function () {
            return {
                autoBind: true,
                pageable: false,
                scrollable: true,
                selectable: false,
                sortable: false
            };
        },

        /*jshint ignore:start */
        render: function () {
            return (<div className={this.props.className} />);
        },
        /*jshint ignore:end */

        componentDidMount: function () {
            var $rootNode = $(this.getDOMNode());
            var widgetOptions = _.defaults({
                autoBind: this.props.autoBind,
                dataSource: this.props.dataSource,
                height: this.props.height,
                columns: this.props.columns,
                rowTemplate: this.props.rowTemplate,
                pageable: this.props.pageable,
                selectable: this.props.selectable,
                scrollable: this.props.scrollable,
                sortable: this.props.sortable,
                dataBound: this.onGridDataBound
            }, this.props.options);

            $rootNode.kendoGrid(widgetOptions);
        },

        componentWillUnmount: function () {
            $(this.getDOMNode()).data('kendoGrid').destroy();
        },

        componentDidUpdate: function (prevProps) {
            var $el = $(this.getDOMNode());
            var grid = $el.data('kendoGrid');

            if (this.props.dataSource instanceof Array) {
                if (!_.isEqual(this.props.dataSource, prevProps.dataSource)) {
                    // This better be a datasource that was originally built from inline data.
                    // I don't know how to detect this to verify it.
                    grid.dataSource.data(this.props.dataSource);
                }
            }
            else if (prevProps.dataSource !== this.props.dataSource) {
                grid.setDataSource(this.props.dataSource);
            }

            if (prevProps.value !== this.props.value) {
                if (grid.selectable) {
                    updateGridSelection(this, grid);
                }
            }
        },

        onGridDataBound: function (e) {
            var grid = e.sender;

            if (grid.selectable) {
                updateGridSelection(this, grid);
            }
        },

        onGridChange: function (e) {
            var grid = e.sender;
            var selectedNodes = grid.select().get();    // get() unwraps the jQuery object

            function rowSelection(tr) {
                return grid.dataItem(tr);
            }
            function cellSelection(td) {
                return {
                    cellNode: td,
                    dataItem: grid.dataItem(td.parentNode)
                };
            }
            var selectedValues = selectedNodes.map(isCellSelection(this.props.selectable) ? cellSelection : rowSelection);

            // Don't hand the caller an array if they are doing only single selection. It's nicer that way.
            if (!isMultiSelect(this.props.selectable) && (selectedValues.length === 1)) {
                selectedValues = selectedValues[0];
            }

            this.props.onChange(selectedValues);
        }
    });

    return KendoGrid;
});