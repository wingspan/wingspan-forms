(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([
            'underscore', 'react', 'jquery', 'moment', 'underscore-string', 'kendo', 'text'
        ], factory);
    } else {
        root.WingspanForms = factory(root._, root.React, root.$, root.moment, root._s, root.kendo);
    }
}(this, function (_, React, $, moment, _s, kendo) {

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

//     Underscore.js 1.4.4
//     http://underscorejs.org
//     (c) 2009-2013 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var push             = ArrayProto.push,
      slice            = ArrayProto.slice,
      concat           = ArrayProto.concat,
      toString         = ObjProto.toString,
      hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
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
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.4.4';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      for (var key in obj) {
        if (_.has(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === breaker) return;
        }
      }
    }
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results[results.length] = iterator.call(context, value, index, list);
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    return _.filter(obj, function(value, index, list) {
      return !iterator.call(context, value, index, list);
    }, context);
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) {
      return value === target;
    });
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
    return _.map(obj, function(value){ return value[key]; });
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs, first) {
    if (_.isEmpty(attrs)) return first ? null : [];
    return _[first ? 'find' : 'filter'](obj, function(value) {
      for (var key in attrs) {
        if (attrs[key] !== value[key]) return false;
      }
      return true;
    });
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.where(obj, attrs, true);
  };

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See: https://bugs.webkit.org/show_bug.cgi?id=80797
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = {computed : -Infinity, value: -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed >= result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return Infinity;
    var result = {computed : Infinity, value: Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Shuffle an array.
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value) {
    return _.isFunction(value) ? value : function(obj){ return obj[value]; };
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, value, context) {
    var iterator = lookupIterator(value);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value : value,
        index : index,
        criteria : iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index < right.index ? -1 : 1;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(obj, value, context, behavior) {
    var result = {};
    var iterator = lookupIterator(value || _.identity);
    each(obj, function(value, index) {
      var key = iterator.call(context, value, index, obj);
      behavior(result, key, value);
    });
    return result;
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = function(obj, value, context) {
    return group(obj, value, context, function(result, key, value) {
      (_.has(result, key) ? result[key] : (result[key] = [])).push(value);
    });
  };

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = function(obj, value, context) {
    return group(obj, value, context, function(result, key) {
      if (!_.has(result, key)) result[key] = 0;
      result[key]++;
    });
  };

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = iterator == null ? _.identity : lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely convert anything iterable into a real, live array.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n != null) && !guard) {
      return slice.call(array, Math.max(array.length - n, 0));
    } else {
      return array[array.length - 1];
    }
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, output) {
    each(input, function(value) {
      if (_.isArray(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Return a completely flattened version of an array.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(concat.apply(ArrayProto, arguments));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var args = slice.call(arguments);
    var length = _.max(_.pluck(args, 'length'));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(args, "" + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, l = list.length; i < l; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, l = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, l + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < l; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
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
    step = arguments[2] || 1;

    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(len);

    while(idx < len) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    var args = slice.call(arguments, 2);
    return function() {
      return func.apply(context, args.concat(slice.call(arguments)));
    };
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context.
  _.partial = function(func) {
    var args = slice.call(arguments, 1);
    return function() {
      return func.apply(this, args.concat(slice.call(arguments)));
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) funcs = _.functions(obj);
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  _.throttle = function(func, wait) {
    var context, args, timeout, result;
    var previous = 0;
    var later = function() {
      previous = new Date;
      timeout = null;
      result = func.apply(context, args);
    };
    return function() {
      var now = new Date;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout) {
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
    var timeout, result;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) result = func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) result = func.apply(context, args);
      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func];
      push.apply(args, arguments);
      return wrapper.apply(this, args);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    if (times <= 0) return func();
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys[keys.length] = key;
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var values = [];
    for (var key in obj) if (_.has(obj, key)) values.push(obj[key]);
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var pairs = [];
    for (var key in obj) if (_.has(obj, key)) pairs.push([key, obj[key]]);
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    for (var key in obj) if (_.has(obj, key)) result[obj[key]] = key;
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
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] == null) obj[prop] = source[prop];
        }
      }
    });
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
    // See the Harmony `egal` proposal: http://wiki.ecmascript.org/doku.php?id=harmony:egal.
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Objects with different constructors are not equivalent, but `Object`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                               _.isFunction(bCtor) && (bCtor instanceof bCtor))) {
        return false;
      }
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
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
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
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
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
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
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  // Run a function **n** times.
  _.times = function(n, iterator, context) {
    var accum = Array(n);
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
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

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named property is a function then invoke it;
  // otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return null;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name){
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
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
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    var render;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
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

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function() {
      return this._wrapped;
    }

  });

}).call(this);

define("underscore", (function (global) {
    return function () {
        var ret, fn;
        return ret || global._;
    };
}(this)));

// Domain Public by Eric Wendelin http://eriwen.com/ (2008)
//                  Luke Smith http://lucassmith.name/ (2008)
//                  Loic Dachary <loic@dachary.org> (2008)
//                  Johan Euphrosine <proppy@aminche.com> (2008)
//                  Oyvind Sean Kinsey http://kinsey.no/blog (2010)
//                  Victor Homyakov <victor-homyakov@users.sourceforge.net> (2010)

/**
 * Main function giving a function stack trace with a forced or passed in Error
 *
 * @cfg {Error} e The error to create a stacktrace from (optional)
 * @cfg {Boolean} guess If we should try to resolve the names of anonymous functions
 * @return {Array} of Strings with functions, lines, files, and arguments where possible
 */
function printStackTrace(options) {
    options = options || {guess: true};
    var ex = options.e || null, guess = !!options.guess;
    var p = new printStackTrace.implementation(), result = p.run(ex);
    return (guess) ? p.guessAnonymousFunctions(result) : result;
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = printStackTrace;
}

printStackTrace.implementation = function() {
};

