define([
    'underscore', 'jquery', 'kendo',
    './debug'
], function (_, $, kendo, debug) {
    'use strict';

    var exports = {};

    exports.clean = function (s) {
        return _.trim(s || '');
    };
    exports.orElse = function (value, fallback) {
        return _(value).isBlank() ? fallback : value;
    };

    /**
     * perform multiple requests in parallel, returning a Promise[Map[Key, Response]]
     * @fBuildUrl function that can build a URL from a key
     * @fAsyncRequest function of one argument that returns a promise
     * @keys the things to load, that fBuildUrl can build a URL from
     *
     * use case: takes a list of componentIDs to load, relative to componentRoot
     * returns a promise to the map of (ComponentID -> componentCfg)
     */
    exports.asyncParallel = function (fBuildUrl, fAsyncRequest, keys) {
        var responses = {};
        var asyncLoadOne = function (key) {
            var url = fBuildUrl(key);
            return fAsyncRequest(url).then(function (data) {
                responses[key] = data;
            });
        };
        var promises = _.map(keys, asyncLoadOne);
        return Q.all(promises).then(function () {
            return responses;
        });
    };
    /**
     * functional map over js objects:
     *
     *     var m={'a': 10, 'b': 20, 'c': 30};
     *     mapo(m, function(v,k){return [k, v+1];});
     *
     *       => {"a":11,"b":21,"c":31}
     */
    exports.mapo = _.compose(_.object, _.map);
    exports.identity = function (o) {
        return o;
    };

    /**
     * Util method to retrieve a field from the typeInfo since it may be nested and not directly accessible
     * @param fieldName name of the field
     * @param typeInfo typeInfo for the data
     * @returns {the found entry in typeInfo or throws}
     */
    exports.findFieldInfo = function (fieldName, typeInfo) {
        var fieldInfo = typeInfo.properties[fieldName];
        if (!fieldInfo) {
            fieldInfo = _.chain(typeInfo.types)
                .values()
                .pluck('properties')
                .compact()
                .pluck(fieldName)
                .value();

            fieldInfo = _.isArray(fieldInfo) ? fieldInfo[0] : fieldInfo;
        }
        debug.verify(_.isObject(fieldInfo), 'Unable to find fieldInfo for: ' + fieldName);
        return fieldInfo;
    };

    /**
     * Converts a value of a typed object from the server into a display. This will usually be Orm Data
     * @param value value to convert (could be string, bool, etc, or complex type user, dictionary, enum, etc...)
     * @param fieldName name of the field
     * @param typeInfo typeInfo of the
     * @param localeManager locale manager.
     * @returns {*}
     */
    exports.typedObjectValueToDisplayValue = function (value, fieldName, typeInfo, localeManager) {
        if (null === value || undefined === value) {
            return '';
        }
        var fieldInfo = exports.findFieldInfo(fieldName, typeInfo);
        return exports.typedObjectValueToDisplayValue2(value, fieldName, fieldInfo, localeManager);
    };

    exports.typedObjectValueToDisplayValue2 = function (value, fieldName, fieldInfo, localeManager) {
        if (null === value || undefined === value) {
            return '';
        }
        debug.verify(_.isObject(fieldInfo), 'Unable to find fieldInfo for: ' + fieldName);
        // not sure why _.isArray not working - JY
        if (_.isArray(value) || (value.length !== undefined && value.push !== undefined && value.pop !== undefined)) {
            return _.map(value, function (v) { return exports.typedObjectValueToDisplayValue2(v, fieldName, fieldInfo, localeManager); }).join(', ');
        }

        var dataType = fieldInfo.dataType;
        if ('text' === dataType) {
            return value;
        }
        if ('number' === dataType) {
            return value;
        }
        if ('boolean' === dataType) {
            return localeManager.localize(value === true ? 'true' : 'false');
        }

        // TODO DATE NEEDS TO COME FROM SERVER CONFIGURATION
        if ('datetime' === dataType && _.isString(value)) {
            return kendo.toString(value, 'dd-MMM-yyyy h:mm tt');
        }
        // todo need to be able to handle date only fields here
        if ('date' === dataType && _.isString(value)) {
            return kendo.toString(value, 'dd-MMM-yyyy');
        }

        // so it's a complex object, and we'll just try to sort it out at the moment
        // we probably want to try to add the names of the id and display fields to the typeinfo to make this much more explicit
        if (value.displayName !== undefined) {  // userorgroup
            return value.displayName;
        }
        if (value.fullName !== undefined) {  // users
            return value.fullName;
        }
        if (value.name !== undefined) {
            return value.name;
        }
        if (value.value !== undefined) {
            return value.value;
        }
        if (value.id !== undefined) {
            return value.id;
        }
        return value;
    };

    exports.typedObjectValueToValueField = function (value) {
        if (!!value.id) {
            return value.id;
        }
        if (!!value.value) {
            return value.value;
        }
        return exports.hashRecord(value);
    };

    /**
     * Searches for data attributes by name and value, i.e. data-[name]="[value]".
     * This returns all found elements. It does not assert on the number returned.
     */
    function findData(html, name, value) {
        if (_.isUndefined(html) || _.isNull(html)) {
            throw 'No html for findData.';
        }
        if (_.isUndefined(name) || _.isNull(name) || '' === name) {
            throw 'Attribute name required for findData.';
        }
        if (_.isUndefined(value) || _.isNull(value) || '' === value) {
            throw 'Attribute value required for findData.';
        }
        var attr = 'data-' + name;
        return html.find('[' + attr + '=\'' + value + '\']');
    }

    exports.findData = findData;
    /**
     * Searches for tagged attributes (data-wspt-[key]="[value]") in the target dom.  Fails if a single, unique element is not found.
     * @param html the html to search.
     * @param key the suffix to data-wspt-
     * @param value The value of the data-snippet attribute.
     */
    function snippet(html, key, value) {
        // if we used this value without checking findData would not complain.
        if (_.isUndefined(key) || _.isNull(key) || '' === key) {
            throw 'Key required for snippet.';
        }
        var q = findData(html, 'wspt-' + key, value);
        if (1 !== q.size()) {
            var sErr = _.str.sprintf('Expected one target at `%s`=`%s` but found `%s` in the current DOM.', key, value, q.size());
            debugger;
            throw sErr;
        }
        return q;
    }

    exports.snippet = snippet;
    /**
     * Attempts to show some HTML as a string.
     */
    function showHTML(h) {
        try {
            return $('<div/>').append(h).html();
        }
        catch (e) {
            // Since we only call this when we're in trouble (e.g. about to throw an exception) in makes sense to
            // just leave this debugger statement in.
            debugger;
            return _.str.sprintf('Can\'t show HTML: %s\n%s', h, _.escape(e.toString()));
        }
    }

    exports.showHTML = showHTML;
    /**
     * Represent an object as a JSON string.  This can easily fail for complicated/recursive JSON objects.
     * @param o an object.
     */
    function showObject(o) {
        try {
            return JSON.stringify(o);
        }
        catch (e) {
            // Since we only call this when we're in trouble (e.g. about to throw an exception) it makes sense to just leave this debugger statement in.
            debugger;
            return _.str.sprintf('Can\'t show JSON: %s\n%s', o, _.escape(e.toString()));
        }
    }

    exports.showObject = showObject;
    function barf(msg /* ... */) {
        void msg;
        var arr = Array.prototype.slice.call(arguments, 0);
        arr.unshift(false);
        debugger;
        debug.verify.apply(null, arr);
    }

    exports.barf = barf;
    function test(cond, msg /* ... */) {
        void msg;
        if (! cond) {
            barf.apply(null, _.tail(arguments));
        }
    }

    exports.test = test;
    /**
     * Asserts that a reference is defined and not null or throws the message.
     * This returns the object being tested which makes for a very convenient formulation of test and extract, which we do a lot of.
     * @param o The object to test.
     * @param msg The message to throw.
     * @returns o
     */
    function exists(o, msg /* ... */) {
        void msg;
        _.partial(test, ! (_.isUndefined(o) || _.isNull(o))).apply(null, _.tail(arguments));
        return o;
    }

    exports.exists = exists;

    /**
     * Asserts that object o has field named m (with something in it).
     * @param object the containing object.
     * @param fieldName the name of the field (which will also be used in any thrown errors).
     * @returns {*} The field.
     */
    function fieldExists(object, fieldName) {
        return _.partial(exists, object[fieldName]).call(null, 'Missing: \'%s\'', fieldName);
    }

    exports.fieldExists = fieldExists;

    function hasField(object, fieldName) {
        var field = object[fieldName];
        return ! (_.isUndefined(field) || _.isNull(field));
    }

    exports.hasField = hasField;

    /**
     * We commonly get array of id based objects and need to look them up by id.
     * To this end, this function takes an array and converts it to an object whose fields are named by the id fields in the array elements.
     * The fields' values are the individual corresponding array elements.
     * @param array
     * @returns {*}
     */
    function arrayToMap(array) {
        if (! _.isArray(array)) {
            throw 'Array required.';
        }
        return _.reduce(array, function (obj, item) {
            var id = exists(item.id, 'missing id');
            if (undefined !== obj[id]) {
                throw 'Duplicate id ' + id + ' in array mapping.';
            }
            obj[id] = item;
            return obj;
        }, {});
    }

    exports.arrayToMap = arrayToMap;

    /**
     * Finds all the elements with tooltip content, sees if they've been localized, localizes them.
     * @param The html to scour.
     * @localeManager to handle the localization.
     */
    exports.updateTooltips = function ($el, localeManager) {
        var dataTT = 'tooltip-content';
        // this prefix indicates that the tooltip has not been localized.
        var pref = 'l10n:';
        var tooltips = $el.find('[data-' + dataTT + ']');
        _.each(tooltips, function (tooltip) {
            var elem = $(tooltip);
            var tt = elem.data(dataTT);
            if (0 === tt.indexOf(pref)) {
                var t = tt.substring(pref.length);
                var r = localeManager.localize(t);
                elem.attr('data-' + dataTT, r);
            }
        });
    };
    /**
     * Makes the page busy and then makes it unbusy when the promise finished (reject or fulfilled).
     * @param promise
     * @return {promise} The promise for fluency.
     */
    exports.busyPromise = function (promise) {
        $('html').addClass('busy');
        promise.fin(function () {
            $(this).removeClass('busy');
        });
        return promise; // fluency
    };


    /**
     * Hash of a javascript string
     *
     * http://stackoverflow.com/a/7616484/20003
     */
    exports.hashString = function (str) {
        var hash = 0, i, ch, l;
        if (str.length === 0) {
            return hash;
        }
        for (i = 0, l = str.length; i < l; i++) {
            ch  = str.charCodeAt(i);
            hash  = ((hash << 5) - hash) + ch;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    };

    exports.hashRecord = function (record) {
        return exports.hashString(JSON.stringify(record));
    };


    /*
     All this stuff should be in underscore. :(
     */
    function prependToAll(x, xs) {
        if (0 === xs.length) {
            return xs;
        } else {
            return [x, _.head(xs)].concat(prependToAll(x, _.tail(xs)));
        }
    }
    exports.prependToAll = prependToAll;


    function intersperse(x, xs) {
        if (0 === xs.length) {
            return xs;
        } else {
            return [_.head(xs)].concat(prependToAll(x, _.tail(xs)));
        }
    }
    exports.intersperse = intersperse;

    /**
     * Turns an array into a comma separated string of its items.
     * @param items An array of items or a single item.
     * @returns {string}
     */
    function commaSeparateList(items) {
        var str = '';
        var first = true;
        if (_.isArray(items)) {
            _.each(items, function (item) {
                if (first) { first = false; }
                else { str += ', '; }
                str += item;
            });
        } else {
            str += items;
        }
        return str;
    }
    exports.commaSeparateList = commaSeparateList;

    function firstWhere(array, selector) {
        function impl(n) {
            if (n >= array.length) {
                return null;
            }
            if (selector(array[n])) {
                return array[n];
            }
            return impl(n + 1);
        }
        return impl(0);
    }
    exports.firstWhere = firstWhere;

    function deepClone(obj) {
        // Harness the native JSON code in the browser to efficiently copy all the data
        return JSON.parse(JSON.stringify(obj));
    }
    exports.deepClone = deepClone;

    function containsDeep(haystack, needle) {
        return !!_.find(haystack, function (h) {
            return _.isEqual(h, needle);  // deep value equality
        });
    }
    exports.containsDeep = containsDeep;

    function uniqueDeep(xs) {
        return _.reduce(xs, function (acc, x) {
            return (!containsDeep(acc, x)
                ? acc.concat(x) // this returns a new array, does not mutate inline
                : acc);
        }, []);
    }
    exports.uniqueDeep = uniqueDeep;

    /**
     *    _.union([{b:2}, {a: 1}], [{a: 1}]);   // => set of length 3 due to reference equality (bad!)
     *    util.unionDeep([{b:2}, {a: 1}], [{a: 1}]);   //=> [{b:2}, {a: 1}]   (proper length, value equality)
     */
    exports.unionDeep = function (/* set1, set2, ... */) {
        return uniqueDeep(_.flatten(arguments));
    };

    /**
     * util.differenceDeep([{z: 0}, {b: 2}, {a: 3}], {a: 3}, {z: 0})   // => [{b: 2}]
     */
    exports.differenceDeep = function (/* set1, set2, ... */) {
        var removeTheseItems = _.flatten(_.tail(arguments));
        var fromTheseItems = _.head(arguments);
        return _.filter(fromTheseItems, function (x) {
            // if the current item in the first set exists in any of the other sets,
            // it should not be in the difference.
            var shouldRemove = containsDeep(removeTheseItems, x);
            return !shouldRemove;
        });
    };

    /**
     * @param record  "JSON" or "POJO" value which will have his fields filtered by the predicate
     * @param predicate which will be passed one argument, a list [key, value]
     * @returns new record with fewer keys
     *
     *
     *   filterRecordKeys( {}, function (pair)
     *
     */
    exports.filterRecordKeys = function (record, predicate) {
        return _.object(_.filter(_.pairs(record), predicate));
    };

    /**
     * Return all elements from records whose id properties are not found in the ids list
     *
     * @param records
     * @param ids
     * @returns {*}
     */
    exports.differenceById = function (records, ids) {
        return _.reject(records, function (record) {
            return _.contains(ids, record.id);
        });
    };

    /**
     * Return a copy of `original` with undefined values filled in from `defaults`.
     */
    exports.defaults = function (original, defaults, predicate) {
        predicate = predicate || _.isUndefined;

        var copy = _.extend({}, original);
        for (var prop in defaults) {
            if (predicate(original[prop])) {
                copy[prop] = defaults[prop];
            }
        }
        return copy;
    };

    return exports;
});
