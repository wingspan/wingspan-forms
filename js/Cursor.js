define([
    'lodash'
], function (_) {
    'use strict';

    function Cursor (state, path, commit, clone) {

        this.value = getRefAtPath(state, path);

        this.onChange = function (nextValue) {
            var nextState;
            if (path.length > 0) {
                var nextState = clone(state);
                var scoped = getRefAtPath(nextState, _.initial(path));
                scoped[_.last(path)] = nextValue;
                commit(nextState);
            }
            else if (path.length === 0) {
                nextState = nextValue;
            }
            commit(nextState);
        };

        this.refine = function (/* one or more paths through the tree */) {
            var nextPath = [].concat(path, _.flatten(arguments));
            return new Cursor(state, nextPath, commit, clone);
        };
    }

    Cursor.build = function (state, commit, clone) {
        return new Cursor(state, [], commit, clone);
    };




    function getRefAtPath (tree, paths) {
        return _.reduce(paths, deref, tree);

        function deref (obj, key) { return obj[key]; }
    }

    return Cursor;

//    Example usages:
//    Cursor.build(this.state, this.setState.bind(this), _.cloneDeep);
//    Cursor.build(this.notState, function (nextState) { merge(this.notReactState, nextState); }.bind(this), _.identity);
});
