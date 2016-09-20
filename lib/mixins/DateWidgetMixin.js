'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _kendo = require('kendo');

var _kendo2 = _interopRequireDefault(_kendo);

var _ReactCommon = require('../ReactCommon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ISO_DATE_ONLY = 'yyyy-MM-dd';
var ISO_TIME_ONLY = 'HH:mm:ss';

function parseISODate(widgetName, dateStr) {
    // Handle the unusual format used by FieldInfo for specifying the current time/date.
    if (dateStr === 'NOW') {
        return new Date();
    } else if (dateStr === '' || dateStr == null) {
        return dateStr;
    }
    // For date-only and time-only controls, use kendo to parse because the value needs to be parsed
    // in the local time zone. ES5 Date.parse can handle date+time values.
    if (widgetName === 'kendoDatePicker') {
        return _kendo2.default.parseDate(dateStr, ISO_DATE_ONLY);
    } else if (widgetName === 'kendoTimePicker') {
        return _kendo2.default.parseDate(dateStr, ISO_TIME_ONLY);
    } else {
        return new Date(Date.parse(dateStr));
    }
}

function formatISODate(widgetName, date) {
    if (date === null) {
        return null;
    }
    if (widgetName === 'kendoDatePicker') {
        return _kendo2.default.toString(date, ISO_DATE_ONLY);
    } else if (widgetName === 'kendoTimePicker') {
        return _kendo2.default.toString(date, ISO_TIME_ONLY);
    } else {
        return date.toISOString();
    }
}

function DateWidgetMixin(widgetName) {
    var toISOString = formatISODate.bind(this, widgetName);
    var fromISOString = parseISODate.bind(this, widgetName);

    return {
        getDefaultProps: function getDefaultProps() {
            return {
                onChange: _ReactCommon.noop,
                disabled: false,
                readonly: false,
                noControl: false
            };
        },

        getWidget: function getWidget() {
            return (0, _ReactCommon.findWidget)(this, widgetName);
        },

        renderValue: function renderValue() {
            if (!this.props.value) {
                return '';
            }
            return _kendo2.default.toString(fromISOString(this.props.value), this.props.format);
        },

        componentDidMount: function componentDidMount() {
            if (this.props.noControl) {
                // Everything was done in JSX.
                return;
            }

            var $el = (0, _ReactCommon.findWidget)(this);
            $el[widgetName]({
                format: this.props.format,
                min: fromISOString(this.props.min),
                max: fromISOString(this.props.max),
                value: fromISOString(this.props.value),
                change: this.onChange
            });

            if (this.props.disabled) {
                // disabled beats readonly
                this.getWidget().enable(false);
            } else if (this.props.readonly) {
                this.getWidget().readonly(true);
            }
        },

        componentDidUpdate: function componentDidUpdate(prevProps) {
            if (this.props.noControl) {
                return;
            }

            var kendoWidget = this.getWidget();

            kendoWidget.min(fromISOString(this.props.min));
            kendoWidget.max(fromISOString(this.props.max));
            kendoWidget.value(fromISOString(this.props.value));

            if (this.props.value === null && kendoWidget.dateView.calendar) {
                // If the value is being cleared, the dateView also needs to be reset to use the current month
                kendoWidget.dateView.calendar.navigate(new Date());
            }

            if (this.props.disabled !== prevProps.disabled) {
                kendoWidget.enable(!this.props.disabled);
            } else if (this.props.readonly !== prevProps.readonly) {
                kendoWidget.readonly(this.props.readonly);
            }
        },

        componentWillUnmount: function componentWillUnmount() {
            if (this.props.noControl) {
                return;
            }
            this.getWidget().destroy();
        },

        onChange: function onChange(event) {
            var kendoWidget = event.sender;
            var value = toISOString(kendoWidget.value());

            // Put the original value back until new props force the change
            kendoWidget.value(fromISOString(this.props.value));

            this.props.onChange(value);
        }
    };
}

exports.default = DateWidgetMixin;