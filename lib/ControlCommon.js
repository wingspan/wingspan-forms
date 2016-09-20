'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.quadState = quadState;
exports.attachFormTooltips = attachFormTooltips;
exports.hideErrorTooltip = hideErrorTooltip;
exports.refreshErrorTooltip = refreshErrorTooltip;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _kendo = require('kendo');

var _kendo2 = _interopRequireDefault(_kendo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

function attachFormTooltips(body) {
    var $body = (0, _jquery2.default)(body);

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
        content: function content(e) {
            return e.target.parents('.hasTooltip').attr('data-tooltip');
        },
        show: function show() {
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
        content: function content(e) {
            return e.target.parents('.hasErrorTooltip').attr('data-error-tooltip');
        },
        show: function show() {
            this.popup.element.addClass('formErrorTooltip');

            this.targetMouseDown = this.hide.bind(this);
            this.target().on('mousedown', this.targetMouseDown);
        },
        hide: function hide() {
            this.target().off('mousedown', this.targetMouseDown);
        }
    });
}

function hideErrorTooltip() {
    var $body = (0, _jquery2.default)('body');

    $body.data('kendoErrorTooltip').hide();
}

function refreshErrorTooltip() {
    var $body = (0, _jquery2.default)('body');
    $body.data('kendoErrorTooltip').refresh();
}

_kendo2.default.ui.Tooltip.fn.hide = function () {
    if (this.popup) {
        this.popup.close();
    }
    // (AHG) If we're in the middle of a delay to show the popup, we want to cancel the delayed show too.
    if (this.timeout) {
        clearTimeout(this.timeout);
    }
};

/* Let tooltip users hook the popup open event to cancel showing an empty tooltip */
_kendo2.default.ui.Tooltip.fn._initPopup = _.wrap(_kendo2.default.ui.Tooltip.fn._initPopup, function (wrapped) {
    wrapped.call(this);

    if (this.options.open) {
        this.popup.bind('open', this.options.open.bind(this));
    }
});