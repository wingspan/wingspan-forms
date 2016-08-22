import kendo from 'kendo'
import _ from 'underscore'
import { findWidget, noop } from '../ReactCommon'


var DataSource = kendo.data.DataSource;

var CANNOT_CHANGE = ['template', 'valueField', 'displayField', 'placeholder', 'filter'];

function rawValue(props) {
    return _.isObject(props.value) ? props.value[props.valueField] : props.value;
}

function displayValue(props) {
    return _.isObject(props.value) ? props.value[props.displayField] : props.value;
}

/* Getting the display value when the prop value is a scalar means traversing the data source to find
 the matching value.
 */
function displayValueFromData(props) {
    var dataSource = DataSource.create(props.dataSource);
    var dataItem = dataSource.data().find(function (item) {
        return (item.get(props.valueField) === props.value);
    });
    // If no match is found, assume the value is a custom value
    return dataItem ? dataItem.get(props.displayField) : props.value;
}

function SelectWidgetMixin(widgetName) {

    return {
        getDefaultProps: function () {
            return {
                onChange: noop,
                autoBind: true,
                disabled: false,
                readonly: false,
                noControl: false
            };
        },

        getWidget: function () {
            return findWidget(this, widgetName);
        },

        renderValue: function () {
            var props = this.props;

            if (_.isEmpty(props.value)) {
                return '';
            }
            if (_.isEmpty(props.displayField)) {
                return props.value;
            }
            // If the value is just an ID, the display value is in the DataSource.
            if (!_.isObject(props.value)) {
                return displayValueFromData(props);
            }
            return kendo.toString(displayValue(props));
        },

        componentDidMount: function () {
            if (this.props.noControl) {
                // Everything was done in JSX.
                return;
            }

            var props = this.props;
            var $el = findWidget(this);

            $el[widgetName](_.defaults({
                autoBind: props.autoBind,
                dataSource: props.dataSource,
                dataTextField: props.displayField,
                dataValueField: props.valueField,
                filter: props.filter,
                optionLabel: props.optionLabel,
                placeholder: props.placeholder,
                template: props.template,
                value: rawValue(props),
                change: this.onChange
            }, props.options));

            if (props.disabled) {
                // disabled beats readonly
                this.getWidget().enable(false);
            }
            else if (props.readonly) {
                this.getWidget().readonly(true);
            }

            if (_.isObject(props.value)) {
                this.getWidget().text(displayValue(props));
            }
        },

        componentDidUpdate: function (prevProps) {
            if (this.props.noControl) {
                return;
            }

            var props = this.props;
            var kendoWidget = this.getWidget();

            if (props.dataSource !== prevProps.dataSource) {
                kendoWidget.setDataSource(props.dataSource);
            }

            if (props.value !== prevProps.value) {
                kendoWidget.value(rawValue(props));

                if (_.isObject(props.value)) {
                    kendoWidget.text(displayValue(props));
                }
            }

            if (props.disabled !== prevProps.disabled) {
                kendoWidget.enable(!props.disabled);
            }
            else if (props.readonly !== prevProps.readonly) {
                kendoWidget.readonly(props.readonly);
            }
        },

        componentWillReceiveProps: function (nextProps) {
            console.assert(_.isEqual(_.pick(nextProps, CANNOT_CHANGE), _.pick(this.props, CANNOT_CHANGE)), 'these props cannot change after mount');
        },

        componentWillUnmount: function () {
            if (this.props.noControl) {
                return;
            }
            this.getWidget().destroy();
        },

        onChange: function (event) {
            var kendoWidget = event.sender;
            var value = kendoWidget.value();
            var valueObject = kendoWidget.dataItem();

            // Put the original value back until new props force the change
            kendoWidget.value(rawValue(this.props));

            // Don't return a model instance to the caller, just the object data
            this.props.onChange(value, valueObject ? valueObject.toJSON() : null);
        }
    };
}

export default SelectWidgetMixin;