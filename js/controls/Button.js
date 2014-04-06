/** @jsx React.DOM */
define([
    'underscore', 'react',
    '../ImmutableOptimizations'
], function (_, React, ImmutableOptimizations) {
    'use strict';


    var Button = React.createClass({
        mixins: [ImmutableOptimizations],

        getDefaultProps: function () {
            return {
                onClick: undefined,
                disabled: false,
                className: undefined // one string, space delimited (if you want to specify more than one class)
            };
        },

        render: function () {
            var classes = _.compact([
                this.props.className,
                this.props.disabled ? 'buttonDisabled' : null
            ]);
            return (<button className={classes.join(' ')} onClick={this.props.onClick} disabled={this.props.disabled}>{this.props.children}</button>);
        }
    });

    return Button;
});