(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([
            'underscore', 'jquery', 'underscore.string', 'moment', 'q'
        ], factory);
    } else {
        root.WingspanContrib = factory(root._, root.$, root._s, root.moment, root.Q);
    }
}(this, function (_, $, _s, moment, Q) {/**
 * @license almond 0.2.9 Copyright (c) 2011-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */
//Going sloppy to avoid 'use strict' string cost, but strict practices should
//be followed.
/*jslint sloppy: true */
/*global setTimeout: false */

var requirejs, require, define;
(function (undef) {
    var main, req, makeMap, handlers,
        defined = {},
        waiting = {},
        config = {},
        defining = {},
        hasOwn = Object.prototype.hasOwnProperty,
        aps = [].slice,
        jsSuffixRegExp = /\.js$/;

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    /**
     * Given a relative module name, like ./something, normalize it to
     * a real name that can be mapped to a path.
     * @param {String} name the relative name
     * @param {String} baseName a real name that the name arg is relative
     * to.
     * @returns {String} normalized name
     */
    function normalize(name, baseName) {
        var nameParts, nameSegment, mapValue, foundMap, lastIndex,
            foundI, foundStarMap, starI, i, j, part,
            baseParts = baseName && baseName.split("/"),
            map = config.map,
            starMap = (map && map['*']) || {};

        //Adjust any relative paths.
        if (name && name.charAt(0) === ".") {
            //If have a base name, try to normalize against it,
            //otherwise, assume it is a top-level require that will
            //be relative to baseUrl in the end.
            if (baseName) {
                //Convert baseName to array, and lop off the last part,
                //so that . matches that "directory" and not name of the baseName's
                //module. For instance, baseName of "one/two/three", maps to
                //"one/two/three.js", but we want the directory, "one/two" for
                //this normalization.
                baseParts = baseParts.slice(0, baseParts.length - 1);
                name = name.split('/');
                lastIndex = name.length - 1;

                // Node .js allowance:
                if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                    name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
                }

                name = baseParts.concat(name);

                //start trimDots
                for (i = 0; i < name.length; i += 1) {
                    part = name[i];
                    if (part === ".") {
                        name.splice(i, 1);
                        i -= 1;
                    } else if (part === "..") {
                        if (i === 1 && (name[2] === '..' || name[0] === '..')) {
                            //End of the line. Keep at least one non-dot
                            //path segment at the front so it can be mapped
                            //correctly to disk. Otherwise, there is likely
                            //no path mapping for a path starting with '..'.
                            //This can still fail, but catches the most reasonable
                            //uses of ..
                            break;
                        } else if (i > 0) {
                            name.splice(i - 1, 2);
                            i -= 2;
                        }
                    }
                }
                //end trimDots

                name = name.join("/");
            } else if (name.indexOf('./') === 0) {
                // No baseName, so this is ID is resolved relative
                // to baseUrl, pull off the leading dot.
                name = name.substring(2);
            }
        }

        //Apply map config if available.
        if ((baseParts || starMap) && map) {
            nameParts = name.split('/');

            for (i = nameParts.length; i > 0; i -= 1) {
                nameSegment = nameParts.slice(0, i).join("/");

                if (baseParts) {
                    //Find the longest baseName segment match in the config.
                    //So, do joins on the biggest to smallest lengths of baseParts.
                    for (j = baseParts.length; j > 0; j -= 1) {
                        mapValue = map[baseParts.slice(0, j).join('/')];

                        //baseName segment has  config, find if it has one for
                        //this name.
                        if (mapValue) {
                            mapValue = mapValue[nameSegment];
                            if (mapValue) {
                                //Match, update name to the new value.
                                foundMap = mapValue;
                                foundI = i;
                                break;
                            }
                        }
                    }
                }

                if (foundMap) {
                    break;
                }

                //Check for a star map match, but just hold on to it,
                //if there is a shorter segment match later in a matching
                //config, then favor over this star map.
                if (!foundStarMap && starMap && starMap[nameSegment]) {
                    foundStarMap = starMap[nameSegment];
                    starI = i;
                }
            }

            if (!foundMap && foundStarMap) {
                foundMap = foundStarMap;
                foundI = starI;
            }

            if (foundMap) {
                nameParts.splice(0, foundI, foundMap);
                name = nameParts.join('/');
            }
        }

        return name;
    }

    function makeRequire(relName, forceSync) {
        return function () {
            //A version of a require function that passes a moduleName
            //value for items that may need to
            //look up paths relative to the moduleName
            return req.apply(undef, aps.call(arguments, 0).concat([relName, forceSync]));
        };
    }

    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(depName) {
        return function (value) {
            defined[depName] = value;
        };
    }

    function callDep(name) {
        if (hasProp(waiting, name)) {
            var args = waiting[name];
            delete waiting[name];
            defining[name] = true;
            main.apply(undef, args);
        }

        if (!hasProp(defined, name) && !hasProp(defining, name)) {
            throw new Error('No ' + name);
        }
        return defined[name];
    }

    //Turns a plugin!resource to [plugin, resource]
    //with the plugin being undefined if the name
    //did not have a plugin prefix.
    function splitPrefix(name) {
        var prefix,
            index = name ? name.indexOf('!') : -1;
        if (index > -1) {
            prefix = name.substring(0, index);
            name = name.substring(index + 1, name.length);
        }
        return [prefix, name];
    }

    /**
     * Makes a name map, normalizing the name, and using a plugin
     * for normalization if necessary. Grabs a ref to plugin
     * too, as an optimization.
     */
    makeMap = function (name, relName) {
        var plugin,
            parts = splitPrefix(name),
            prefix = parts[0];

        name = parts[1];

        if (prefix) {
            prefix = normalize(prefix, relName);
            plugin = callDep(prefix);
        }

        //Normalize according
        if (prefix) {
            if (plugin && plugin.normalize) {
                name = plugin.normalize(name, makeNormalize(relName));
            } else {
                name = normalize(name, relName);
            }
        } else {
            name = normalize(name, relName);
            parts = splitPrefix(name);
            prefix = parts[0];
            name = parts[1];
            if (prefix) {
                plugin = callDep(prefix);
            }
        }

        //Using ridiculous property names for space reasons
        return {
            f: prefix ? prefix + '!' + name : name, //fullName
            n: name,
            pr: prefix,
            p: plugin
        };
    };

    function makeConfig(name) {
        return function () {
            return (config && config.config && config.config[name]) || {};
        };
    }

    handlers = {
        require: function (name) {
            return makeRequire(name);
        },
        exports: function (name) {
            var e = defined[name];
            if (typeof e !== 'undefined') {
                return e;
            } else {
                return (defined[name] = {});
            }
        },
        module: function (name) {
            return {
                id: name,
                uri: '',
                exports: defined[name],
                config: makeConfig(name)
            };
        }
    };

    main = function (name, deps, callback, relName) {
        var cjsModule, depName, ret, map, i,
            args = [],
            callbackType = typeof callback,
            usingExports;

        //Use name if no relName
        relName = relName || name;

        //Call the callback to define the module, if necessary.
        if (callbackType === 'undefined' || callbackType === 'function') {
            //Pull out the defined dependencies and pass the ordered
            //values to the callback.
            //Default to [require, exports, module] if no deps
            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
            for (i = 0; i < deps.length; i += 1) {
                map = makeMap(deps[i], relName);
                depName = map.f;

                //Fast path CommonJS standard dependencies.
                if (depName === "require") {
                    args[i] = handlers.require(name);
                } else if (depName === "exports") {
                    //CommonJS module spec 1.1
                    args[i] = handlers.exports(name);
                    usingExports = true;
                } else if (depName === "module") {
                    //CommonJS module spec 1.1
                    cjsModule = args[i] = handlers.module(name);
                } else if (hasProp(defined, depName) ||
                           hasProp(waiting, depName) ||
                           hasProp(defining, depName)) {
                    args[i] = callDep(depName);
                } else if (map.p) {
                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                    args[i] = defined[depName];
                } else {
                    throw new Error(name + ' missing ' + depName);
                }
            }

            ret = callback ? callback.apply(defined[name], args) : undefined;

            if (name) {
                //If setting exports via "module" is in play,
                //favor that over return value and exports. After that,
                //favor a non-undefined return value over exports use.
                if (cjsModule && cjsModule.exports !== undef &&
                        cjsModule.exports !== defined[name]) {
                    defined[name] = cjsModule.exports;
                } else if (ret !== undef || !usingExports) {
                    //Use the return value from the function.
                    defined[name] = ret;
                }
            }
        } else if (name) {
            //May just be an object definition for the module. Only
            //worry about defining if have a module name.
            defined[name] = callback;
        }
    };

    requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
        if (typeof deps === "string") {
            if (handlers[deps]) {
                //callback in this case is really relName
                return handlers[deps](callback);
            }
            //Just return the module wanted. In this scenario, the
            //deps arg is the module name, and second arg (if passed)
            //is just the relName.
            //Normalize module name, if it contains . or ..
            return callDep(makeMap(deps, callback).f);
        } else if (!deps.splice) {
            //deps is a config object, not an array.
            config = deps;
            if (config.deps) {
                req(config.deps, config.callback);
            }
            if (!callback) {
                return;
            }

            if (callback.splice) {
                //callback is an array, which means it is a dependency list.
                //Adjust args if there are dependencies
                deps = callback;
                callback = relName;
                relName = null;
            } else {
                deps = undef;
            }
        }

        //Support require(['a'])
        callback = callback || function () {};

        //If relName is a function, it is an errback handler,
        //so remove it.
        if (typeof relName === 'function') {
            relName = forceSync;
            forceSync = alt;
        }

        //Simulate async callback;
        if (forceSync) {
            main(undef, deps, callback, relName);
        } else {
            //Using a non-zero value because of concern for what old browsers
            //do, and latest browsers "upgrade" to 4 if lower value is used:
            //http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:
            //If want a value immediately, use require('id') instead -- something
            //that works in almond on the global level, but not guaranteed and
            //unlikely to work in other AMD implementations.
            setTimeout(function () {
                main(undef, deps, callback, relName);
            }, 4);
        }

        return req;
    };

    /**
     * Just drops the config on the floor, but returns req in case
     * the config return value is used.
     */
    req.config = function (cfg) {
        return req(cfg);
    };

    /**
     * Expose module registry for debugging and tooling
     */
    requirejs._defined = defined;

    define = function (name, deps, callback) {

        //This module may not have dependencies
        if (!deps.splice) {
            //deps is not an array, so probably means
            //an object literal or factory function for
            //the value. Adjust args.
            callback = deps;
            deps = [];
        }

        if (!hasProp(defined, name) && !hasProp(waiting, name)) {
            waiting[name] = [name, deps, callback];
        }
    };

    define.amd = {
        jQuery: true
    };
}());

