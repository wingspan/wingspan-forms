
define([
    'underscore', 'react',
    '../ReactCommon',
    '../ImmutableOptimizations'
], function (_, React, Common, ImmutableOptimizations) {
    'use strict';

    var PropTypes = React.PropTypes;

    function rawValue(props) {
        var value = props.value;

        if (_.isEmpty(value)) {
            return value;
        }

        value = _.isArray(value) ? value : [value];

        return value.map(function (val) {
            return _.isObject(val) ? val[props.valueField] : val;
        });
    }

    function toPlainObject(data) {
        return data.toJSON();
    }

    var KendoMultiSelect = React.createClass({
        mixins: [ImmutableOptimizations(['onChange', 'dataSource'])],

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
                value: [],
                onChange: _.noop
            };
        },

        /*jshint ignore:start */
        render: function () {
            return (<select id={this.props.id} multiple="multiple" />);
        },
        /*jshint ignore:end */

        componentDidMount: function () {
            var $el = Common.findWidget(this);

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
                kendoWidget.value(rawValue(this.props));
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
            Common.findWidget(this, 'kendoMultiSelect').destroy();
        },

        componentWillReceiveProps: function (nextProps) {
            var cantChange = ['template', 'dataSource', 'valueField', 'displayField', 'placeholder'];
            console.assert(_.isEqual(_.pick(nextProps, cantChange), _.pick(this.props, cantChange)), 'these props cant change after mount');
        },

        componentDidUpdate: function (prevProps) {
            var kendoWidget = Common.findWidget(this, 'kendoMultiSelect');

            if (prevProps.dataSource !== this.props.dataSource) {
                kendoWidget.setDataSource(this.props.dataSource);
            }

            if (this.props.value !== prevProps.value) {
                kendoWidget.value(rawValue(this.props));
            }

            if (this.props.disabled !== prevProps.disabled) {
                kendoWidget.enable(!this.props.disabled);
            }
            else if (this.props.readonly !== prevProps.readonly) {
                kendoWidget.readonly(this.props.readonly);
            }
        },

        onChange: function (event) {
            var kendoWidget = event.sender;
            var values = _.clone(kendoWidget.value());
            var dataItems = kendoWidget.dataItems().map(toPlainObject);

            // Before we update the value, we need to clear the filter or some values may not
            // be recognized as being in the data source.
            if (kendoWidget.dataSource.filter()) {
                kendoWidget.dataSource.filter(null);
            }
            // To keep the "Flux" loop, we need to reset the widget value to props so that data flows down.
            kendoWidget.value(rawValue(this.props));

            // Provide both scalar and object values for clients
            this.props.onChange(values, dataItems);
        }
    });

    return KendoMultiSelect;
});
