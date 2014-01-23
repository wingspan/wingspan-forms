define([
    'underscore'
], function (_) {
    'use strict';

    var ImmutableOptimizations = {
        shouldComponentUpdate: function (nextProps, nextState) {
            return !_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state);
        }
    };

    return ImmutableOptimizations;
});
