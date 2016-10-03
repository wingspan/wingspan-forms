import $ from 'jquery'
import kendo from 'kendo'
import _ from 'lodash'

export function quadState(disabled, readonly, isValid, noControl) {
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

export function isEqualDataSource(d1, d2) {
    if (d1 === d2) {
        return true;
    }
    // Cannot compare DataSource objects, so return false if either param is not an array.
    if (!Array.isArray(d1) || !Array.isArray(d2)) {
        return false;
    }
    if (d1.length !== d2.length) {
        return false;
    }
    // Arrays are equal if all items are equal.
    return d1.every((item, index) => item === d2[index]);
}

export function attachFormTooltips(body) {
    var $body = $(body);

    function tooltipMarginLeft(target) {
        return target.parent().hasClass('formFieldNoWrap') ? '90px' : '';
    }

    // The tooltip for the [i] button and the label
    $body.kendoTooltip({
        prefix: 'Info',
        filter: '.hasTooltip .formLabel',
        position: 'top',
        showOn: 'click',
        width: 320,
        content: function (e) {
            return e.target.parents('.hasTooltip').attr('data-tooltip');
        },
        show: function () {
            this.popup.element.addClass('formTooltip');

            // (AHG) Fields with labels on the left should have the tooltips move over
            this.popup.element.css('margin-left', tooltipMarginLeft(this.target()));
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
            return e.target.parents('.hasErrorTooltip').attr('data-error-tooltip');
        },
        show: function () {
            this.popup.element.addClass('formErrorTooltip');

            this.targetMouseDown = this.hide.bind(this);
            this.target().on('mousedown', this.targetMouseDown);
        },
        hide: function () {
            this.target().off('mousedown', this.targetMouseDown);
        }
    });
}

export function hideErrorTooltip() {
    var $body = $('body');

    $body.data('kendoErrorTooltip').hide();
}

export function refreshErrorTooltip() {
    var $body = $('body');
    $body.data('kendoErrorTooltip').refresh();
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

/* Let tooltip users hook the popup open event to cancel showing an empty tooltip */
kendo.ui.Tooltip.fn._initPopup = _.wrap(kendo.ui.Tooltip.fn._initPopup, function (wrapped) {
    wrapped.call(this);

    if (this.options.open) {
        this.popup.bind('open', this.options.open.bind(this));
    }
});
