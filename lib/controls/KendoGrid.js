'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _kendo = require('kendo');

var _kendo2 = _interopRequireDefault(_kendo);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ReactCommon = require('../ReactCommon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $ = _kendo2.default.jQuery;
var PropTypes = _react2.default.PropTypes;

function isCellSelection(selectable) {
    return (0, _ReactCommon.isString)(selectable) ? selectable.indexOf('cell') !== -1 : false;
}

function isMultiSelect(selectable) {
    return (0, _ReactCommon.isString)(selectable) ? selectable.indexOf('multiple') !== -1 : false;
}

function isEqualDataSource(d1, d2) {
    if (d1 === d2) {
        return true;
    }
    if (Array.isArray(d1) && Array.isArray(d2)) {
        return d1.every(function (item, index) {
            return item === d2[index];
        });
    }

    return false;
}

function getValueIds(value) {
    if (Array.isArray(value)) {
        return value.map(function (item) {
            return item.id;
        });
    }
    if ((0, _ReactCommon.isObject)(value)) {
        return [value.id];
    }
    return [];
}

function updateGridSelection(component, grid) {
    var selectors = getValueIds(component.props.value).map(function (id) {
        return grid.dataSource.get(id);
    }).filter(function (dataItem) {
        return !!dataItem;
    }).map(function (dataItem) {
        return 'tr[data-uid="' + dataItem.uid + '"]';
    });

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
    var tooltipTemplate = _kendo2.default.template(rowTooltip);

    $rootNode.kendoTooltip({
        filter: 'tr',
        showAfter: 800,
        content: function content(e) {
            // Run the template using the model object for the target's row
            return tooltipTemplate($rootNode.data("kendoGrid").dataItem(e.target));
        },
        open: function open(e) {
            // If the template returns empty text, cancel the popup
            if (this.content.text().length === 0) {
                e.preventDefault();
            }
        }
    });
}

var KendoGrid = _react2.default.createClass({
    displayName: 'KendoGrid',


    propTypes: {
        className: PropTypes.string,
        height: (0, _ReactCommon.eitherType)('number', 'string'),
        dataSource: (0, _ReactCommon.eitherType)('object', 'array').isRequired,
        autoBind: PropTypes.bool,
        columns: PropTypes.array,
        toolbar: PropTypes.array,
        rowTemplate: (0, _ReactCommon.eitherType)('string', 'func'),
        pageable: (0, _ReactCommon.eitherType)('bool', 'object'),
        scrollable: (0, _ReactCommon.eitherType)('bool', 'object'),
        selectable: (0, _ReactCommon.eitherType)('bool', 'string'),
        sortable: (0, _ReactCommon.eitherType)('bool', 'object'),
        options: PropTypes.object,
        value: PropTypes.any,
        onChange: PropTypes.func,
        rowTooltip: (0, _ReactCommon.eitherType)('string', 'func'),
        rowDataBind: PropTypes.func
    },

    getDefaultProps: function getDefaultProps() {
        return {
            autoBind: true,
            pageable: false,
            scrollable: true,
            selectable: false,
            sortable: false,
            onChange: _ReactCommon.noop
        };
    },

    /*jshint ignore:start */
    render: function render() {
        return _react2.default.createElement('div', { className: this.props.className });
    },
    /*jshint ignore:end */

    componentDidMount: function componentDidMount() {
        var $rootNode = (0, _ReactCommon.findWidget)(this);
        var widgetOptions = (0, _ReactCommon.widgetConfig)({
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

    componentWillUnmount: function componentWillUnmount() {
        (0, _ReactCommon.findWidget)(this, 'kendoGrid').destroy();

        // The rowTooltip widget doesn't need to be explicitly destroyed
        // because the grid destroy() method destroys all kendo widgets bound to the DOM element.
    },

    componentDidUpdate: function componentDidUpdate(prevProps) {
        var grid = (0, _ReactCommon.findWidget)(this, 'kendoGrid');

        if (!isEqualDataSource(prevProps.dataSource, this.props.dataSource)) {
            grid.setDataSource(this.props.dataSource);
        }

        if (prevProps.value !== this.props.value) {
            if (grid.selectable) {
                updateGridSelection(this, grid);
            }
        }
    },

    onGridDataBinding: function onGridDataBinding(e) {
        var grid = e.sender;

        // If the rowDataBind function installed widgets, they need to be destroyed before grid refresh.
        if (e.action === 'rebind') {
            _kendo2.default.destroy(grid.table.find('tr'));
        }
    },

    onGridDataBound: function onGridDataBound(e) {
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
            grid.table.find('tr').each(function () {
                var $el = $(this);
                props.rowDataBind($el, grid.dataItem($el));
            });
        }
    },

    onGridChange: function onGridChange(e) {
        var grid = e.sender;
        var selectedNodes = grid.select().get(); // get() unwraps the jQuery object

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

exports.default = KendoGrid;