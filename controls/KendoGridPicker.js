/** @jsx React.DOM */
define([
    'underscore',
    'jquery',
    'react',
    'wingspan-forms/util/debug',
    'wingspan-forms/util/util',
    'platform/kendoutil',
    'text!textassets/platform/controls/react/KendoGridPickerTemplate.kendo.html'
], function (_, $, React, debug, util, kendoutil, KendoGridPickerTemplate) {
    'use strict';

    var $el = null;

    var KendoGridPicker = React.createClass({
        getDefaultProps: function () {
            return {
                autoBind: true,
                editable: false,
                pageable: false,
                multiSelect: true, // was false
                height: 250,
                onChange: function () {},
                value: []  // list of selected records, just like combo.
            };
        },

        componentWillMount: function () {
            debug.verify(this.props.dataSource);
            debug.verify(this.props.columns);
            debug.verify(this.props.multiSelect === true); // temporary simplification
            debug.verify(_.isArray(this.props.value));
        },

        componentWillReceiveProps: function (nextProps) {
            var cantChange = ['dataSource', 'editable', 'pageable'];
            debug.verify(_.isEqual(_.pick(nextProps, cantChange), _.pick(this.props, cantChange)), 'these props cant change after mount');
        },

        render: function () {
            return (<div className={this.props.className} />);
        },

        mapCheckboxColumn: function (record) {
            var isChecked = util.containsDeep(this.props.value, record);
            var additionalTemplateParams = {
                checked: isChecked
            };
            return _.extend({}, record, additionalTemplateParams);
        },

        componentDidMount: function (rootNode) {
            debug.verify(!!rootNode);
            $el = $(rootNode);

            var columns = [{ title: '', template: kendoutil.templateWith(kendo.template(KendoGridPickerTemplate), this.mapCheckboxColumn), width: 34 }];
            columns = columns.concat(this.props.columns);

            this.kendoGrid = $el.kendoGrid({
                dataSource: this.props.dataSource,
                height: this.props.height,
                columns: columns,
                sortable: this.props.sortable,
                editable: this.props.editable,
                pageable: this.props.pageable,
                autoBind: this.props.autoBind
            }).data("kendoGrid");

            if(!this.props.autoBind) {
                $el.data('kendoGrid').refresh();
            }

            $el.on('click', 'tr', this.onRowClick);
            this.props.dataSource.bind && this.props.dataSource.bind('change', this.applySelectionStateToDom);
        },

        componentWillUnmount: function () {
            $el = null;
            this.props.dataSource.unbind && this.props.dataSource.unbind('change', this.applySelectionStateToDom);
        },

        componentDidUpdate: function (prevProps, prevState, rootNode) {
            debug.verify(rootNode);
            $el = $(rootNode);

            var justChecked = _.difference(this.props.value, prevProps.value); // removed selection ids
            var justUnchecked = _.difference(prevProps.value, this.props.value); // added selection ids

            _.each(justUnchecked, function (record) {
                effectCheckedStyleOnInputLabelAndRow($el.find(_.str.sprintf('[data-wspt-ormid="%s"]', record.id)), false);
            });

            _.each(justChecked, function (record) {
                effectCheckedStyleOnInputLabelAndRow($el.find(_.str.sprintf('[data-wspt-ormid="%s"]', record.id)), true);
            });
        },

        // This method should not be necessary.
        applySelectionStateToDom: function () {
            // the SSP page has changed, so we have new DOM.
            // Sync up the DOM with the checked state.
            var self = this;
            var $visibleInputs = $el.find('input[type="checkbox"]');
            $visibleInputs.each(function (jquerySucks, domNode) {
                var $input = $(domNode);
                var id = $input.data('wsptOrmid');
                var isChecked = !!_.findWhere(self.props.value, {id: id});
                effectCheckedStyleOnInputLabelAndRow($input, isChecked);
            });
        },

        onRowClick: function (e) {
            // Prevent "shadow" clicks on the label from changing state;
            // The real clicks happen on the input itself, another event targeted on the input will be arriving shortly
            if ("LABEL" === e.target.nodeName || "A" === e.target.nodeName) {
                return;
            }

            // Get the record associated with this click event
            var $target = $(e.target);
            var $row = $target.closest('tr');

            var model = this.kendoGrid.dataItem($row);
            var record = _.extend(model.toJSON(), { id: model.id });

            // Determine the current selection state of this record
            var wasSelected = util.containsDeep(this.props.value, record);

            //if this event was on the checkbox, revert that dom state change until it goes through the flux loop
            if ("INPUT" ===  e.target.nodeName) {
                e.target.checked = wasSelected;
            }

            // Toggle the state
            var isSelected = !wasSelected;

            // Invoke our event handler with the new selection state for our control.  This will circle back
            // and re-render us with the new selections
            var nextSelections = (isSelected ? util.unionDeep : util.differenceDeep)(this.props.value, [record]);
            this.props.onChange(nextSelections);
        }
    });

    function effectCheckedStyleOnInputLabelAndRow($input, checked) {
        // checked state on row
        $input.closest('tr').toggleClass('k-state-selected', checked);
        // checked state on label (which actually displays the checked or unchecked background images)
        $input[0] && $($input[0].parentNode).find('[for="' + $input.attr('id') + '"]').toggleClass('checkboxActive', checked);
        // checked state on input
        $input.prop('checked', checked);
    }

    return KendoGridPicker;

});
