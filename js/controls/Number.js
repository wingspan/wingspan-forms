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

        getInitialState: function () {
            return {
                value: this.props.value
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
                       value={this.state.value} />));
        },
        /* jshint ignore:end */

        onInputChange: function (event) {
            if (this.props.readonly) {
                return;
            }

            var value = event.target.value;

            if (numeric.test(value)) {
                this.setState({ value: value });
                this.props.onChange(value);
            }
        }
    });

    return Number;
});
