/** @jsx React.DOM */
define([
    'underscore', 'jquery', 'react', 'kendo',
    '../ImmutableOptimizations'
], function (_, $, React, kendo, ImmutableOptimizations) {
    'use strict';

    var PropTypes = React.PropTypes;

    var KendoAutoComplete = React.createClass({
        mixins: [ImmutableOptimizations(['onChange', 'dataSource'])],

        statics: {
            fieldClass: function () {
                return 'formFieldAutocomplete';
            }
        },

        propTypes: {
            value: PropTypes.any,
            onChange: PropTypes.func.isRequired,
            id: PropTypes.string,
            dataSource: PropTypes.object.isRequired,
            dataTextField: PropTypes.string,
            disabled: PropTypes.bool,
            readonly: PropTypes.bool,
            options: PropTypes.object,
            placeholder: PropTypes.string,
            template: PropTypes.any
        },

        componentDidMount: function () {
            var $el = $(this.getDOMNode());

            var widgetOptions = _.defaults({
                dataSource: this.props.dataSource,
                dataTextField: this.props.dataTextField,
                placeholder: this.props.placeholder,
                template: this.props.template,
                change: this.onChange,
                select: this.onSelect
            }, this.props.options);

            var autoComplete = $el.kendoAutoComplete(widgetOptions)
                .data('kendoAutoComplete');

            if (this.props.value) {
                autoComplete.value(this.props.value);
            }

            if (this.props.disabled) {
                autoComplete.enable(false);
            }
            else if (this.props.readonly) {
                autoComplete.readonly(true);
            }
        },

        componentWillUnmount: function () {
            var $el = $(this.getDOMNode());

            $el.data('kendoAutoComplete').destroy();
        },

        componentDidUpdate: function (prevProps) {
            var $el = $(this.getDOMNode()),
                autoComplete = $el.data('kendoAutoComplete');

            if (prevProps.dataSource !== this.props.dataSource) {
                autoComplete.setDataSource(this.props.dataSource);
            }

            if (this.props.value !== prevProps.value) {
                autoComplete.value(this.props.value);
            }

            if (this.props.disabled !== prevProps.disabled) {
                autoComplete.enable(!this.props.disabled);
            }
            else if (this.props.readonly !== prevProps.readonly) {
                autoComplete.readonly(this.props.readonly);
            }
        },

        /*jshint ignore:start */
        render: function () {
            return (<input type="text" id={this.props.id} className="k-textbox"/>);
        },
        /*jshint ignore:end */

        onChange: function (e) {
            var widget = e.sender;

            if (widget.dataSource.total() === 1) {
                // Exact match - so raise the change event
                this.props.onChange(widget.dataItem(0));
            }
        },

        onSelect: function (e) {
            var widget = e.sender;
            this.props.onChange(widget.dataItem(e.item.index()));
        }
    });

    return KendoAutoComplete;

});
