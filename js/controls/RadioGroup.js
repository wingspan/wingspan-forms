/** @jsx React.DOM */
define([
    'underscore', 'react'
], function (_, React) {
    'use strict';


    var RadioGroup = React.createClass({

        propTypes: {
            value: React.PropTypes.any
        },

        statics: { fieldClass: function () { return 'formFieldRadio'; } },

        /*jshint ignore:start */
        render: function () {
            var value = this.props.value;

            React.Children.forEach(this.props.children, function (radio) {

                // The use of double-equals is intentional here, so that numbers represented as strings will match.
                radio.props.checked = (radio.props.value == value);
            });

            return (
                <fieldset>
                    {this.props.children}
                </fieldset>
            );
        }
        /*jshint ignore:end */
    });


    return RadioGroup;
});