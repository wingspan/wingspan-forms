define([
    'underscore', './util/util'
], function (_, util) {
    'use strict';

    /**
     * Use this mixin when you want to have only a single onChange handler to aggregate all
     * the state at the top of your app.
     */
    var TopStateMixin = {
        onChange: function (path, /* more paths,*/ value) {
            path = _.flatten(_.initial(arguments));
            value = _.last(arguments);

            var nextState = util.deepClone(this.state);
            var scoped = getRefAtPath(nextState, _.initial(path));
            scoped[_.last(path)] = value;
            this.setState(nextState);
        }
    };

    /**
     * Must return a reference into the scoped value (that we can mutate on purpose).
     */
    function getRefAtPath (tree, paths) {
        return _.reduce(paths, deref, tree);
    }

    function deref (obj, key) { return obj[key]; }

    return TopStateMixin;
});