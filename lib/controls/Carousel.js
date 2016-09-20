'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ReactCommon = require('../ReactCommon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Small inline carousel which is basically a tabpanel styled differently.
 *
 * Takes these props:
 *   - options: the available records to slide between
 *   - value: the currently selected record, which is required except if options === []
 *
 * This is a tricky contract to get right but it keeps everything well defined through
 * all the possible corner cases.
 */
var Carousel = _react2.default.createClass({
    displayName: 'Carousel',


    statics: { fieldClass: function fieldClass() {
            return 'formFieldCarousel';
        } },

    getDefaultProps: function getDefaultProps() {
        return {
            value: undefined, // integer - the selected index (0-based)
            onChange: _ReactCommon.noop,
            disabled: false,
            readonly: false,
            noControl: false,
            id: undefined,
            options: undefined,
            displayTextFn: undefined
        };
    },

    render: function render() {
        var i = this.props.value;
        var N = this.props.options.length;

        if (this.props.options.length === 0) {
            // If we have zero options (which can make sense sometimes),
            // a selected value does not make sense.
            console.assert(this.props.value == null);
        }

        if (this.props.noControl) {
            return _react2.default.createElement('div', { className: 'carousel' });
        }

        return _react2.default.createElement(
            'div',
            { className: 'carousel' },
            _react2.default.createElement(
                'button',
                { disabled: N < 2, className: 'carouselButton backButton', 'data-dir': 'left',
                    onClick: this.onChange },
                _react2.default.createElement('i', { className: 'icon iconPrev' })
            ),
            _react2.default.createElement('input', { className: 'carouselInput',
                value: this.displayTextFn(i, N),
                readOnly: true,
                id: this.props.id }),
            _react2.default.createElement(
                'button',
                { disabled: N < 2, className: 'carouselButton forwardButton', 'data-dir': 'right',
                    onClick: this.onChange },
                _react2.default.createElement('i', { className: 'icon iconNext' })
            ),
            this.props.onEdit ? _react2.default.createElement(
                'button',
                { className: 'carouselButton editButton', disabled: this.props.disabled,
                    onClick: this.props.onEdit },
                this.props.buttonLabel
            ) : null
        );
    },

    onChange: function onChange(e) {
        var i = this.props.value;
        var N = this.props.options.length;
        var direction = e.target.getAttribute('data-dir');

        console.assert(direction === 'left' || direction === 'right');
        var nextIndex = direction === 'left' ? (i - 1 + N) % N : (i + 1) % N;

        // don't actually move the carousel, the flux state must allow the change first.
        this.props.onChange(nextIndex);
    },

    displayTextFn: function displayTextFn(i, N) {
        if (this.props.displayTextFn) {
            return this.props.displayTextFn(i, N);
        } else {
            return N === 0 ? '(none)' : i + 1 + ' of ' + N;
        }
    }

});

exports.default = Carousel;