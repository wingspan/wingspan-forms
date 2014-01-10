/** @jsx React.DOM */
define([
    'underscore', 'react', 'jquery', 'wingspan-forms/util/debug',
    'wingspan-forms/controls/KendoText'
], function (_, React, $, debug, KendoText) {
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
                value: undefined,
                onChange: $.noop,
                placeholder: '',
                disabled: false,
                isValid: [true, ''],
                readonly: false,
                noControl: false,
                id: undefined,

                onEdit: $.noop,
                options: undefined // value compared to options via === i think
            };
        },

        render: function () {

            var displayVal;

            if (this.props.options.length === 0) {
                // If we have zero options (which can make sense sometimes),
                // a selected value does not make sense.
                debug.verify(_.contains([undefined, null], this.props.value));
                displayVal = '0 of 0';
            }
            else {
                var i = _.indexOf(this.props.options, this.props.value);
                debug.verify(i !== -1, 'selected value must be in the options list');
                var N = this.props.options.length;
                displayVal = _.str.sprintf('%s of %s', i+1, N);
            }

            return (
                <div className="carousel">
                    <button className="carouselButton backButton" onClick={_.partial(this.onChange, 'left')}><i className="icon iconPrev"/></button>
                    <input className="carouselInput" placeholder={this.props.placeholder} value={displayVal} readOnly={true} id={this.props.id} />
                    <button className="carouselButton forwardButton" onClick={_.partial(this.onChange, 'right')}><i className="icon iconNext"/></button>
                    <button className="carouselButton editButton" disabled={this.props.disabled} onClick={this.props.onEdit}>Edit Indices<i className="icon iconCaret"/></button>
                </div>
                );
        },

        onChange: function (direction, event) {
            var i = _.indexOf(this.props.options, this.props.value);
            var N = this.props.options.length;

            debug.verify(_.contains(['left', 'right'], direction))
            var nextIndex = (direction === 'left' ? (i - 1 + N) % N : (i + 1) % N);

            // don't actually move the carousel, the flux state must allow the change first.
            var nextSelectedRecord = this.props.options[nextIndex];
            this.props.onChange(nextSelectedRecord);
        }

    });

    return Carousel;
});