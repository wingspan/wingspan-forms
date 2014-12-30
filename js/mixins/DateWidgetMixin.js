define([
    'underscore', 'jquery', 'kendo'
], function (_, $, kendo) {
    'use strict';

    var NOW = new Date();

    var ISO_DATE_ONLY = 'yyyy-MM-dd';
    var ISO_TIME_ONLY = 'HH:mm:ss';

    function parseISODate(widgetName, dateStr) {
        // Handle the unusual format used by FieldInfo for specifying the current time/date.
        if (dateStr === 'NOW') {
            return NOW;
        } else if (_.isEmpty(dateStr)) {
            return dateStr;
        }
        // For date-only and time-only controls, use kendo to parse because the value needs to be parsed
        // in the local time zone. ES5 Date.parse can handle date+time values.
        if (widgetName === 'kendoDatePicker') {
            return kendo.parseDate(dateStr, ISO_DATE_ONLY);
        } else if (widgetName === 'kendoTimePicker') {
            return kendo.parseDate(dateStr, ISO_TIME_ONLY);
        } else {
            return new Date(Date.parse(dateStr));
        }
    }

    function formatISODate(widgetName, date) {
        if (date === null) {
            return null;
        }
        if (widgetName === 'kendoDatePicker') {
            return kendo.toString(date, ISO_DATE_ONLY);
        } else if (widgetName === 'kendoTimePicker') {
            return kendo.toString(date, ISO_TIME_ONLY);
        } else {
            return date.toISOString();
        }
    }

    function DateWidgetMixin(widgetName) {
        var toISOString = formatISODate.bind(this, widgetName);
        var fromISOString = parseISODate.bind(this, widgetName);

        return {
            getDefaultProps: function () {
                return {
                    onChange: $.noop,
                    disabled: false,
                    readonly: false,
                    noControl: false
                };
            },

            getWidget: function () {
                return $(this.getDOMNode()).data(widgetName);
            },

            renderValue: function () {
                if (_.isEmpty(this.props.value)) {
                    return '';
                }
                return kendo.toString(fromISOString(this.props.value), this.props.format);
            },

            componentDidMount: function () {
                if (this.props.noControl) {
                    // Everything was done in JSX.
                    return;
                }

                var $el = $(this.getDOMNode());
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
                }
                else if (this.props.readonly) {
                    this.getWidget().readonly(true);
                }
            },

            componentDidUpdate: function (prevProps) {
                if (this.props.noControl) {
                    return;
                }

                var kendoWidget = this.getWidget();

                kendoWidget.min(fromISOString(this.props.min));
                kendoWidget.max(fromISOString(this.props.max));
                kendoWidget.value(fromISOString(this.props.value));

                if (this.props.value === null && kendoWidget.dateView.calendar) {
                    // If the value is being cleared, the dateView also needs to be reset to use the current month
                    kendoWidget.dateView.calendar.navigate(NOW);
                }

                if (this.props.disabled !== prevProps.disabled) {
                    kendoWidget.enable(!this.props.disabled);
                }
                else if (this.props.readonly !== prevProps.readonly) {
                    kendoWidget.readonly(this.props.readonly);
                }
            },

            componentWillUnmount: function () {
                if (this.props.noControl) {
                    return;
                }
                this.getWidget().destroy();
            },

            onChange: function (event) {
                var kendoWidget = event.sender;
                var value = toISOString(kendoWidget.value());

                // Put the original value back until new props force the change
                kendoWidget.value(fromISOString(this.props.value));

                this.props.onChange(value);
            }
        }
    }

    return DateWidgetMixin;
});
