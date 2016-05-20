
define([
    'underscore', 'react', 'jquery'
], function (_, React, $) {
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

        statics: { fieldClass: function () { return 'formFieldCarousel'; } },

        getDefaultProps: function () {
            return {
                value: undefined,    // integer - the selected index (0-based)
                onChange: $.noop,    // fluxes up the index as an integer
                disabled: false,
                readonly: false,
                noControl: false,
                id: undefined,
                options: undefined,
                displayTextFn: undefined
            };
        },

        render: function () {
            var i = this.props.value;
            var N = this.props.options.length;

            if (this.props.options.length === 0) {
                // If we have zero options (which can make sense sometimes),
                // a selected value does not make sense.
                console.assert(_.contains([undefined, null], this.props.value));
            }

            if (this.props.noControl) {
                return (<div className="carousel"/>);
            }

            return (
                <div className="carousel">
                    <button disabled={N < 2} className="carouselButton backButton"
                            onClick={_.partial(this.onChange, 'left')}><i className="icon iconPrev"/></button>
                    <input className="carouselInput"
                           value={this.displayTextFn(i, N)}
                           readOnly={true}
                           id={this.props.id} />
                    <button disabled={N < 2} className="carouselButton forwardButton"
                            onClick={_.partial(this.onChange, 'right')}><i className="icon iconNext"/></button>
                    {this.props.onEdit ? (
                        <button className="carouselButton editButton" disabled={this.props.disabled}
                                onClick={this.props.onEdit}>{this.props.buttonLabel}</button>
                    ) : null}
                </div>
            );
        },

        onChange: function (direction) {
            var i = this.props.value;
            var N = this.props.options.length;

            console.assert(_.contains(['left', 'right'], direction));
            var nextIndex = (direction === 'left' ? (i - 1 + N) % N : (i + 1) % N);

            // don't actually move the carousel, the flux state must allow the change first.
            this.props.onChange(nextIndex);
        },

        displayTextFn: function (i, N) {
            if (this.props.displayTextFn) {
                return this.props.displayTextFn(i, N);
            }
            else {
                return (N === 0) ? '(none)' : `${i+1} of ${N}`;
            }
        }

    });

    return Carousel;
});
