/** @jsx React.DOM */
define([
    'underscore', 'jquery', 'react', '../util/debug'
], function (_, $, React, debug) {
    'use strict';

    var KendoGridRadioSelectable = React.createClass({

        $el:{},

        getDefaultProps: function() {
            return {
                disabled: false,
                editable: false,
                pageable: false,
                multiSelect: false,
                height: 250,
                onChange: function () {}
            };
        },

        getInitialState: function () {
            return {
                value: this.getStateVal(this.props.value)
            };
        },

        render: function () {
            debug.verify(this.props.dataSource);
            debug.verify(this.props.columns);
            debug.verify(this.props.valueField);

            return ( <div /> );
        },

        componentDidMount: function (rootNode) {
            debug.verify(!!rootNode);
            this.$el = $(rootNode);

            var checkboxColumnTemplate = '<div class="checkboxWrap"><input id="#: ' + this.props.valueField + ' #" type="%s" name="checkboxSelector"/><label for="#: ' + this.props.valueField + ' #"></div>';
            checkboxColumnTemplate = this.getInputTypeString(checkboxColumnTemplate);

            var columns = [{ title: '', template: checkboxColumnTemplate, width: 34 }];
            columns.push.apply(columns, this.props.columns);

            this.$el.kendoGrid({
                dataSource: this.props.dataSource,
                height: this.props.height,
                columns: columns,
                sortable: this.props.sortable,
                editable: this.props.editable,
                pageable: this.props.pageable
            });

            // see Dustin
            this.props.dataSource.bind && this.props.dataSource.bind("change", this.onDataStoreChange);
        },

        componentWillUnmount: function () {
            // see Dustin
            this.props.dataSource.unbind && this.props.dataSource.unbind("change", this.onDataStoreChange);
        },

        onDataStoreChange: function () {
            var self = this;
            _.each(this.state.value, function (item) {
                // select and highlight the selected item in the grid
                var selector = $(_.str.sprintf("input[id='%s']", item[self.props.valueField]) , self.$el);
                selector.attr("checked", true);
                selector.closest('tr').toggleClass('k-state-selected', selector.is(':checked'));
            })

            $(this.getInputTypeString("input[type='%s']"), this.$el).on("change", this.gridSelection);
        },

        componentWillReceiveProps: function (nextProps) {
            var cantChange = ['dataSource', 'editable', 'pageable'];
            debug.verify(_.isEqual(_.pick(nextProps, cantChange), _.pick(this.props, cantChange)), 'these props cant change after mount');
        },

        gridSelection: function (e) {
            var vals = [];
            var self = this;

            $(this.$el).find(this.getInputTypeString('input[type="%s"]')).each(function () {
                $(this).closest('tr').toggleClass('k-state-selected', $(this).is(':checked'));

                if($(this).is(':checked')) {
                    vals.push(self.props.dataSource.get($(this).attr('id')));
                }
            });

            $(e.currentTarget).closest('tr').toggleClass('k-state-selected', $(e.currentTarget).is(':checked'));

            this.setState({value: vals});
            this.props.onChange(this.props.multiSelect ? vals : _.first(vals) );
        },

        getInputTypeString : function (string) {
            return _.str.sprintf(string, this.props.multiSelect ? 'checkbox' : 'radio')
        },

        getStateVal: function (val) {
            return _.isArray(val) ? val : (!!val ? [val] : [] );
        }
    });

    return KendoGridRadioSelectable;

});
