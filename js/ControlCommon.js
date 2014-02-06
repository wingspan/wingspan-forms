define([
    'underscore', 'jquery', 'kendo'
], function (_, $, kendo) {
    'use strict';

    var NOW = new Date();
    var DEFAULTS = kendo.ui.DateTimePicker.fn.options;

    function quadState(disabled, readonly, isValid, noControl) {
        if (noControl) {
            return 'noControl';
        } else if (disabled) {
            // disabled beats readonly
            return 'formFieldDisabled';
        } else if (readonly) {
            return 'formFieldReadonly';
        } else if (!isValid[0]) {
            return 'formFieldError';
        } else {
            return null;
        }
    }

    /**
     * Handle the unusual format used by TypeInfo for specifying the current time.
     * @param date
     * @returns {Date}
     */
    function parseDate(date) {
        return (date === 'NOW') ? NOW : date;
    }


    function setKendoDateState(kendoWidget, value, disabled, readonly, max, min) {
        kendoWidget.value(value);
        kendoWidget.min(parseDate(min || DEFAULTS.min));
        kendoWidget.max(parseDate(max || DEFAULTS.max));
        setKendoDisabledReadonly(kendoWidget, disabled, readonly);
    }

    function setKendoNumberState(kendoWidget, value, disabled, readonly) {
        setKendoNumberValue(kendoWidget, value);
        setKendoDisabledReadonly(kendoWidget, disabled, readonly);
    }

    function setKendoNumberValue(kendoWidget, value) {
        kendoWidget.value(value);
    }

    function setKendoDisabledReadonly(kendoWidget, disabled, readonly) {
        if (disabled) {
            // disabled beats readonly
            kendoWidget.enable(false);
        } else if (readonly) {
            kendoWidget.readonly(true);
        } else {
            kendoWidget.enable(true);
        }
    }

    function attachFormTooltips($body) {

        // The tooltip for the [i] button and the label
        $body.kendoTooltip({
            prefix: 'Info',
            filter: '.hasTooltip .formLabel',
            position: 'top',
            showOn: 'click',
            width: 320,
            content: function (e) {
                return e.target.parents('.hasTooltip').data('tooltip');
            },
            show: function () {
                this.popup.element.addClass('formTooltip');
            }
        });

        // and the tooltip for invalid fields
        $body.kendoTooltip({
            prefix: 'Error',
            filter: '.hasErrorTooltip .formElement',
            position: 'bottom',
            showOn: 'mouseenter',
            showAfter: 1000,
            width: 240,
            content: function (e) {
                return e.target.parents('.formFieldError').data('error-tooltip');
            },
            show: function () {
                this.popup.element.addClass('formErrorTooltip');
            }
        });
    }

    function hideErrorTooltip() {
        var $body = $('body');

        $body.data('kendoErrorTooltip').hide();
    }

    kendo.ui.Tooltip.fn.hide = function () {
        if (this.popup) {
            this.popup.close();
        }
        // (AHG) If we're in the middle of a delay to show the popup, we want to cancel the delayed show too.
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    };

    return {
        quadState: quadState,
        parseDate: parseDate,
        attachFormTooltips: attachFormTooltips,
        hideErrorTooltip: hideErrorTooltip,
        setKendoDateState: setKendoDateState,
        setKendoNumberState: setKendoNumberState,
        setKendoNumberValue: setKendoNumberValue,
        setKendoDisabledReadonly: setKendoDisabledReadonly
    };
});