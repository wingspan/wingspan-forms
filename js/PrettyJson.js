/** @jsx React.DOM */
define([
    'react'
], function (React) {
    'use strict';

    var PrettyJson = React.createClass({
        render: function () {
            return (<pre>{JSON.stringify(this.props.value, undefined, 2)}</pre>);
        }
    });

    return PrettyJson;
});
