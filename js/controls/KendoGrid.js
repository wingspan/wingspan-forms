import kendo from 'kendo'
import React from 'react'

import { isEqualDataSource } from '../ControlCommon'
import { findWidget, noop, isObject, isString, eitherType, widgetConfig } from '../ReactCommon'

var $ = kendo.jQuery;
var PropTypes = React.PropTypes;


function isCellSelection(selectable) {
    return isString(selectable) ? selectable.indexOf('cell') !== -1 : false;
}

function isMultiSelect(selectable) {
    return isString(selectable) ? selectable.indexOf('multiple') !== -1 : false;
}

function getValueIds(value) {
    if (Array.isArray(value)) {
        return value.map(item => item.id);
    }
    if (isObject(value)) {
        return [value.id];
    }
    return [];
}

function updateGridSelection(component, grid) {
    var selectors = getValueIds(component.props.value)
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

function createRowTooltip(rowTooltip, $rootNode) {
    var tooltipTemplate = kendo.template(rowTooltip);

    $rootNode.kendoTooltip({
        filter: 'tr',
        showAfter: 800,
        content: function (e) {
            // Run the template using the model object for the target's row
            return tooltipTemplate($rootNode.data("kendoGrid").dataItem(e.target));
        },
        open: function (e) {
            // If the template returns empty text, cancel the popup
            if (this.content.text().length === 0) {
                e.preventDefault();
            }
        }
    });
}

var KendoGrid = React.createClass({

    propTypes: {
        className: PropTypes.string,
        height: eitherType('number', 'string'),
        dataSource: eitherType('object', 'array').isRequired,
        autoBind: PropTypes.bool,
        columns: PropTypes.array,
        toolbar: PropTypes.array,
        rowTemplate: eitherType('string', 'func'),
        pageable: eitherType('bool', 'object'),
        scrollable: eitherType('bool', 'object'),
        selectable: eitherType('bool', 'string'),
        sortable: eitherType('bool', 'object'),
        options: PropTypes.object,
        value: PropTypes.any,
        onChange: PropTypes.func,
        rowTooltip: eitherType('string', 'func'),
        rowDataBind: PropTypes.func
    },

    getDefaultProps: function () {
        return {
            autoBind: true,
            pageable: false,
            scrollable: true,
            selectable: false,
            sortable: false,
            onChange: noop
        };
    },

    /*jshint ignore:start */
    render: function () {
        return (<div className={this.props.className} />);
    },
    /*jshint ignore:end */

    componentDidMount: function () {
        var $rootNode = findWidget(this);
        var widgetOptions = widgetConfig({
            autoBind: this.props.autoBind,
            dataSource: this.props.dataSource,
            height: this.props.height,
            columns: this.props.columns,
            toolbar: this.props.toolbar,
            rowTemplate: this.props.rowTemplate,
            pageable: this.props.pageable,
            selectable: this.props.selectable,
            scrollable: this.props.scrollable,
            sortable: this.props.sortable,
            dataBound: this.onGridDataBound
        }, this.props.options);

        $rootNode.kendoGrid(widgetOptions);

        if (this.props.rowTooltip) {
            createRowTooltip(this.props.rowTooltip, $rootNode);
        }
        if (this.props.rowDataBind) {
            $rootNode.data('kendoGrid').bind('dataBinding', this.onGridDataBinding);
        }
    },

    componentWillUnmount: function () {
        findWidget(this, 'kendoGrid').destroy();

        // The rowTooltip widget doesn't need to be explicitly destroyed
        // because the grid destroy() method destroys all kendo widgets bound to the DOM element.
    },

    componentDidUpdate: function (prevProps) {
        var grid = findWidget(this, 'kendoGrid');
        var dataSource = this.props.dataSource;

        if (!isEqualDataSource(prevProps.dataSource, dataSource)) {
            // Cannot call setDataSource() with an array so just update the existing DataSource.
            if (Array.isArray(dataSource)) {
                grid.dataSource.data(dataSource);
            } else {
                grid.setDataSource(dataSource);
            }
        }

        if (prevProps.value !== this.props.value) {
            if (grid.selectable) {
                updateGridSelection(this, grid);
            }
        }
    },

    onGridDataBinding: function (e) {
        var grid = e.sender;

        // If the rowDataBind function installed widgets, they need to be destroyed before grid refresh.
        if (e.action === 'rebind') {
            kendo.destroy(grid.table.find('tr'));
        }
    },

    onGridDataBound: function (e) {
        var grid = e.sender;
        var props = this.props;

        if (grid.selectable) {
            updateGridSelection(this, grid);
        }

        if (props.options && props.options.dataBound) {
            props.options.dataBound(e);
        }

        // Render any custom widgets using the provided function
        if (props.rowDataBind) {
            grid.table.find('tr').each(function() {
                var $el = $(this);
                props.rowDataBind($el, grid.dataItem($el));
            });
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
        if (!isMultiSelect(this.props.selectable)) {
            selectedValues = selectedValues[0];
        }

        this.props.onChange(selectedValues);
    }
});

export default KendoGrid;