define("almond", function(){});

define('util',[
    'underscore', 'underscore.string', 'jquery', 'moment', 'q'
], function (_, str, $, moment, Q) {
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
        console.assert(_.isObject(fieldInfo), 'Unable to find fieldInfo for: ' + fieldName);
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
        console.assert(_.isObject(fieldInfo), 'Unable to find fieldInfo for: ' + fieldName);
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
            return moment(value).format('DD-MMM-YYYY h:mm:ss A');
        }
        if ('date' === dataType && _.isString(value)) {
            return moment(value).format('DD-MMM-YYYY');
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
            var sErr = str.sprintf('Expected one target at `%s`=`%s` but found `%s` in the current DOM.', key, value, q.size());
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
            return str.sprintf('Can\'t show HTML: %s\n%s', h, _.escape(e.toString()));
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
            return str.sprintf('Can\'t show JSON: %s\n%s', o, _.escape(e.toString()));
        }
    }

    exports.showObject = showObject;
    function barf(msg /* ... */) {
        void msg;
        var arr = Array.prototype.slice.call(arguments, 0);
        arr.unshift(false);
        debugger;
        console.assert.apply(null, arr);
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
    exports.fieldExists = function (object, fieldName) {
        return _.partial(exists, object[fieldName]).call(null, 'Missing: \'%s\'', fieldName);
    };

    exports.optField = function (object, fieldName) {
        if (_.isUndefined(object)) { return undefined; }
        if (_.isNull(object)) { return null; }
        return object[fieldName];
    }

    exports.hasField = function (object, fieldName) {
        var field = object[fieldName];
        return ! (_.isUndefined(field) || _.isNull(field));
    }
    ;

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

    /**
     * Return the index of the first element in an array which element has a property of the given value.
     * @param array
     * @param propertyName
     * @param propertyValue
     * @returns {null|Number}
     */
    function indexByPropValue(array, propertyName, propertyValue) {
        function impl(n) {
            if (n >= array.length) {
                return null;
            }
            if (array[n][propertyName] === propertyValue) {
                return n;
            }
            return impl(n + 1);
        }
        return impl(0);
    }
    exports.indexByPropValue = indexByPropValue;

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

    exports.indexOfWith = function indexOfWith(coll, predicate) {
        for (var i = 0; i < coll.length; ++i) {
            if (predicate(coll[i])) {
                return i;
            }
        }
    };

    exports.formatFileSize = function (bytes) {
        var sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
        var i = bytes === 0 ? 0 : Math.floor(Math.log(bytes) / Math.log(1024));
        return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
    };

    return exports;
});

define('merge',[
    'underscore'
], function (_) {
    'use strict';


    function mergeInto(one, two) {
        if (two != null) {
            for (var key in two) {
                if (!two.hasOwnProperty(key)) {
                    continue;
                }
                one[key] = two[key];
            }
        }

        return one;
    }

    function merge(/* a, b, ... */) {
        return _.reduce(arguments, mergeInto, {});
    }

    return merge;
});

define('wingspan-contrib',[
    './util',
    './merge'
], function (util, merge) {
    'use strict';

    return _.extend(util, { merge: merge });
});

    // Fake out the almond loader - shim these dependencies to their globals.
    // Make sure these globals are already on the page - e.g. by require-shims in the app
    define('underscore', function () { return _; });
    define('jquery', function () { return $; });
    define('underscore.string', function () { return _s; });
    define('moment', function () { return moment; });
    define('q', function () { return Q; });

    return require('wingspan-contrib');
}));