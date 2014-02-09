/** @jsx React.DOM */
define([
    'react'
], function (React) {
    'use strict';

    var Timer = React.createClass({

        getDefaultProps: function () {
            return {
                value: undefined,
                onChange: undefined
            };
        },

        tick: function() {
            this.props.onChange(this.props.value + 1);
        },

        componentDidMount: function() {
            this.interval = setInterval(this.tick, 1000);
        },

        componentWillUnmount: function() {
            clearInterval(this.interval);
        },

        render: function() {
            return (<div>{'Seconds Elapsed: ' + this.props.value}</div>);
        }
    });

    return Timer;
});