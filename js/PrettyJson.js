/** @jsx React.DOM */
define([
    'react',
    'ImmutableOptimizations'
], function (React, ImmutableOptimizations) {
    'use strict';

    var PrettyJson = React.createClass({
        mixins: [ImmutableOptimizations([])],

        render: function () {
            return (<pre>{JSON.stringify(this.props.value, undefined, 2)}</pre>);
        }
    });

    return PrettyJson;
});
