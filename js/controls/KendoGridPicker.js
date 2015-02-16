define([
    'underscore', 'jquery', 'react', 'kendo',
    './KendoGrid'
], function (_, $, React, kendo, KendoGrid) {
    'use strict';

    var PropTypes = React.PropTypes;

    var CheckTemplate = '<div><input id="#: uid #" type="checkbox" value="#: uid #" name="selector"><label></label></div>';
    var RadioTemplate = '<div><input id="#: uid #" type="radio"    value="#: uid #" name="selector"><label></label></div>';

    function buttonColumn(multiple) {
        return {
            title: '',
            template: kendo.template(multiple ? CheckTemplate : RadioTemplate),
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

    var KendoGridPicker = React.createClass({displayName: "KendoGridPicker",

        propTypes: {
            columns: PropTypes.array.isRequired,
            multiple: PropTypes.bool,
            value: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
            onChange: PropTypes.func
        },

        getDefaultProps: function () {
            return {
                autoBind: true,
                editable: false,
                pageable: false,
                multiple: true,
                height: 250,
                onChange: $.noop,
                value: []  // list of selected records, just like combo.
            };
        },

        render: function () {
            var columns = [buttonColumn(this.props.multiple)].concat(this.props.columns);

            var selectable = this.props.multiple ? 'multiple, row' : 'row';
            var gridProps = { columns: columns, selectable: selectable, onChange: this.onGridChange };

            return React.createElement(KendoGrid, _.defaults(gridProps, this.props));
        },

        componentDidMount: function () {
            var grid = $(this.getDOMNode()).data('kendoGrid');

            // The standard kendo grid multiple selection UI requires holding the Control key to select multiple rows.
            // Change the behavior to allow individual clicks to toggle the row's selection state.
            if (this.props.multiple) {
                enableCheckboxSelection(grid);
            }

            this.updateCheckboxValues();
            grid.bind('dataBound', this.updateCheckboxValues);
        },

        componentDidUpdate: function () {
            this.updateCheckboxValues();
        },

        updateCheckboxValues: function () {
            // the SSP page has changed, so we have new DOM.
            // Sync up the DOM with the checked state.
            var grid = $(this.getDOMNode()).data('kendoGrid');

            var valueIDs = grid.select().get().map(function (tr) {
                return tr.getAttribute('data-uid');
            });

            // Update the checked state of radio/checkbox inputs
            grid.tbody.find('input[name="selector"]').val(valueIDs);
        },

        onGridChange: function (selectedValues) {
            var grid = $(this.getDOMNode()).data('kendoGrid');

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

    return KendoGridPicker;
});