printStackTrace.implementation.prototype = {
    /**
     * @param {Error} ex The error to create a stacktrace from (optional)
     * @param {String} mode Forced mode (optional, mostly for unit tests)
     */
    run: function(ex, mode) {
        ex = ex || this.createException();
        // examine exception properties w/o debugger
        //for (var prop in ex) {alert("Ex['" + prop + "']=" + ex[prop]);}
        mode = mode || this.mode(ex);
        if (mode === 'other') {
            return this.other(arguments.callee);
        } else {
            return this[mode](ex);
        }
    },

    createException: function() {
        try {
            this.undef();
        } catch (e) {
            return e;
        }
    },

    /**
     * Mode could differ for different exception, e.g.
     * exceptions in Chrome may or may not have arguments or stack.
     *
     * @return {String} mode of operation for the exception
     */
    mode: function(e) {
        if (e['arguments'] && e.stack) {
            return 'chrome';
        } else if (e.stack && e.sourceURL) {
            return 'safari';
        } else if (e.stack && e.number) {
            return 'ie';
        } else if (typeof e.message === 'string' && typeof window !== 'undefined' && window.opera) {
            // e.message.indexOf("Backtrace:") > -1 -> opera
            // !e.stacktrace -> opera
            if (!e.stacktrace) {
                return 'opera9'; // use e.message
            }
            // 'opera#sourceloc' in e -> opera9, opera10a
            if (e.message.indexOf('\n') > -1 && e.message.split('\n').length > e.stacktrace.split('\n').length) {
                return 'opera9'; // use e.message
            }
            // e.stacktrace && !e.stack -> opera10a
            if (!e.stack) {
                return 'opera10a'; // use e.stacktrace
            }
            // e.stacktrace && e.stack -> opera10b
            if (e.stacktrace.indexOf("called from line") < 0) {
                return 'opera10b'; // use e.stacktrace, format differs from 'opera10a'
            }
            // e.stacktrace && e.stack -> opera11
            return 'opera11'; // use e.stacktrace, format differs from 'opera10a', 'opera10b'
        } else if (e.stack && !e.fileName) {
            // Chrome 27 does not have e.arguments as earlier versions,
            // but still does not have e.fileName as Firefox
            return 'chrome';
        } else if (e.stack) {
            return 'firefox';
        }
        return 'other';
    },

    /**
     * Given a context, function name, and callback function, overwrite it so that it calls
     * printStackTrace() first with a callback and then runs the rest of the body.
     *
     * @param {Object} context of execution (e.g. window)
     * @param {String} functionName to instrument
     * @param {Function} callback function to call with a stack trace on invocation
     */
    instrumentFunction: function(context, functionName, callback) {
        context = context || window;
        var original = context[functionName];
        context[functionName] = function instrumented() {
            callback.call(this, printStackTrace().slice(4));
            return context[functionName]._instrumented.apply(this, arguments);
        };
        context[functionName]._instrumented = original;
    },

    /**
     * Given a context and function name of a function that has been
     * instrumented, revert the function to it's original (non-instrumented)
     * state.
     *
     * @param {Object} context of execution (e.g. window)
     * @param {String} functionName to de-instrument
     */
    deinstrumentFunction: function(context, functionName) {
        if (context[functionName].constructor === Function &&
                context[functionName]._instrumented &&
                context[functionName]._instrumented.constructor === Function) {
            context[functionName] = context[functionName]._instrumented;
        }
    },

    /**
     * Given an Error object, return a formatted Array based on Chrome's stack string.
     *
     * @param e - Error object to inspect
     * @return Array<String> of function calls, files and line numbers
     */
    chrome: function(e) {
        var stack = (e.stack + '\n').replace(/^\S[^\(]+?[\n$]/gm, '').
          replace(/^\s+(at eval )?at\s+/gm, '').
          replace(/^([^\(]+?)([\n$])/gm, '{anonymous}()@$1$2').
          replace(/^Object.<anonymous>\s*\(([^\)]+)\)/gm, '{anonymous}()@$1').split('\n');
        stack.pop();
        return stack;
    },

    /**
     * Given an Error object, return a formatted Array based on Safari's stack string.
     *
     * @param e - Error object to inspect
     * @return Array<String> of function calls, files and line numbers
     */
    safari: function(e) {
        return e.stack.replace(/\[native code\]\n/m, '')
            .replace(/^(?=\w+Error\:).*$\n/m, '')
            .replace(/^@/gm, '{anonymous}()@')
            .split('\n');
    },

    /**
     * Given an Error object, return a formatted Array based on IE's stack string.
     *
     * @param e - Error object to inspect
     * @return Array<String> of function calls, files and line numbers
     */
    ie: function(e) {
        var lineRE = /^.*at (\w+) \(([^\)]+)\)$/gm;
        return e.stack.replace(/at Anonymous function /gm, '{anonymous}()@')
            .replace(/^(?=\w+Error\:).*$\n/m, '')
            .replace(lineRE, '$1@$2')
            .split('\n');
    },

    /**
     * Given an Error object, return a formatted Array based on Firefox's stack string.
     *
     * @param e - Error object to inspect
     * @return Array<String> of function calls, files and line numbers
     */
    firefox: function(e) {
        return e.stack.replace(/(?:\n@:0)?\s+$/m, '').replace(/^[\(@]/gm, '{anonymous}()@').split('\n');
    },

    opera11: function(e) {
        var ANON = '{anonymous}', lineRE = /^.*line (\d+), column (\d+)(?: in (.+))? in (\S+):$/;
        var lines = e.stacktrace.split('\n'), result = [];

        for (var i = 0, len = lines.length; i < len; i += 2) {
            var match = lineRE.exec(lines[i]);
            if (match) {
                var location = match[4] + ':' + match[1] + ':' + match[2];
                var fnName = match[3] || "global code";
                fnName = fnName.replace(/<anonymous function: (\S+)>/, "$1").replace(/<anonymous function>/, ANON);
                result.push(fnName + '@' + location + ' -- ' + lines[i + 1].replace(/^\s+/, ''));
            }
        }

        return result;
    },

    opera10b: function(e) {
        // "<anonymous function: run>([arguments not available])@file://localhost/G:/js/stacktrace.js:27\n" +
        // "printStackTrace([arguments not available])@file://localhost/G:/js/stacktrace.js:18\n" +
        // "@file://localhost/G:/js/test/functional/testcase1.html:15"
        var lineRE = /^(.*)@(.+):(\d+)$/;
        var lines = e.stacktrace.split('\n'), result = [];

        for (var i = 0, len = lines.length; i < len; i++) {
            var match = lineRE.exec(lines[i]);
            if (match) {
                var fnName = match[1]? (match[1] + '()') : "global code";
                result.push(fnName + '@' + match[2] + ':' + match[3]);
            }
        }

        return result;
    },

    /**
     * Given an Error object, return a formatted Array based on Opera 10's stacktrace string.
     *
     * @param e - Error object to inspect
     * @return Array<String> of function calls, files and line numbers
     */
    opera10a: function(e) {
        // "  Line 27 of linked script file://localhost/G:/js/stacktrace.js\n"
        // "  Line 11 of inline#1 script in file://localhost/G:/js/test/functional/testcase1.html: In function foo\n"
        var ANON = '{anonymous}', lineRE = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;
        var lines = e.stacktrace.split('\n'), result = [];

        for (var i = 0, len = lines.length; i < len; i += 2) {
            var match = lineRE.exec(lines[i]);
            if (match) {
                var fnName = match[3] || ANON;
                result.push(fnName + '()@' + match[2] + ':' + match[1] + ' -- ' + lines[i + 1].replace(/^\s+/, ''));
            }
        }

        return result;
    },

    // Opera 7.x-9.2x only!
    opera9: function(e) {
        // "  Line 43 of linked script file://localhost/G:/js/stacktrace.js\n"
        // "  Line 7 of inline#1 script in file://localhost/G:/js/test/functional/testcase1.html\n"
        var ANON = '{anonymous}', lineRE = /Line (\d+).*script (?:in )?(\S+)/i;
        var lines = e.message.split('\n'), result = [];

        for (var i = 2, len = lines.length; i < len; i += 2) {
            var match = lineRE.exec(lines[i]);
            if (match) {
                result.push(ANON + '()@' + match[2] + ':' + match[1] + ' -- ' + lines[i + 1].replace(/^\s+/, ''));
            }
        }

        return result;
    },

    // Safari 5-, IE 9-, and others
    other: function(curr) {
        var ANON = '{anonymous}', fnRE = /function\s*([\w\-$]+)?\s*\(/i, stack = [], fn, args, maxStackSize = 10;
        while (curr && curr['arguments'] && stack.length < maxStackSize) {
            fn = fnRE.test(curr.toString()) ? RegExp.$1 || ANON : ANON;
            args = Array.prototype.slice.call(curr['arguments'] || []);
            stack[stack.length] = fn + '(' + this.stringifyArguments(args) + ')';
            curr = curr.caller;
        }
        return stack;
    },

    /**
     * Given arguments array as a String, substituting type names for non-string types.
     *
     * @param {Arguments,Array} args
     * @return {String} stringified arguments
     */
    stringifyArguments: function(args) {
        var result = [];
        var slice = Array.prototype.slice;
        for (var i = 0; i < args.length; ++i) {
            var arg = args[i];
            if (arg === undefined) {
                result[i] = 'undefined';
            } else if (arg === null) {
                result[i] = 'null';
            } else if (arg.constructor) {
                if (arg.constructor === Array) {
                    if (arg.length < 3) {
                        result[i] = '[' + this.stringifyArguments(arg) + ']';
                    } else {
                        result[i] = '[' + this.stringifyArguments(slice.call(arg, 0, 1)) + '...' + this.stringifyArguments(slice.call(arg, -1)) + ']';
                    }
                } else if (arg.constructor === Object) {
                    result[i] = '#object';
                } else if (arg.constructor === Function) {
                    result[i] = '#function';
                } else if (arg.constructor === String) {
                    result[i] = '"' + arg + '"';
                } else if (arg.constructor === Number) {
                    result[i] = arg;
                }
            }
        }
        return result.join(',');
    },

    sourceCache: {},

    /**
     * @return the text from a given URL
     */
    ajax: function(url) {
        var req = this.createXMLHTTPObject();
        if (req) {
            try {
                req.open('GET', url, false);
                //req.overrideMimeType('text/plain');
                //req.overrideMimeType('text/javascript');
                req.send(null);
                //return req.status == 200 ? req.responseText : '';
                return req.responseText;
            } catch (e) {
            }
        }
        return '';
    },

    /**
     * Try XHR methods in order and store XHR factory.
     *
     * @return <Function> XHR function or equivalent
     */
    createXMLHTTPObject: function() {
        var xmlhttp, XMLHttpFactories = [
            function() {
                return new XMLHttpRequest();
            }, function() {
                return new ActiveXObject('Msxml2.XMLHTTP');
            }, function() {
                return new ActiveXObject('Msxml3.XMLHTTP');
            }, function() {
                return new ActiveXObject('Microsoft.XMLHTTP');
            }
        ];
        for (var i = 0; i < XMLHttpFactories.length; i++) {
            try {
                xmlhttp = XMLHttpFactories[i]();
                // Use memoization to cache the factory
                this.createXMLHTTPObject = XMLHttpFactories[i];
                return xmlhttp;
            } catch (e) {
            }
        }
    },

    /**
     * Given a URL, check if it is in the same domain (so we can get the source
     * via Ajax).
     *
     * @param url <String> source url
     * @return <Boolean> False if we need a cross-domain request
     */
    isSameDomain: function(url) {
        return typeof location !== "undefined" && url.indexOf(location.hostname) !== -1; // location may not be defined, e.g. when running from nodejs.
    },

    /**
     * Get source code from given URL if in the same domain.
     *
     * @param url <String> JS source URL
     * @return <Array> Array of source code lines
     */
    getSource: function(url) {
        // TODO reuse source from script tags?
        if (!(url in this.sourceCache)) {
            this.sourceCache[url] = this.ajax(url).split('\n');
        }
        return this.sourceCache[url];
    },

    guessAnonymousFunctions: function(stack) {
        for (var i = 0; i < stack.length; ++i) {
            var reStack = /\{anonymous\}\(.*\)@(.*)/,
                reRef = /^(.*?)(?::(\d+))(?::(\d+))?(?: -- .+)?$/,
                frame = stack[i], ref = reStack.exec(frame);

            if (ref) {
                var m = reRef.exec(ref[1]);
                if (m) { // If falsey, we did not get any file/line information
                    var file = m[1], lineno = m[2], charno = m[3] || 0;
                    if (file && this.isSameDomain(file) && lineno) {
                        var functionName = this.guessAnonymousFunction(file, lineno, charno);
                        stack[i] = frame.replace('{anonymous}', functionName);
                    }
                }
            }
        }
        return stack;
    },

    guessAnonymousFunction: function(url, lineNo, charNo) {
        var ret;
        try {
            ret = this.findFunctionName(this.getSource(url), lineNo);
        } catch (e) {
            ret = 'getSource failed with url: ' + url + ', exception: ' + e.toString();
        }
        return ret;
    },

    findFunctionName: function(source, lineNo) {
        // FIXME findFunctionName fails for compressed source
        // (more than one function on the same line)
        // function {name}({args}) m[1]=name m[2]=args
        var reFunctionDeclaration = /function\s+([^(]*?)\s*\(([^)]*)\)/;
        // {name} = function ({args}) TODO args capture
        // /['"]?([0-9A-Za-z_]+)['"]?\s*[:=]\s*function(?:[^(]*)/
        var reFunctionExpression = /['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*function\b/;
        // {name} = eval()
        var reFunctionEvaluation = /['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*(?:eval|new Function)\b/;
        // Walk backwards in the source lines until we find
        // the line which matches one of the patterns above
        var code = "", line, maxLines = Math.min(lineNo, 20), m, commentPos;
        for (var i = 0; i < maxLines; ++i) {
            // lineNo is 1-based, source[] is 0-based
            line = source[lineNo - i - 1];
            commentPos = line.indexOf('//');
            if (commentPos >= 0) {
                line = line.substr(0, commentPos);
            }
            // TODO check other types of comments? Commented code may lead to false positive
            if (line) {
                code = line + code;
                m = reFunctionExpression.exec(code);
                if (m && m[1]) {
                    return m[1];
                }
                m = reFunctionDeclaration.exec(code);
                if (m && m[1]) {
                    //return m[1] + "(" + (m[2] || "") + ")";
                    return m[1];
                }
                m = reFunctionEvaluation.exec(code);
                if (m && m[1]) {
                    return m[1];
                }
            }
        }
        return '(?)';
    }
};

define("stacktrace", function(){});

define('util/debug',[
    'underscore',
    'stacktrace' // exposes 'printStackTrace'
], function (_) {
    'use strict';

    /**
     * For window.onerror compat, all exception objects need to turn into a string.
     */
    function verify(expression, fmt /* ... */) {
        var message;
        if (!expression) {
            var stacktrace = printStackTrace().slice(5).join('\n');
            try {
                var fmtArgs = _.tail(_.tail(arguments));
                message = _.str.sprintf(fmt, fmtArgs);
            }
            catch (e) {
                message = _.str.sprintf('wspt.verify: exception inside wspt.verify: `%s` (`%s`)\n%s', e, fmt, stacktrace);
            }
            throw new Error(message + '\n' + stacktrace);
        }
    }

    return {
        verify: verify
    };
});

/** @jsx React.DOM */
define('controls/KendoText',[
    'underscore', 'jquery', 'react', '../util/debug'
], function (_, $, React, debug) {
    'use strict';


    return React.createClass({

        fieldClass: 'formFieldInput',

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
    'underscore', 'react'
], function (_, React) {
    'use strict';


    var MultilineText = React.createClass({displayName: 'MultilineText',

        fieldClass: 'formFieldTextarea',

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
                id: undefined
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
    'underscore', 'jquery', 'react'
], function (_, $, React) {
    'use strict';

    var SPACE_KEY = 32;
    var SPAN_STYLE = {
        display: 'inline-block',
        height: '38px'
    };

    function ignoreClick() { }

    var SwitchBox = React.createClass({displayName: 'SwitchBox',

        fieldClass: 'formFieldSwitch',

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

        componentDidMount: function (rootNode) {
            var self = this;

            $(rootNode).on('keypress', function (e) {
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

    var NOW = new Date();
    var DEFAULTS = kendo.ui.DateTimePicker.fn.options;

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

    /**
     * Handle the unusual format used by TypeInfo for specifying the current time.
     * @param date
     * @returns {Date}
     */
    function parseDate(date) {
        return (date === 'NOW') ? NOW : date;
    }


    function setKendoDateState(kendoWidget, value, disabled, readonly, max, min) {
        kendoWidget.value(value);
        kendoWidget.min(parseDate(min || DEFAULTS.min));
        kendoWidget.max(parseDate(max || DEFAULTS.max));
        setKendoDisabledReadonly(kendoWidget, disabled, readonly);
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
                return e.target.parents('.hasTooltip').data('tooltip');
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
                return e.target.parents('.formFieldError').data('error-tooltip');
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
        parseDate: parseDate,
        attachFormTooltips: attachFormTooltips,
        hideErrorTooltip: hideErrorTooltip,
        setKendoDateState: setKendoDateState,
        setKendoNumberState: setKendoNumberState,
        setKendoNumberValue: setKendoNumberValue,
        setKendoDisabledReadonly: setKendoDisabledReadonly
    };
});
/** @jsx React.DOM */
define('controls/KendoNumber',[
    'underscore', 'jquery', 'react', 'kendo',
    '../util/debug',
    '../ControlCommon'
], function (_, $, React, kendo, debug, ControlCommon) {
    'use strict';


    var KendoNumber = React.createClass({displayName: 'KendoNumber',

        fieldClass: 'formFieldNumeric',

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

        componentDidMount: function (rootNode) {
            var $el = $(rootNode);
            debug.verify($el);

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

        componentDidUpdate: function (prevProps, prevState, rootNode) {
            var $el = $(rootNode);
            debug.verify($el);

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

    return KendoNumber;

});

// moment.js
// version : 2.0.0
// author : Tim Wood
// license : MIT
// momentjs.com

(function (undefined) {

    /************************************
        Constants
    ************************************/

    var moment,
        VERSION = "2.0.0",
        round = Math.round, i,
        // internal storage for language config files
        languages = {},

        // check for nodeJS
        hasModule = (typeof module !== 'undefined' && module.exports),

        // ASP.NET json date format regex
        aspNetJsonRegex = /^\/?Date\((\-?\d+)/i,

        // format tokens
        formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g,
        localFormattingTokens = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,

        // parsing tokens
        parseMultipleFormatChunker = /([0-9a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)/gi,

        // parsing token regexes
        parseTokenOneOrTwoDigits = /\d\d?/, // 0 - 99
        parseTokenOneToThreeDigits = /\d{1,3}/, // 0 - 999
        parseTokenThreeDigits = /\d{3}/, // 000 - 999
        parseTokenFourDigits = /\d{1,4}/, // 0 - 9999
        parseTokenSixDigits = /[+\-]?\d{1,6}/, // -999,999 - 999,999
        parseTokenWord = /[0-9]*[a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF]+\s*?[\u0600-\u06FF]+/i, // any word (or two) characters or numbers including two word month in arabic.
        parseTokenTimezone = /Z|[\+\-]\d\d:?\d\d/i, // +00:00 -00:00 +0000 -0000 or Z
        parseTokenT = /T/i, // T (ISO seperator)
        parseTokenTimestampMs = /[\+\-]?\d+(\.\d{1,3})?/, // 123456789 123456789.123

        // preliminary iso regex
        // 0000-00-00 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000
        isoRegex = /^\s*\d{4}-\d\d-\d\d((T| )(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/,
        isoFormat = 'YYYY-MM-DDTHH:mm:ssZ',

        // iso time formats and regexes
        isoTimes = [
            ['HH:mm:ss.S', /(T| )\d\d:\d\d:\d\d\.\d{1,3}/],
            ['HH:mm:ss', /(T| )\d\d:\d\d:\d\d/],
            ['HH:mm', /(T| )\d\d:\d\d/],
            ['HH', /(T| )\d\d/]
        ],

        // timezone chunker "+10:00" > ["10", "00"] or "-1530" > ["-15", "30"]
        parseTimezoneChunker = /([\+\-]|\d\d)/gi,

        // getter and setter names
        proxyGettersAndSetters = 'Month|Date|Hours|Minutes|Seconds|Milliseconds'.split('|'),
        unitMillisecondFactors = {
            'Milliseconds' : 1,
            'Seconds' : 1e3,
            'Minutes' : 6e4,
            'Hours' : 36e5,
            'Days' : 864e5,
            'Months' : 2592e6,
            'Years' : 31536e6
        },

        // format function strings
        formatFunctions = {},

        // tokens to ordinalize and pad
        ordinalizeTokens = 'DDD w W M D d'.split(' '),
        paddedTokens = 'M D H h m s w W'.split(' '),

        formatTokenFunctions = {
            M    : function () {
                return this.month() + 1;
            },
            MMM  : function (format) {
                return this.lang().monthsShort(this, format);
            },
            MMMM : function (format) {
                return this.lang().months(this, format);
            },
            D    : function () {
                return this.date();
            },
            DDD  : function () {
                return this.dayOfYear();
            },
            d    : function () {
                return this.day();
            },
            dd   : function (format) {
                return this.lang().weekdaysMin(this, format);
            },
            ddd  : function (format) {
                return this.lang().weekdaysShort(this, format);
            },
            dddd : function (format) {
                return this.lang().weekdays(this, format);
            },
            w    : function () {
                return this.week();
            },
            W    : function () {
                return this.isoWeek();
            },
            YY   : function () {
                return leftZeroFill(this.year() % 100, 2);
            },
            YYYY : function () {
                return leftZeroFill(this.year(), 4);
            },
            YYYYY : function () {
                return leftZeroFill(this.year(), 5);
            },
            a    : function () {
                return this.lang().meridiem(this.hours(), this.minutes(), true);
            },
            A    : function () {
                return this.lang().meridiem(this.hours(), this.minutes(), false);
            },
            H    : function () {
                return this.hours();
            },
            h    : function () {
                return this.hours() % 12 || 12;
            },
            m    : function () {
                return this.minutes();
            },
            s    : function () {
                return this.seconds();
            },
            S    : function () {
                return ~~(this.milliseconds() / 100);
            },
            SS   : function () {
                return leftZeroFill(~~(this.milliseconds() / 10), 2);
            },
            SSS  : function () {
                return leftZeroFill(this.milliseconds(), 3);
            },
            Z    : function () {
                var a = -this.zone(),
                    b = "+";
                if (a < 0) {
                    a = -a;
                    b = "-";
                }
                return b + leftZeroFill(~~(a / 60), 2) + ":" + leftZeroFill(~~a % 60, 2);
            },
            ZZ   : function () {
                var a = -this.zone(),
                    b = "+";
                if (a < 0) {
                    a = -a;
                    b = "-";
                }
                return b + leftZeroFill(~~(10 * a / 6), 4);
            },
            X    : function () {
                return this.unix();
            }
        };

    function padToken(func, count) {
        return function (a) {
            return leftZeroFill(func.call(this, a), count);
        };
    }
    function ordinalizeToken(func) {
        return function (a) {
            return this.lang().ordinal(func.call(this, a));
        };
    }

    while (ordinalizeTokens.length) {
        i = ordinalizeTokens.pop();
        formatTokenFunctions[i + 'o'] = ordinalizeToken(formatTokenFunctions[i]);
    }
    while (paddedTokens.length) {
        i = paddedTokens.pop();
        formatTokenFunctions[i + i] = padToken(formatTokenFunctions[i], 2);
    }
    formatTokenFunctions.DDDD = padToken(formatTokenFunctions.DDD, 3);


    /************************************
        Constructors
    ************************************/

    function Language() {

    }

    // Moment prototype object
    function Moment(config) {
        extend(this, config);
    }

    // Duration Constructor
    function Duration(duration) {
        var data = this._data = {},
            years = duration.years || duration.year || duration.y || 0,
            months = duration.months || duration.month || duration.M || 0,
            weeks = duration.weeks || duration.week || duration.w || 0,
            days = duration.days || duration.day || duration.d || 0,
            hours = duration.hours || duration.hour || duration.h || 0,
            minutes = duration.minutes || duration.minute || duration.m || 0,
            seconds = duration.seconds || duration.second || duration.s || 0,
            milliseconds = duration.milliseconds || duration.millisecond || duration.ms || 0;

        // representation for dateAddRemove
        this._milliseconds = milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 36e5; // 1000 * 60 * 60
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = days +
            weeks * 7;
        // It is impossible translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = months +
            years * 12;

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;
        seconds += absRound(milliseconds / 1000);

        data.seconds = seconds % 60;
        minutes += absRound(seconds / 60);

        data.minutes = minutes % 60;
        hours += absRound(minutes / 60);

        data.hours = hours % 24;
        days += absRound(hours / 24);

        days += weeks * 7;
        data.days = days % 30;

        months += absRound(days / 30);

        data.months = months % 12;
        years += absRound(months / 12);

        data.years = years;
    }


    /************************************
        Helpers
    ************************************/


    function extend(a, b) {
        for (var i in b) {
            if (b.hasOwnProperty(i)) {
                a[i] = b[i];
            }
        }
        return a;
    }

    function absRound(number) {
        if (number < 0) {
            return Math.ceil(number);
        } else {
            return Math.floor(number);
        }
    }

    // left zero fill a number
    // see http://jsperf.com/left-zero-filling for performance comparison
    function leftZeroFill(number, targetLength) {
        var output = number + '';
        while (output.length < targetLength) {
            output = '0' + output;
        }
        return output;
    }

    // helper function for _.addTime and _.subtractTime
    function addOrSubtractDurationFromMoment(mom, duration, isAdding) {
        var ms = duration._milliseconds,
            d = duration._days,
            M = duration._months,
            currentDate;

        if (ms) {
            mom._d.setTime(+mom + ms * isAdding);
        }
        if (d) {
            mom.date(mom.date() + d * isAdding);
        }
        if (M) {
            currentDate = mom.date();
            mom.date(1)
                .month(mom.month() + M * isAdding)
                .date(Math.min(currentDate, mom.daysInMonth()));
        }
    }

    // check if is an array
    function isArray(input) {
        return Object.prototype.toString.call(input) === '[object Array]';
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if (~~array1[i] !== ~~array2[i]) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }


    /************************************
        Languages
    ************************************/


    Language.prototype = {
        set : function (config) {
            var prop, i;
            for (i in config) {
                prop = config[i];
                if (typeof prop === 'function') {
                    this[i] = prop;
                } else {
                    this['_' + i] = prop;
                }
            }
        },

        _months : "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        months : function (m) {
            return this._months[m.month()];
        },

        _monthsShort : "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        monthsShort : function (m) {
            return this._monthsShort[m.month()];
        },

        monthsParse : function (monthName) {
            var i, mom, regex, output;

            if (!this._monthsParse) {
                this._monthsParse = [];
            }

            for (i = 0; i < 12; i++) {
                // make the regex if we don't have it already
                if (!this._monthsParse[i]) {
                    mom = moment([2000, i]);
                    regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                    this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
                }
                // test the regex
                if (this._monthsParse[i].test(monthName)) {
                    return i;
                }
            }
        },

        _weekdays : "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdays : function (m) {
            return this._weekdays[m.day()];
        },

        _weekdaysShort : "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysShort : function (m) {
            return this._weekdaysShort[m.day()];
        },

        _weekdaysMin : "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        weekdaysMin : function (m) {
            return this._weekdaysMin[m.day()];
        },

        _longDateFormat : {
            LT : "h:mm A",
            L : "MM/DD/YYYY",
            LL : "MMMM D YYYY",
            LLL : "MMMM D YYYY LT",
            LLLL : "dddd, MMMM D YYYY LT"
        },
        longDateFormat : function (key) {
            var output = this._longDateFormat[key];
            if (!output && this._longDateFormat[key.toUpperCase()]) {
                output = this._longDateFormat[key.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function (val) {
                    return val.slice(1);
                });
                this._longDateFormat[key] = output;
            }
            return output;
        },

        meridiem : function (hours, minutes, isLower) {
            if (hours > 11) {
                return isLower ? 'pm' : 'PM';
            } else {
                return isLower ? 'am' : 'AM';
            }
        },

        _calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[last] dddd [at] LT',
            sameElse : 'L'
        },
        calendar : function (key, mom) {
            var output = this._calendar[key];
            return typeof output === 'function' ? output.apply(mom) : output;
        },

        _relativeTime : {
            future : "in %s",
            past : "%s ago",
            s : "a few seconds",
            m : "a minute",
            mm : "%d minutes",
            h : "an hour",
            hh : "%d hours",
            d : "a day",
            dd : "%d days",
            M : "a month",
            MM : "%d months",
            y : "a year",
            yy : "%d years"
        },
        relativeTime : function (number, withoutSuffix, string, isFuture) {
            var output = this._relativeTime[string];
            return (typeof output === 'function') ?
                output(number, withoutSuffix, string, isFuture) :
                output.replace(/%d/i, number);
        },
        pastFuture : function (diff, output) {
            var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
            return typeof format === 'function' ? format(output) : format.replace(/%s/i, output);
        },

        ordinal : function (number) {
            return this._ordinal.replace("%d", number);
        },
        _ordinal : "%d",

        preparse : function (string) {
            return string;
        },

        postformat : function (string) {
            return string;
        },

        week : function (mom) {
            return weekOfYear(mom, this._week.dow, this._week.doy);
        },
        _week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 1st is the first week of the year.
        }
    };

    // Loads a language definition into the `languages` cache.  The function
    // takes a key and optionally values.  If not in the browser and no values
    // are provided, it will load the language file module.  As a convenience,
    // this function also returns the language values.
    function loadLang(key, values) {
        values.abbr = key;
        if (!languages[key]) {
            languages[key] = new Language();
        }
        languages[key].set(values);
        return languages[key];
    }

    // Determines which language definition to use and returns it.
    //
    // With no parameters, it will return the global language.  If you
    // pass in a language key, such as 'en', it will return the
    // definition for 'en', so long as 'en' has already been loaded using
    // moment.lang.
    function getLangDefinition(key) {
        if (!key) {
            return moment.fn._lang;
        }
        if (!languages[key] && hasModule) {
            require('./lang/' + key);
        }
        return languages[key];
    }


    /************************************
        Formatting
    ************************************/


    function removeFormattingTokens(input) {
        if (input.match(/\[.*\]/)) {
            return input.replace(/^\[|\]$/g, "");
        }
        return input.replace(/\\/g, "");
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = "";
            for (i = 0; i < length; i++) {
                output += typeof array[i].call === 'function' ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return m.lang().longDateFormat(input) || input;
        }

        while (i-- && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
        }

        if (!formatFunctions[format]) {
            formatFunctions[format] = makeFormatFunction(format);
        }

        return formatFunctions[format](m);
    }


    /************************************
        Parsing
    ************************************/


    // get the regex to find the next token
    function getParseRegexForToken(token) {
        switch (token) {
        case 'DDDD':
            return parseTokenThreeDigits;
        case 'YYYY':
            return parseTokenFourDigits;
        case 'YYYYY':
            return parseTokenSixDigits;
        case 'S':
        case 'SS':
        case 'SSS':
        case 'DDD':
            return parseTokenOneToThreeDigits;
        case 'MMM':
        case 'MMMM':
        case 'dd':
        case 'ddd':
        case 'dddd':
        case 'a':
        case 'A':
            return parseTokenWord;
        case 'X':
            return parseTokenTimestampMs;
        case 'Z':
        case 'ZZ':
            return parseTokenTimezone;
        case 'T':
            return parseTokenT;
        case 'MM':
        case 'DD':
        case 'YY':
        case 'HH':
        case 'hh':
        case 'mm':
        case 'ss':
        case 'M':
        case 'D':
        case 'd':
        case 'H':
        case 'h':
        case 'm':
        case 's':
            return parseTokenOneOrTwoDigits;
        default :
            return new RegExp(token.replace('\\', ''));
        }
    }

    // function to convert string input to date
    function addTimeToArrayFromToken(token, input, config) {
        var a, b,
            datePartArray = config._a;

        switch (token) {
        // MONTH
        case 'M' : // fall through to MM
        case 'MM' :
            datePartArray[1] = (input == null) ? 0 : ~~input - 1;
            break;
        case 'MMM' : // fall through to MMMM
        case 'MMMM' :
            a = getLangDefinition(config._l).monthsParse(input);
            // if we didn't find a month name, mark the date as invalid.
            if (a != null) {
                datePartArray[1] = a;
            } else {
                config._isValid = false;
            }
            break;
        // DAY OF MONTH
        case 'D' : // fall through to DDDD
        case 'DD' : // fall through to DDDD
        case 'DDD' : // fall through to DDDD
        case 'DDDD' :
            if (input != null) {
                datePartArray[2] = ~~input;
            }
            break;
        // YEAR
        case 'YY' :
            datePartArray[0] = ~~input + (~~input > 68 ? 1900 : 2000);
            break;
        case 'YYYY' :
        case 'YYYYY' :
            datePartArray[0] = ~~input;
            break;
        // AM / PM
        case 'a' : // fall through to A
        case 'A' :
            config._isPm = ((input + '').toLowerCase() === 'pm');
            break;
        // 24 HOUR
        case 'H' : // fall through to hh
        case 'HH' : // fall through to hh
        case 'h' : // fall through to hh
        case 'hh' :
            datePartArray[3] = ~~input;
            break;
        // MINUTE
        case 'm' : // fall through to mm
        case 'mm' :
            datePartArray[4] = ~~input;
            break;
        // SECOND
        case 's' : // fall through to ss
        case 'ss' :
            datePartArray[5] = ~~input;
            break;
        // MILLISECOND
        case 'S' :
        case 'SS' :
        case 'SSS' :
            datePartArray[6] = ~~ (('0.' + input) * 1000);
            break;
        // UNIX TIMESTAMP WITH MS
        case 'X':
            config._d = new Date(parseFloat(input) * 1000);
            break;
        // TIMEZONE
        case 'Z' : // fall through to ZZ
        case 'ZZ' :
            config._useUTC = true;
            a = (input + '').match(parseTimezoneChunker);
            if (a && a[1]) {
                config._tzh = ~~a[1];
            }
            if (a && a[2]) {
                config._tzm = ~~a[2];
            }
            // reverse offsets
            if (a && a[0] === '+') {
                config._tzh = -config._tzh;
                config._tzm = -config._tzm;
            }
            break;
        }

        // if the input is null, the date is not valid
        if (input == null) {
            config._isValid = false;
        }
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function dateFromArray(config) {
        var i, date, input = [];

        if (config._d) {
            return;
        }

        for (i = 0; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // add the offsets to the time to be parsed so that we can have a clean array for checking isValid
        input[3] += config._tzh || 0;
        input[4] += config._tzm || 0;

        date = new Date(0);

        if (config._useUTC) {
            date.setUTCFullYear(input[0], input[1], input[2]);
            date.setUTCHours(input[3], input[4], input[5], input[6]);
        } else {
            date.setFullYear(input[0], input[1], input[2]);
            date.setHours(input[3], input[4], input[5], input[6]);
        }

        config._d = date;
    }

    // date from string and format string
    function makeDateFromStringAndFormat(config) {
        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var tokens = config._f.match(formattingTokens),
            string = config._i,
            i, parsedInput;

        config._a = [];

        for (i = 0; i < tokens.length; i++) {
            parsedInput = (getParseRegexForToken(tokens[i]).exec(string) || [])[0];
            if (parsedInput) {
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
            }
            // don't parse if its not a known token
            if (formatTokenFunctions[tokens[i]]) {
                addTimeToArrayFromToken(tokens[i], parsedInput, config);
            }
        }
        // handle am pm
        if (config._isPm && config._a[3] < 12) {
            config._a[3] += 12;
        }
        // if is 12 am, change hours to 0
        if (config._isPm === false && config._a[3] === 12) {
            config._a[3] = 0;
        }
        // return
        dateFromArray(config);
    }

    // date from string and array of format strings
    function makeDateFromStringAndArray(config) {
        var tempConfig,
            tempMoment,
            bestMoment,

            scoreToBeat = 99,
            i,
            currentDate,
            currentScore;

        while (config._f.length) {
            tempConfig = extend({}, config);
            tempConfig._f = config._f.pop();
            makeDateFromStringAndFormat(tempConfig);
            tempMoment = new Moment(tempConfig);

            if (tempMoment.isValid()) {
                bestMoment = tempMoment;
                break;
            }

            currentScore = compareArrays(tempConfig._a, tempMoment.toArray());

            if (currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempMoment;
            }
        }

        extend(config, bestMoment);
    }

    // date from iso format
    function makeDateFromString(config) {
        var i,
            string = config._i;
        if (isoRegex.exec(string)) {
            config._f = 'YYYY-MM-DDT';
            for (i = 0; i < 4; i++) {
                if (isoTimes[i][1].exec(string)) {
                    config._f += isoTimes[i][0];
                    break;
                }
            }
            if (parseTokenTimezone.exec(string)) {
                config._f += " Z";
            }
            makeDateFromStringAndFormat(config);
        } else {
            config._d = new Date(string);
        }
    }

    function makeDateFromInput(config) {
        var input = config._i,
            matched = aspNetJsonRegex.exec(input);

        if (input === undefined) {
            config._d = new Date();
        } else if (matched) {
            config._d = new Date(+matched[1]);
        } else if (typeof input === 'string') {
            makeDateFromString(config);
        } else if (isArray(input)) {
            config._a = input.slice(0);
            dateFromArray(config);
        } else {
            config._d = input instanceof Date ? new Date(+input) : new Date(input);
        }
    }


    /************************************
        Relative Time
    ************************************/


    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, lang) {
        return lang.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime(milliseconds, withoutSuffix, lang) {
        var seconds = round(Math.abs(milliseconds) / 1000),
            minutes = round(seconds / 60),
            hours = round(minutes / 60),
            days = round(hours / 24),
            years = round(days / 365),
            args = seconds < 45 && ['s', seconds] ||
                minutes === 1 && ['m'] ||
                minutes < 45 && ['mm', minutes] ||
                hours === 1 && ['h'] ||
                hours < 22 && ['hh', hours] ||
                days === 1 && ['d'] ||
                days <= 25 && ['dd', days] ||
                days <= 45 && ['M'] ||
                days < 345 && ['MM', round(days / 30)] ||
                years === 1 && ['y'] || ['yy', years];
        args[2] = withoutSuffix;
        args[3] = milliseconds > 0;
        args[4] = lang;
        return substituteTimeAgo.apply({}, args);
    }


    /************************************
        Week of Year
    ************************************/


    // firstDayOfWeek       0 = sun, 6 = sat
    //                      the day of the week that starts the week
    //                      (usually sunday or monday)
    // firstDayOfWeekOfYear 0 = sun, 6 = sat
    //                      the first week is the week that contains the first
    //                      of this day of the week
    //                      (eg. ISO weeks use thursday (4))
    function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
        var end = firstDayOfWeekOfYear - firstDayOfWeek,
            daysToDayOfWeek = firstDayOfWeekOfYear - mom.day();


        if (daysToDayOfWeek > end) {
            daysToDayOfWeek -= 7;
        }

        if (daysToDayOfWeek < end - 7) {
            daysToDayOfWeek += 7;
        }

        return Math.ceil(moment(mom).add('d', daysToDayOfWeek).dayOfYear() / 7);
    }


    /************************************
        Top Level Functions
    ************************************/

    function makeMoment(config) {
        var input = config._i,
            format = config._f;

        if (input === null || input === '') {
            return null;
        }

        if (typeof input === 'string') {
            config._i = input = getLangDefinition().preparse(input);
        }

        if (moment.isMoment(input)) {
            config = extend({}, input);
            config._d = new Date(+input._d);
        } else if (format) {
            if (isArray(format)) {
                makeDateFromStringAndArray(config);
            } else {
                makeDateFromStringAndFormat(config);
            }
        } else {
            makeDateFromInput(config);
        }

        return new Moment(config);
    }

    moment = function (input, format, lang) {
        return makeMoment({
            _i : input,
            _f : format,
            _l : lang,
            _isUTC : false
        });
    };

    // creating with utc
    moment.utc = function (input, format, lang) {
        return makeMoment({
            _useUTC : true,
            _isUTC : true,
            _l : lang,
            _i : input,
            _f : format
        });
    };

    // creating with unix timestamp (in seconds)
    moment.unix = function (input) {
        return moment(input * 1000);
    };

    // duration
    moment.duration = function (input, key) {
        var isDuration = moment.isDuration(input),
            isNumber = (typeof input === 'number'),
            duration = (isDuration ? input._data : (isNumber ? {} : input)),
            ret;

        if (isNumber) {
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        }

        ret = new Duration(duration);

        if (isDuration && input.hasOwnProperty('_lang')) {
            ret._lang = input._lang;
        }

        return ret;
    };

    // version number
    moment.version = VERSION;

    // default format
    moment.defaultFormat = isoFormat;

    // This function will load languages and then set the global language.  If
    // no arguments are passed in, it will simply return the current global
    // language key.
    moment.lang = function (key, values) {
        var i;

        if (!key) {
            return moment.fn._lang._abbr;
        }
        if (values) {
            loadLang(key, values);
        } else if (!languages[key]) {
            getLangDefinition(key);
        }
        moment.duration.fn._lang = moment.fn._lang = getLangDefinition(key);
    };

    // returns language data
    moment.langData = function (key) {
        if (key && key._lang && key._lang._abbr) {
            key = key._lang._abbr;
        }
        return getLangDefinition(key);
    };

    // compare moment object
    moment.isMoment = function (obj) {
        return obj instanceof Moment;
    };

    // for typechecking Duration objects
    moment.isDuration = function (obj) {
        return obj instanceof Duration;
    };


    /************************************
        Moment Prototype
    ************************************/


    moment.fn = Moment.prototype = {

        clone : function () {
            return moment(this);
        },

        valueOf : function () {
            return +this._d;
        },

        unix : function () {
            return Math.floor(+this._d / 1000);
        },

        toString : function () {
            return this.format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
        },

        toDate : function () {
            return this._d;
        },

        toJSON : function () {
            return moment.utc(this).format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
        },

        toArray : function () {
            var m = this;
            return [
                m.year(),
                m.month(),
                m.date(),
                m.hours(),
                m.minutes(),
                m.seconds(),
                m.milliseconds()
            ];
        },

        isValid : function () {
            if (this._isValid == null) {
                if (this._a) {
                    this._isValid = !compareArrays(this._a, (this._isUTC ? moment.utc(this._a) : moment(this._a)).toArray());
                } else {
                    this._isValid = !isNaN(this._d.getTime());
                }
            }
            return !!this._isValid;
        },

        utc : function () {
            this._isUTC = true;
            return this;
        },

        local : function () {
            this._isUTC = false;
            return this;
        },

        format : function (inputString) {
            var output = formatMoment(this, inputString || moment.defaultFormat);
            return this.lang().postformat(output);
        },

        add : function (input, val) {
            var dur;
            // switch args to support add('s', 1) and add(1, 's')
            if (typeof input === 'string') {
                dur = moment.duration(+val, input);
            } else {
                dur = moment.duration(input, val);
            }
            addOrSubtractDurationFromMoment(this, dur, 1);
            return this;
        },

        subtract : function (input, val) {
            var dur;
            // switch args to support subtract('s', 1) and subtract(1, 's')
            if (typeof input === 'string') {
                dur = moment.duration(+val, input);
            } else {
                dur = moment.duration(input, val);
            }
            addOrSubtractDurationFromMoment(this, dur, -1);
            return this;
        },

        diff : function (input, units, asFloat) {
            var that = this._isUTC ? moment(input).utc() : moment(input).local(),
                zoneDiff = (this.zone() - that.zone()) * 6e4,
                diff, output;

            if (units) {
                // standardize on singular form
                units = units.replace(/s$/, '');
            }

            if (units === 'year' || units === 'month') {
                diff = (this.daysInMonth() + that.daysInMonth()) * 432e5; // 24 * 60 * 60 * 1000 / 2
                output = ((this.year() - that.year()) * 12) + (this.month() - that.month());
                output += ((this - moment(this).startOf('month')) - (that - moment(that).startOf('month'))) / diff;
                if (units === 'year') {
                    output = output / 12;
                }
            } else {
                diff = (this - that) - zoneDiff;
                output = units === 'second' ? diff / 1e3 : // 1000
                    units === 'minute' ? diff / 6e4 : // 1000 * 60
                    units === 'hour' ? diff / 36e5 : // 1000 * 60 * 60
                    units === 'day' ? diff / 864e5 : // 1000 * 60 * 60 * 24
                    units === 'week' ? diff / 6048e5 : // 1000 * 60 * 60 * 24 * 7
                    diff;
            }
            return asFloat ? output : absRound(output);
        },

        from : function (time, withoutSuffix) {
            return moment.duration(this.diff(time)).lang(this.lang()._abbr).humanize(!withoutSuffix);
        },

        fromNow : function (withoutSuffix) {
            return this.from(moment(), withoutSuffix);
        },

        calendar : function () {
            var diff = this.diff(moment().startOf('day'), 'days', true),
                format = diff < -6 ? 'sameElse' :
                diff < -1 ? 'lastWeek' :
                diff < 0 ? 'lastDay' :
                diff < 1 ? 'sameDay' :
                diff < 2 ? 'nextDay' :
                diff < 7 ? 'nextWeek' : 'sameElse';
            return this.format(this.lang().calendar(format, this));
        },

        isLeapYear : function () {
            var year = this.year();
            return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
        },

        isDST : function () {
            return (this.zone() < moment([this.year()]).zone() ||
                this.zone() < moment([this.year(), 5]).zone());
        },

        day : function (input) {
            var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            return input == null ? day :
                this.add({ d : input - day });
        },

        startOf: function (units) {
            units = units.replace(/s$/, '');
            // the following switch intentionally omits break keywords
            // to utilize falling through the cases.
            switch (units) {
            case 'year':
                this.month(0);
                /* falls through */
            case 'month':
                this.date(1);
                /* falls through */
            case 'week':
            case 'day':
                this.hours(0);
                /* falls through */
            case 'hour':
                this.minutes(0);
                /* falls through */
            case 'minute':
                this.seconds(0);
                /* falls through */
            case 'second':
                this.milliseconds(0);
                /* falls through */
            }

            // weeks are a special case
            if (units === 'week') {
                this.day(0);
            }

            return this;
        },

        endOf: function (units) {
            return this.startOf(units).add(units.replace(/s?$/, 's'), 1).subtract('ms', 1);
        },

        isAfter: function (input, units) {
            units = typeof units !== 'undefined' ? units : 'millisecond';
            return +this.clone().startOf(units) > +moment(input).startOf(units);
        },

        isBefore: function (input, units) {
            units = typeof units !== 'undefined' ? units : 'millisecond';
            return +this.clone().startOf(units) < +moment(input).startOf(units);
        },

        isSame: function (input, units) {
            units = typeof units !== 'undefined' ? units : 'millisecond';
            return +this.clone().startOf(units) === +moment(input).startOf(units);
        },

        zone : function () {
            return this._isUTC ? 0 : this._d.getTimezoneOffset();
        },

        daysInMonth : function () {
            return moment.utc([this.year(), this.month() + 1, 0]).date();
        },

        dayOfYear : function (input) {
            var dayOfYear = round((moment(this).startOf('day') - moment(this).startOf('year')) / 864e5) + 1;
            return input == null ? dayOfYear : this.add("d", (input - dayOfYear));
        },

        isoWeek : function (input) {
            var week = weekOfYear(this, 1, 4);
            return input == null ? week : this.add("d", (input - week) * 7);
        },

        week : function (input) {
            var week = this.lang().week(this);
            return input == null ? week : this.add("d", (input - week) * 7);
        },

        // If passed a language key, it will set the language for this
        // instance.  Otherwise, it will return the language configuration
        // variables for this instance.
        lang : function (key) {
            if (key === undefined) {
                return this._lang;
            } else {
                this._lang = getLangDefinition(key);
                return this;
            }
        }
    };

    // helper for adding shortcuts
    function makeGetterAndSetter(name, key) {
        moment.fn[name] = moment.fn[name + 's'] = function (input) {
            var utc = this._isUTC ? 'UTC' : '';
            if (input != null) {
                this._d['set' + utc + key](input);
                return this;
            } else {
                return this._d['get' + utc + key]();
            }
        };
    }

    // loop through and add shortcuts (Month, Date, Hours, Minutes, Seconds, Milliseconds)
    for (i = 0; i < proxyGettersAndSetters.length; i ++) {
        makeGetterAndSetter(proxyGettersAndSetters[i].toLowerCase().replace(/s$/, ''), proxyGettersAndSetters[i]);
    }

    // add shortcut for year (uses different syntax than the getter/setter 'year' == 'FullYear')
    makeGetterAndSetter('year', 'FullYear');

    // add plural methods
    moment.fn.days = moment.fn.day;
    moment.fn.weeks = moment.fn.week;
    moment.fn.isoWeeks = moment.fn.isoWeek;

    /************************************
        Duration Prototype
    ************************************/


    moment.duration.fn = Duration.prototype = {
        weeks : function () {
            return absRound(this.days() / 7);
        },

        valueOf : function () {
            return this._milliseconds +
              this._days * 864e5 +
              this._months * 2592e6;
        },

        humanize : function (withSuffix) {
            var difference = +this,
                output = relativeTime(difference, !withSuffix, this.lang());

            if (withSuffix) {
                output = this.lang().pastFuture(difference, output);
            }

            return this.lang().postformat(output);
        },

        lang : moment.fn.lang
    };

    function makeDurationGetter(name) {
        moment.duration.fn[name] = function () {
            return this._data[name];
        };
    }

    function makeDurationAsGetter(name, factor) {
        moment.duration.fn['as' + name] = function () {
            return +this / factor;
        };
    }

    for (i in unitMillisecondFactors) {
        if (unitMillisecondFactors.hasOwnProperty(i)) {
            makeDurationAsGetter(i, unitMillisecondFactors[i]);
            makeDurationGetter(i.toLowerCase());
        }
    }

    makeDurationAsGetter('Weeks', 6048e5);


    /************************************
        Default Lang
    ************************************/


    // Set default language, other languages will inherit from English.
    moment.lang('en', {
        ordinal : function (number) {
            var b = number % 10,
                output = (~~ (number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });


    /************************************
        Exposing Moment
    ************************************/


    // CommonJS module is defined
    if (hasModule) {
        module.exports = moment;
    }
    /*global ender:false */
    if (typeof ender === 'undefined') {
        // here, `this` means `window` in the browser, or `global` on the server
        // add `moment` as a global object via a string identifier,
        // for Closure Compiler "advanced" mode
        this['moment'] = moment;
    }
    /*global define:false */
    if (typeof define === "function" && define.amd) {
        define("moment", [], function () {
            return moment;
        });
    }
}).call(this);

/** @jsx React.DOM */
define('controls/KendoDatetime',[
    'underscore', 'jquery', 'react', 'kendo', 'moment',
    '../util/debug',
    '../ControlCommon'
], function (_, $, React, kendo, moment, debug, ControlCommon) {
    'use strict';


    var KendoDateTime = React.createClass({displayName: 'KendoDateTime',

        fieldClass: 'formFieldDatetimepicker',

        getDefaultProps: function () {
            return {
                value: undefined,
                onChange: function () {},
                id: undefined,
                disabled: false,
                isValid: [true, ''],
                readonly: false,
                noControl: false
            };
        },

        /*jshint ignore:start */
        render: function () {
            return (this.props.noControl
                ? (React.DOM.span(null, this.props.value ? moment(this.props.value).format('MMMM Do YYYY, h:mm:ss a') : ''))
                : (React.DOM.input( {id:this.props.id, type:"text"} )));
        },
        /*jshint ignore:end */

        componentDidMount: function (rootNode) {
            debug.verify(!!rootNode);

            if (this.props.noControl) {
                // Everything was done in JSX.
                return;
            }

            var $el = $(rootNode);
            debug.verify($el);

            $el.kendoDateTimePicker({
                change: this.onChange
            });

            ControlCommon.setKendoDateState(
                $el.data('kendoDateTimePicker'),
                this.props.value, this.props.disabled, this.props.readonly,
                this.props.max, this.props.min);
        },

        componentDidUpdate: function (prevProps, prevState, rootNode) {
            debug.verify(!!rootNode);

            if (this.props.noControl) {
                // Everything was done in JSX.
                return;
            }

            var $el = $(rootNode);
            debug.verify($el);

            ControlCommon.setKendoDateState(
                $el.data('kendoDateTimePicker'),
                this.props.value, this.props.disabled, this.props.readonly,
                this.props.max, this.props.min);
        },

        onChange: function (event) {
            var kendoWidget = event.sender;
            var val = kendoWidget.value();
            this.props.onChange(val);
        }
    });

    return KendoDateTime;
});

/** @jsx React.DOM */
define('controls/KendoDate',[
    'underscore', 'jquery', 'react', 'kendo', 'moment',
    '../util/debug',
    '../ControlCommon'
], function (_, $, React, kendo, moment, debug, ControlCommon) {
    'use strict';


    var KendoDate = React.createClass({displayName: 'KendoDate',

        fieldClass: 'formFieldDatepicker',

        getDefaultProps: function () {
            return {
                value: undefined,
                id: undefined,
                onChange: function () {},
                disabled: false,
                isValid: [true, ''],
                readonly: false,
                noControl: false
            };
        },

        /*jshint ignore:start */
        render: function () {
            return (this.props.noControl
                ? (React.DOM.span(null, this.props.value ? moment(this.props.value).format('DD-MMM-YYYY') : ''))
                : (React.DOM.input( {id:this.props.id, type:"text"} )));
        },
        /*jshint ignore:end */

        componentDidMount: function (rootNode) {
            debug.verify(!!rootNode);

            if (this.props.noControl) {
                // Everything was done in JSX.
                return;
            }

            var $el = $(rootNode);
            debug.verify($el);

            $el.kendoDatePicker({
                change: this.onChange,
                format: 'dd-MMM-yyyy'
            });

            ControlCommon.setKendoDateState(
                $el.data('kendoDatePicker'),
                this.props.value, this.props.disabled, this.props.readonly,
                this.props.max, this.props.min);
        },

        componentDidUpdate: function (prevProps, prevState, rootNode) {
            debug.verify(!!rootNode);

            if (this.props.noControl) {
                // Everything was done in JSX.
                return;
            }

            var $el = $(rootNode);
            debug.verify($el);

            ControlCommon.setKendoDateState(
                $el.data('kendoDatePicker'),
                this.props.value, this.props.disabled, this.props.readonly,
                this.props.max, this.props.min);
        },

        onChange: function (event) {
            var kendoWidget = event.sender;
            var val = kendoWidget.value();
            this.props.onChange(val);
        }
    });

    return KendoDate;
});

define('ImmutableOptimizations',[
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

/** @jsx React.DOM */
define('controls/KendoComboBox',[
    'underscore', 'jquery', 'react', 'kendo',
    '../util/debug',
    '../ControlCommon',
    '../ImmutableOptimizations'
], function (_, $, React, kendo, debug, ControlCommon, ImmutableOptimizations) {
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
        }
    }

    var KendoComboBox = React.createClass({displayName: 'KendoComboBox',
        mixins: [ImmutableOptimizations],

        fieldClass: 'formFieldCombobox',

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
            debug.verify(this.props.displayField);
            debug.verify(this.props.valueField);

            if (!this.props.noControl) {
                debug.verify(this.props.dataSource);
            }
        },

        /*jshint ignore:start */
        render: function () {
            return (this.props.noControl
                ? (React.DOM.span( {id:this.props.id}, getDisplayValue(this.props.value, this.props.displayField)))
                : (React.DOM.select( {id:this.props.id})));
        },
        /*jshint ignore:end */

        componentDidMount: function (rootNode) {
            var $el = $(rootNode),
                props = this.props;

            if (props.noControl) {
                this.setNoControlValue($el);
            }
            else {
                if (props.width) {
                    $el.width(props.width);
                }
                $el.kendoComboBox({
                    autoBind: false,
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
            debug.verify(_.isEqual(_.pick(nextProps, cantChange), _.pick(this.props, cantChange)), 'these props cant change after mount');
        },

        componentDidUpdate: function (prevProps, prevState, rootNode) {
            debug.verify(!!rootNode);
            var $el = $(rootNode)

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
            if (_.isString(this.props.value) || _.isNumber(this.props.value)) {
                this.props.onChange((model ? model.get(this.props.valueField) : model));
            } else {
                // Do not return the internal kendo model objects, since they're an implementation detail of the combo/store.
                this.props.onChange((model instanceof kendo.data.Model) ? model.toJSON() : model);
            }
        },

        setNoControlValue: function ($el) {
            // If the value is just an ID, we need to fetch data from the server to get the display value.
            if (!_.isObject(this.props.value)) {
                // However, if the ID is the display value, we can use it as is.
                if (this.props.valueField === this.props.displayField) {
                    $el.text(this.props.value);
                    return;
                }
                var self = this;
                this.props.dataSource.fetch().then(function () {
                    $el.text(getDisplayValue(self.props.dataSource.get(self.props.value), self.props.displayField));
                }).done();
            }
        }
    });

    void getDisplayValue;
    void KendoComboBox;

    return KendoComboBox;
});

/** @jsx React.DOM */
define('controls/UserPicker',[
    'underscore', 'jquery', 'react', 'kendo',
    '../util/debug',
    '../ControlCommon'
], function (_, $, React, kendo, debug, controlCommon) {
    'use strict';

    void controlCommon;

    var QUERY_PARAM = 'nameOrEmail';
    var LIST_CLASS = 'userPicker';
    var TEMPLATE = '<div class="user"><p class="fullName">#: fullName #</p><p class="emailAddress">#: emailAddress #</p></div>';

    var UserPicker = React.createClass({displayName: 'UserPicker',

        fieldClass: 'formFieldAutocomplete',

        getDefaultProps: function () {
            return {
                value: undefined,
                onChange: function () {},
                id: undefined,
                placeholder: 'Select User...', // l10n requires thought, no strings down here
                disabled: false,
                isValid: [true, ''],
                readonly: false,
                noControl: false
            };
        },

        componentWillMount: function () {
            debug.verify(this.props.dataSource);
        },

        componentDidMount: function (rootNode) {
            var $el = $(rootNode);
            debug.verify($el);

            var onChange = this.props.onChange,
                header = $('<h2></h2>'),
                autoComplete;

            $el.kendoAutoComplete({
                dataSource: this.props.dataSource,
                dataTextField: QUERY_PARAM,
                placeholder: this.props.placeholder,
                highlightFirst: true,
                suggest: false,
                template: TEMPLATE,
                close: function (e) {
                    var widget = e.sender;
                    // Don't close the picker on an empty search result because we want to tell the user about it.
                    if (widget._typing && widget.dataSource.total() === 0) {
                        e.preventDefault();
                    }
                },
                dataBound: function (e) {
                    var widget = e.sender,
                        dataSource = widget.dataSource;

                    if (dataSource.total() === 0) {
                        header.text('No matches');
                        widget.popup.open();
                    }
                    else {
                        header.text(kendo.format('All Users ({0:n0} matches)', dataSource.total()));
                    }
                },
                change: function (e) {
                    var widget = e.sender;

                    if (widget.dataSource.total() === 1) {
                        // Exact match - so raise the change event
                        onChange(widget.dataItem(0));
                    }
                },
                select: function (e) {
                    onChange(this.dataItem(e.item.index()));
                }
            }).on('blur', this.onBlur);

            autoComplete = $el.data('kendoAutoComplete');
            // Add a special class to the popup element so we can style the list items
            autoComplete.list.addClass(LIST_CLASS);

            if (this.props.value) {
                autoComplete.value(this.props.value.fullName);
            }
            if (this.props.disabled) {
                autoComplete.enable(false);
            }
            else if (this.props.readonly) {
                autoComplete.readonly(true);
            }
            // Add an element to contain some text above the list of users
            header.prependTo(autoComplete.list);
        },

        componentWillUnmount: function () {
            var $el = $(this.getDOMNode());

            $el.data('kendoAutoComplete').destroy();
        },

        componentDidUpdate: function (prevProps, prevState, rootNode) {
            var $el = $(rootNode),
                autoComplete = $el.data('kendoAutoComplete');

            autoComplete.value(this.props.value ? this.props.value.fullName : null);

            if (this.props.disabled) {
                autoComplete.enable(false);
            }
            else {
                autoComplete.readonly(this.props.readonly);
            }
        },

        onBlur: function (e) {
            var autoComplete = $(e.target).data('kendoAutoComplete');

            // Always reset the text back to the current value, in case they typed stuff that didn't match anything
            autoComplete.value(this.props.value ? this.props.value.fullName : null);
        },

        /*jshint ignore:start */
        render: function () {
            debug.verify(!this.props.noControl);
            return (React.DOM.input( {type:"text", id:this.props.id, className:"k-textbox"}));
        }
        /*jshint ignore:end */
    });

    return UserPicker;

});

define('AutoControl',[
    'underscore', 'react',
    './util/debug',
    './controls/KendoText',
    './controls/MultilineText',
    './controls/SwitchBox',
    './controls/KendoNumber',
    './controls/KendoDatetime',
    './controls/KendoDate',
    './controls/KendoComboBox',
    './controls/UserPicker',
    './ImmutableOptimizations'
], function (_, React, debug, KendoText, MultilineText, SwitchBox, KendoNumber, KendoDatetime, KendoDate, KendoComboBox,
             UserPicker, ImmutableOptimizations) {
    'use strict';

    var TYPE_TO_CONTROL = {
        'text' : KendoText,
        'text:multiLine' : MultilineText,
        'number' : KendoNumber,
        'date' : KendoDate,
        'datetime' : KendoDatetime,
        'boolean' : SwitchBox
    };
    var CONTROL_PROPS = ['id', 'value', 'onChange', 'isValid', 'disabled', 'noControl'];

    function controlForField(fieldInfo) {
        var dataType = fieldInfo.dataType;

        if (fieldInfo.options) {
            if (dataType === 'User') {
                return UserPicker;
            }
            else {
                return KendoComboBox;
            }
        }
        if (fieldInfo.multiLine) {
            dataType = dataType + ':multiLine';
        }

        return TYPE_TO_CONTROL[dataType];
    }

    var AutoControl = React.createClass({
        mixins: [ImmutableOptimizations],

        getDefaultProps: function () {
            return {
                value: undefined,
                onChange: undefined,
                id: undefined,
                fieldInfo: undefined,
                isValid: [true, ''],
                disabled: false,
                readonly: false,
                noControl: false
            };
        },

        render: function () {
            var fieldInfo = this.props.fieldInfo;
            var Control = controlForField(fieldInfo);
            var controlProps = _.pick(this.props, CONTROL_PROPS);

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
                controlProps.dataSource = fieldInfo.options.dataSource;
                controlProps.valueField = fieldInfo.options.metadata.idProperty;
                controlProps.displayField = fieldInfo.options.metadata.nameProperty;
            }

            return Control(controlProps);
        }
    });

    /**
     * Static method needed by FormField to determine the underlying field class for the generated control.
     *
     * @param fieldInfo
     * @returns {*}
     */
    AutoControl.fieldClassForField = function (fieldInfo) {
        return ((controlForField(fieldInfo) || {}).originalSpec || {}).fieldClass;
    };

    return AutoControl;
});

/*
    fieldInfo looks like this:

{
    "name": "tmfItemId",
    "label": "ID",
    "dataType": "text",
    "placeholder": "100.02",
    "helpText": "Unique identifier for the List Item (####.##)",
    "array": false,
    "readonly": false,
    "required": true,
    "multiLine": false,
    "options": null,
    "maxLength": 32,
    "minLength": 32,
    "pattern": "^[a-zA-Z0-9]{1,5}\\.[a-zA-Z0-9]{1,3}$",
    "maxValue": null,
    "minValue": null,
    "decimals": 0,
    "stepValue": 1.0
}
*/
;
/** @jsx React.DOM */
define('FormField',[
    'underscore', 'react',
    './util/debug',
    './AutoControl',
    './ControlCommon'
], function (_, React, debug, AutoControl, ControlCommon) {
    'use strict';

    function determineFieldClass(children) {
        if (_.isArray(children)) {
            children = children[0];
        }

        if (children && _.isUndefined(children.fieldClass)) {
            // Support a textnode child, which won't have a fieldinfo
            if (children.props && children.props.fieldInfo) {
                return AutoControl.fieldClassForField(children.props.fieldInfo);
            }
            //console.warn('Unknown fieldClass for child component', children);

            return 'formFieldInput';
        }

        return children && children.fieldClass;
    }

    var FormField = React.createClass({displayName: 'FormField',

        getDefaultProps: function () {
            return {
                fieldInfo: {},
                layout: 'formField',
                noControl: false,
                isValid: [true, ''],
                lockable: false,
                onStickyChange: function (isLocked) { /* set or clear a sticky */},
                width: '100%',
                marginLeft: '0'
            };
        },

        getInitialState: function () {
            return {
                locked: false
            };
        },

        /* jshint ignore:start */
        render: function () {
            var fieldInfo = _.defaults(this.props.fieldInfo, {
                readOnly: false,
                disabled: false,
                label: '',
                helpText: ''
            });

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

            var lockedClasses = _.compact(['fieldLock', this.state.locked ? 'fieldLockOn' : null]);
            var lockDiv = this.props.lockable ? (React.DOM.div( {className:lockedClasses.join(' '), onClick:this.toggleLock} )) : null;

            var styles = {
               'width': this.props.width,
               'margin-left': this.props.marginLeft
            };

            var statusIcon = (hasInfoTooltip ? (React.DOM.span( {className:"statusIcon"} )) : null);

            // If there is no label and no icon, we must render &nbsp; so the fields line up right.


            var label = ((fieldInfo.label || '').length === 0 && statusIcon === null
                ? (React.DOM.label( {className:"formLabel"}, '\u00A0')) // unicode &nbsp; to work around JSX bug:  https://groups.google.com/forum/?fromgroups=#!topic/reactjs/7FmlIyJBofA
                : (React.DOM.label( {className:"formLabel"}, fieldInfo.label,statusIcon)));

            return (
                React.DOM.div( {className:classes.join(' '), 'data-tooltip':fieldInfo.helpText, 'data-error-tooltip':this.props.isValid[1], style:styles}, 
                    label,
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

        toggleLock: function () {
            var isLocked = !this.state.locked;
            this.props.onStickyChange(isLocked);
            this.setState({ locked: isLocked });
        }
    });

    return FormField;
});

//  Underscore.string
//  (c) 2010 Esa-Matti Suuronen <esa-matti aet suuronen dot org>
//  Underscore.string is freely distributable under the terms of the MIT license.
//  Documentation: https://github.com/epeli/underscore.string
//  Some code is borrowed from MooTools and Alexandru Marasteanu.
//  Version '2.3.2'

!function(root, String){
  'use strict';

  // Defining helper functions.

  var nativeTrim = String.prototype.trim;
  var nativeTrimRight = String.prototype.trimRight;
  var nativeTrimLeft = String.prototype.trimLeft;

  var parseNumber = function(source) { return source * 1 || 0; };

  var strRepeat = function(str, qty){
    if (qty < 1) return '';
    var result = '';
    while (qty > 0) {
      if (qty & 1) result += str;
      qty >>= 1, str += str;
    }
    return result;
  };

  var slice = [].slice;

  var defaultToWhiteSpace = function(characters) {
    if (characters == null)
      return '\\s';
    else if (characters.source)
      return characters.source;
    else
      return '[' + _s.escapeRegExp(characters) + ']';
  };

  // Helper for toBoolean
  function boolMatch(s, matchers) {
    var i, matcher, down = s.toLowerCase();
    matchers = [].concat(matchers);
    for (i = 0; i < matchers.length; i += 1) {
      matcher = matchers[i];
      if (!matcher) continue;
      if (matcher.test && matcher.test(s)) return true;
      if (matcher.toLowerCase() === down) return true;
    }
  }

  var escapeChars = {
    lt: '<',
    gt: '>',
    quot: '"',
    amp: '&',
    apos: "'"
  };

  var reversedEscapeChars = {};
  for(var key in escapeChars) reversedEscapeChars[escapeChars[key]] = key;
  reversedEscapeChars["'"] = '#39';

  // sprintf() for JavaScript 0.7-beta1
  // http://www.diveintojavascript.com/projects/javascript-sprintf
  //
  // Copyright (c) Alexandru Marasteanu <alexaholic [at) gmail (dot] com>
  // All rights reserved.

  var sprintf = (function() {
    function get_type(variable) {
      return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
    }

    var str_repeat = strRepeat;

    var str_format = function() {
      if (!str_format.cache.hasOwnProperty(arguments[0])) {
        str_format.cache[arguments[0]] = str_format.parse(arguments[0]);
      }
      return str_format.format.call(null, str_format.cache[arguments[0]], arguments);
    };

    str_format.format = function(parse_tree, argv) {
      var cursor = 1, tree_length = parse_tree.length, node_type = '', arg, output = [], i, k, match, pad, pad_character, pad_length;
      for (i = 0; i < tree_length; i++) {
        node_type = get_type(parse_tree[i]);
        if (node_type === 'string') {
          output.push(parse_tree[i]);
        }
        else if (node_type === 'array') {
          match = parse_tree[i]; // convenience purposes only
          if (match[2]) { // keyword argument
            arg = argv[cursor];
            for (k = 0; k < match[2].length; k++) {
              if (!arg.hasOwnProperty(match[2][k])) {
                throw new Error(sprintf('[_.sprintf] property "%s" does not exist', match[2][k]));
              }
              arg = arg[match[2][k]];
            }
          } else if (match[1]) { // positional argument (explicit)
            arg = argv[match[1]];
          }
          else { // positional argument (implicit)
            arg = argv[cursor++];
          }

          if (/[^s]/.test(match[8]) && (get_type(arg) != 'number')) {
            throw new Error(sprintf('[_.sprintf] expecting number but found %s', get_type(arg)));
          }
          switch (match[8]) {
            case 'b': arg = arg.toString(2); break;
            case 'c': arg = String.fromCharCode(arg); break;
            case 'd': arg = parseInt(arg, 10); break;
            case 'e': arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential(); break;
            case 'f': arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg); break;
            case 'o': arg = arg.toString(8); break;
            case 's': arg = ((arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg); break;
            case 'u': arg = Math.abs(arg); break;
            case 'x': arg = arg.toString(16); break;
            case 'X': arg = arg.toString(16).toUpperCase(); break;
          }
          arg = (/[def]/.test(match[8]) && match[3] && arg >= 0 ? '+'+ arg : arg);
          pad_character = match[4] ? match[4] == '0' ? '0' : match[4].charAt(1) : ' ';
          pad_length = match[6] - String(arg).length;
          pad = match[6] ? str_repeat(pad_character, pad_length) : '';
          output.push(match[5] ? arg + pad : pad + arg);
        }
      }
      return output.join('');
    };

    str_format.cache = {};

    str_format.parse = function(fmt) {
      var _fmt = fmt, match = [], parse_tree = [], arg_names = 0;
      while (_fmt) {
        if ((match = /^[^\x25]+/.exec(_fmt)) !== null) {
          parse_tree.push(match[0]);
        }
        else if ((match = /^\x25{2}/.exec(_fmt)) !== null) {
          parse_tree.push('%');
        }
        else if ((match = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(_fmt)) !== null) {
          if (match[2]) {
            arg_names |= 1;
            var field_list = [], replacement_field = match[2], field_match = [];
            if ((field_match = /^([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
              field_list.push(field_match[1]);
              while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
                if ((field_match = /^\.([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
                  field_list.push(field_match[1]);
                }
                else if ((field_match = /^\[(\d+)\]/.exec(replacement_field)) !== null) {
                  field_list.push(field_match[1]);
                }
                else {
                  throw new Error('[_.sprintf] huh?');
                }
              }
            }
            else {
              throw new Error('[_.sprintf] huh?');
            }
            match[2] = field_list;
          }
          else {
            arg_names |= 2;
          }
          if (arg_names === 3) {
            throw new Error('[_.sprintf] mixing positional and named placeholders is not (yet) supported');
          }
          parse_tree.push(match);
        }
        else {
          throw new Error('[_.sprintf] huh?');
        }
        _fmt = _fmt.substring(match[0].length);
      }
      return parse_tree;
    };

    return str_format;
  })();



  // Defining underscore.string

  var _s = {

    VERSION: '2.3.0',

    isBlank: function(str){
      if (str == null) str = '';
      return (/^\s*$/).test(str);
    },

    stripTags: function(str){
      if (str == null) return '';
      return String(str).replace(/<\/?[^>]+>/g, '');
    },

    capitalize : function(str){
      str = str == null ? '' : String(str);
      return str.charAt(0).toUpperCase() + str.slice(1);
    },

    chop: function(str, step){
      if (str == null) return [];
      str = String(str);
      step = ~~step;
      return step > 0 ? str.match(new RegExp('.{1,' + step + '}', 'g')) : [str];
    },

    clean: function(str){
      return _s.strip(str).replace(/\s+/g, ' ');
    },

    count: function(str, substr){
      if (str == null || substr == null) return 0;

      str = String(str);
      substr = String(substr);

      var count = 0,
        pos = 0,
        length = substr.length;

      while (true) {
        pos = str.indexOf(substr, pos);
        if (pos === -1) break;
        count++;
        pos += length;
      }

      return count;
    },

    chars: function(str) {
      if (str == null) return [];
      return String(str).split('');
    },

    swapCase: function(str) {
      if (str == null) return '';
      return String(str).replace(/\S/g, function(c){
        return c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase();
      });
    },

    escapeHTML: function(str) {
      if (str == null) return '';
      return String(str).replace(/[&<>"']/g, function(m){ return '&' + reversedEscapeChars[m] + ';'; });
    },

    unescapeHTML: function(str) {
      if (str == null) return '';
      return String(str).replace(/\&([^;]+);/g, function(entity, entityCode){
        var match;

        if (entityCode in escapeChars) {
          return escapeChars[entityCode];
        } else if (match = entityCode.match(/^#x([\da-fA-F]+)$/)) {
          return String.fromCharCode(parseInt(match[1], 16));
        } else if (match = entityCode.match(/^#(\d+)$/)) {
          return String.fromCharCode(~~match[1]);
        } else {
          return entity;
        }
      });
    },

    escapeRegExp: function(str){
      if (str == null) return '';
      return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
    },

    splice: function(str, i, howmany, substr){
      var arr = _s.chars(str);
      arr.splice(~~i, ~~howmany, substr);
      return arr.join('');
    },

    insert: function(str, i, substr){
      return _s.splice(str, i, 0, substr);
    },

    include: function(str, needle){
      if (needle === '') return true;
      if (str == null) return false;
      return String(str).indexOf(needle) !== -1;
    },

    join: function() {
      var args = slice.call(arguments),
        separator = args.shift();

      if (separator == null) separator = '';

      return args.join(separator);
    },

    lines: function(str) {
      if (str == null) return [];
      return String(str).split("\n");
    },

    reverse: function(str){
      return _s.chars(str).reverse().join('');
    },

    startsWith: function(str, starts){
      if (starts === '') return true;
      if (str == null || starts == null) return false;
      str = String(str); starts = String(starts);
      return str.length >= starts.length && str.slice(0, starts.length) === starts;
    },

    endsWith: function(str, ends){
      if (ends === '') return true;
      if (str == null || ends == null) return false;
      str = String(str); ends = String(ends);
      return str.length >= ends.length && str.slice(str.length - ends.length) === ends;
    },

    succ: function(str){
      if (str == null) return '';
      str = String(str);
      return str.slice(0, -1) + String.fromCharCode(str.charCodeAt(str.length-1) + 1);
    },

    titleize: function(str){
      if (str == null) return '';
      str  = String(str).toLowerCase();
      return str.replace(/(?:^|\s|-)\S/g, function(c){ return c.toUpperCase(); });
    },

    camelize: function(str){
      return _s.trim(str).replace(/[-_\s]+(.)?/g, function(match, c){ return c ? c.toUpperCase() : ""; });
    },

    underscored: function(str){
      return _s.trim(str).replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase();
    },

    dasherize: function(str){
      return _s.trim(str).replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase();
    },

    classify: function(str){
      return _s.titleize(String(str).replace(/[\W_]/g, ' ')).replace(/\s/g, '');
    },

    humanize: function(str){
      return _s.capitalize(_s.underscored(str).replace(/_id$/,'').replace(/_/g, ' '));
    },

    trim: function(str, characters){
      if (str == null) return '';
      if (!characters && nativeTrim) return nativeTrim.call(str);
      characters = defaultToWhiteSpace(characters);
      return String(str).replace(new RegExp('\^' + characters + '+|' + characters + '+$', 'g'), '');
    },

    ltrim: function(str, characters){
      if (str == null) return '';
      if (!characters && nativeTrimLeft) return nativeTrimLeft.call(str);
      characters = defaultToWhiteSpace(characters);
      return String(str).replace(new RegExp('^' + characters + '+'), '');
    },

    rtrim: function(str, characters){
      if (str == null) return '';
      if (!characters && nativeTrimRight) return nativeTrimRight.call(str);
      characters = defaultToWhiteSpace(characters);
      return String(str).replace(new RegExp(characters + '+$'), '');
    },

    truncate: function(str, length, truncateStr){
      if (str == null) return '';
      str = String(str); truncateStr = truncateStr || '...';
      length = ~~length;
      return str.length > length ? str.slice(0, length) + truncateStr : str;
    },

    /**
     * _s.prune: a more elegant version of truncate
     * prune extra chars, never leaving a half-chopped word.
     * @author github.com/rwz
     */
    prune: function(str, length, pruneStr){
      if (str == null) return '';

      str = String(str); length = ~~length;
      pruneStr = pruneStr != null ? String(pruneStr) : '...';

      if (str.length <= length) return str;

      var tmpl = function(c){ return c.toUpperCase() !== c.toLowerCase() ? 'A' : ' '; },
        template = str.slice(0, length+1).replace(/.(?=\W*\w*$)/g, tmpl); // 'Hello, world' -> 'HellAA AAAAA'

      if (template.slice(template.length-2).match(/\w\w/))
        template = template.replace(/\s*\S+$/, '');
      else
        template = _s.rtrim(template.slice(0, template.length-1));

      return (template+pruneStr).length > str.length ? str : str.slice(0, template.length)+pruneStr;
    },

    words: function(str, delimiter) {
      if (_s.isBlank(str)) return [];
      return _s.trim(str, delimiter).split(delimiter || /\s+/);
    },

    pad: function(str, length, padStr, type) {
      str = str == null ? '' : String(str);
      length = ~~length;

      var padlen  = 0;

      if (!padStr)
        padStr = ' ';
      else if (padStr.length > 1)
        padStr = padStr.charAt(0);

      switch(type) {
        case 'right':
          padlen = length - str.length;
          return str + strRepeat(padStr, padlen);
        case 'both':
          padlen = length - str.length;
          return strRepeat(padStr, Math.ceil(padlen/2)) + str
                  + strRepeat(padStr, Math.floor(padlen/2));
        default: // 'left'
          padlen = length - str.length;
          return strRepeat(padStr, padlen) + str;
        }
    },

    lpad: function(str, length, padStr) {
      return _s.pad(str, length, padStr);
    },

    rpad: function(str, length, padStr) {
      return _s.pad(str, length, padStr, 'right');
    },

    lrpad: function(str, length, padStr) {
      return _s.pad(str, length, padStr, 'both');
    },

    sprintf: sprintf,

    vsprintf: function(fmt, argv){
      argv.unshift(fmt);
      return sprintf.apply(null, argv);
    },

    toNumber: function(str, decimals) {
      if (!str) return 0;
      str = _s.trim(str);
      if (!str.match(/^-?\d+(?:\.\d+)?$/)) return NaN;
      return parseNumber(parseNumber(str).toFixed(~~decimals));
    },

    numberFormat : function(number, dec, dsep, tsep) {
      if (isNaN(number) || number == null) return '';

      number = number.toFixed(~~dec);
      tsep = typeof tsep == 'string' ? tsep : ',';

      var parts = number.split('.'), fnums = parts[0],
        decimals = parts[1] ? (dsep || '.') + parts[1] : '';

      return fnums.replace(/(\d)(?=(?:\d{3})+$)/g, '$1' + tsep) + decimals;
    },

    strRight: function(str, sep){
      if (str == null) return '';
      str = String(str); sep = sep != null ? String(sep) : sep;
      var pos = !sep ? -1 : str.indexOf(sep);
      return ~pos ? str.slice(pos+sep.length, str.length) : str;
    },

    strRightBack: function(str, sep){
      if (str == null) return '';
      str = String(str); sep = sep != null ? String(sep) : sep;
      var pos = !sep ? -1 : str.lastIndexOf(sep);
      return ~pos ? str.slice(pos+sep.length, str.length) : str;
    },

    strLeft: function(str, sep){
      if (str == null) return '';
      str = String(str); sep = sep != null ? String(sep) : sep;
      var pos = !sep ? -1 : str.indexOf(sep);
      return ~pos ? str.slice(0, pos) : str;
    },

    strLeftBack: function(str, sep){
      if (str == null) return '';
      str += ''; sep = sep != null ? ''+sep : sep;
      var pos = str.lastIndexOf(sep);
      return ~pos ? str.slice(0, pos) : str;
    },

    toSentence: function(array, separator, lastSeparator, serial) {
      separator = separator || ', ';
      lastSeparator = lastSeparator || ' and ';
      var a = array.slice(), lastMember = a.pop();

      if (array.length > 2 && serial) lastSeparator = _s.rtrim(separator) + lastSeparator;

      return a.length ? a.join(separator) + lastSeparator + lastMember : lastMember;
    },

    toSentenceSerial: function() {
      var args = slice.call(arguments);
      args[3] = true;
      return _s.toSentence.apply(_s, args);
    },

    slugify: function(str) {
      if (str == null) return '';

      var from  = "ąàáäâãåæăćęèéëêìíïîłńòóöôõøśșțùúüûñçżź",
          to    = "aaaaaaaaaceeeeeiiiilnoooooosstuuuunczz",
          regex = new RegExp(defaultToWhiteSpace(from), 'g');

      str = String(str).toLowerCase().replace(regex, function(c){
        var index = from.indexOf(c);
        return to.charAt(index) || '-';
      });

      return _s.dasherize(str.replace(/[^\w\s-]/g, ''));
    },

    surround: function(str, wrapper) {
      return [wrapper, str, wrapper].join('');
    },

    quote: function(str, quoteChar) {
      return _s.surround(str, quoteChar || '"');
    },

    unquote: function(str, quoteChar) {
      quoteChar = quoteChar || '"';
      if (str[0] === quoteChar && str[str.length-1] === quoteChar)
        return str.slice(1,str.length-1);
      else return str;
    },

    exports: function() {
      var result = {};

      for (var prop in this) {
        if (!this.hasOwnProperty(prop) || prop.match(/^(?:include|contains|reverse)$/)) continue;
        result[prop] = this[prop];
      }

      return result;
    },

    repeat: function(str, qty, separator){
      if (str == null) return '';

      qty = ~~qty;

      // using faster implementation if separator is not needed;
      if (separator == null) return strRepeat(String(str), qty);

      // this one is about 300x slower in Google Chrome
      for (var repeat = []; qty > 0; repeat[--qty] = str) {}
      return repeat.join(separator);
    },

    naturalCmp: function(str1, str2){
      if (str1 == str2) return 0;
      if (!str1) return -1;
      if (!str2) return 1;

      var cmpRegex = /(\.\d+)|(\d+)|(\D+)/g,
        tokens1 = String(str1).toLowerCase().match(cmpRegex),
        tokens2 = String(str2).toLowerCase().match(cmpRegex),
        count = Math.min(tokens1.length, tokens2.length);

      for(var i = 0; i < count; i++) {
        var a = tokens1[i], b = tokens2[i];

        if (a !== b){
          var num1 = parseInt(a, 10);
          if (!isNaN(num1)){
            var num2 = parseInt(b, 10);
            if (!isNaN(num2) && num1 - num2)
              return num1 - num2;
          }
          return a < b ? -1 : 1;
        }
      }

      if (tokens1.length === tokens2.length)
        return tokens1.length - tokens2.length;

      return str1 < str2 ? -1 : 1;
    },

    levenshtein: function(str1, str2) {
      if (str1 == null && str2 == null) return 0;
      if (str1 == null) return String(str2).length;
      if (str2 == null) return String(str1).length;

      str1 = String(str1); str2 = String(str2);

      var current = [], prev, value;

      for (var i = 0; i <= str2.length; i++)
        for (var j = 0; j <= str1.length; j++) {
          if (i && j)
            if (str1.charAt(j - 1) === str2.charAt(i - 1))
              value = prev;
            else
              value = Math.min(current[j], current[j - 1], prev) + 1;
          else
            value = i + j;

          prev = current[j];
          current[j] = value;
        }

      return current.pop();
    },

    toBoolean: function(str, trueValues, falseValues) {
      if (typeof str === "number") str = "" + str;
      if (typeof str !== "string") return !!str;
      str = _s.trim(str);
      if (boolMatch(str, trueValues || ["true", "1"])) return true;
      if (boolMatch(str, falseValues || ["false", "0"])) return false;
    }
  };

  // Aliases

  _s.strip    = _s.trim;
  _s.lstrip   = _s.ltrim;
  _s.rstrip   = _s.rtrim;
  _s.center   = _s.lrpad;
  _s.rjust    = _s.lpad;
  _s.ljust    = _s.rpad;
  _s.contains = _s.include;
  _s.q        = _s.quote;
  _s.toBool   = _s.toBoolean;

  // Exporting

  // CommonJS module is defined
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports)
      module.exports = _s;

    exports._s = _s;
  }

  // Register as a named module with AMD.
  if (typeof define === 'function' && define.amd)
    define('underscore.string', [], function(){ return _s; });


  // Integrate with Underscore.js if defined
  // or create our own underscore object.
  root._ = root._ || {};
  root._.string = root._.str = _s;
}(this, String);

define("underscore-string", (function (global) {
    return function () {
        var ret, fn;
        return ret || global._s;
    };
}(this)));

/** @jsx React.DOM */
define('controls/Carousel',[
    'underscore', 'react', 'jquery',
    '../util/debug',
    'underscore-string'
], function (_, React, $, debug) {
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

        fieldClass: 'formFieldCarousel',

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
                debug.verify(_.contains([undefined, null], this.props.value));
            }

            return (
                React.DOM.div( {className:"carousel"}, 
                    React.DOM.button( {className:"carouselButton backButton", onClick:_.partial(this.onChange, 'left')}, React.DOM.i( {className:"icon iconPrev"})),
                    React.DOM.input( {className:"carouselInput", placeholder:this.props.placeholder, value:this.displayTextFn(i, N), readOnly:true, id:this.props.id} ),
                    React.DOM.button( {className:"carouselButton forwardButton", onClick:_.partial(this.onChange, 'right')}, React.DOM.i( {className:"icon iconNext"})),
                    React.DOM.button( {className:"carouselButton editButton", disabled:this.props.disabled, onClick:this.props.onEdit}, "Edit Indices",React.DOM.i( {className:"icon iconCaret"}))
                )
                );
        },

        onChange: function (direction, event) {
            var i = this.props.value;
            var N = this.props.options.length;

            debug.verify(_.contains(['left', 'right'], direction))
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
                    : _.str.sprintf('%s of %s', i+1, N));
            }
        }

    });

    return Carousel;
});
/** @jsx React.DOM */
define('controls/CheckBox',[
    'underscore', 'jquery', 'react'
], function (_, $, React) {
    'use strict';

    var SPACE_KEY = 32;

    return React.createClass({

        fieldClass: 'formFieldCheckbox',

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

        /*jshint ignore:start */
        render: function () {
            var elemId = this.props.id + 'CheckBox';

            if (this.props.noControl) {
                return (React.DOM.span(null, this.getDisplayValue()));
            }

            return (
                React.DOM.span( {tabIndex:"0"}, 
                    React.DOM.input( {type:"checkbox", id:elemId,
                        checked:this.props.value, 'data-checked':this.props.value ? '' : null,
                        onChange:this.onChange,
                        disabled:this.props.disabled || this.props.readonly} ),
                    React.DOM.label( {htmlFor:elemId}, this.props.label)
                )
            );
        },
        /*jshint ignore:end */

        componentDidMount: function (rootNode) {
            var self = this;

            $(rootNode).on('keypress', function (e) {
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
define('controls/KendoGrid',[
    'underscore', 'jquery', 'react', '../util/debug', 'kendo'
], function (_, $, React, debug, kendo) {
    'use strict';

    var KendoGrid = React.createClass({displayName: 'KendoGrid',
        getDefaultProps: function () {
            return {
                className: '',
                height: 150
            };
        },

        render: function () {
            debug.verify(this.props.dataSource);
            debug.verify(this.props.columns);
            return (React.DOM.div( {className:this.props.className} ));
        },

        componentDidMount: function (rootNode) {
            var $rootNode = $(rootNode);
            void kendo;
            $rootNode.kendoGrid({
                dataSource: this.props.dataSource,
                height: this.props.height,
                columns: this.props.columns
            });
        },

        componentDidUpdate: function (prevProps, prevState, rootNode) {
            debug.verify(!!rootNode);
            var $el = $(rootNode);
            var kendoWidget = $el.data('kendoGrid');

            if (this.props.dataSource instanceof Array) {
                // This better be a datasource that was originally built from inline data.
                // I don't know how to detect this to verify it.
                kendoWidget.dataSource.data(this.props.dataSource);
            }
            else if (prevProps.dataSource !== this.props.dataSource) {
                kendoWidget.setDataSource(this.props.dataSource);
            }
        }
    });

    return KendoGrid;
});
define('util/util',[
    'underscore', 'jquery', 'moment',
    './debug'
], function (_, $, moment, debug) {
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
            return moment(value).format('DD-MMM-YYYY h:mm:ss A');
        }
        // todo need to be able to handle date only fields here
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

/** @jsx React.DOM */
define('controls/KendoGridPicker',[
    'underscore',
    'jquery',
    'react',
    'kendo',
    '../util/debug',
    '../util/util'
], function (_, $, React, kendo, debug, util) {
    'use strict';

    var KendoGridPicker = React.createClass({displayName: 'KendoGridPicker',
        $el: null,

        getDefaultProps: function () {
            return {
                autoBind: true,
                editable: false,
                pageable: false,
                multiSelect: true, // was false
                height: 250,
                onChange: function () {},
                value: []  // list of selected records, just like combo.
            };
        },

        componentWillMount: function () {
            debug.verify(this.props.dataSource);
            debug.verify(this.props.columns);
            debug.verify(this.props.multiSelect === true); // temporary simplification
            debug.verify(_.isArray(this.props.value));
        },

        componentWillReceiveProps: function (nextProps) {
            var cantChange = ['dataSource', 'editable', 'pageable'];
            debug.verify(_.isEqual(_.pick(nextProps, cantChange), _.pick(this.props, cantChange)), 'these props cant change after mount');
        },

        /*jshint ignore:start */
        render: function () {
            return (React.DOM.div( {className:this.props.className} ));
        },
        /*jshint ignore:end */

        componentDidMount: function (rootNode) {
            debug.verify(!!rootNode);
            this.$el = $(rootNode);

            var columns = [{ title: '', template: kendo.template(KendoGridPickerTemplate), width: 34 }];
            columns = columns.concat(this.props.columns);

            this.$el.kendoGrid({
                dataSource: this.props.dataSource,
                height: this.props.height,
                columns: columns,
                sortable: this.props.sortable,
                editable: this.props.editable,
                pageable: this.props.pageable,
                autoBind: this.props.autoBind,
                dataBound: this.applySelectionStateToDom
            }).data('kendoGrid');

            if (!this.props.autoBind) {
                this.$el.data('kendoGrid').refresh();
            }

            this.$el.on('click', 'tr', this.onRowClick);

        },

        componentWillUnmount: function () {
            this.$el.data('kendoGrid').destroy();
            this.$el = null;
        },

        componentDidUpdate: function (prevProps, prevState, rootNode) {
            debug.verify(rootNode);
            this.$el = $(rootNode);

            this.applySelectionStateToDom();
        },

        applySelectionStateToDom: function () {
            // the SSP page has changed, so we have new DOM.
            // Sync up the DOM with the checked state.
            var grid = this.$el.data('kendoGrid');
            var valueIDs = _.pluck(this.props.value, 'id');

            // Update the checked state of checkbox inputs
            this.$el.find('input[type="checkbox"]').val(valueIDs);

            this.$el.find('tr').each(function (i, elem) {
                var record = grid.dataItem(elem);

                if (record) {
                    $(elem).toggleClass('k-state-selected', _.contains(valueIDs, record.id));
                }
            });
        },

        onRowClick: function (e) {
            // Prevent "shadow" clicks on the label from changing state;
            // The real clicks happen on the input itself, another event targeted on the input will be arriving shortly
            if ('LABEL' === e.target.nodeName || 'A' === e.target.nodeName) {
                return;
            }

            // Get the record associated with this click event
            var $target = $(e.target);
            var $row = $target.closest('tr');

            var model = this.$el.data('kendoGrid').dataItem($row);
            var record = _.extend(model.toJSON(), { id: model.id });

            // Determine the current selection state of this record
            var wasSelected = util.containsDeep(this.props.value, record);

            //if this event was on the checkbox, revert that dom state change until it goes through the flux loop
            if ('INPUT' === e.target.nodeName) {
                e.target.checked = wasSelected;
            }

            // Toggle the state
            var isSelected = !wasSelected;

            // Invoke our event handler with the new selection state for our control.  This will circle back
            // and re-render us with the new selections
            var nextSelections = (isSelected ? util.unionDeep : util.differenceDeep)(this.props.value, [record]);
            this.props.onChange(nextSelections);
        }
    });


    var KendoGridPickerTemplate = '\
        <div class="checkboxWrap">\
            <input id="#: uid #" type="checkbox" value="#: id #" name="checkboxSelector">\
                <label for="#: uid #"></label>\
            </div>';



    return KendoGridPicker;

});

/** @jsx React.DOM */
define('controls/KendoGridPickerByButton',[
    'underscore',
    'jquery',
    'kendo',
    'react',
    '../util/debug',
    '../util/util'
], function (_, $, kendo, React, debug, util) {
    'use strict';

    var $el = null;

    var KendoGridPickerByButton = React.createClass({displayName: 'KendoGridPickerByButton',
        getDefaultProps: function() {
            return {
                autoBind: true,
                editable: false,
                pageable: false,
                height: 250,
                onClick: function () {},
                value: []
            };
        },

        componentWillMount: function () {
            debug.verify(this.props.dataSource);
            debug.verify(this.props.columns);
            debug.verify(this.props.valueField);
            debug.verify(_.isArray(this.props.value));
        },

        componentWillReceiveProps: function (nextProps) {
            var cantChange = ['dataSource', 'editable', 'pageable'];
            debug.verify(_.isEqual(_.pick(nextProps, cantChange), _.pick(this.props, cantChange)), 'these props cant change after mount');
        },

        render: function () {
            return (React.DOM.div( {className:this.props.className} ));
        },

        componentDidMount: function (rootNode) {
            debug.verify(!!rootNode);
            $el = $(rootNode);

            this.kendoGrid = $el.kendoGrid({
                dataSource: this.props.dataSource,
                height: this.props.height,
                columns: this.props.columns,
                sortable: this.props.sortable,
                editable: this.props.editable,
                pageable: this.props.pageable,
                autoBind: this.props.autoBind
            }).data("kendoGrid");

            $el.on('click', 'tr', this.onRowClick);
        },

        componentWillUnmount: function () {
            $el = null;
        },

        onRowClick: function (e) {
            // Get the record associated with this click event
            var $target = $(e.target);
            var $row = $target.closest('tr');
            var record = this.kendoGrid.dataItem($row);

            this.props.onClick(record.id);
        }
    });

    return KendoGridPickerByButton;
});

/** @jsx React.DOM */
define('controls/KendoGridRadioSelectable',[
    'underscore', 'jquery', 'react', '../util/debug'
], function (_, $, React, debug) {
    'use strict';

    var KendoGridRadioSelectable = React.createClass({displayName: 'KendoGridRadioSelectable',

        $el:{},

        getDefaultProps: function() {
            return {
                disabled: false,
                editable: false,
                pageable: false,
                multiSelect: false,
                height: 250,
                onChange: function () {}
            };
        },

        getInitialState: function () {
            return {
                value: this.getStateVal(this.props.value)
            };
        },

        render: function () {
            debug.verify(this.props.dataSource);
            debug.verify(this.props.columns);
            debug.verify(this.props.valueField);

            return ( React.DOM.div(null ) );
        },

        componentDidMount: function (rootNode) {
            debug.verify(!!rootNode);
            this.$el = $(rootNode);

            var checkboxColumnTemplate = '<div class="checkboxWrap"><input id="#: ' + this.props.valueField + ' #" type="%s" name="checkboxSelector"/><label for="#: ' + this.props.valueField + ' #"></div>';
            checkboxColumnTemplate = this.getInputTypeString(checkboxColumnTemplate);

            var columns = [{ title: '', template: checkboxColumnTemplate, width: 34 }];
            columns.push.apply(columns, this.props.columns);

            this.$el.kendoGrid({
                dataSource: this.props.dataSource,
                height: this.props.height,
                columns: columns,
                sortable: this.props.sortable,
                editable: this.props.editable,
                pageable: this.props.pageable
            });

            // see Dustin
            this.props.dataSource.bind && this.props.dataSource.bind("change", this.onDataStoreChange);
        },

        componentWillUnmount: function () {
            // see Dustin
            this.props.dataSource.unbind && this.props.dataSource.unbind("change", this.onDataStoreChange);
        },

        onDataStoreChange: function () {
            var self = this;
            _.each(this.state.value, function (item) {
                // select and highlight the selected item in the grid
                var selector = $(_.str.sprintf("input[id='%s']", item[self.props.valueField]) , self.$el);
                selector.attr("checked", true);
                selector.closest('tr').toggleClass('k-state-selected', selector.is(':checked'));
            })

            $(this.getInputTypeString("input[type='%s']"), this.$el).on("change", this.gridSelection);
        },

        componentWillReceiveProps: function (nextProps) {
            var cantChange = ['dataSource', 'editable', 'pageable'];
            debug.verify(_.isEqual(_.pick(nextProps, cantChange), _.pick(this.props, cantChange)), 'these props cant change after mount');
        },

        gridSelection: function (e) {
            var vals = [];
            var self = this;

            $(this.$el).find(this.getInputTypeString('input[type="%s"]')).each(function () {
                $(this).closest('tr').toggleClass('k-state-selected', $(this).is(':checked'));

                if($(this).is(':checked')) {
                    vals.push(self.props.dataSource.get($(this).attr('id')));
                }
            });

            $(e.currentTarget).closest('tr').toggleClass('k-state-selected', $(e.currentTarget).is(':checked'));

            this.setState({value: vals});
            this.props.onChange(this.props.multiSelect ? vals : _.first(vals) );
        },

        getInputTypeString : function (string) {
            return _.str.sprintf(string, this.props.multiSelect ? 'checkbox' : 'radio')
        },

        getStateVal: function (val) {
            return _.isArray(val) ? val : (!!val ? [val] : [] );
        }
    });

    return KendoGridRadioSelectable;

});

define('util/kendoutil',[
    'underscore', 'jquery', 'kendo', '../util/util'
], function (_, $, kendo, util) {
    'use strict';
    var my = {};

    /**
     * Register a custom kendo MVVM binder for formatting numbers.
     * @type {*}
     */
    kendo.data.binders.numeric = kendo.data.Binder.extend({
        refresh: function () {
            var num = this.bindings['numeric'].get();

            $(this.element).text(kendo.toString(num, 'n0'));    // format as N,NNN
        }
    });
    kendo.data.binders.dateText = kendo.data.Binder.extend({
        refresh: function () {
            var date = this.bindings['dateText'].get();

            $(this.element).text(kendo.toString(date, 'dd-MMM-yyyy'));
        }
    });
    /*
     * This is needed for the implementation of the foreach binding.
     * @type {Function|fn|.duration.fn|jQuery.fn|fn|kendoJQuery.fn|Point2D.fn|Box2D.fn}
     */
    var SourceBinderClass = kendo.data.binders.source.fn;
    /**
     * This binding allows a foreach: binding that uses the interior HTML as the template.
     * @type {*}
     */
    kendo.data.binders.foreach = kendo.data.binders.source.extend({
        init: function (target, binding, options) {
            // Set the template using the contained markup
            var templateHtml = $(target).html();
            options.template = kendo.template(_.str.trim(templateHtml));

            SourceBinderClass.init.call(this, target, binding, options);
        },
        refresh: function (e) {
            // alias the binding data
            this.bindings.source = this.bindings.foreach;

            SourceBinderClass.refresh.call(this, e);
        }
    });

    /**
     * This came from a forum posting here:
     * http://www.kendoui.com/forums/kendo-ui-web/grid/dynamic-grid-height.aspx
     */
    function resizeKendoGrids() {
        var $grids = $(document.body).find('.k-grid.k-widget');

        $.each($grids, function () {
            var gridElement = $(this);
            var grid = gridElement.data('kendoGrid');

            // Depending on how the view template works, the widget might be on a child element
            if (!grid) {
                grid = gridElement.find('[data-role="grid"]').data('kendoGrid');
            }
            // Call the kendo private method that sets the grid content height based on toolbar,header,footer settings.
            // This is more robust than trying to figure out how they do it for different kinds of grids. (AHG)
            if (grid) {
                grid._setContentHeight();
            }
        });
    }

    // Register a single resize handler that will manage all the grids on the page.
    // This central registration will prevent memory leaks for handlers to views that appear/disappear.
    $(window).resize(resizeKendoGrids);

    my.resizeKendoGrids = resizeKendoGrids;



    my.templateWith = function templateWith(template, f) {
        return function (record) {
            return template(f(record));
        };
    };

    my.templateForEnum = function templateForEnum(field) {
        return kendo.template('#: ' + field + '.name #');
    };

    my.templateForUser = function templateForUser(field) {
        return kendo.template('#: ' + field + '.fullName #');
    };

    /**
     * Adds routines to the kendo model for interacting with the object's type info
     * @param baseModelConfig - existing model config that is to be added to
     * @param typeInfo - typeInfo to be used
     * @param localeManager - component's localeManager
     * @param rawModelFieldOpt - optional name of the field in the record that will
     * contain the raw data for the record (straight from the server) that maps to
     * the typeInfo. By default it is assumed that the root of the record is the object
     * described by the type info
     * @returns {*}  - Updated model config
     */
    my.typeInfoModel = function (baseModelConfig, typeInfo, localeManager, rawModelFieldOpt) {
        var rawModelPrefix = '';
        if (null !== rawModelFieldOpt && undefined !== rawModelFieldOpt && rawModelFieldOpt.length > 0) {
            rawModelPrefix = rawModelFieldOpt + '.';
        }

        var theTypeInfo = typeInfo;
        var theLocaleManager = localeManager;

        function subTypeInfo(fieldName) {
            return theTypeInfo.types[theTypeInfo.properties[fieldName].dataType];
        }

        var modelConfig = {
            nls: function (/* args passed through to locale manager */) {
                return theLocaleManager.localize.apply(theLocaleManager, arguments);
            },
            /**
             * get the type info associated with this object
             */
            typeInfo: function () {
                return theTypeInfo;
            },
            /**
             * get the field info for a specified fields.
             * NOTE: Supports one level of "." notation to get into the group values
             * e.g pendingDocuments.pendingDocumentTaskName
             */
            fieldInfo: function (fieldName) {
                var fieldsSplit = fieldName.split('.');
                if (fieldsSplit.length === 1) {
                    return theTypeInfo.properties[fieldName];
                } else {
                    return subTypeInfo(fieldsSplit[0]).properties[fieldsSplit[1]];
                }
            },
            /**
             * returns the raw value for a field
             */
            value: function (fieldName) {
                var rawFieldName = rawModelPrefix + fieldName;
                return this.get(rawFieldName);
            },
            /**
             * returns the display value for a field
             * @param fieldName name of the field to format
             * @param valueToFormatOpt optional value of the format, useful when dealing with sub fields
             * could use a better solution for this
             * @returns {*}
             */
            display: function (fieldName, valueToFormatOpt) {
                var value;
                if (undefined === valueToFormatOpt) {
                    value = this.value(fieldName);
                } else {
                    value = valueToFormatOpt;
                }
                return util.typedObjectValueToDisplayValue2(value, fieldName, this.fieldInfo(fieldName), theLocaleManager);
            },
            /**
             * returns the display value for a field
             * @param fieldName name of the field to format
             * could use a better solution for this
             * @returns {*}
             */
            displayDateOnly: function (fieldName) {
                return theLocaleManager.formatDate(new Date(Date.parse(this.value(fieldName))));
            },
            /**
             * returns the display value for a field
             * This is for when you want to specify the type info independently of the value or when it's necessary, as in the case of complex structures.
             * @param fieldName name of the field to format
             * @param typePath the path to the type info descriptor.
             * @returns {*}
             */
            displayEx: function (fieldName, typePath) {
                var value = this.value(fieldName);
                return util.typedObjectValueToDisplayValue2(value, fieldName, this.fieldInfo(typePath), theLocaleManager);
            },
            /**
             * Returns the label for a field
             * @param fieldName name of the field (support one level of '.')
             * @param excludeFieldEndingOpt
             * @returns label for the field optionally ending in the field separator/':'
             */
            label: function (fieldName, excludeFieldEndingOpt) {
                return this.labelize(this.fieldDisplayName(fieldName), excludeFieldEndingOpt);
            },
            /**
             * Translates fieldName to display name
             * @param fieldName
             * @returns {String}
             */
            fieldDisplayName: function (fieldName) {
                var label = this.fieldInfo(fieldName).label;
                if (undefined  === label) {
                    label = fieldName;
                }
                return label;
            },
            labelize: function (label, excludeFieldEndingOpt) {
                if (excludeFieldEndingOpt !== true) {
                    label = label + this.nls('labelSuffix');
                }
                return label;
            },
            /**
             * Takes a list of field names, converts them to their display names, intercalates separators.
             * @param fieldNames
             * @param excludeFieldEndingOpt
             * @returns {*}
             */
            labelizeCompound: function (fieldNames, excludeFieldEndingOpt) {
                function add(s, v) { return s + v; }
                var self = this;
                return this.labelize(_.reduce(util.intersperse(this.nls('countrySiteSeparator'), _.map(fieldNames, function (v) { return self.label(v, true); })), add, ''), excludeFieldEndingOpt);
            }
        };

        return $.extend(true, {}, baseModelConfig, modelConfig);
    };

    my.fixEditorOptions = function (kendoGrid, cell, model) {
        var column = kendoGrid.columns[kendoGrid.cellIndex(cell)];
        var field = model.fields[column.field];

        // If there's validation for a date field, need to update the date picker widget with validation options
        if (field.type === 'date' && field.validation) {
            cell.find('input').data('kendoDatePicker').setOptions(field.validation);
        }
    };

    /**
     * Disables row selection for clicks on elements with the given class name.
     *
     * @param grid
     * @param className
     */
    my.makeUnselectableInGrid = function (grid, className) {
        // De-reference a jQuery element containing the grid
        if (grid.jquery) {
            grid = grid.data('kendoGrid');
        }
        grid.selectable.userEvents.bind('select', function (e) {
            if ($(e.event.target).hasClass(className)) {
                // Tell the kendo UserEvents to cancel the "touch" (i.e. click)
                e.sender.cancel();
            }
        });
    };

    /**
     * Tweaks the kendo Selectable widget behavior so that clicks on rows toggle the selection, like a checkbox.
     *
     * @param grid
     */
    my.enableCheckboxSelection = function (grid) {
        grid.selectable.userEvents.notify = function (eventName, data) {
            // Make all "tap/click" events seem like they have the ctrlKey pressed, which gives a checkbox-style UX
            if (eventName === 'tap') {
                data.event.ctrlKey = true;
            }
            this.trigger(eventName, data);
        };
    };

    /**
     * Extend the grid widget API to allow setting the selection with a data object.
     *
     * @param item DataStore model (can be null)
     */
    kendo.ui.Grid.fn.selectDataItem = function (item) {
        if (item && item.uid) {
            this.select(this.table.find('tr[data-uid="' + item.uid + '"]'));
        }
    };

    /* Kendo doesn't expose the global default mouse movement threshold for detecting "clicks" for selection.
     * Use these gyrations to hook the two widgets that create Selectable stuff.
     */
    function setMouseMoveThresholdForSelectables(widget) {
        if (widget.selectable) {
            widget.selectable.userEvents.threshold = 9;     // Allow nine pixels of movement
        }
    }

    kendo.ui.Grid.fn._selectable = _.wrap(kendo.ui.Grid.fn._selectable, function (selectable) {
        selectable.call(this);
        setMouseMoveThresholdForSelectables(this);
    });
    kendo.ui.ListView.fn._selectable = _.wrap(kendo.ui.ListView.fn._selectable, function (selectable) {
        selectable.call(this);
        setMouseMoveThresholdForSelectables(this);
    });

    kendo.ui.Grid.fn.dataItem = _.wrap(kendo.ui.Grid.fn.dataItem, function (wrapped, tr) {
        if (_.isArray(this._data)) {
            return wrapped.call(this, tr);
        } else {
            return null;
        }
    });

    return my;
});

/** @jsx React.DOM */
define('controls/KendoListView',[
    'underscore', 'jquery', 'react', 'kendo',
    '../util/kendoutil',
    '../util/debug'
], function (_, $, React, kendo, kendoutil, debug) {
    'use strict';

    return React.createClass({
        displayName: 'KendoListView',

        getDefaultProps: function () {
            return {
                className: 'content',
                dataSource: undefined,
                selectable: true,
                selectedId: null,
                template: '<div>${id}</div>',
                paramMapper: _.identity,       // function to map the datastore record into template params
                // tells the list whether it can move to a new selection.
                canChange: function () {
                    return true;
                },
                // announces that the selection has changed.
                onChange: function () {}
            };
        },

        componentWillMount: function () {
            debug.verify(this.props.dataSource);
        },

        /* jshint ignore:start */
        render: function () {
            return (React.DOM.div( {className:this.props.className} ));
        },
        /* jshint ignore:end */

        syncSelectionWithKendo: function (rootEl) {
            var self = this;
            var listView = rootEl.data('kendoListView');

            var selectedChild = (self.props.selectedId
                ? _.find(listView.element.children(), function (child) { return self.props.selectedId === $(child).data('modelId'); })
                : null);

            // Verify that we found the child we were looking for, if any
            if (!!this.props.selectedId && !selectedChild) {
                // This happens when a user disposes an item out of a details page.  The Top-level details page controller
                // hangs onto state.record too long, so it attempts to make this selection after the data store is reloaded
                // and the item the action was performed on no longer exists.
                //
                // One way to fix this (I think) is to remove the data store event listener in DetailComponentCommon must be removed in favor
                // of attaching functions to the promise chains in the action handlers themselves.
                //
                // Another thought would be to set state.record to null when the actions are taken, though by itself this may cause other
                // problems
                console.warn('Could not find props.selectedId in KendoList view.  Check warning block for details.');
            }

            this.suppressEvents = true;
            if (selectedChild) {
                listView.select($(selectedChild));
            } else {
                listView.clearSelection();
//                listView.select(listView.element.children().first());
            }
            this.suppressEvents = false;
        },

        componentDidUpdate: function (prevProps, prevState, rootNode) {
            if (this.props.selectable) {
                this.syncSelectionWithKendo($(rootNode));
            }
        },

        componentDidMount: function (rootNode) {
            debug.verify(rootNode);
            var $el = $(rootNode);

            var listView = $el.kendoListView({
                autoBind: false,
                dataSource: this.props.dataSource,
                template: kendoutil.templateWith(kendo.template(this.props.template), this.props.paramMapper),
                selectable: this.props.selectable,
                change: this.onChange
            }).data('kendoListView');

            // We need to force the ListView to generate it's DOM children immediately in order
            // to support the scenario where a user clicks on an item in the List View and the
            // system wants to generate the details view AND select the item the user clicked on
            // at the same time
            listView.refresh();

            if (this.props.selectable) {
                // Initialize this member variable so it is always set.  We use it to prevent
                // our control from firing events as a result of us changing the Kendo state ourselves
                this.suppressEvents = false;

                this.syncSelectionWithKendo($el);
            }
        },

        onChange: function (e) {
            e.preventDefault();
            var listView = $(e.sender.element[0]).data('kendoListView');
            if (!this.suppressEvents) {
                if (this.props.canChange()) {
                    var nextSelectedId = listView.select().data('modelId');
                    if (this.props.selectedId !== nextSelectedId) {
                        this.props.onChange(nextSelectedId);
                    }
                } else {
                    this.syncSelectionWithKendo($(this.getDOMNode()));
                }
            }
        }
    });
});

/** @jsx React.DOM */
define('controls/KendoMultiSelect',[
    'underscore', 'jquery', 'react',
    '../util/debug',
    '../ControlCommon'
], function (_, $, React, debug, controlCommon) {
    'use strict';


    return React.createClass({

        getDefaultProps: function() {
            return {
                label: ' ', // will this render as nbsp? No, FIXME
                layout: 'formField',
                disabled: false,
                isValid: [true, ''],
                template: _.str.sprintf('${%s} - ${%s}', this.props.valueField, this.props.displayField),
                onChange: function () {},
                readonly: false,
                noControl: false,
                placeholder: '',
                width: null // use whatever the default is
            };
        },

        componentWillMount: function () {
            debug.verify(this.props.displayField);
            debug.verify(this.props.valueField);
            debug.verify(this.props.dataSource);

            this.stableUniqueId = _.uniqueId();
        },

        render: function () {

            var classes = _.compact([
                this.props.layout,
                'formFieldMultiselect',
                controlCommon.quadState(this.props.disabled, this.props.readonly, this.props.isValid, this.props.noControl)
            ]).join(' ');

            void classes;
            /*jshint ignore:start */
            var control = (this.props.noControl
                ? (React.DOM.span( {'data-wspt-id':"displayValue"}, this.props.value))
                : (React.DOM.select( {id:this.stableUniqueId})));

            return(
                React.DOM.div( {className:classes}, 
                    React.DOM.label( {className:"formLabel", htmlFor:this.stableUniqueId}, this.props.label),
                    React.DOM.div( {className:"formElement"}, 
                        control
                    )
                )
            );
            /*jshint ignore:end */
        },

        getDisplayValue: function () {
            // for displaying as a string in noControl mode
            var displayVals = _.map(this.props.value, function (val) {
                return val[this.props.displayField];
            });

            return _.str.join(displayVals, ', '); // l10n?
        },

        componentDidMount: function (rootNode) {
            debug.verify(!!rootNode);

            if (this.props.noControl) {
                // Nothing to do - all done in JSX.
                return;
            }

            var $el = $(rootNode).find('#' + this.stableUniqueId);
            debug.verify($el);

            if (this.props.width) {
                $el.width(340);
            }
            $el.kendoMultiSelect({
                filter: 'contains',
                highlightFirst: false,
                dataTextField: this.props.displayField,
                dataValueField: this.props.valueField,
                dataSource: this.props.dataSource,
                placeholder: this.props.placeholder,
                itemTemplate: this.props.template,
                change: this.onChange
            });

            var kendoWidget = $el.data('kendoMultiSelect');

            // the 'value' method is a getter/setter that gets/sets the valueField. It will look up the record
            // in the store via the value set here.
            kendoWidget.value((!_.isEmpty(this.props.value)) ? this.props.value[this.props.valueField] : '');

            if (this.props.disabled) {
                // disabled beats readonly
                kendoWidget.enable(false);
            } else if (this.props.readonly) {
                kendoWidget.readonly(true);
            } else {
                kendoWidget.enable(true);
            }
        },

        componentWillReceiveProps: function (nextProps) {
            var cantChange = ['template', 'dataSource', 'valueField', 'displayField', 'placeholder'];
            debug.verify(_.isEqual(_.pick(nextProps, cantChange), _.pick(this.props, cantChange)), 'these props cant change after mount');
        },

        componentDidUpdate: function (prevProps, prevState, rootNode) {
            debug.verify(!!rootNode);

            if (this.props.noControl) {
                // Nothing to do - all done in JSX.
                return;
            }

            var $el = $(rootNode).find('#' + this.stableUniqueId);
            var kendoWidget = $el.data('kendoMultiSelect');

            if (prevProps.dataSource !== this.props.dataSource) {
                kendoWidget.setDataSource(this.props.dataSource);
            }

            var vals = [];
            var self = this;
            _.each(this.props.value, function (item) {
                vals.push(item[self.props.valueField]);
            });

            kendoWidget.value(vals);

            if (this.props.disabled) {
                // disabled beats readonly
                kendoWidget.enable(false);
            } else if (this.props.readonly) {
                kendoWidget.readonly(true);
            } else {
                kendoWidget.enable(true);
            }
        },

        onChange: function (event) {
            var kendoMultiSelect = event.sender;
            var records = kendoMultiSelect.dataItems();
            this.props.onChange(records);
        }
    });

});

/** @jsx React.DOM */
define('ReactCommon',[
    'underscore', 'react', './util/debug'
], function (_, React, debug) {
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
    '../util/debug',
    '../ReactCommon'
], function (_, $, React, kendo, debug, ReactCommon) {
    'use strict';

    void ReactCommon;
    /**
     * Takes a "tabs" prop which is a map from title string to a JSX instance.
     * This component is not presently stateful so we don't get to control what is selected.
     */
    var KendoTabStrip = React.createClass({displayName: 'KendoTabStrip',

        componentWillMount: function () {
            debug.verify(_.isObject(this.props.tabs) && _.keys(this.props.tabs).length > 0);
        },

        componentWillUnmount: function () {
            this.tabStrip.unbind('select', this.onSelect);
        },

        componentDidMount: function (rootNode) {
            debug.verify(rootNode);
            var $el = $(rootNode);
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
    'underscore', 'jquery', 'react', '../util/util', '../ControlCommon'
], function (_, $, React, u, controlCommon) {
    'use strict';


    /**
     * Creates a multi-select control.
     * isFlat controls whether the selectors are interpreted as containing optgroups.
     * If isFlat is true selectors will be a two level array of arrays.  The top level will be pairs of (name, children). Children, the second level, will be pairs of (id, name).
     * If isFlat is false selectors will  simply be an array of (id, name).
     * Each level can also have an active property that will be assumed to be true if undefined.
     * Empty optgroups will be elided.
     */
    return React.createClass({

        fieldClass: 'formFieldMultiselect',

        getDefaultProps: function () {
            return {
                disabled: false,
                readonly: false,
                isValid: [true, ''],
                isFlat: true,
                selectors: [],
                selections: [], // this is the value prop that pairs with onChange.
                size: 3,
                onChange: function (selections) { console.log(selections); }
            };
        },

        getInitialState: function () {
            // Here, we cull out all the inactive panels.
            var selectors = this.props.selectors;
            u.test(_.isArray(selectors), 'array required for selectors');
            // implements the behavior that the absence of an active property makes it automatically active.
            function isActive(selector) {
                return _.isUndefined(selector.active) || !! selector.active;
            }
            u.test(_.isArray(selectors), 'array required for selectors');
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
            return ({
                selectors: selectors,
                selections: this.props.selections,
                isValid: this.props.isValid
            });
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

            return(
                        React.DOM.select( {id:this.props.id, ref:"multiselector", value:selections, multiple:"multiple"}, selectors)
            );
        },
        /* jshint ignore:end */

        componentDidMount: function (rootNode) {
            var self = this;
            $(rootNode).on('change', function (event) {
                void event;
                var selections = _.map(_.filter(self.refs['multiselector'].getDOMNode().options, function (opt) {
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
    'underscore', 'react', 'jquery', '../util/debug'
], function (_, React, $, debug) {
    'use strict';

    /**
     *     Careful:
     *       This must be contained by a RadioGroup or it won't style right.
     */
    var Radio = React.createClass({displayName: 'Radio',

        getDefaultProps: function () {
            return {
                onChange: $.noop,
                disabled: false,
                readonly: false,
                checked: false,
                value: undefined
            };
        },

        componentWillMount: function () {
            debug.verify(this.props.name, 'Radio \'name\' prop is required');
            //debug.verify(this.props.value !== undefined, 'Radio needs a value to distinguish choices');
            // Also, value can't be null, i think, or the <input> will not be controlled.

            this.stableUniqueId = _.uniqueId();
        },

        render: function () {
            return (
                React.DOM.span(null, 
                    React.DOM.input( {type:"radio", name:this.props.name, id:this.stableUniqueId, value:this.props.value, onChange:this.onChange,
                           checked:this.props.checked, 'data-checked':this.props.checked ? '' : null,
                           disabled:this.props.disabled, readOnly:this.props.readonly} ),
                    React.DOM.label( {htmlFor:this.stableUniqueId}, this.props.children)
                )
            );
        },

        onChange: function (e) {
            !this.props.readonly && this.props.onChange(e.target.value);
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

        fieldClass: 'formFieldRadio',

        /*jshint ignore:start */
        render: function () {
            var value = this.props.value;

            _.each(this.props.children, function (radio) {
                // Check the radio button whose value matches the group's value
                radio.props.checked = (radio.props.value === value);
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
define('controls/UserPickerPlus',[
    'underscore', 'react',
    '../util/debug',
    './RadioGroup',
    './UserPicker'
], function (_, React, debug, RadioGroup, UserPicker) {
    'use strict';

    void UserPicker;
    /**
     * This is a user picker control that is similar to the UserPicker but differs by
     * 1) it's given a list of users for radio buttons,
     * 2) The last radio button allows a user to be selected using a standard picker control
     * 3) it has no multi-select feature (single only).
     */
    return React.createClass({

        displayName: 'UserPickerPlus',
        fieldClass: 'formFieldRadio',

        getDefaultProps: function () {
            return {
                value: undefined,
                disabled: false,
                readonly: false
            };
        },

        componentWillMount: function () {
            debug.verify(this.props.dataSource);

            this.elemIDPrefix = _.uniqueId('userPickerRadio');
        },

        /*jshint ignore:start */
        render: function () {
            var props = this.props,
                pickerValue = props.value,
                idPrefix = this.elemIDPrefix;

            function onChangeRadio(e) {
                var index = parseInt(e.target.value);
                props.onChange(props.userList[index]);
            }

            function makeRadio(user, index) {
                var elemID = idPrefix + index;
                var checked = user.isEqual(props.value);

                return [
                    (React.DOM.input( {type:"radio", name:props.name, id:elemID, value:index, checked:checked, onChange:onChangeRadio})),
                    (React.DOM.label( {htmlFor:elemID}, user.fullName)),
                    (React.DOM.br(null))
                ];
            }

            // If the "value" is one of the users in the userList, we don't want to pass it to the picker.
            if (_.some(props.userList, function (user) { return user.isEqual(pickerValue); } )) {
                pickerValue = null;
            }

            return(
                React.DOM.fieldset(null, 
                    _.flatten(_.map(props.userList, makeRadio)),
                    React.DOM.input( {type:"radio", name:props.name, id:idPrefix + 'Last', checked:!!pickerValue} ),
                    React.DOM.label( {htmlFor:idPrefix + 'Last'}, 
                        UserPicker( {onChange:props.onChange, placeholder:props.placeholder,
                                    value:pickerValue, dataSource:props.dataSource, width:props.width} )
                    )
                )
            );
        }
        /*jshint ignore:end */
    });
});

define('wingspan-forms',[
    './AutoControl',
    './FormField',
    './controls/Carousel',
    './controls/CheckBox',
    './controls/KendoComboBox',
    './controls/KendoDate',
    './controls/KendoDatetime',
    './controls/KendoGrid',
    './controls/KendoGridPicker',
    './controls/KendoGridPickerByButton',
    './controls/KendoGridRadioSelectable',
    './controls/KendoListView',
    './controls/KendoMultiSelect',
    './controls/KendoNumber',
    './controls/KendoTabStrip',
    './controls/KendoText',
    './controls/MultiSelect',
    './controls/MultilineText',
    './controls/Radio',
    './controls/RadioGroup',
    './controls/SwitchBox',
    './controls/UserPicker',
    './controls/UserPickerPlus',
    './ControlCommon'
], function (AutoControl, FormField, Carousel, CheckBox, KendoComboBox, KendoDate, KendoDatetime,
             KendoGrid, KendoGridPicker, KendoGridPickerByButton, KendoGridRadioSelectable,
             KendoListView, KendoMultiSelect, KendoNumber, KendoTabStrip, KendoText, MultiSelect,
             MultilineText, Radio, RadioGroup, SwitchBox, UserPicker, UserPickerPlus, ControlCommon) {
    'use strict';



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
        Carousel: Carousel,
        CheckBox: CheckBox,
        KendoComboBox: KendoComboBox,
        KendoDate: KendoDate,
        KendoDatetime: KendoDatetime,
        KendoGrid: KendoGrid,
        KendoGridPicker: KendoGridPicker,
        KendoGridPickerByButton: KendoGridPickerByButton,
        KendoGridRadioSelectable: KendoGridRadioSelectable,
        KendoListView: KendoListView,
        KendoMultiSelect: KendoMultiSelect,
        KendoNumber: KendoNumber,
        KendoTabStrip: KendoTabStrip,
        KendoText: KendoText,
        MultiSelect: MultiSelect,
        MultilineText: MultilineText,
        Radio: Radio,
        RadioGroup: RadioGroup,
        SwitchBox: SwitchBox,
        UserPicker: UserPicker,
        UserPickerPlus: UserPickerPlus,
        ControlCommon: ControlCommon
    };
});
    // Fake out the almond loader - shim these dependencies to their globals.
    // Make sure these globals are already on the page - e.g. by require-shims in the app
    define('underscore', function () { return _; });
    define('react', function () { return React; });
    define('jquery', function () { return $; });
    define('moment', function () { return moment; });
    define('underscore-string', function () { return _s; });
    define('kendo', function () { return kendo; });
    define('text', function () { return undefined; });

    return require('wingspan-forms');
}));
