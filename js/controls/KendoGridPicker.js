/** @jsx React.DOM */
define([
    'underscore',
    'jquery',
    'react',
    'kendo',
    '../util/util',
    '../ImmutableOptimizations'
], function (_, $, React, kendo, util, ImmutableOptimizations) {
    'use strict';

    var KendoGridPicker = React.createClass({
        mixins: [ImmutableOptimizations],

        $el: null,

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
            console.assert(this.props.dataSource);
            console.assert(this.props.columns);
            console.assert(this.props.multiSelect === true); // temporary simplification
            console.assert(_.isArray(this.props.value));
        },

        componentWillReceiveProps: function (nextProps) {
            var cantChange = ['dataSource', 'editable', 'pageable'];
            console.assert(_.isEqual(_.pick(nextProps, cantChange), _.pick(this.props, cantChange)), 'these props cant change after mount');
        },

        /*jshint ignore:start */
        render: function () {
            return (<div className={this.props.className} />);
        },
        /*jshint ignore:end */

        componentDidMount: function () {
            this.$el = $(this.getDOMNode());

            var columns = [{ title: '', template: kendo.template(KendoGridPickerTemplate), width: 34 }];
            columns = columns.concat(this.props.columns);

            this.$el.kendoGrid({
                dataSource: this.props.dataSource,
                height: this.props.height,
                columns: columns,
                sortable: this.props.sortable,
                editable: this.props.editable,
                pageable: this.props.pageable,
                autoBind: this.props.autoBind,
                dataBound: this.applySelectionStateToDom
            }).data('kendoGrid');

            if (!this.props.autoBind) {
                this.$el.data('kendoGrid').refresh();
            }

            this.$el.on('click', 'tr', this.onRowClick);

        },

        componentWillUnmount: function () {
            this.$el.data('kendoGrid').destroy();
            this.$el = null;
        },

        componentDidUpdate: function (prevProps, prevState) {
            this.$el = $(this.getDOMNode());

            this.applySelectionStateToDom();
        },

        applySelectionStateToDom: function () {
            // the SSP page has changed, so we have new DOM.
            // Sync up the DOM with the checked state.
            var grid = this.$el.data('kendoGrid');
            var valueIDs = _.pluck(this.props.value, 'id');

            // Update the checked state of checkbox inputs
            this.$el.find('input[type="checkbox"]').val(valueIDs);

            this.$el.find('tr').each(function (i, elem) {
                var record = grid.dataItem(elem);

                if (record) {
                    $(elem).toggleClass('k-state-selected', _.contains(valueIDs, record.id));
                }
            });
        },

        onRowClick: function (e) {
            // Prevent "shadow" clicks on the label from changing state;
            // The real clicks happen on the input itself, another event targeted on the input will be arriving shortly
            if ('LABEL' === e.target.nodeName || 'A' === e.target.nodeName) {
                return;
            }

            // Get the record associated with this click event
            var $target = $(e.target);
            var $row = $target.closest('tr');

            // Ignore clicks on the row containing header cells
            // clicking on the header should not cause a change in selections
            if (!_.some($row.find('.k-header'))) {
                var model = this.$el.data('kendoGrid').dataItem($row);
                var record = _.extend(model.toJSON(), { id: model.id });

                // Determine the current selection state of this record
                var wasSelected = util.containsDeep(this.props.value, record);

                //if this event was on the checkbox, revert that dom state change until it goes through the flux loop
                if ('INPUT' === e.target.nodeName) {
                    e.target.checked = wasSelected;
                }

                // Toggle the state
                var isSelected = !wasSelected;

                // Invoke our event handler with the new selection state for our control.  This will circle back
                // and re-render us with the new selections
                var nextSelections = (isSelected ? util.unionDeep : util.differenceDeep)(this.props.value, [record]);
                this.props.onChange(nextSelections);
            }

        }
    });


    var KendoGridPickerTemplate = '\
        <div class="checkboxWrap">\
            <input id="#: uid #" type="checkbox" value="#: id #" name="checkboxSelector">\
                <label for="#: uid #"></label>\
            </div>';



    return KendoGridPicker;

});
