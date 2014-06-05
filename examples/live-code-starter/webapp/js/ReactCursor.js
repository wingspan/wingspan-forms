define(['react'], function (React) {
    'use strict';

    function Cursor(state, pendingGetter, path, commit) {
        // Please treat values as read-only
        this.value = getRefAtPath(state, path); // value to put in the DOM, use from render()

        // Please treat pending values as read-only
        this.pendingValue = function () {
            return getRefAtPath(pendingGetter(), path); // the current value right now, use in event handlers
        };

        this.onChange = function (nextValue) {
            var nextState;

            if (path.length > 0) {
                nextState = React.addons.update(
                    pendingGetter(),
                    path.concat('$set').reduceRight(unDeref, nextValue)
                );
            }
            else if (path.length === 0) {
                nextState = nextValue;
            }
            commit(nextState);
            return new Cursor(state, pendingGetter, path, commit);
        };

        this.refine = function (/* one or more paths through the tree */) {
            var nextPath = [].concat(path, flatten(arguments));
            return new Cursor(state, pendingGetter, nextPath, commit);
        };
    }

    Cursor.build = function (state, pendingGetter, commit) {
        return new Cursor(state, pendingGetter, [], commit);
    };

    function getRefAtPath(tree, paths) {
        return reduce(paths, deref, tree);
    }

    function deref(obj, key) {
        return obj[key];
    }

    function unDeref(obj, key) {
        var nextObj = {};
        nextObj[key] = obj;
        return nextObj;
    }

    function reduce(array, f, mzero) {
        return array.reduce(f, mzero);
    }

    function flatten(listOfLists) {
        return [].concat.apply([], listOfLists);
    }


    return Cursor;
});