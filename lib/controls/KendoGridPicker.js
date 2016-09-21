'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _kendo = require('kendo');

var _kendo2 = _interopRequireDefault(_kendo);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _KendoGrid = require('./KendoGrid');

var _KendoGrid2 = _interopRequireDefault(_KendoGrid);

var _ReactCommon = require('../ReactCommon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PropTypes = _react2.default.PropTypes;

var CheckTemplate = '<div><input id="#: uid #" type="checkbox" value="#: uid #" name="selector"><label></label></div>';
var RadioTemplate = '<div><input id="#: uid #" type="radio"    value="#: uid #" name="selector"><label></label></div>';

var SelectAllTemplate = '<div><input id="kgp_sel_all" type="checkbox" value="on"><label for="kgp_sel_all"></label></div>';

function buttonColumn(multiple) {
    return {
        template: _kendo2.default.template(multiple ? CheckTemplate : RadioTemplate),
        headerTemplate: _kendo2.default.template(multiple ? SelectAllTemplate : '<div></div>'),
        width: 34
    };
}

function enableCheckboxSelection(grid) {
    grid.selectable.userEvents.notify = function (eventName, data) {
        // Make all "tap/click" events seem like they have the ctrlKey pressed, which gives a checkbox-style UX
        if (eventName === 'tap') {
            data.event.ctrlKey = true;
        }
        this.trigger(eventName, data);
    };
}

var KendoGridPicker = _react2.default.createClass({ displayName: "KendoGridPicker",

    propTypes: {
        columns: PropTypes.array.isRequired,
        multiple: PropTypes.bool,
        value: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
        onChange: PropTypes.func
    },

    getDefaultProps: function getDefaultProps() {
        return {
            autoBind: true,
            editable: false,
            pageable: false,
            multiple: true,
            height: 250,
            onChange: _ReactCommon.noop,
            value: [] // list of selected records, just like combo.
        };
    },

    render: function render() {
        var columns = [buttonColumn(this.props.multiple)].concat(this.props.columns);

        var selectable = this.props.multiple ? 'multiple, row' : 'row';
        var gridProps = { columns: columns, selectable: selectable, onChange: this.onGridChange };

        return _react2.default.createElement(_KendoGrid2.default, Object.assign({}, this.props, gridProps));
    },

    componentDidMount: function componentDidMount() {
        var grid = (0, _ReactCommon.findWidget)(this, 'kendoGrid');

        // The standard kendo grid multiple selection UI requires holding the Control key to select multiple rows.
        // Change the behavior to allow individual clicks to toggle the row's selection state.
        if (this.props.multiple) {
            enableCheckboxSelection(grid);
        }

        this.updateCheckboxValues();
        grid.bind('dataBound', this.updateCheckboxValues);

        // Handle a change to the "Select All" checkbox column
        grid.thead.on('change', '#kgp_sel_all', function (e) {
            if (e.target.checked) {
                grid.select('tr');
            } else {
                grid.clearSelection();
            }
        });
    },

    componentDidUpdate: function componentDidUpdate() {
        this.updateCheckboxValues();
    },

    updateCheckboxValues: function updateCheckboxValues() {
        // the SSP page has changed, so we have new DOM.
        // Sync up the DOM with the checked state.
        var grid = (0, _ReactCommon.findWidget)(this, 'kendoGrid');

        var valueIDs = grid.select().get().map(function (tr) {
            return tr.getAttribute('data-uid');
        });
        var allSelected = valueIDs.length === grid.dataSource.view().length;

        // Update the checked state of radio/checkbox inputs
        grid.tbody.find('input[name="selector"]').val(valueIDs);

        // Update the Select All checkbox if our selection is the whole page
        grid.thead.find('#kgp_sel_all').val(allSelected ? ['on'] : []);
    },

    onGridChange: function onGridChange(selectedValues) {
        var grid = (0, _ReactCommon.findWidget)(this, 'kendoGrid');

        if (!this.props.multiple) {
            this.props.onChange(selectedValues ? selectedValues.toJSON() : null);
            return;
        }

        // The `selectedValues` represents the selection for the current page of results. We need to merge those values
        // with existing values on separate pages.
        var modelsOnThisPage = grid.dataSource.view().map(function (model) {
            return model.id;
        });
        var valuesOnOtherPages = this.props.value.filter(function (dataItem) {
            return modelsOnThisPage.indexOf(dataItem.id) === -1;
        });

        selectedValues = selectedValues.map(function (model) {
            return model.toJSON();
        }).concat(valuesOnOtherPages);

        this.props.onChange(selectedValues);
    }
});

exports.default = KendoGridPicker;