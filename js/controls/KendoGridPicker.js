define([
    'underscore',
    'jquery',
    'react',
    'kendo',
    './KendoGrid'
], function (_, $, React, kendo, KendoGrid) {
    'use strict';

    var PropTypes = React.PropTypes;

    var KendoGridPickerTemplate = '<div><input id="#: uid #" type="checkbox" value="#: id #" name="checkboxSelector"><label></label></div>';

    function enableCheckboxSelection(grid) {
        grid.selectable.userEvents.notify = function (eventName, data) {
            // Make all "tap/click" events seem like they have the ctrlKey pressed, which gives a checkbox-style UX
            if (eventName === 'tap') {
                data.event.ctrlKey = true;
            }
            this.trigger(eventName, data);
        };
    }

    var KendoGridPicker = React.createClass({

        propTypes: {
            columns: PropTypes.array.isRequired,
            value: PropTypes.array,
            onChange: PropTypes.func
        },

        getDefaultProps: function () {
            return {
                autoBind: true,
                editable: false,
                pageable: false,
                height: 250,
                onChange: $.noop,
                value: []  // list of selected records, just like combo.
            };
        },

        render: function () {
            var columns = [{ title: '', template: kendo.template(KendoGridPickerTemplate), width: 34 }]
                .concat(this.props.columns);
            var gridProps = { columns: columns, selectable: 'multiple, row', onChange: this.onGridChange };

            return React.createElement(KendoGrid, _.defaults(gridProps, this.props));
        },

        componentDidMount: function () {
            var grid = $(this.getDOMNode()).data('kendoGrid');

            // The standard kendo grid multiple selection UI requires holding the Control key to select multiple rows.
            // Change the behavior to allow individual clicks to toggle the row's selection state.
            enableCheckboxSelection(grid);

            this.updateCheckboxValues();
            grid.bind('dataBound', this.updateCheckboxValues);
        },

        componentDidUpdate: function () {
            this.updateCheckboxValues();
        },

        updateCheckboxValues: function () {
            // the SSP page has changed, so we have new DOM.
            // Sync up the DOM with the checked state.
            var $rootNode = $(this.getDOMNode());
            var valueIDs = _.pluck(this.props.value, 'id');

            // Update the checked state of checkbox inputs
            $rootNode.find('input[type="checkbox"]').val(valueIDs);
        },

        onGridChange: function (selectedValues) {
            var grid = $(this.getDOMNode()).data('kendoGrid');

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
