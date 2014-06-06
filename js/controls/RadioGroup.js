/** @jsx React.DOM */
define([
    'underscore', 'react',
    '../ImmutableOptimizations'
], function (_, React, ImmutableOptimizations) {
    'use strict';


    var RadioGroup = React.createClass({
        mixins: [ImmutableOptimizations([])],

        statics: { fieldClass: function () { return 'formFieldRadio'; } },

        /*jshint ignore:start */
        render: function () {
            var value = this.props.value;

            _.each(this.props.children, function (radio) {
                // Check the radio button whose value matches the group's value
                radio.props.checked = (radio.props.value === value);
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