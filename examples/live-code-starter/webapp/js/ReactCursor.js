define(['react'], function (React) {
    'use strict';

    function Cursor(state, path, commit) {
        this.value = getRefAtPath(state, path);

        this.onChange = function (nextValue) {
            var nextState;

            if (path.length > 0) {
                nextState = React.addons.update(
                    state,
                    path.concat('$set').reduceRight(unDeref, nextValue)
                );
            }
            else if (path.length === 0) {
                nextState = nextValue;
            }
            commit(nextState);
            return new Cursor(state, path, commit);
        };

        this.refine = function (/* pathStep1, pathStep2, ... pathStepN */) {
            var nextPath = [].concat(path, flatten(arguments));
            return new Cursor(state, nextPath, commit);
        };
    }

    Cursor.build = function (state, commit) {
        return new Cursor(state, [], commit);
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