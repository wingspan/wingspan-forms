/** @jsx React.DOM */
define([
    'underscore', 'jquery', 'react',
    'wingspan-contrib',
    '../util/kendoutil',
    'wingspan-data'
], function (_, $, React, Contrib, kendoutil, Data) {
    'use strict';

    var $el = null;

    /**
     * Doesn't make any assumptions about the shape of the selection records. They don't
     * need an ID/valueField, we use the hash of the whole record as its identity.
     */
    var SelectionListDismissible = React.createClass({

        getDefaultProps: function () {
            return {
                className: 'content',
                height: '150',
                schema: {},
                onChange: undefined,
                value: undefined
            };
        },

        componentWillMount: function () {
            console.assert(this.props.value);
            console.assert(this.props.columns);
            console.assert(this.props.onChange);

            this.datastore = Data.DataStore.create({ data: this.props.value });//, schema: this.props.schema });
        },

        componentWillUpdate: function (nextProps, nextState) {
            if (nextProps.value !== this.props.value) {
                this.datastore.data(nextProps.value);
            }
        },

        componentWillUnmount: function () {
            $el = null;
        },

        render: function () {
            return (<div className={this.props.className} />);
        },

        componentDidMount: function () {
            $el = $(this.getDOMNode());
            var self = this;

            var columns = [{
                title: '',
                template: '<span id="#: recordHash #" class="icon iconButton iconDelete" />',
                width: 34
            }];
            columns = _.map(columns.concat(this.props.columns), function (column) {
                column.template = kendoutil.templateWith(kendo.template(column.template), self.paramMapper);
                return column;
            });

            this.kendoGrid = $el.kendoGrid({
                dataSource: this.datastore,
                height: this.props.height,
                columns: columns,
                sortable: this.props.sortable,
                editable: this.props.editable,
                pageable: false
            }).data('kendoGrid');

            $el.on('click', '.iconDelete', this.onButtonClick);
        },

        paramMapper: function (record) {
            return _.extend(record, this.props.schema, { recordHash: Contrib.hashRecord(record) });
        },

        onButtonClick: function (e) {
            var recordHashToBeRemoved = parseInt(e.target.getAttribute('id'), 10);

            var newValue = _.filter(this.props.value, function (record) {
                return Contrib.hashRecord(record) !== recordHashToBeRemoved;
            });

            this.props.onChange(newValue);
        }
    });

    return SelectionListDismissible;
});