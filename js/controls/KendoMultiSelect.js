/** @jsx React.DOM */
define([
    'underscore', 'jquery', 'react',
    '../ImmutableOptimizations'
], function (_, $, React, ImmutableOptimizations) {
    'use strict';

    var PropTypes = React.PropTypes;

    function toScalarValue(valueField, value) {
    	return _.isObject(value) ? value[valueField] : value;
    }

    return React.createClass({
        mixins: [ImmutableOptimizations(['onChange'])],

        statics: { fieldClass: function () { return 'formFieldMultiselect'; } },

		propTypes: {
            value: PropTypes.array,
            onChange: PropTypes.func,
            id: PropTypes.string,
            dataSource: PropTypes.oneOfType([PropTypes.array.isRequired, PropTypes.object.isRequired]),
            displayField: PropTypes.string,
            valueField: PropTypes.string,
            disabled: PropTypes.bool,
            readonly: PropTypes.bool,
            options: PropTypes.object,
            placeholder: PropTypes.string,
            template: PropTypes.any
		},

        getDefaultProps: function() {
            return {
            	disabled: false,
                readonly: false,
                onChange: $.noop
            };
        },

        /*jshint ignore:start */
        render: function () {
            return (<select id={this.props.id} multiple="multiple" />);
        },
        /*jshint ignore:end */

        componentDidMount: function () {
            var $el = $(this.getDOMNode());

            var widgetOptions = _.defaults({
                dataTextField: this.props.displayField,
                dataValueField: this.props.valueField,
                dataSource: this.props.dataSource,
                placeholder: this.props.placeholder,
                itemTemplate: this.props.template,
                change: this.onChange
            }, this.props.options);

            var kendoWidget = $el.kendoMultiSelect(widgetOptions).data('kendoMultiSelect');

            // the 'value' method is a getter/setter that gets/sets the valueField. It will look up the record
            // in the store via the value set here.
            if (this.props.value) {
            	kendoWidget.value(this.props.value.map(toScalarValue.bind(null, this.props.valueField)));
            }

            if (this.props.disabled) {
                // disabled beats readonly
                kendoWidget.enable(false);
            }
            else if (this.props.readonly) {
                kendoWidget.readonly(true);
            }
        },

        componentWillUnmount: function () {
            var $el = $(this.getDOMNode());

            $el.data('kendoMultiSelect').destroy();
        },

        componentWillReceiveProps: function (nextProps) {
            var cantChange = ['template', 'dataSource', 'valueField', 'displayField', 'placeholder'];
            console.assert(_.isEqual(_.pick(nextProps, cantChange), _.pick(this.props, cantChange)), 'these props cant change after mount');
        },

        componentDidUpdate: function (prevProps, prevState) {
            var $el = $(this.getDOMNode());
            var kendoWidget = $el.data('kendoMultiSelect');

            if (prevProps.dataSource !== this.props.dataSource) {
                kendoWidget.setDataSource(this.props.dataSource);
            }

            if (this.props.value !== prevProps.value) {
            	kendoWidget.value(this.props.value.map(toScalarValue.bind(null, this.props.valueField)));
            }

            if (this.props.disabled !== prevProps.disabled) {
                kendoWidget.enable(!this.props.disabled);
            }
            else if (this.props.readonly !== prevProps.readonly) {
                kendoWidget.readonly(this.props.readonly);
            }
        },

        onChange: function (event) {
            var kendoMultiSelect = event.sender;
            var records = kendoMultiSelect.dataItems();

            kendoMultiSelect.value(this.props.value.map(toScalarValue.bind(null, this.props.valueField)));

            this.props.onChange(records);
        }
    });

});
