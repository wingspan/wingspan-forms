(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([
            'underscore', 'react', 'jquery', 'kendo'
        ], factory);
    } else {
        root.WingspanForms = factory(root._, root.React, root.$, root.kendo);
    }
}(this, function (_, React, $, kendo) {
/**
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

//     Underscore.js 1.7.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.7.0';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var createCallback = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  _.iteratee = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return createCallback(value, context, argCount);
    if (_.isObject(value)) return _.matches(value);
    return _.property(value);
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    if (obj == null) return obj;
    iteratee = createCallback(iteratee, context);
    var i, length = obj.length;
    if (length === +length) {
      for (i = 0; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    if (obj == null) return [];
    iteratee = _.iteratee(iteratee, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length),
        currentKey;
    for (var index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = function(obj, iteratee, memo, context) {
    if (obj == null) obj = [];
    iteratee = createCallback(iteratee, context, 4);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index = 0, currentKey;
    if (arguments.length < 3) {
      if (!length) throw new TypeError(reduceError);
      memo = obj[keys ? keys[index++] : index++];
    }
    for (; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      memo = iteratee(memo, obj[currentKey], currentKey, obj);
    }
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = function(obj, iteratee, memo, context) {
    if (obj == null) obj = [];
    iteratee = createCallback(iteratee, context, 4);
    var keys = obj.length !== + obj.length && _.keys(obj),
        index = (keys || obj).length,
        currentKey;
    if (arguments.length < 3) {
      if (!index) throw new TypeError(reduceError);
      memo = obj[keys ? keys[--index] : --index];
    }
    while (index--) {
      currentKey = keys ? keys[index] : index;
      memo = iteratee(memo, obj[currentKey], currentKey, obj);
    }
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var result;
    predicate = _.iteratee(predicate, context);
    _.some(obj, function(value, index, list) {
      if (predicate(value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    if (obj == null) return results;
    predicate = _.iteratee(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(_.iteratee(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    if (obj == null) return true;
    predicate = _.iteratee(predicate, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index, currentKey;
    for (index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    if (obj == null) return false;
    predicate = _.iteratee(predicate, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index, currentKey;
    for (index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (obj.length !== +obj.length) obj = _.values(obj);
    return _.indexOf(obj, target) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matches(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matches(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = obj.length === +obj.length ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = obj.length === +obj.length ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = obj && obj.length === +obj.length ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (obj.length !== +obj.length) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = _.iteratee(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = _.iteratee(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = low + high >>> 1;
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return obj.length === +obj.length ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = _.iteratee(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    if (n < 0) return [];
    return slice.call(array, 0, n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return slice.call(array, Math.max(array.length - n, 0));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    for (var i = 0, length = input.length; i < length; i++) {
      var value = input[i];
      if (!_.isArray(value) && !_.isArguments(value)) {
        if (!strict) output.push(value);
      } else if (shallow) {
        push.apply(output, value);
      } else {
        flatten(value, shallow, strict, output);
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (array == null) return [];
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = _.iteratee(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = array.length; i < length; i++) {
      var value = array[i];
      if (isSorted) {
        if (!i || seen !== value) result.push(value);
        seen = value;
      } else if (iteratee) {
        var computed = iteratee(value, i, array);
        if (_.indexOf(seen, computed) < 0) {
          seen.push(computed);
          result.push(value);
        }
      } else if (_.indexOf(result, value) < 0) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true, []));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    if (array == null) return [];
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = array.length; i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(slice.call(arguments, 1), true, true, []);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function(array) {
    if (array == null) return [];
    var length = _.max(arguments, 'length').length;
    var results = Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var idx = array.length;
    if (typeof from == 'number') {
      idx = from < 0 ? idx + from + 1 : Math.min(idx, from + 1);
    }
    while (--idx >= 0) if (array[idx] === item) return idx;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var Ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    args = slice.call(arguments, 2);
    bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      Ctor.prototype = func.prototype;
      var self = new Ctor;
      Ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (_.isObject(result)) return result;
      return self;
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    return function() {
      var position = 0;
      var args = boundArgs.slice();
      for (var i = 0, length = args.length; i < length; i++) {
        if (args[i] === _) args[i] = arguments[position++];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return func.apply(this, args);
    };
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = hasher ? hasher.apply(this, arguments) : key;
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last > 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed before being called N times.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      } else {
        func = null;
      }
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    if (!_.isObject(obj)) return obj;
    var source, prop;
    for (var i = 1, length = arguments.length; i < length; i++) {
      source = arguments[i];
      for (prop in source) {
        if (hasOwnProperty.call(source, prop)) {
            obj[prop] = source[prop];
        }
      }
    }
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj, iteratee, context) {
    var result = {}, key;
    if (obj == null) return result;
    if (_.isFunction(iteratee)) {
      iteratee = createCallback(iteratee, context);
      for (key in obj) {
        var value = obj[key];
        if (iteratee(value, key, obj)) result[key] = value;
      }
    } else {
      var keys = concat.apply([], slice.call(arguments, 1));
      obj = new Object(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        key = keys[i];
        if (key in obj) result[key] = obj[key];
      }
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(concat.apply([], slice.call(arguments, 1)), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    if (!_.isObject(obj)) return obj;
    for (var i = 1, length = arguments.length; i < length; i++) {
      var source = arguments[i];
      for (var prop in source) {
        if (obj[prop] === void 0) obj[prop] = source[prop];
      }
    }
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (
      aCtor !== bCtor &&
      // Handle Object.create(x) cases
      'constructor' in a && 'constructor' in b &&
      !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
        _.isFunction(bCtor) && bCtor instanceof bCtor)
    ) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size, result;
    // Recursively compare objects and arrays.
    if (className === '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size === b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      size = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      result = _.keys(b).length === size;
      if (result) {
        while (size--) {
          // Deep compare each member
          key = keys[size];
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj) || _.isArguments(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around an IE 11 bug.
  if (typeof /./ !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = function(key) {
    return function(obj) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
  _.matches = function(attrs) {
    var pairs = _.pairs(attrs), length = pairs.length;
    return function(obj) {
      if (obj == null) return !length;
      obj = new Object(obj);
      for (var i = 0; i < length; i++) {
        var pair = pairs[i], key = pair[0];
        if (pair[1] !== obj[key] || !(key in obj)) return false;
      }
      return true;
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = createCallback(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? object[property]() : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}.call(this));

define('ImmutableOptimizations',[
    'underscore'
], function (_) {
    'use strict';

    function ImmutableOptimizations (refFields) {
        return {
            shouldComponentUpdate: function (nextProps) {
                var valuesChanged = !_.isEqual(
                    _.omit(nextProps, refFields),
                    _.omit(this.props, refFields));

                var refsChanged = !_.every(refFields, function (field) {
                    return this.props[field] === nextProps[field];
                }.bind(this));

                return valuesChanged || refsChanged;
            }
        };
    }

    return ImmutableOptimizations;
});

/** @jsx React.DOM */
define('controls/KendoText',[
    'underscore', 'jquery', 'react',
    '../ImmutableOptimizations'
], function (_, $, React, ImmutableOptimizations) {
    'use strict';


    return React.createClass({
        mixins: [ImmutableOptimizations(['onChange'])],

        statics: { fieldClass: function () { return 'formFieldInput'; } },

        getDefaultProps: function () {
            return {
                value: undefined,
                onChange: function () {},
                placeholder: '',
                disabled: false,
                isValid: [true, ''],
                readonly: false,
                noControl: false,
                minLength: undefined,
                maxLength: undefined,
                id: undefined
            };
        },

        render: function () {

            /*jshint ignore:start */
            return (this.props.noControl ? (React.DOM.span(null, this.props.value || '')) : (
                React.DOM.input( {className:"k-textbox", value:this.props.value || '', onChange:this.onChange,
                    placeholder:this.props.placeholder, id:this.props.id,
                    readOnly:this.props.readonly,
                    disabled:this.props.disabled} )
            ));
            /*jshint ignore:end */
        },

        onChange: function (event) {
            if (this.props.readonly) {
                return;
            }
            var val = event.target.value;
            if (this.props.maxLength && val.length > this.props.maxLength) {
                return;
            }
            this.props.onChange(val);
        }

    });

});

/** @jsx React.DOM */
define('controls/MultilineText',[
    'underscore', 'react',
    '../ImmutableOptimizations'
], function (_, React, ImmutableOptimizations) {
    'use strict';


    var MultilineText = React.createClass({displayName: 'MultilineText',
        mixins: [ImmutableOptimizations(['onChange'])],

        statics: { fieldClass: function () { return 'formFieldTextarea'; } },

        getDefaultProps: function () {
            return {
                disabled: false,
                readonly: false,
                onChange: function () {},
                isValid: [true, ''],
                noControl: false,
                placeholder: '',
                minLength: undefined,
                maxLength: undefined,
                id: undefined,
                value: undefined
            };
        },

        /* jshint ignore:start */
        render: function () {
            if (this.props.noControl) {
                // Use a <pre> tag because there are newlines in the text that should be preserved.
                return (React.DOM.pre(null, this.props.value));
            }
            return (
                React.DOM.textarea( {className:"k-textbox",
                    value:this.props.value || '',
                    id:this.props.id,
                    onChange:this.onChange,
                    onBlur:this.props.onBlur,
                    placeholder:this.props.placeholder,
                    readOnly:this.props.readonly,
                    disabled:this.props.disabled} )
            );
        },
        /* jshint ignore:end */

        onChange: function (event) {
            var val = event.target.value;
            if (this.props.maxLength && val.length > this.props.maxLength) {
                return;
            }
            this.props.onChange(val);
        }
    });


    return MultilineText;
});
/** @jsx React.DOM */
define('controls/SwitchBox',[
    'underscore', 'jquery', 'react',
    '../ImmutableOptimizations'
], function (_, $, React, ImmutableOptimizations) {
    'use strict';

    var SPACE_KEY = 32;
    var SPAN_STYLE = {
        display: 'inline-block',
        height: '38px'
    };

    function ignoreClick() { }

    var SwitchBox = React.createClass({displayName: 'SwitchBox',
        mixins: [ImmutableOptimizations(['onChange'])],

        statics: { fieldClass: function () { return 'formFieldSwitch'; } },

        getDefaultProps: function () {
            return {
                value: undefined,
                onChange: function () {},
                isValid: [true, ''],
                disabled: false,
                readonly: false,
                noControl: false,    // does this even make sense on a switchbox?
                id: undefined
            };
        },

        /*jshint ignore:start */
        render: function () {


            if (this.props.noControl) {
                return (React.DOM.span(null, this.getDisplayValue()));
            }

            var yes = this.props.value === true;
            var no = this.props.value === false;

            var clickYes = this.props.readonly ? ignoreClick : _.partial(this.props.onChange, true);
            var clickNo =  this.props.readonly ? ignoreClick : _.partial(this.props.onChange, false);

            // this <label> is part of the switchbox markup, not the <FormField>'s label
            // < span style={SPAN_STYLE}
            return (
                React.DOM.div( {tabIndex:"0", className:"switch"}, 
                    React.DOM.ul(null, 
                        React.DOM.li( {className:yes ? 'active' : '', onClick:clickYes}, React.DOM.span( {className:yes ? 'pos' : ''}, "Yes")),
                        React.DOM.li( {className:no ? 'active' : '', onClick:clickNo}, React.DOM.span( {className:no ? 'neg' : ''}, "No"))
                    )
                )
            );
        },
        /*jshint ignore:end */

        componentDidMount: function () {
            var self = this,
                $el = $(this.getDOMNode());

            $el.on('keypress', function (e) {
                if (e.keyCode === SPACE_KEY) {
                    self.props.onChange(!self.props.value);
                }
            });
        },

        componentWillUnmount: function () {
            $(this.getDOMNode()).off('keypress');
        },

        getDisplayValue: function () {
            return !!this.props.value ? 'Yes' : 'No'; // l10n requires thought, no locale manager all the way down here.
            // Also need to localize the switchbox images as the words "on" "off" appear.
        }
    });

    void SPAN_STYLE;

    return SwitchBox;

});

define('ControlCommon',[
    'underscore', 'jquery', 'kendo'
], function (_, $, kendo) {
    'use strict';

    function quadState(disabled, readonly, isValid, noControl) {
        if (noControl) {
            return 'noControl';
        } else if (disabled) {
            // disabled beats readonly
            return 'formFieldDisabled';
        } else if (readonly) {
            return 'formFieldReadonly';
        } else if (!isValid[0]) {
            return 'formFieldError';
        } else {
            return null;
        }
    }

    function setKendoNumberState(kendoWidget, value, disabled, readonly) {
        setKendoNumberValue(kendoWidget, value);
        setKendoDisabledReadonly(kendoWidget, disabled, readonly);
    }

    function setKendoNumberValue(kendoWidget, value) {
        kendoWidget.value(value);
    }

    function setKendoDisabledReadonly(kendoWidget, disabled, readonly) {
        if (disabled) {
            // disabled beats readonly
            kendoWidget.enable(false);
        } else if (readonly) {
            kendoWidget.readonly(true);
        } else {
            kendoWidget.enable(true);
        }
    }

    function attachFormTooltips($body) {

        // The tooltip for the [i] button and the label
        $body.kendoTooltip({
            prefix: 'Info',
            filter: '.hasTooltip .formLabel',
            position: 'top',
            showOn: 'click',
            width: 320,
            content: function (e) {
                return e.target.parents('.hasTooltip').attr('data-tooltip');
            },
            show: function () {
                this.popup.element.addClass('formTooltip');
            }
        });

        // and the tooltip for invalid fields
        $body.kendoTooltip({
            prefix: 'Error',
            filter: '.hasErrorTooltip .formElement',
            position: 'bottom',
            showOn: 'mouseenter',
            showAfter: 1000,
            width: 240,
            content: function (e) {
                return e.target.parents('.hasErrorTooltip').attr('data-error-tooltip');
            },
            show: function () {
                this.popup.element.addClass('formErrorTooltip');
            }
        });
    }

    function hideErrorTooltip() {
        var $body = $('body');

        $body.data('kendoErrorTooltip').hide();
    }

    function refreshErrorTooltip() {
        var $body = $('body');
        $body.data('kendoErrorTooltip').refresh();
    }

    kendo.ui.Tooltip.fn.hide = function () {
        if (this.popup) {
            this.popup.close();
        }
        // (AHG) If we're in the middle of a delay to show the popup, we want to cancel the delayed show too.
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    };

    return {
        quadState: quadState,
        attachFormTooltips: attachFormTooltips,
        hideErrorTooltip: hideErrorTooltip,
        refreshErrorTooltip: refreshErrorTooltip,
        setKendoNumberState: setKendoNumberState,
        setKendoNumberValue: setKendoNumberValue,
        setKendoDisabledReadonly: setKendoDisabledReadonly
    };
});
/** @jsx React.DOM */
define('controls/KendoNumericTextBox',[
    'underscore', 'jquery', 'react', 'kendo',
    '../ControlCommon',
    '../ImmutableOptimizations'
], function (_, $, React, kendo, ControlCommon, ImmutableOptimizations) {
    'use strict';


    var KendoNumericTextBox = React.createClass({displayName: 'KendoNumericTextBox',
        mixins: [ImmutableOptimizations(['onChange'])],

        statics: { fieldClass: function () { return 'formFieldNumeric'; } },

        getDefaultProps: function () {
            return {
                value: undefined,
                onChange: function () {},
                id: undefined,

                placeholder: '',
                decimals: undefined,
                format: '',
                spinners: false,
                step: 1,

                disabled: false,
                isValid: [true, ''],
                readonly: false,
                noControl: false
            };
        },

        /*jshint ignore:start */
        render: function () {
            return (this.props.noControl
                ? (React.DOM.span(null, kendo.toString(this.props.value, this.props.format)))
                // KendoNumeric requires multiple onChange handlers, because kendo change event doesn't happen
                // until blur. We need an event on each keyup on the input, as well as spin events on the widget.
                : (React.DOM.input( {id:this.props.id, type:"text", onChange:this.onInputChange} )));
        },
        /*jshint ignore:end */

        componentDidMount: function () {
            var $el = $(this.getDOMNode());
            console.assert($el);

            if (this.props.noControl) {
                // Everything was done in JSX.
                return;
            }

            $el.kendoNumericTextBox({
                format: this.props.format,
                min: this.props.min,
                max: this.props.max,
                step: this.props.step,
                spinners: this.props.spinners,
                // No change event - we get change events from the underlying react <input>,
                // because react gives us an onChange for each keystroke which is needed for flux
                spin: this.onSpinChange
            });

            ControlCommon.setKendoNumberState(
                $el.data('kendoNumericTextBox'),
                this.props.value, this.props.disabled, this.props.readonly);
        },

        componentDidUpdate: function (prevProps, prevState) {
            var $el = $(this.getDOMNode());
            console.assert($el);

            if (this.props.noControl) {
                // Everything was done in JSX.
                return;
            }

            var kendoWidget = $el.data('kendoNumericTextBox');

            if (prevProps.value !== this.props.value) {
                ControlCommon.setKendoNumberValue(kendoWidget, this.props.value);
            }
            if (
                (prevProps.disabled !== this.props.disabled) ||
                (prevProps.readonly !== this.props.readonly)
            ) {
                ControlCommon.setKendoDisabledReadonly(kendoWidget, this.props.disabled, this.props.readonly);
            }
        },

        onSpinChange: function (event) {
            var val = event.sender.value();
            this.props.onChange(val);
        },

        onInputChange: function (event) {
            if (this.props.readonly) {
                return;
            }
            var val = event.target.value;
            this.props.onChange(val);
        }
    });

    return KendoNumericTextBox;

});

define('mixins/DateWidgetMixin',[
    'underscore', 'jquery', 'kendo'
], function (_, $, kendo) {
    'use strict';

    var NOW = new Date();

    var ISO_DATE_ONLY = 'yyyy-MM-dd';
    var ISO_TIME_ONLY = 'HH:mm:ss';

    function parseISODate(widgetName, dateStr) {
        // Handle the unusual format used by FieldInfo for specifying the current time/date.
        if (dateStr === 'NOW') {
            return NOW;
        } else if (_.isEmpty(dateStr)) {
            return dateStr;
        }
        // For date-only and time-only controls, use kendo to parse because the value needs to be parsed
        // in the local time zone. ES5 Date.parse can handle date+time values.
        if (widgetName === 'kendoDatePicker') {
            return kendo.parseDate(dateStr, ISO_DATE_ONLY);
        } else if (widgetName === 'kendoTimePicker') {
            return kendo.parseDate(dateStr, ISO_TIME_ONLY);
        } else {
            return new Date(Date.parse(dateStr));
        }
    }

    function formatISODate(widgetName, date) {
        if (date === null) {
            return null;
        }
        if (widgetName === 'kendoDatePicker') {
            return kendo.toString(date, ISO_DATE_ONLY);
        } else if (widgetName === 'kendoTimePicker') {
            return kendo.toString(date, ISO_TIME_ONLY);
        } else {
            return date.toISOString();
        }
    }

    function DateWidgetMixin(widgetName) {
        var toISOString = formatISODate.bind(this, widgetName);
        var fromISOString = parseISODate.bind(this, widgetName);

        return {
            getDefaultProps: function () {
                return {
                    onChange: $.noop,
                    disabled: false,
                    readonly: false,
                    noControl: false
                };
            },

            getWidget: function () {
                return $(this.getDOMNode()).data(widgetName);
            },

            renderValue: function () {
                if (_.isEmpty(this.props.value)) {
                    return '';
                }
                return kendo.toString(fromISOString(this.props.value), this.props.format);
            },

            componentDidMount: function () {
                if (this.props.noControl) {
                    // Everything was done in JSX.
                    return;
                }

                var $el = $(this.getDOMNode());
                $el[widgetName]({
                    format: this.props.format,
                    min: fromISOString(this.props.min),
                    max: fromISOString(this.props.max),
                    value: fromISOString(this.props.value),
                    change: this.onChange
                });

                if (this.props.disabled) {
                    // disabled beats readonly
                    this.getWidget().enable(false);
                }
                else if (this.props.readonly) {
                    this.getWidget().readonly(true);
                }
            },

            componentDidUpdate: function (prevProps) {
                if (this.props.noControl) {
                    return;
                }

                var kendoWidget = this.getWidget();

                kendoWidget.min(fromISOString(this.props.min));
                kendoWidget.max(fromISOString(this.props.max));
                kendoWidget.value(fromISOString(this.props.value));

                if (this.props.value === null && kendoWidget.dateView.calendar) {
                    // If the value is being cleared, the dateView also needs to be reset to use the current month
                    kendoWidget.dateView.calendar.navigate(NOW);
                }

                if (this.props.disabled !== prevProps.disabled) {
                    kendoWidget.enable(!this.props.disabled);
                }
                else if (this.props.readonly !== prevProps.readonly) {
                    kendoWidget.readonly(this.props.readonly);
                }
            },

            componentWillUnmount: function () {
                if (this.props.noControl) {
                    return;
                }
                this.getWidget().destroy();
            },

            onChange: function (event) {
                var kendoWidget = event.sender;
                var value = toISOString(kendoWidget.value());

                // Put the original value back until new props force the change
                kendoWidget.value(fromISOString(this.props.value));

                this.props.onChange(value);
            }
        }
    }

    return DateWidgetMixin;
});

/** @jsx React.DOM */
define('controls/KendoDateTimePicker',[
    'underscore', 'react',
    'mixins/DateWidgetMixin',
    '../ImmutableOptimizations'
], function (_, React, DateWidgetMixin, ImmutableOptimizations) {
    'use strict';

    var KendoDateTimePicker = React.createClass({displayName: 'KendoDateTimePicker',
        mixins: [
            DateWidgetMixin('kendoDateTimePicker'),
            ImmutableOptimizations(['onChange'])
        ],

        statics: {
            fieldClass: function () { return 'formFieldDatetimepicker'; }
        },

        getDefaultProps: function () {
            return {
                format: 'MM/dd/yyyy h:mm tt'
            };
        },

        /*jshint ignore:start */
        render: function () {
            return (this.props.noControl
                ? (React.DOM.span(null, this.renderValue()))
                : (React.DOM.input( {type:"text"} )));
        }
        /*jshint ignore:end */
    });

    return KendoDateTimePicker;
});

/** @jsx React.DOM */
define('controls/KendoDatePicker',[
    'underscore', 'react',
    'mixins/DateWidgetMixin',
    '../ImmutableOptimizations'
], function (_, React, DateWidgetMixin, ImmutableOptimizations) {
    'use strict';

    var KendoDatePicker = React.createClass({displayName: 'KendoDatePicker',
        mixins: [
            DateWidgetMixin('kendoDatePicker'),
            ImmutableOptimizations(['onChange'])
        ],

        statics: {
            fieldClass: function () { return 'formFieldDatepicker'; }
        },

        getDefaultProps: function () {
            return {
                format: 'dd-MMM-yyyy'
            };
        },

        /*jshint ignore:start */
        render: function () {
            return (this.props.noControl
                ? (React.DOM.span(null, this.renderValue()))
                : (React.DOM.input( {type:"text"} )));
        }
        /*jshint ignore:end */
    });

    return KendoDatePicker;
});

/** @jsx React.DOM */
define('controls/KendoTimePicker',[
    'underscore', 'react',
    'mixins/DateWidgetMixin',
    '../ImmutableOptimizations'
], function (_, React, DateWidgetMixin, ImmutableOptimizations) {
    'use strict';

    /**
     * value interface is ISO-8601, with the date portion omitted.
     * HH:MM:SS
     */
    var KendoTimePicker = React.createClass({displayName: 'KendoTimePicker',
        mixins: [
            DateWidgetMixin('kendoTimePicker'),
            ImmutableOptimizations(['onChange'])
        ],

        statics: {
            fieldClass: function () { return 'formFieldDatepicker'; }
        },

        getDefaultProps: function () {
            return {
                format: 'h:mm tt' // display format
            };
        },

        /*jshint ignore:start */
        render: function () {
            return (this.props.noControl
                ? (React.DOM.span(null, this.renderValue()))
                : (React.DOM.input( {type:"text"} )));
        }
        /*jshint ignore:end */
    });

    return KendoTimePicker;
});

/** @jsx React.DOM */
define('controls/KendoComboBox',[
    'underscore', 'jquery', 'react', 'kendo',
    '../ControlCommon',
    '../ImmutableOptimizations'
], function (_, $, React, kendo, ControlCommon, ImmutableOptimizations) {
    'use strict';


    function getDisplayValue(value, displayField) {
        return _.isObject(value) ? value[displayField] : '';
    }

    function setComboValue(comboWidget, props) {
        var value = props.value;

        // (AHG) If we have an object (with both display text and value), set both the text and the value. The value needs to be set
        // so the widget knows if the value changes and needs to fire the event. The text needs to be set in case the store has no
        // data.
        if (_.isObject(value)) {
            comboWidget.value(value[props.valueField]);
            comboWidget.text(value[props.displayField]);
        }
        else if (value !== undefined) {
            comboWidget.value(value);

            // We are papering over a bug in kendo ComboBox wherein it doesn't refresh its html representation of the
            // old dataSource models when it gets a new dataSource but no value was previously set.
            // When a truthy value is passed into the comboWidget.value(), the comboWidget will fetch() the dataSource,
            // refresh()-ing itself as well.
            if (!value) {
                comboWidget.refresh();
            }
        }
    }

    var KendoComboBox = React.createClass({displayName: 'KendoComboBox',
        statics: { fieldClass: function () { return 'formFieldCombobox'; } },

        mixins: [ImmutableOptimizations(['onChange', 'dataSource'])],

        getDefaultProps: function () {
            return {
                value: undefined,
                onChange: $.noop,
                id: undefined,
                displayField: undefined,
                valueField: undefined,
                dataSource: undefined,
                template: undefined,
                filter: 'startswith',
                width: null, // use default width whatever that is...
                disabled: false,
                readonly: false,
                noControl: false,
                placeholder: ''
            };
        },

        componentWillMount: function () {
            console.assert(this.props.displayField);
            console.assert(this.props.valueField);

            if (!this.props.noControl) {
                console.assert(this.props.dataSource);
            }
        },

        /*jshint ignore:start */
        render: function () {
            return (this.props.noControl
                ? (React.DOM.span( {id:this.props.id}, getDisplayValue(this.props.value, this.props.displayField)))
                : (React.DOM.select( {id:this.props.id})));
        },
        /*jshint ignore:end */

        componentDidMount: function () {
            var $el = $(this.getDOMNode()),
                props = this.props;

            if (props.noControl) {
                this.setNoControlValue($el);
            }
            else {
                if (props.width) {
                    $el.width(props.width);
                }
                $el.kendoComboBox({
                    autoBind: _.isArray(this.props.dataSource) ? true : false,
                    filter: this.props.filter,
                    highlightFirst: false,
                    dataTextField: props.displayField,
                    dataValueField: props.valueField,
                    dataSource: props.dataSource,
                    placeholder: props.placeholder,
                    template: props.template,
                    change: this.onChange
                });

                setComboValue($el.data('kendoComboBox'), props);
                ControlCommon.setKendoDisabledReadonly($el.data('kendoComboBox'), props.disabled, props.readonly);
            }
        },

        componentWillUnmount: function () {
            var kendoWidget = $(this.getDOMNode()).data('kendoComboBox');

            if (kendoWidget) {
                kendoWidget.destroy();
            }
        },

        componentWillReceiveProps: function (nextProps) {
            var cantChange = ['template', 'valueField', 'displayField', 'placeholder', 'filter'];
            console.assert(_.isEqual(_.pick(nextProps, cantChange), _.pick(this.props, cantChange)), 'these props cant change after mount');
        },

        componentDidUpdate: function (prevProps, prevState) {
            var $el = $(this.getDOMNode());

            if (this.props.noControl) {
                this.setNoControlValue($el);
            }
            else {
                var kendoWidget = $el.data('kendoComboBox');

                if (prevProps.dataSource !== this.props.dataSource) {
                    kendoWidget.setDataSource(this.props.dataSource);
                }

                setComboValue(kendoWidget, this.props);
                ControlCommon.setKendoDisabledReadonly(kendoWidget, this.props.disabled, this.props.readonly);
            }
        },

        onChange: function (event) {
            var model = event.sender.dataItem();

            // pass up the same structure as was originally passed down to us.
            var nextValue;
            if (_.isString(this.props.value) || _.isNumber(this.props.value)) {
                nextValue = (model ? model.get(this.props.valueField) : model);
            } else {
                // Do not return the internal kendo model objects, since they're an implementation detail of the combo/store.
                nextValue = (model instanceof kendo.data.Model) ? model.toJSON() : model;
            }

            // the KendoCombo maintains its own value state, which has just been set by a user interaction,
            // and in fact we just extracted the value from the model. Rewind the state to the prior value,
            // to support the Flux loop, it will be set if the controller accepts the change.
            setComboValue($(this.getDOMNode()).data('kendoComboBox'), this.props);

            this.props.onChange(nextValue);
        },

        setNoControlValue: function ($el) {
            if (_.contains(['', null, undefined], this.props.value)) {
                $el.text('');
                return;
            }

            // If the value is just an ID, we may need to fetch data from the server to get the display value.
            if (!_.isObject(this.props.value)) {
                // However, if the ID is the display value, we can use it as is.
                if (this.props.valueField === this.props.displayField) {
                    $el.text(this.props.value);
                    return;
                }
                // If the dataSource is a kendo.data.DataSource, we need to fetch
                if (this.props.dataSource instanceof kendo.data.DataSource) {
                    var self = this;
                    this.props.dataSource.fetch().then(function () {
                        $el.text(getDisplayValue(self.props.dataSource.get(self.props.value), self.props.displayField));
                    }).done();
                }
                // If the dataSource is an array, we can search for the selectedElement
                // and find the display value using the displayField and valueField props
                else if (_.isArray(this.props.dataSource)) {
                    var searchObject = {}, defaultObject = {};

                    searchObject[this.props.valueField] = this.props.value;
                    defaultObject[this.props.displayField] = '';

                    // Search for the selected element in the dataSource using the searchObject which has its
                    // valueField key set to the current value. Fall back to the defaultObject if not found
                    var selectedElement = _.findWhere(this.props.dataSource, searchObject) || defaultObject;
                    $el.text(selectedElement[this.props.displayField]);
                }
            }
            else {
                // valueAsOption, so can skip the query.
                $el.text(getDisplayValue(this.props.value, this.props.displayField));
            }
        }
    });

    void getDisplayValue;
    void KendoComboBox;

    return KendoComboBox;
});

/** @jsx React.DOM */
define('controls/KendoMultiSelect',[
    'underscore', 'jquery', 'react',
    '../ImmutableOptimizations'
], function (_, $, React, ImmutableOptimizations) {
    'use strict';

    var PropTypes = React.PropTypes;

    function toPlainObject(data) {
        return data.toJSON();
    }

    var KendoMultiSelect = React.createClass({displayName: 'KendoMultiSelect',
        mixins: [ImmutableOptimizations(['onChange', 'dataSource'])],

        statics: { fieldClass: function () { return 'formFieldMultiselect'; } },

		propTypes: {
            value: PropTypes.array,
            onChange: PropTypes.func,
            id: PropTypes.string,
            dataSource: PropTypes.oneOfType([PropTypes.array.isRequired, PropTypes.object.isRequired]),
            displayField: PropTypes.string,
            valueField: PropTypes.string,
            disabled: PropTypes.bool,
            readonly: PropTypes.bool,
            options: PropTypes.object,
            placeholder: PropTypes.string,
            template: PropTypes.any
		},

        getDefaultProps: function() {
            return {
            	disabled: false,
                readonly: false,
                value: [],
                onChange: $.noop
            };
        },

        /*jshint ignore:start */
        render: function () {
            return (React.DOM.select( {id:this.props.id, multiple:"multiple"} ));
        },
        /*jshint ignore:end */

        componentDidMount: function () {
            var $el = $(this.getDOMNode());

            var widgetOptions = _.defaults({
                dataTextField: this.props.displayField,
                dataValueField: this.props.valueField,
                dataSource: this.props.dataSource,
                placeholder: this.props.placeholder,
                itemTemplate: this.props.template,
                change: this.onChange
            }, this.props.options);

            var kendoWidget = $el.kendoMultiSelect(widgetOptions).data('kendoMultiSelect');

            // the 'value' method is a getter/setter that gets/sets the valueField. It will look up the record
            // in the store via the value set here.
            if (this.props.value) {
            	kendoWidget.value(this.props.value);
            }

            if (this.props.disabled) {
                // disabled beats readonly
                kendoWidget.enable(false);
            }
            else if (this.props.readonly) {
                kendoWidget.readonly(true);
            }
        },

        componentWillUnmount: function () {
            var $el = $(this.getDOMNode());

            $el.data('kendoMultiSelect').destroy();
        },

        componentWillReceiveProps: function (nextProps) {
            var cantChange = ['template', 'dataSource', 'valueField', 'displayField', 'placeholder'];
            console.assert(_.isEqual(_.pick(nextProps, cantChange), _.pick(this.props, cantChange)), 'these props cant change after mount');
        },

        componentDidUpdate: function (prevProps) {
            var $el = $(this.getDOMNode());
            var kendoWidget = $el.data('kendoMultiSelect');

            if (prevProps.dataSource !== this.props.dataSource) {
                kendoWidget.setDataSource(this.props.dataSource);
            }

            if (this.props.value !== prevProps.value) {
            	kendoWidget.value(this.props.value);
            }

            if (this.props.disabled !== prevProps.disabled) {
                kendoWidget.enable(!this.props.disabled);
            }
            else if (this.props.readonly !== prevProps.readonly) {
                kendoWidget.readonly(this.props.readonly);
            }
        },

        onChange: function (event) {
            var kendoWidget = event.sender;
            var values = _.clone(kendoWidget.value());
            var dataItems = kendoWidget.dataItems().map(toPlainObject);

            // To keep the "Flux" loop, we need to reset the widget value to props so that data flows down.
            kendoWidget.value(this.props.value);

            // Provide both scalar and object values for clients
            this.props.onChange(values, dataItems);
        }
    });

    return KendoMultiSelect;
});

define('AutoControl',[
    'underscore', 'react',
    './controls/KendoText',
    './controls/MultilineText',
    './controls/SwitchBox',
    './controls/KendoNumericTextBox',
    './controls/KendoDateTimePicker',
    './controls/KendoDatePicker',
    './controls/KendoTimePicker',
    './controls/KendoComboBox',
    './controls/KendoMultiSelect',
    './ImmutableOptimizations'
], function (_, React, KendoText, MultilineText, SwitchBox,
             KendoNumericTextBox, KendoDateTimePicker, KendoDatePicker, KendoTimePicker, KendoComboBox, KendoMultiSelect,
             ImmutableOptimizations) {
    'use strict';

    var TYPE_TO_CONTROL = {
        'text' : KendoText,
        'text:multiLine' : MultilineText,
        'number' : KendoNumericTextBox,
        'date' : KendoDatePicker,
        'datetime' : KendoDateTimePicker,
        'time' : KendoTimePicker,
        'boolean' : SwitchBox
    };
    var EXCLUDE_FROM_CONTROL = ['fieldInfo', 'controlForField'];

    var PropTypes = React.PropTypes;

    var FieldInfoType = React.PropTypes.shape({
        "name": PropTypes.string.isRequired,
        "label": PropTypes.string,
        "dataType": PropTypes.string.isRequired,
        "placeholder": PropTypes.string,
        "helpText": PropTypes.string,
        "array": PropTypes.bool,
        "readOnly": PropTypes.bool,
        "required": PropTypes.bool,
        "multiLine": PropTypes.bool,
        "options": PropTypes.object,
        "maxLength": PropTypes.number,
        "minLength": PropTypes.number,
        "pattern": PropTypes.string,
        "maxValue": PropTypes.any,
        "minValue": PropTypes.any,
        "decimals": PropTypes.number,
        "stepValue": PropTypes.number
    });

    var AutoControl = React.createClass({
        displayName: 'AutoControl',

        mixins: [ImmutableOptimizations(['onChange', 'dataSource'])],

        statics: {
            controlForField: function (fieldInfo) {
                var dataType = fieldInfo.dataType;

                if (fieldInfo.options) {
                    return fieldInfo.array ? KendoMultiSelect : KendoComboBox;
                }
                if (fieldInfo.multiLine) {
                    dataType = dataType + ':multiLine';
                }

                return TYPE_TO_CONTROL[dataType];
            }
        },

        /* AutoControl will pass all unknown props to the generated control, but these are the common ones. */
        propTypes: {
            fieldInfo: FieldInfoType.isRequired,
            value: PropTypes.any,
            onChange: PropTypes.func,
            dataSource: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
            readonly: PropTypes.bool,
            controlForField: PropTypes.func
        },

        getDefaultProps: function () {
            return {
                controlForField: function() {}
            };
        },

        render: function () {
            var fieldInfo = this.props.fieldInfo;
            var Control = this.props.controlForField(fieldInfo) || AutoControl.controlForField(fieldInfo);
            var controlProps = _.omit(this.props, EXCLUDE_FROM_CONTROL);

            controlProps.name = fieldInfo.name; // to help with debugging in the presence of asynchronous rendering

            // Add placeholder text
            controlProps.placeholder = fieldInfo.placeholder;

            // Either fieldInfo or parent component can specify readonly status
            controlProps.readonly = this.props.readonly || fieldInfo.readOnly;

            // Add in some constraints from typeInfo
            controlProps.min = fieldInfo.minValue;
            controlProps.max = fieldInfo.maxValue;
            controlProps.step = fieldInfo.stepValue;
            controlProps.minLength = fieldInfo.minLength;
            controlProps.maxLength = fieldInfo.maxLength;

            if (fieldInfo.options) {
                // The DataSource can either be explicitly passed in or the widgets will use inline (array) data
                controlProps.dataSource = this.props.dataSource || fieldInfo.options.data;
                controlProps.valueField = fieldInfo.options.metadata.idProperty;
                controlProps.displayField = fieldInfo.options.metadata.nameProperty;
            }

            return React.createElement(Control, controlProps);
        }
    });

    return AutoControl;
});

/** @jsx React.DOM */
define('FormField',[
    'underscore', 'react',
    './AutoControl',
    './ControlCommon'
], function (_, React, AutoControl, ControlCommon) {
    'use strict';

    var DEFAULTS = {
        readOnly: false,
        disabled: false,
        label: '',
        helpText: ''
    };

    function determineFieldClass(children) {
        if (_.isArray(children)) {
            children = children[0];
        }

        if (children && _.isUndefined(children.type.fieldClass)) {
            // Support a textnode child, which won't have a fieldinfo
            if (children.props && children.props.fieldInfo) {
                return AutoControl.controlForField(children.props.fieldInfo).fieldClass();
            }
            //console.warn('Unknown fieldClass for child component', children);

            return 'formFieldInput';
        }

        return children && children.type.fieldClass();
    }

    var FormField = React.createClass({displayName: 'FormField',
        getDefaultProps: function () {
            return {
                fieldInfo: {},
                layout: 'formField',
                noControl: false,
                isValid: [true, ''],
                lockable: false,
                locked: false,
                onStickyChange: function (isLocked) { /* set or clear a sticky */},
                width: '100%',
                marginLeft: '0',
                noLabel: false
            };
        },

        /* jshint ignore:start */
        render: function () {
            var fieldInfo = _.defaults({}, this.props.fieldInfo, DEFAULTS);

            var hasInfoTooltip = !!fieldInfo.helpText;
            var hasErrorTooltip = (!this.props.isValid[0] && (this.props.isValid[1] || '').length > 0);

            var classes = _.compact([
                this.props.layout,
                determineFieldClass(this.props.children),
                ControlCommon.quadState(fieldInfo.disabled, fieldInfo.readOnly, this.props.isValid, this.props.noControl),
                hasInfoTooltip ? 'hasTooltip' : null,
                hasErrorTooltip ? 'hasErrorTooltip' : null,
                this.props.lockable ? 'lockable' : null
            ]);

            var lockedClasses = _.compact(['fieldLock', this.props.locked ? 'fieldLockOn' : null]);
            var lockDiv = this.props.lockable ? (React.DOM.div( {className:lockedClasses.join(' '), onClick:this.toggleLock} )) : null;

            var styles = {
               'width': this.props.width,
               'marginLeft': this.props.marginLeft
            };

            var statusIcon = (hasInfoTooltip ? (React.DOM.span( {className:"statusIcon"} )) : null);

            // If there is no label and no icon, we must render &nbsp; so the fields line up right.


            var label = ((fieldInfo.label || '').length === 0 && statusIcon === null
                ? (React.DOM.label( {className:"formLabel"}, '\u00A0')) // unicode &nbsp; to work around JSX bug:  https://groups.google.com/forum/?fromgroups=#!topic/reactjs/7FmlIyJBofA
                : (React.DOM.label( {className:"formLabel"}, fieldInfo.label,statusIcon)));

            return (
                React.DOM.div( {className:classes.join(' '), 'data-tooltip':fieldInfo.helpText, 'data-error-tooltip':this.props.isValid[1], style:styles}, 
                    this.props.noLabel ? null : label,
                    React.DOM.div( {className:"formElement"}, 
                        this.props.children
                    ),
                    lockDiv
                )
            );
        },
        /* jshint ignore:end */

        componentWillReceiveProps: function (newProps) {
            var wasInvalid = !this.props.isValid[0];

            // If the field has become valid, hide the error tooltip.
            if (wasInvalid && newProps.isValid[0]) {
                ControlCommon.hideErrorTooltip();
            }
        },

        componentDidUpdate: function (prevProps) {
            var wasInvalid = prevProps.isValid[0] === false,
                isStillInvalid = this.props.isValid[0] === false,
                validationMessageChanged = prevProps.isValid[1] !== this.props.isValid[1];

            if (wasInvalid && isStillInvalid && validationMessageChanged) {
                ControlCommon.refreshErrorTooltip();
            }
        },

        toggleLock: function () {
            var isLocked = !this.props.locked;
            this.props.onStickyChange(isLocked);
            this.setState({ locked: isLocked });
        }
    });

    return FormField;
});

/** @jsx React.DOM */
define('AutoField',[
    'underscore', 'react',
    './FormField',
    './AutoControl',
    './ImmutableOptimizations'
], function (_, React, FormField, AutoControl, ImmutableOptimizations) {
    'use strict';

    var EXCLUDE_FROM_CONTROL = ['isValid', 'layout'];

    var PropTypes = React.PropTypes;

    var AutoField = React.createClass({displayName: 'AutoField',
        mixins: [ImmutableOptimizations(['onChange', 'dataSource'])],

        propTypes: _.extend({
            fieldInfo: PropTypes.object.isRequired,
            isValid: PropTypes.array,
            layout: PropTypes.string
        }, AutoControl.propTypes),

        getDefaultProps: function () {
            return {
                isValid: [true, '']
            };
        },

        render: function () {
            var controlProps = _.omit(this.props, EXCLUDE_FROM_CONTROL);

            return (
                FormField( {fieldInfo:this.props.fieldInfo, isValid:this.props.isValid, layout:this.props.layout}, 
                    React.createElement(AutoControl, controlProps)
                )
            );
        }
    });

    return AutoField;
});
/** @jsx React.DOM */
define('controls/Button',[
    'underscore', 'react',
    '../ImmutableOptimizations'
], function (_, React, ImmutableOptimizations) {
    'use strict';


    var Button = React.createClass({displayName: 'Button',
        mixins: [ImmutableOptimizations(['onClick'])],

        getDefaultProps: function () {
            return {
                onClick: undefined,
                disabled: false,
                className: undefined // one string, space delimited (if you want to specify more than one class)
            };
        },

        render: function () {
            var classes = _.compact([
                this.props.className,
                this.props.disabled ? 'buttonDisabled' : null
            ]);
            return (React.DOM.button( {className:classes.join(' '), onClick:this.props.onClick, disabled:this.props.disabled}, this.props.children));
        }
    });

    return Button;
});
/** @jsx React.DOM */
define('controls/Carousel',[
    'underscore', 'react', 'jquery', 'kendo'
], function (_, React, $, kendo) {
    'use strict';


    /**
     * Small inline carousel which is basically a tabpanel styled differently.
     *
     * Takes these props:
     *   - options: the available records to slide between
     *   - value: the currently selected record, which is required except if options === []
     *
     * This is a tricky contract to get right but it keeps everything well defined through
     * all the possible corner cases.
     */
    var Carousel = React.createClass({displayName: 'Carousel',

        statics: { fieldClass: function () { return 'formFieldCarousel'; } },

        getDefaultProps: function () {
            return {
                value: undefined,    // integer - the selected index (0-based)
                onChange: $.noop,    // fluxes up the index as an integer
                placeholder: '',
                disabled: false,
                isValid: [true, ''],
                readonly: false,
                noControl: false,
                id: undefined,

                onEdit: $.noop,
                options: undefined, // value compared to options via === i think
                displayTextFn: undefined
            };
        },

        render: function () {
            var i = this.props.value;
            var N = this.props.options.length;

            if (this.props.options.length === 0) {
                // If we have zero options (which can make sense sometimes),
                // a selected value does not make sense.
                console.assert(_.contains([undefined, null], this.props.value));
            }

            return (
                React.DOM.div( {className:"carousel"}, 
                    React.DOM.button( {disabled:N < 2, className:"carouselButton backButton", onClick:_.partial(this.onChange, 'left')}, React.DOM.i( {className:"icon iconPrev"})),
                    React.DOM.input( {className:"carouselInput", placeholder:this.props.placeholder, value:this.displayTextFn(i, N), readOnly:true, id:this.props.id} ),
                    React.DOM.button( {disabled:N < 2, className:"carouselButton forwardButton", onClick:_.partial(this.onChange, 'right')}, React.DOM.i( {className:"icon iconNext"})),
                    React.DOM.button( {className:"carouselButton editButton", disabled:this.props.disabled, onClick:this.props.onEdit}, "Edit Indices",React.DOM.i( {className:"icon iconCaret"}))
                )
                );
        },

        onChange: function (direction) {
            var i = this.props.value;
            var N = this.props.options.length;

            console.assert(_.contains(['left', 'right'], direction));
            var nextIndex = (direction === 'left' ? (i - 1 + N) % N : (i + 1) % N);

            // don't actually move the carousel, the flux state must allow the change first.
            this.props.onChange(nextIndex);
        },

        displayTextFn: function (i, N) {
            if (this.props.displayTextFn) {
                return this.props.displayTextFn(i, N);
            }
            else {
                return (N === 0
                    ? '0 of 0'
                    : kendo.format('{0} of {1}', i+1, N));
            }
        }

    });

    return Carousel;
});
/** @jsx React.DOM */
define('controls/CheckBox',[
    'underscore', 'jquery', 'react',
    '../ImmutableOptimizations'
], function (_, $, React, ImmutableOptimizations) {
    'use strict';

    var SPACE_KEY = 32;

    return React.createClass({
        mixins: [ImmutableOptimizations(['onChange'])],

        statics: { fieldClass: function () { return 'formFieldCheckbox'; } },

        getDefaultProps: function () {
            return {
                value: undefined,
                onChange: function () {},
                id: undefined,
                label: undefined, //checkbox label, not field label
                isValid: [true, ''],
                disabled: false,
                readonly: false
            };
        },

        componentWillMount: function () {
          this.stableUniqueId = this.props.id ? this.props.id : _.uniqueId();
        },

        /*jshint ignore:start */
        render: function () {
            if (this.props.noControl) {
                return (React.DOM.span(null, this.getDisplayValue()));
            }

            return (
                React.DOM.span( {className:"CheckBox", tabIndex:"0"}, 
                    React.DOM.input( {type:"checkbox", id:this.stableUniqueId,
                        checked:this.props.value, 'data-checked':this.props.value ? '' : null,
                        onChange:this.onChange,
                        disabled:this.props.disabled || this.props.readonly} ),
                    React.DOM.label( {htmlFor:this.stableUniqueId}, this.props.label)
                )
            );
        },
        /*jshint ignore:end */

        componentDidMount: function () {
            var self = this,
                $el = $(this.getDOMNode());

            $el.on('keypress', function (e) {
                if (e.keyCode === SPACE_KEY) {
                    self.props.onChange(!self.props.value);
                }
            });
        },

        componentWillUnmount: function () {
            $(this.getDOMNode()).off('keypress');
        },

        onChange: function (event) {
            var val = event.target.checked;
            this.props.onChange(val);
        },

        getDisplayValue: function () {
            return !!this.props.value ? 'Yes' : 'No';
        }
    });

});

/** @jsx React.DOM */
define('controls/KendoAutoComplete',[
    'underscore', 'jquery', 'react', 'kendo',
    '../ImmutableOptimizations'
], function (_, $, React, kendo, ImmutableOptimizations) {
    'use strict';

    var PropTypes = React.PropTypes;

    var KendoAutoComplete = React.createClass({displayName: 'KendoAutoComplete',
        mixins: [ImmutableOptimizations(['onChange', 'dataSource'])],

        statics: {
            fieldClass: function () {
                return 'formFieldAutocomplete';
            }
        },

        propTypes: {
            value: PropTypes.any,
            onChange: PropTypes.func,
            id: PropTypes.string,
            dataSource: PropTypes.oneOfType([PropTypes.array.isRequired, PropTypes.object.isRequired]),
            dataTextField: PropTypes.string,
            disabled: PropTypes.bool,
            readonly: PropTypes.bool,
            options: PropTypes.object,
            placeholder: PropTypes.string,
            template: PropTypes.any
        },

        getDefaultProps: function () {
        	return {
                disabled: false,
                readonly: false,
        		onChange: $.noop
        	}
		},

        componentDidMount: function () {
            var $el = $(this.getDOMNode());

            var widgetOptions = _.defaults({
                dataSource: this.props.dataSource,
                dataTextField: this.props.dataTextField,
                placeholder: this.props.placeholder,
                template: this.props.template,
                change: this.onChange,
                select: this.onSelect
            }, this.props.options);

            var autoComplete = $el.kendoAutoComplete(widgetOptions)
                .data('kendoAutoComplete');

            if (this.props.value) {
                autoComplete.value(this.props.value);
            }

            if (this.props.disabled) {
                autoComplete.enable(false);
            }
            else if (this.props.readonly) {
                autoComplete.readonly(true);
            }
        },

        componentWillUnmount: function () {
            var $el = $(this.getDOMNode());

            $el.data('kendoAutoComplete').destroy();
        },

        componentDidUpdate: function (prevProps) {
            var $el = $(this.getDOMNode()),
                autoComplete = $el.data('kendoAutoComplete');

            if (prevProps.dataSource !== this.props.dataSource) {
                autoComplete.setDataSource(this.props.dataSource);
            }

            if (this.props.value !== prevProps.value) {
                autoComplete.value(this.props.value);
            }

            if (this.props.disabled !== prevProps.disabled) {
                autoComplete.enable(!this.props.disabled);
            }
            else if (this.props.readonly !== prevProps.readonly) {
                autoComplete.readonly(this.props.readonly);
            }
        },

        /*jshint ignore:start */
        render: function () {
            return (React.DOM.input( {type:"text", id:this.props.id, className:"k-textbox"}));
        },
        /*jshint ignore:end */

        onChange: function (e) {
            var widget = e.sender;

			widget.value(this.props.value);

            if (widget.dataSource.total() === 1) {
                // Exact match - so raise the change event
                this.props.onChange(widget.dataItem(0));
            }
        },

        onSelect: function (e) {
            var widget = e.sender;

            widget.value(this.props.value);
            this.props.onChange(widget.dataItem(e.item.index()));
        }
    });

    return KendoAutoComplete;

});

/** @jsx React.DOM */
define('controls/KendoGrid',[
    'underscore', 'jquery', 'react', 'kendo'
], function (_, $, React, kendo) {
    'use strict';

    void kendo;
    var PropTypes = React.PropTypes;

    function eitherType(type1, type2) {
        type1 = _.isString(type1) ? PropTypes[type1] : type1;
        type2 = _.isString(type2) ? PropTypes[type2] : type2;

        return PropTypes.oneOfType([type1, type2]);
    }

    function isCellSelection(selectable) {
        return _.isString(selectable) ? selectable.indexOf('cell') !== -1 : false;
    }

    function isMultiSelect(selectable) {
        return _.isString(selectable) ? selectable.indexOf('multiple') !== -1 : false;
    }

    function updateGridSelection(component, grid) {
        // Ignore change events while updating selection
        grid.unbind('change', component.onGridChange);

        if (_.isEmpty(component.props.value)) {
            grid.clearSelection();
            grid.bind('change', component.onGridChange);
            return;
        }

        var selectors = _.pluck(component.props.value, 'id')
            .map(function (id) { return grid.dataSource.get(id); })
            .filter(function (dataItem) { return !!dataItem; })
            .map(function (dataItem) { return 'tr[data-uid="' + dataItem.uid + '"]'; });

        grid.select(selectors.join(', '));
        grid.bind('change', component.onGridChange);
    }

    var KendoGrid = React.createClass({displayName: 'KendoGrid',

        propTypes: {
            className: PropTypes.string,
            height: eitherType('number', 'string'),
            dataSource: eitherType(PropTypes.object.isRequired, PropTypes.array.isRequired),
            autoBind: PropTypes.bool,
            columns: PropTypes.array,
            rowTemplate: eitherType('string', 'func'),
            pageable: eitherType('bool', 'object'),
            scrollable: eitherType('bool', 'object'),
            selectable: eitherType('bool', 'string'),
            sortable: eitherType('bool', 'object'),
            options: PropTypes.object,
            value: PropTypes.any,
            onChange: PropTypes.func
        },

        getDefaultProps: function () {
            return {
                autoBind: true,
                pageable: false,
                scrollable: true,
                selectable: false,
                sortable: false
            };
        },

        /*jshint ignore:start */
        render: function () {
            return (React.DOM.div( {className:this.props.className} ));
        },
        /*jshint ignore:end */

        componentDidMount: function () {
            var $rootNode = $(this.getDOMNode());
            var widgetOptions = _.defaults({
                autoBind: this.props.autoBind,
                dataSource: this.props.dataSource,
                height: this.props.height,
                columns: this.props.columns,
                rowTemplate: this.props.rowTemplate,
                pageable: this.props.pageable,
                selectable: this.props.selectable,
                scrollable: this.props.scrollable,
                sortable: this.props.sortable,
                dataBound: this.onGridDataBound
            }, this.props.options);

            $rootNode.kendoGrid(widgetOptions);
        },

        componentWillUnmount: function () {
            $(this.getDOMNode()).data('kendoGrid').destroy();
        },

        componentDidUpdate: function (prevProps) {
            var $el = $(this.getDOMNode());
            var grid = $el.data('kendoGrid');

            if (this.props.dataSource instanceof Array) {
                if (!_.isEqual(this.props.dataSource, prevProps.dataSource)) {
                    // This better be a datasource that was originally built from inline data.
                    // I don't know how to detect this to verify it.
                    grid.dataSource.data(this.props.dataSource);
                }
            }
            else if (prevProps.dataSource !== this.props.dataSource) {
                grid.setDataSource(this.props.dataSource);
            }

            if (prevProps.value !== this.props.value) {
                if (grid.selectable) {
                    updateGridSelection(this, grid);
                }
            }
        },

        onGridDataBound: function (e) {
            var grid = e.sender;

            if (grid.selectable) {
                updateGridSelection(this, grid);
            }
        },

        onGridChange: function (e) {
            var grid = e.sender;
            var selectedNodes = grid.select().get();    // get() unwraps the jQuery object

            function rowSelection(tr) {
                return grid.dataItem(tr);
            }
            function cellSelection(td) {
                return {
                    cellNode: td,
                    dataItem: grid.dataItem(td.parentNode)
                };
            }
            var selectedValues = selectedNodes.map(isCellSelection(this.props.selectable) ? cellSelection : rowSelection);

            // Don't hand the caller an array if they are doing only single selection. It's nicer that way.
            if (!isMultiSelect(this.props.selectable) && (selectedValues.length === 1)) {
                selectedValues = selectedValues[0];
            }

            this.props.onChange(selectedValues);
        }
    });

    return KendoGrid;
});
define('controls/KendoGridPicker',[
    'underscore',
    'jquery',
    'react',
    'kendo',
    './KendoGrid'
], function (_, $, React, kendo, KendoGrid) {
    'use strict';

    var PropTypes = React.PropTypes;

    var KendoGridPickerTemplate = '<div class="checkboxWrap"><input id="#: uid #" type="checkbox" value="#: id #" name="checkboxSelector"><label for="#: uid #"></label></div>';

    function enableCheckboxSelection(grid) {
        grid.selectable.userEvents.notify = function (eventName, data) {
            // Make all "tap/click" events seem like they have the ctrlKey pressed, which gives a checkbox-style UX
            if (eventName === 'tap') {
                data.event.ctrlKey = true;
            }
            this.trigger(eventName, data);
        };
    }

    var KendoGridPicker = React.createClass({

        propTypes: {
            columns: PropTypes.array.isRequired,
            value: PropTypes.array,
            onChange: PropTypes.func
        },

        getDefaultProps: function () {
            return {
                autoBind: true,
                editable: false,
                pageable: false,
                height: 250,
                onChange: $.noop,
                value: []  // list of selected records, just like combo.
            };
        },

        render: function () {
            var columns = [{ title: '', template: kendo.template(KendoGridPickerTemplate), width: 34 }]
                .concat(this.props.columns);
            var gridProps = { columns: columns, selectable: 'multiple, row', onChange: this.onGridChange };

            return React.createElement(KendoGrid, _.defaults(gridProps, this.props));
        },

        componentDidMount: function () {
            var grid = $(this.getDOMNode()).data('kendoGrid');

            // The standard kendo grid multiple selection UI requires holding the Control key to select multiple rows.
            // Change the behavior to allow individual clicks to toggle the row's selection state.
            enableCheckboxSelection(grid);

            this.updateCheckboxValues();
            grid.bind('dataBound', this.updateCheckboxValues);
        },

        componentDidUpdate: function () {
            this.updateCheckboxValues();
        },

        updateCheckboxValues: function () {
            // the SSP page has changed, so we have new DOM.
            // Sync up the DOM with the checked state.
            var $rootNode = $(this.getDOMNode());
            var valueIDs = _.pluck(this.props.value, 'id');

            // Update the checked state of checkbox inputs
            $rootNode.find('input[type="checkbox"]').val(valueIDs);
        },

        onGridChange: function (selectedValues) {
            var grid = $(this.getDOMNode()).data('kendoGrid');

            // The `selectedValues` represents the selection for the current page of results. We need to merge those values
            // with existing values on separate pages.
            var modelsOnThisPage = grid.dataSource.view().map(function (model) {
                return model.id;
            });
            var valuesOnOtherPages = this.props.value.filter(function (dataItem) {
                return modelsOnThisPage.indexOf(dataItem.id) === -1;
            });

            selectedValues = selectedValues.map(function (model) {
                return model.toJSON();
            }).concat(valuesOnOtherPages);

            this.props.onChange(selectedValues);
        }
    });

    return KendoGridPicker;
});

/** @jsx React.DOM */
define('controls/KendoListView',[
    'underscore', 'jquery', 'react', 'kendo'
], function (_, $, React, kendo) {
    'use strict';

    void kendo;

    var PropTypes = React.PropTypes;

    function eitherType(type1, type2) {
        type1 = _.isString(type1) ? PropTypes[type1] : type1;
        type2 = _.isString(type2) ? PropTypes[type2] : type2;

        return PropTypes.oneOfType([type1, type2]);
    }

    return React.createClass({
        displayName: 'KendoListView',

        propTypes: {
            autoBind: PropTypes.bool,
            className: PropTypes.string,
            dataSource: eitherType(PropTypes.object.isRequired, PropTypes.array.isRequired),
            template: eitherType('string', 'func'),
            selectable: eitherType('bool', 'string'),
            scrollToSelectedItem: PropTypes.bool,
            scrollDuration: PropTypes.number,
            value: PropTypes.any,
            onChange: PropTypes.func
        },

        getDefaultProps: function () {
            return {
                autoBind: false,
                scrollToSelectedItem: false,
                scrollDuration: 150,
                selectable: false,
                template: '<div data-model-id="${id}">${id}</div>',
                onChange: $.noop
            };
        },

        /* jshint ignore:start */
        render: function () {
            return (React.DOM.div( {className:this.props.className} ));
        },
        /* jshint ignore:end */


        /**
         * This method updates the ListView's selection and optionally animates scrolling that selection to the top of the list.
         */
        selectValue: function (selectedId, scrollToSelectedItem) {
            var $rootNode = $(this.getDOMNode());
            var listView = $rootNode.data('kendoListView');
            var maybeSelectedChild = _.find(listView.element.children(), function (child) {
                return selectedId === $(child).data('modelId');
            });
            var selectedChildIndex;

            // Updating the selection causes a widget value change event, so we need to prevent reentry to the value change callback
            listView.unbind('change', this.onValueChange);

            if (maybeSelectedChild) {
                listView.select($(maybeSelectedChild));
            } else {
                listView.clearSelection();
            }

            listView.bind('change', this.onValueChange);

            if (scrollToSelectedItem && maybeSelectedChild) {
                selectedChildIndex = _.indexOf(listView.element.children(), maybeSelectedChild);
                $rootNode.animate({ scrollTop: selectedChildIndex * $(maybeSelectedChild).height() }, this.props.scrollDuration);
            }
        },

        syncSelectionWithKendo: function () {
            this.selectValue(this.props.value, this.props.scrollToSelectedItem);
        },

        componentDidUpdate: function (prevProps) {
            if (this.props.selectable && !_.isEqual(this.props.value, prevProps.value)) {
                this.syncSelectionWithKendo();
            }
        },

        componentDidMount: function () {
            var $rootNode = $(this.getDOMNode());
            var listViewWidget = $rootNode.kendoListView({
                autoBind: this.props.autoBind,
                dataSource: this.props.dataSource,
                template: this.props.template,
                selectable: this.props.selectable,
                dataBound: this.onDataBound
            }).data('kendoListView');

            if (!this.props.autoBind) {
                listViewWidget.refresh();
            }
        },

        componentWillUnmount: function () {
            var $rootNode = $(this.getDOMNode());

            $rootNode.data('kendoListView').destroy();
        },

        onValueChange: function (e) {
            var listView = e.sender;
            var val = listView.select().data('modelId');

            this.selectValue(this.props.value);    // unwind the widget state change to respect flux lifecycle
            this.props.onChange(val);
        },

        onDataBound: function () {
            if (this.props.selectable) {
                this.syncSelectionWithKendo();
            }
        }
    });
});

define('controls/KendoPager',[
    'underscore', 'jquery', 'react', 'kendo'
], function (_, $, React, kendo) {
    'use strict';

    void kendo;

    /*
        Kendo messages defaults:
        http://docs.telerik.com/kendo-ui/api/web/pager#configuration-messages

        messages: {
            display: '{0} - {1} of {2} items',
            empty: 'No items to display',
            page: 'Page',
            of: 'of {0}',
            itemsPerPage: 'items per page',
            first: 'Go to the first page',
            previous: 'Go to the previous page',
            next: 'Go to the next page',
            last: 'Go to the last page',
            refresh: 'Refresh'
        }
     */

    var KendoPager = React.createClass({
        propTypes: {
            dataSource: React.PropTypes.object.isRequired,
            className: React.PropTypes.string,
            messages: React.PropTypes.object,
            onChange: React.PropTypes.func
        },

        getDefaultProps: function () {
            return {
                className: 'k-pager-wrap',
                // Empty object means override none of kendo's defaults, which are shown above for convenience
                messages: {},
                change: $.noop
            };
        },

        render: function () {
            return React.DOM.div({ className: this.props.className });
        },

        componentDidMount: function () {
            $(this.getDOMNode()).kendoPager({
                dataSource: this.props.dataSource,
                messages: this.props.messages,
                change: this.props.onChange
            });
        }
    });

    return KendoPager;
});

/** @jsx React.DOM */
define('ReactCommon',[
    'underscore', 'react'
], function (_, React) {
    'use strict';

    /* jshint ignore:start */

    function wrapItemsDiv(jsxs) {
        var acc = [];
        _.each(jsxs, function (jsx, i) {
            acc.push(React.DOM.div( {key:i}, jsx))
        });
        return acc;
    }

    /* jshint ignore:end */

    return {
        wrapItemsDiv: wrapItemsDiv
    };
});

/** @jsx React.DOM */
define('controls/KendoTabStrip',[
    'underscore', 'jquery', 'react', 'kendo',
    '../ReactCommon',
    '../ImmutableOptimizations'
], function (_, $, React, kendo, ReactCommon, ImmutableOptimizations) {
    'use strict';

    void ReactCommon;
    /**
     * Takes a "tabs" prop which is a map from title string to a JSX instance.
     * This component is not presently stateful so we don't get to control what is selected.
     */
    var KendoTabStrip = React.createClass({displayName: 'KendoTabStrip',

        componentWillMount: function () {
            console.assert(_.isObject(this.props.tabs) && _.keys(this.props.tabs).length > 0);
        },

        componentWillUnmount: function () {
            this.tabStrip.unbind('select', this.onSelect);
        },

        componentDidMount: function () {
            var $el = $(this.getDOMNode());
            $el.kendoTabStrip({
                select: this.onSelect
            });
            this.tabStrip = $el.data('kendoTabStrip');
        },

        onSelect: function (event) {
            var item = $(event.item);
            var index = item.data('wspt-index');
            if (this.props.onChange && ! this.suppressEvents) {
//                this.props.onChange(index);
            }
        },

        /* jshint ignore:start */
        render: function () {

            var lis = [];
            _.each(_.keys(this.props.tabs), function (title, index) {
                var jsx = (index === 0
                    ? (React.DOM.li( {className:"k-state-active", 'data-wspt-index':index, key:index}, title))
                    : (React.DOM.li( {'data-wspt-index':index, key:index}, title)));
                lis.push(jsx);
            });

            var content = ReactCommon.wrapItemsDiv(_.values(this.props.tabs));

//            if (this.tabStrip && this.props.selectedTab) {
//                this.suppressEvents = true;
//                this.tabStrip.select(this.props.selectedTab);
//                this.suppressEvents = false;
//            }

            return (
                React.DOM.div(null, 
                    React.DOM.ul(null, lis),
                    content
                )
                );
        }
        /* jshint ignore:end */
    });

    return KendoTabStrip;
});
/** @jsx React.DOM */
define('controls/MultiSelect',[
    'underscore', 'jquery', 'react',
    '../ControlCommon',
    '../ImmutableOptimizations'
], function (_, $, React, controlCommon, ImmutableOptimizations) {
    'use strict';

    var PropTypes = React.PropTypes;

    /**
     * Creates a multi-select control.
     * isFlat controls whether the selectors are interpreted as containing optgroups.
     * If isFlat is true selectors will be a two level array of arrays.  The top level will be pairs of (name, children). Children, the second level, will be pairs of (id, name).
     * If isFlat is false selectors will  simply be an array of (id, name).
     * Each level can also have an active property that will be assumed to be true if undefined.
     * Empty optgroups will be elided.
     */
    return React.createClass({
        mixins: [ImmutableOptimizations(['onChange'])],

        statics: { fieldClass: function () { return 'formFieldMultiselect'; } },

        propTypes: {
            id: PropTypes.string,
            selectors: PropTypes.array.isRequired,
            selections: PropTypes.array,
            isFlat: PropTypes.bool
        },

        getDefaultProps: function () {
            return {
                disabled: false,
                readonly: false,
                isFlat: true,
                selectors: [],
                selections: [], // this is the value prop that pairs with onChange.
                size: 3,
                onChange: function () {}
            };
        },

        getInitialState: function () {
            // Here, we cull out all the inactive panels.
            var selectors = this.props.selectors;

            // implements the behavior that the absence of an active property makes it automatically active.
            function isActive(selector) {
                return _.isUndefined(selector.active) || !! selector.active;
            }

            if (this.props.isFlat) {
                selectors = _.filter(selectors, function (selector) {
                    return isActive(selector);
                });
            } else {
                selectors = _.filter(selectors, function (group) {
                    return isActive(group);
                });
                selectors = _.map(selectors, function (group) {
                    // this clone will copy the primitive valued properties and leave the arrays as references.
                    // this is fine since we'll be replacing those arrays with filtered versions.
                    var g = _.clone(group);
                    g.children = _.filter(group.children, function (child) { return isActive(child); });
                    return g;
                });
                selectors = _.filter(selectors, function (g) { return 0 < g.children.length; });
            }
            return { selectors: selectors };
        },

        /* jshint ignore:start */
        render: function () {
            var selectors = this.state.selectors;
            var selections = this.props.selections;
            function option(selector) {
                return (React.DOM.option( {value:selector.id}, selector.name));
            }
            if (this.props.isFlat) {
                selectors = _.map(selectors, function (selector) {
                    return option(selector); // (<option value={selector.id}>{selector.name}</option>);
                });
            } else {
                selectors = _.map(selectors, function (group) {
                    var options = _.map(group.children, function(child) {
                        return option(child); // (<option value={child.id}>{child.name}</option>);
                    });
                    return (React.DOM.optgroup( {label:group.name}, options));
                });
            }

            return (React.DOM.select( {id:this.props.id, value:selections, multiple:"multiple"}, selectors));
        },
        /* jshint ignore:end */

        componentDidMount: function () {
            var self = this,
                $el = $(this.getDOMNode());
            $el.on('change', function (event) {
                void event;
                var selections = _.map(_.filter($el.options, function (opt) {
                    return opt.selected;
                }), function (opt) {
                    return opt.value;
                });
                self.props.onChange(selections);
                return true;
            });
        }
    });
});

/** @jsx React.DOM */
define('controls/Radio',[
    'underscore', 'react', 'jquery'
], function (_, React, $) {
    'use strict';

    var PropTypes = React.PropTypes;

    /**
     *     Careful:
     *       This must be contained by a RadioGroup or it won't style right.
     */
    var Radio = React.createClass({displayName: 'Radio',

        propTypes: {
            name: PropTypes.string.isRequired,
            value: PropTypes.any.isRequired,
            onChange: PropTypes.func,
            checked: PropTypes.bool,
            disabled: PropTypes.bool,
            readonly: PropTypes.bool
        },

        getDefaultProps: function () {
            return {
                onChange: $.noop,
                disabled: false,
                readonly: false,
                checked: false
            };
        },

        componentWillMount: function () {
            this.stableUniqueId = _.uniqueId();
        },

        /*jshint ignore:start */
        render: function () {
            return (
                React.DOM.span(null, 
                    React.DOM.input( {type:"radio", name:this.props.name, id:this.stableUniqueId, value:this.props.value, onChange:this.onChange,
                           checked:this.props.checked, 'data-checked':this.props.checked ? '' : null,
                           disabled:this.props.disabled} ),
                    React.DOM.label( {htmlFor:this.stableUniqueId}, this.props.children)
                )
            );
        },
        /*jshint ignore:end */

        onChange: function (e) {
            if (!this.props.readonly) {
                this.props.onChange(e.target.value);
            }
        }
    });


    return Radio;
});
/** @jsx React.DOM */
define('controls/RadioGroup',[
    'underscore', 'react'
], function (_, React) {
    'use strict';


    var RadioGroup = React.createClass({displayName: 'RadioGroup',

        propTypes: {
            value: React.PropTypes.any
        },

        statics: { fieldClass: function () { return 'formFieldRadio'; } },

        /*jshint ignore:start */
        render: function () {
            var value = this.props.value;

            React.Children.forEach(this.props.children, function (radio) {

                // The use of double-equals is intentional here, so that numbers represented as strings will match.
                radio.props.checked = (radio.props.value == value);
            });

            return (
                React.DOM.fieldset(null, 
                    this.props.children
                )
            );
        }
        /*jshint ignore:end */
    });


    return RadioGroup;
});
/** @jsx React.DOM */
define('controls/TabStrip',[
    'underscore', 'jquery', 'react', 'kendo'
], function (_, $, React, kendo) {
    'use strict';

    /**
     * Takes a "tabs" prop which is a map from title string to a JSX instance.
     * This component is not presently stateful so we don't get to control what is selected.
     */
    var TabStrip = React.createClass({displayName: 'TabStrip',

        getDefaultProps: function () {
            return {
                tabs: undefined,
                selectedTab: 0,
                onChange: undefined, // selectedTab is the value
                /**
                 * This controls whether to render the content of inactive tabs.
                 * The reason for this is that some usages require state to persist in the hidden tabs.
                 * E.g. when correcting an Inbox task we need the task panel to persist to record the user's entries even when they switch over to the metadata tab.
                 */
                elideInactiveContent: true,
                className: undefined
            };
        },

        componentWillMount: function () {
            console.assert(_.isObject(this.props.tabs) && _.keys(this.props.tabs).length > 0);
            this.stableUniqueId = _.uniqueId('tab-');
        },

        /**
         * This fixes a problem with certain content that switches from hidden to shown.
         * My theory is that browsers don't flow hidden elements.  The particular case involves picking a Task transition that make metadata editable.
         * At the time this happens, the metadata are re-rendered but are not shown and the splitter gets confounded.  This is simply to force a reflow of the
         * content that is newly made visible.
         */
        componentDidUpdate: function () {
            $(this.getDOMNode()).find('.k-content.k-state-active').resize();
        },

        /* jshint ignore:start */
        render: function () {
            var self = this;

            var lis = [];
            var keys = _.keys(this.props.tabs),
                len = keys.length;
            _.each(keys, function (title, index) {
                var id = kendo.format('{0}-{1}', self.stableUniqueId, index);
                var classes = [
                    index === 0 ? 'k-first' : null,
                    index === len - 1 ? 'k-last' : null,
                    'k-state-default',
                    'k-item',
                    index === self.props.selectedTab ? 'k-tab-on-top k-state-active' : null
                ];

                lis.push((React.DOM.li( {key:index, className:_.compact(classes).join(' '), role:"tab", 'aria-controls':id}, React.DOM.a( {className:"k-link", onClick:_.partial(self.onTabClick, index)}, title))));
            });

            var divs = [];
            _.each(_.values(this.props.tabs), function (jsx, index) {
                var id = kendo.format('{0}-{1}', self.stableUniqueId, index);

                var activeTab = index === self.props.selectedTab;
                jsx.props.__WsptTabStripActiveHax = activeTab; // hax specific to the TMF - never use this

                var jsx = (index === self.props.selectedTab
                    ? (React.DOM.div( {key:index, className:"k-content k-state-active", role:"tabpanel", 'aria-expanded':"true", style:visibleStyle}, jsx))
                    : (React.DOM.div( {key:index, className:"k-content", 'aria-hidden':"true", role:"tabpanel", 'aria-expanded':"false", style:hiddenStyle}, self.props.elideInactiveContent ? null : jsx)));
                divs.push(jsx);
            });

            var className = _.compact(['k-widget', 'k-header', 'k-tabstrip', this.props.className]).join(' ');
            return (
                React.DOM.div( {'data-role':"tabstrip", tabIndex:"0", className:className, role:"tablist"}, 
                    React.DOM.ul( {className:"k-tabstrip-items k-reset"}, 
                        lis
                    ),
                    divs
                )
            );
        },
        /* jshint ignore:end */

        onTabClick: function(index) {
            this.props.onChange(index);
        }
    });

    var styleDisplayBlock = {display: 'block'};
    var visibleStyle = { display: 'block', height: 'auto', overflow: 'visible', opacity: 1 };
    var hiddenStyle = { height: 'auto', overflow: 'visible', opacity: 1, display: 'none' };

    return TabStrip;
});
/** @jsx React.DOM */
define('controls/PromiseButton',[
    'underscore', 'react'
], function (_, React) {
    'use strict';

    var VISIBLE = {display: 'inline-block'};
    void VISIBLE;
    var INVISIBLE = {display: 'none'};
    void INVISIBLE;

    var PropTypes = React.PropTypes;

    var PromiseButton = React.createClass({displayName: 'PromiseButton',

        propTypes: {
            label: PropTypes.string,
            className: PropTypes.string,
            disabled: PropTypes.bool,
            terminateChain: PropTypes.bool,
            handler: PropTypes.func
        },

        getDefaultProps: function () {
            return {
                label: '',
                className: 'secondaryButton',
                disabled: false,
                terminateChain: true,
                handler: _.identity
            };
        },

        getInitialState: function () {
            return {
                busy: false
            };
        },

        render: function () {
            var self = this,
                handler = this.props.handler,
                disabled = this.props.disabled || this.state.busy;

            function onSettled() {
                if (self.isMounted()) {
                    self.setState({ busy: false });
                }
            }
            function clickHandler() {
                var promise = handler();

                // If the handler returns a promise, enter "busy" mode and disable the button.
                if (promise) {
                    self.setState({ busy: true });
                    promise = promise.then(onSettled, onSettled);

                    // By default component calls "done()" to complete the promise chain, since this click handler
                    // does not have a return value.
                    if (self.props.terminateChain) {
                        promise.done();
                    }
                }
            }

            void clickHandler;
            void disabled;
            /*jshint ignore:start */
            return (
                React.DOM.button( {className:this.props.className, disabled:disabled, onClick:clickHandler}, 
                    this.props.label || this.props.children,
                    React.DOM.i( {className:"k-loading", style:this.state.busy ? VISIBLE : INVISIBLE})
                )
            );
            /*jshint ignore:end */
        }
    });

    return PromiseButton;
});

/** @jsx React.DOM */
define('controls/SearchBox',[
    'underscore', 'jquery', 'react'
], function (_, $, React) {
    'use strict';

    var ENTER_KEY = 13;

    function setVisible(el, visible) {
        // I'm using visibility instead of $.hide/show because I don't want to change the icon's "display" style. Something
        // goes wrong in jQuery and it changes the span's display from inline-block to block when showing it using $.show().
        $(el).css('visibility', visible ? 'visible' : 'hidden');
    }

    function noBrowserDefault(e) {
        // The browser changes focus on mouse down, but we don't want that.
        e.preventDefault();
    }

    var SearchBox = React.createClass({displayName: 'SearchBox',

        getDefaultProps: function () {
            return {
                disabled: false,
                fireClearEvent: false,
                instantSearch: false,
                onChange: function () {}
            };
        },

        componentWillMount : function () {
            console.assert(this.props.handler, 'SearchBox requires a handler function');
        },

        componentDidUpdate : function () {
            // Hide the clear button if there's no text
            setVisible($(this.getDOMNode()).find('.iconClear'), this.refs.myInput.getDOMNode().value.length > 0);
        },

        /*jshint ignore:start */
        render: function () {
            return (
                React.DOM.span( {className:"searchBox"}, 
                    React.DOM.input( {type:"text", disabled:this.props.disabled, placeholder:this.props.placeholder, value:this.props.value,
                           autoComplete:"off", onKeyDown:this.onKeyDown, defaultValue:this.props.defaultValue, ref:"myInput", onChange:this.onTextChange}),
                    React.DOM.span( {className:"iconClear", onClick:this.onClickClear, onMouseDown:noBrowserDefault} ),
                    React.DOM.span( {className:"iconSearch", onClick:this.onClickSearch, onMouseDown:noBrowserDefault} )
                ))
        },
        /*jshint ignore:end */

        onKeyDown: function (event) {
            // Don't let the Enter key propagate because it might cause parent components to do things we don't want
            if (event.keyCode === ENTER_KEY) {
                event.stopPropagation();
                event.preventDefault();
            }

            if (event.keyCode === ENTER_KEY || this.props.instantSearch) {
                this.props.handler(event.target.value);
                return;
            }

            var icon = $(event.target).siblings('.iconClear');
            setVisible(icon, (event.target.value.length > 0));
        },

        onClickClear: function (event) {
            event.stopPropagation();

            this.refs.myInput.getDOMNode().value = '';
            setVisible(event.target, false);
            if (this.props.fireClearEvent) {
                this.props.handler('');
            }
        },

        onClickSearch: function (event) {
            event.stopPropagation();

            if (!this.props.disabled) {
                this.props.handler(this.refs.myInput.getDOMNode().value);
            }
        },

        onTextChange: function (event) {
            this.props.onChange(event.target.value);
        }
    });

    /* An installer for non-react users */
    SearchBox.install = function (searchBox, placeholder, handler) {
        var input = searchBox.find('input');
        var clearBtn = searchBox.find('.iconClear');

        console.assert(handler, 'SearchBox requires a handler function');

        function inputKey(e) {
            e.stopPropagation();

            if (e.keyCode === ENTER_KEY) {
                // keep the event from bubbling up to where react can see it (whence it will attempt to confirm the dialog).
                e.preventDefault();
                handler(input.val());
            }
            setVisible(clearBtn, (input.val().length > 0));
        }
        function iconClick(e) {
            e.stopPropagation();

            if (e.target.className === 'iconClear') {
                input.val('');
                setVisible(clearBtn, false);
            }
            else if (e.target.className === 'iconSearch') {
                handler(input.val());
            }
        }

        input.attr('placeholder', placeholder)
            .on('keydown', inputKey);
        searchBox.find('span')
            .on('mousedown', noBrowserDefault)
            .on('click', iconClick);
        setVisible(clearBtn, false);
    };

    return SearchBox;
});

define('FluxFormMixin',[
    'underscore'
], function (_) {
    'use strict';

    /**
     * @Deprecated in favor of wingspan-cursors and Flux.js
     */
    var FluxFormMixin = {
        componentWillMount: function () {
            console.assert(this.formFields, 'Required to define the form; see SetOfficeStatusComponent for a working usage');
            console.assert(_.isFunction(this.isFieldValid), 'Need a field validation function');
        },

        getInitialState: function () {
            return {
                record: undefined
            };
        },

        onFieldChange: function (fieldName, newValue) {
            // When you setState, top level attributes are merged. Merge is not recursive.
            // So we have to merge the prev record with the new one manually.
            var nextState = { record: this.state.record };
            nextState['record'][fieldName] = newValue;

            // if this field is stickied, update the sticky value
            var stickiedFieldNames = _.keys(this.state.sticky || {});
            if (_.contains(stickiedFieldNames, fieldName)) {
                _.extend(nextState, { sticky: this.state.sticky });
                nextState['sticky'][fieldName] = newValue;
            }

            this.setState(nextState);
        },

        isFormValid: function () {
            if (this.state.record) {
                // form is valid if each field is valid
                return _.chain(this.formFields)
                    .map(this.isFieldValid)
                    .map(_.first)
                    .reduce(and)
                    .value();
            }
            else {
                return false;
            }

            function and(a, b) { return a && b; }
        }
    };

    return FluxFormMixin;
});

define('wingspan-forms',[
    './AutoControl',
    './FormField',
    './AutoField',
    './controls/Button',
    './controls/Carousel',
    './controls/CheckBox',
    './controls/KendoAutoComplete',
    './controls/KendoComboBox',
    './controls/KendoDatePicker',
    './controls/KendoDateTimePicker',
    './controls/KendoGrid',
    './controls/KendoGridPicker',
    './controls/KendoListView',
    './controls/KendoMultiSelect',
    './controls/KendoNumericTextBox',
    './controls/KendoPager',
    './controls/KendoTabStrip',
    './controls/KendoText',
    './controls/KendoTimePicker',
    './controls/MultiSelect',
    './controls/MultilineText',
    './controls/Radio',
    './controls/RadioGroup',
    './controls/SwitchBox',
    './controls/TabStrip',
    './controls/PromiseButton',
    './controls/SearchBox',
    './ControlCommon',
    './FluxFormMixin',
    './ImmutableOptimizations'
], function (AutoControl, FormField, AutoField, Button, Carousel, CheckBox,
             KendoAutoComplete, KendoComboBox, KendoDatePicker, KendoDateTimePicker, KendoGrid, KendoGridPicker,
             KendoListView, KendoMultiSelect, KendoNumericTextBox, KendoPager, KendoTabStrip, KendoText, KendoTimePicker,
             MultiSelect, MultilineText, Radio, RadioGroup, SwitchBox, TabStrip, PromiseButton, SearchBox,
             ControlCommon, FluxFormMixin, ImmutableOptimizations) {
    'use strict';

    // If the function arguments get out-of-sync with the require define(), the last argument might be undefined.
    console.assert(ImmutableOptimizations);

    // This module should never actually be used.  It exists only to collect all of the top-level modules into one
    // place so that the require optimizer can do a single-page optimization across the entire application
    //
    // It also must collect all of the items from the component registry.  They are needed because they do not
    // have any "hard" require references that the optimizer can see.
    //
    // Specifically, parameters to the container function do not need to be declared, and this body should not do anything
    return {
        AutoControl: AutoControl,
        FormField: FormField,
        AutoField: AutoField,
        Button: Button,
        Carousel: Carousel,
        CheckBox: CheckBox,
        KendoAutoComplete: KendoAutoComplete,
        KendoComboBox: KendoComboBox,
        KendoDatePicker: KendoDatePicker,
        KendoDateTimePicker: KendoDateTimePicker,
        KendoGrid: KendoGrid,
        KendoGridPicker: KendoGridPicker,
        KendoListView: KendoListView,
        KendoMultiSelect: KendoMultiSelect,
        KendoNumericTextBox: KendoNumericTextBox,
        KendoPager: KendoPager,
        KendoTabStrip: KendoTabStrip,
        KendoText: KendoText,
        KendoTimePicker: KendoTimePicker,
        MultiSelect: MultiSelect,
        MultilineText: MultilineText,
        Radio: Radio,
        RadioGroup: RadioGroup,
        SwitchBox: SwitchBox,
        TabStrip: TabStrip,
        PromiseButton: PromiseButton,
        SearchBox: SearchBox,
        ControlCommon: ControlCommon,
        FluxFormMixin: FluxFormMixin,
        ImmutableOptimizations: ImmutableOptimizations
    };
});

    // Fake out the almond loader - shim these dependencies to their globals.
    // Make sure these globals are already on the page - e.g. by require-shims in the app
    define('underscore', function () { return _; });
    define('react', function () { return React; });
    define('jquery', function () { return $; });
    define('kendo', function () { return kendo; });

    return require('wingspan-forms');
}));
