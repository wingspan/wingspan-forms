/** @jsx React.DOM */
define([
    'underscore', 'react', 'jquery',
    '../util/debug',
    'underscore-string'
], function (_, React, $, debug) {
    'use strict';


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
    var Carousel = React.createClass({

        fieldClass: 'formFieldCarousel',

        getDefaultProps: function () {
            return {
                value: undefined,    // integer - the selected index (0-based)
                onChange: $.noop,    // fluxes up the index as an integer
                placeholder: '',
                disabled: false,
                isValid: [true, ''],
                readonly: false,
                noControl: false,
                id: undefined,

                onEdit: $.noop,
                options: undefined, // value compared to options via === i think
                displayTextFn: undefined
            };
        },

        render: function () {
            var i = this.props.value;
            var N = this.props.options.length;

            if (this.props.options.length === 0) {
                // If we have zero options (which can make sense sometimes),
                // a selected value does not make sense.
                debug.verify(_.contains([undefined, null], this.props.value));
            }

            return (
                <div className="carousel">
                    <button disabled={N < 2} className="carouselButton backButton" onClick={_.partial(this.onChange, 'left')}><i className="icon iconPrev"/></button>
                    <input className="carouselInput" placeholder={this.props.placeholder} value={this.displayTextFn(i, N)} readOnly={true} id={this.props.id} />
                    <button disabled={N < 2} className="carouselButton forwardButton" onClick={_.partial(this.onChange, 'right')}><i className="icon iconNext"/></button>
                    <button className="carouselButton editButton" disabled={this.props.disabled} onClick={this.props.onEdit}>Edit Indices<i className="icon iconCaret"/></button>
                </div>
                );
        },

        onChange: function (direction, event) {
            var i = this.props.value;
            var N = this.props.options.length;

            debug.verify(_.contains(['left', 'right'], direction))
            var nextIndex = (direction === 'left' ? (i - 1 + N) % N : (i + 1) % N);

            // don't actually move the carousel, the flux state must allow the change first.
            this.props.onChange(nextIndex);
        },

        displayTextFn: function (i, N) {
            if (this.props.displayTextFn) {
                return this.props.displayTextFn(i, N);
            }
            else {
                return (N === 0
                    ? '0 of 0'
                    : _.str.sprintf('%s of %s', i+1, N));
            }
        }

    });

    return Carousel;
});