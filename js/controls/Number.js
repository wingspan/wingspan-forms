/** @jsx React.DOM */
define([
    'underscore', 'jquery', 'react'
], function (_, $, React) {
    'use strict';

    var numeric = /^[0-9]*$/,
        pattern = numeric.toString().replace(/^\/|\/$/g, '');

    // used in render but that's invisible to jshint
    void pattern;

    var Number = React.createClass({
        fieldClass: 'formFieldNumeric',

        getDefaultProps: function () {
            return {
                value: undefined,
                id: undefined,
                noControl: false,
                readonly: false,
                disabled: false,
                onChange: function () {}
            };
        },

        /* jshint ignore:start */
        render: function () {
            return (this.props.noControl
                ? (<span>{this.props.value}</span>)
                : (<input
                       id={this.props.id}
                       type="text"
                       pattern={pattern}
                       onChange={this.onInputChange}
                       className="k-textbox"
                       tabIndex="0"
                       value={this.props.value} />));
        },
        /* jshint ignore:end */

        onInputChange: function (event) {
            var value = event.target.value;

            if (this.props.readonly || !numeric.test(value)) {
                return;
            }

            this.props.onChange(value);
        }
    });

    return Number;
});
