(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([
            'underscore', 'jquery', 'kendo', 'q'
        ], factory);
    } else {
        root.WingspanData = factory(root._, root.$, root.kendo, root.Q);
    }
}(this, function (_, $, kendo, Q) {/**
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

/* jshint -W040 */
define('data/dataCommon',[
    'underscore', 'q', 'kendo'
], function (_, Q, kendo) {
    'use strict';

    var ISO_DATE_ONLY = 'yyyy-MM-dd';
    var MIME_JSON = 'application/json';

    // Enhance kendo ObservableArray with findWhere
    kendo.data.ObservableArray.fn.findWhere = function (attrs) {
        return _.findWhere(this, attrs);
    };

    /**
     * Wingspan backend resources have an identity URL for CRUD effects on a specific resource.
     * For example, a collection resource might have 10 objects, but each specific object has its own
     * identity URL for CRUD effects on an individual item in the collection.
     */
    function getIdentityUrl(data) {
        return data.links['edit'] || data.links['self'];
    }

    function promiseForRead(dataStore) {
        var result = new Q.defer();

        function finished(e) {
            // Done with this request, so unbind the handler
            dataStore.unbind('change', finished).unbind('error', finished);

            if (e.errorThrown) {
                result.reject(e.errorThrown);
            }
            else {
                result.resolve(e);
            }
        }

        dataStore.bind(['change', 'error'], finished);

        return result.promise;
    }

    function promiseForSync(dataStore) {
        var result = new Q.defer();

        function finished(e) {
            // Done with this request, so unbind the handler
            dataStore.unbind('sync', finished).unbind('error', finished);

            if (e.errorThrown) {
                result.reject(e.errorThrown);
                // If the server call fails, the inserted model must be removed so that we won't try to sync the object again.
                dataStore.cancelChanges();
            }
            else {
                result.resolve(e);
            }
        }

        dataStore.bind(['sync', 'error'], finished);

        return result.promise;
    }

    function formatISODate(date) {
        return kendo.toString(date, ISO_DATE_ONLY);
    }

    function parseISODate(dateStr) {
        if (_.isEmpty(dateStr)) {
            return null;
        }

        if (dateStr.length === ISO_DATE_ONLY.length) {
            // Use kendo to parse dates without times because Date.parse causes dates to "drift" across days
            return kendo.parseDate(dateStr, ISO_DATE_ONLY);
        }

        // Date.parse can handle ISO-formatted date+time strings
        return new Date(Date.parse(dateStr));
    }

    function schemaParse(response) {
        var metadata = response.metaData;

        function unMarshalObject(item) {
            _.each(metadata.fields, function (field) {
                if (field.type === 'DATE') {
                    // Date and DateTime remains iso8601 strings now
                    //item[field.name] = parseISODate(item[field.name]);
                }
            });
        }

        // The data will be an array when doing a GET on a collection resource.
        // For PUT/POST, the data is always an object, and also a GET on non-collection resource.
        if (_.isArray(response.data)) {
            _.each(response.data, unMarshalObject);
        }
        else {
            unMarshalObject(response.data);
        }

        return response;
    }

    function schemaTotal(response) {
        return response.totalCount;
    }

    function schemaData(response) {
        return response[response.metaData.root];
    }

    function schemaSerialize(objects) {
        var fields = this.model.fields;

        _.each(objects, function (object) {
            _.each(object, function (value, name) {
                if (!fields[name]) {
                    return;
                }
                // Convert "date" values to ISO date strings manually, because the Date.toJSON creates date+time strings
                if (fields[name].type === 'date') {
                    object[name] = formatISODate(object[name]);
                }
            });
        });

        return objects;
    }

    function xhrError(xhr, status, errorThrown) {
        var payload;

        // jQuery does not parse JSON when an HTTP error is returned, so we must do it manually.
        if (xhr.getResponseHeader('Content-Type') === MIME_JSON) {
            payload = JSON.parse(xhr.responseText);
            errorThrown = _.pick(payload, 'messageID', 'message');
        }
        else {
            errorThrown = { messageID: status, message: errorThrown };
        }

        return errorThrown;
    }

    /**
     * Map Kendo's paging/sorting control attributes to the ones that our backend SSP implementation expects.
     */
    function mapQueryParams(data) {
        if (!_.isUndefined(data.skip)) {
            data['pg_start'] = data.skip;   // "skip" is what kendo calls the start index
            delete data.page;
            delete data.skip;
        }
        if (!_.isUndefined(data.pageSize)) {
            data['pg_size'] = data.pageSize;    // "pageSize" and "take" mean the same thing
            delete data.take;
            delete data.pageSize;
        }
        if (_.isArray(data.sort)) {
            // The server currently supports one level of sorting
            data['sort_by'] = data.sort[0].field;
            data['sort_dir'] = data.sort[0].dir;
            delete data.sort;
        }
        if (data.filter) {
            // Convert the verbose syntax into simple query parameters
            data['filter_op'] = data.filter.logic;
            _.each(data.filter.filters, function (filter) {
                data[filter.field] = filter.value;
            });
            delete data.filter;
        }
        return data;
    }

    return {
        ISO_DATE_ONLY: ISO_DATE_ONLY,
        MIME_JSON: MIME_JSON,

        getIdentityUrl: getIdentityUrl,
        promiseForRead: promiseForRead,
        promiseForSync: promiseForSync,
        schemaParse: schemaParse,
        schemaTotal: schemaTotal,
        schemaData: schemaData,
        schemaSerialize: schemaSerialize,
        xhrError: xhrError,
        mapQueryParams: mapQueryParams,

        //TODO: Replace these with more formal models that describe what attrs are dates (AHG)
        _formatIsoDate: formatISODate,  // exposed because marshalling not yet model-based
        _parseIsoDate: parseISODate // exposed because unmarshalling is not yet recurisve
    };

});

define('data/ServiceClient',[
    'jquery', 'q',
    './dataCommon'
], function ($, Q, dataCommon) {
    'use strict';

    var StatusCode = {
        NO_CONTENT: 204,
        NOT_AUTHORIZED: 401
    };

    var authenticationHandler = $.noop;

    /**
     * Retrieve an object from the server.
     * Note: replaces "util.getJSON()"
     *
     * @param url
     * @param params (optional query args)
     * @returns Promise
     */
    function fetch(url, params) {
        console.assert(url);

        return ajaxCall({
            type: 'GET',
            url: url,
            dataType: 'json',
            data: params,
            processData: true,
            processPayload: true
        });
    }

    /**
     * Send data to the server, usually to create an object.
     * @param url
     * @param data
     * @returns Promise
     */
    function post(url, data) {
        console.assert(url);
        console.assert(data);

        return ajaxCall({
            type: 'POST',
            url: url,
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: 'json',
            processData: true,
            processPayload: true
        });
    }

    /**
     * Update an object on the server.
     * @param url
     * @param data
     * @returns Promise
     */
    function put(url, data) {
        console.assert(url);

        // "data" is optional, so leave the options undefined if it's not set
        return ajaxCall({
            type: 'PUT',
            url: url,
            dataType: 'json',
            processData: false,
            processPayload: true,
            data: data ? JSON.stringify(data) : undefined,
            contentType: data ? 'application/json' : undefined
        });
    }

    /**
     * Delete data on the server.
     * @param url
     * @returns Promise
     */
    function remove(url) {
        console.assert(url);

        return ajaxCall({
            type: 'DELETE',
            url: url,
            dataType: 'json',
            processData: false,
            processPayload: true
        });
    }

    function isPayload(data) {
        return data && data.metaData;
    }

    function ajaxCall(settings) {
        var theQ = Q.defer();

        function ajaxDone(data, textStatus, jqXHR) {
            //console.log(settings.type, settings.url, jqXHR.status, data);

            // A 204 response returns no data - this happens, e.g., for dismissing and restoring announcements.
            if (settings.processPayload && isPayload(data)) {
                // Parse the payload, converting data into native types (e.g. dates)
                data = dataCommon.schemaData(dataCommon.schemaParse(data));
            }

            // Resolve the promise using the payload's data, not the complete payload.
            theQ.resolve(data);
        }
        function ajaxFail(jqXHR, textStatus, errorThrown) {
            errorThrown = dataCommon.xhrError(jqXHR, textStatus, errorThrown);
            console.error(settings.type, settings.url, jqXHR.status, errorThrown);

            function retryCall() {
                $.ajax(settings).then(ajaxDone, ajaxFail, theQ.notify);
            }

            if (jqXHR.status === StatusCode.NOT_AUTHORIZED) {
                authenticationHandler(jqXHR, retryCall);
                return;
            }

            // Reject the promise using parsed error information, not the jqXHR object
            theQ.reject(errorThrown);
        }

        $.ajax(settings).then(ajaxDone, ajaxFail, theQ.notify);

        return theQ.promise;
    }

    function downloadFile(url, data) {
        console.assert(url);

        // Assuming the server sends down the proper Content-Disposition: attachment header, we're all set.
        var $iframe = $('<iframe src="textassets/platform/data/downloader.html" style="display: none;" ></iframe>')
                .appendTo('body');

        $iframe.one('load', function (ev) {
            var $form = $(ev.target.contentDocument).find('#theForm');

            $form.find('#json').text(JSON.stringify(data));

            $form.attr('action', url);
            $form.submit();
        });
    }

    function logout(authUrl) {
        return ajaxCall({ type: 'GET', url: authUrl, cache: false });
    }

    /**
     * The handler takes two arguments, the jQuery XHR and a function to call after the user re-authenticates.
     * @param handler
     */
    function setAuthenticationHandler(handler) {
        authenticationHandler = handler;
    }

    return {
        fetch: fetch,
        post: post,
        put: put,
        remove: remove,
        ajaxCall: ajaxCall,
        downloadFile: downloadFile,

        logout: logout,
        setAuthenticationHandler: setAuthenticationHandler
    };
});
/**
 * Create a container for single objects using the kendo Model.
 */
define('data/DataModel',[
    'kendo', 'underscore'
],
function (kendo, _) {

    'use strict';

    /* Maps the server's Metadata.FieldType enum to kendo's field types */
    var FIELD_TYPE_MAP = {
        AUTO : 'default',
        STRING : 'string',
        INT : 'number',
        FLOAT : 'number',
        BOOLEAN : 'boolean',
        DATE : 'date',
        URL : 'default'
    };
    var DATE_TIME_PROPS = ['createdDate', 'modifiedDate'];

    var RESET_EVENT = 'reset';

    var DataModel = kendo.data.Model.extend({

        /**
         * Apply all the values in data to this model. This will fire change events for each field.
         * @param data
         */
        reset: function (data) {
            var field;

            for (field in data) {
                if (data.hasOwnProperty(field)) {
                    this.set(field, data[field]);
                }
            }

            if (this.idField) {
                this.id = this.get(this.idField);
            }

            this.dirty = false;
            this.trigger(RESET_EVENT);  // Tell all our friends about the new data
        }
    });

    // Expose the "static" method for defining models
    DataModel.define = function (options) {
        return kendo.data.Model.define(DataModel, options);
    };

    // Another static method for defining models using server payload metadata
    DataModel.defineWithMetadata = function (metadata) {

        function convertField(fields, field) {
            fields[field.name] = {
                array : field.array,
                defaultValue : null,
                type : FIELD_TYPE_MAP[field.type]
            };

            if (_.contains(DATE_TIME_PROPS, field.name)) {
                fields[field.name].type = 'datetime';
                fields[field.name].parse = kendo.parseDate;
            }
            return fields;
        }

        var CustomModel = kendo.data.Model.define(DataModel, {
            id: metadata.idProperty,
            fields: _.reduce(metadata.fields, convertField, {})
        });
        CustomModel.nameField = CustomModel.fn.nameField = metadata.nameProperty;

        return CustomModel;
    };

    // Create a kendo Model derived from our server type information
    DataModel.defineWithTypeInfo = function (typeInfo) {

        function convertField(fields, field) {
            fields[field.name] = {
                array : field.array,
                defaultValue : null,
                type : field.dataType === 'text' ? 'string' : field.dataType,
                editable: !field.readOnly,
                validation: {
                    required: field.required
                }
            };

            // Kendo just defined 'date', but we distinguish between date-only values and date+time values
            if (field.dataType === 'datetime') {
                fields[field.name].parse = kendo.parseDate;
            }
            return fields;
        }

        var CustomModel = kendo.data.Model.define(DataModel, {
            id: typeInfo.idProperty,
            fields: _.reduce(typeInfo.properties, convertField, {})
        });

        return CustomModel;
    };

    return DataModel;
});

define('data/DataStore',[
    'kendo', 'underscore', 'q',
    './dataCommon',
    './DataModel',
    './ServiceClient'
], function (kendo, _, Q, dataCommon, DataModel, ServiceClient) {
    'use strict';

    // When the store has an empty data set, this object is returned for aggregates()
    var NULL_AGGREGATES = { average: 0, count: 0, min: 0, max: 0, sum: 0 };

    /**
     * A mixin that is applied to model constructors so they can live inside a kendo DataSource/ObservableArray
     */
    var ModelMixin = {
        // When ObservableArray "wraps" the models, it wants to bind to change events
        bind: function () {},

        // Kendo templates use the get() method to retrieve attribute values
        get: function (attrName) {
            return kendo.getter(attrName, true)(this);
        },

        /* The three methods below support DataStore insert/sync */

        isNew: function () {
            return this.id === null;
        },

        toJSON: function () {
            // JSON should not include any functions or the "uid" property
            return _.omit(this, _.functions(this), 'uid');
        },

        accept: function (data) {
            // Don't change this.uid because that will cause references to break
            _.extend(this, data);
        }
    };

    function turnOffServerOptions(dataStore) {
        dataStore.options.serverSorting
            = dataStore.options.serverPaging
            = dataStore.options.serverFiltering
            = dataStore.options.serverGrouping
            = dataStore.options.serverAggregates = false;
    }

    function localQuery(dataStore, queryFn) {
        var tmpServerPaging        = dataStore.options.serverPaging,
            tmpServerFiltering     = dataStore.options.serverFiltering,
            tmpServerGrouping      = dataStore.options.serverGrouping,
            tmpServerAggregates    = dataStore.options.serverAggregates;

        turnOffServerOptions(dataStore);
        var ret = queryFn();

        dataStore.options.serverPaging      = tmpServerPaging;
        dataStore.options.serverFiltering   = tmpServerFiltering;
        dataStore.options.serverGrouping    = tmpServerGrouping;
        dataStore.options.serverAggregates  = tmpServerAggregates;

        return ret;
    }

    var Transport = kendo.Class.extend({
        init: function (url, urlParams) {
            this.url = url;
            this.urlParams = urlParams;
        },

        read: function (request) {
            ServiceClient.ajaxCall({
                url: this.url,
                type: 'GET',
                dataType: 'json',
                data: dataCommon.mapQueryParams(_.defaults({}, this.urlParams, request.data)),
                processData: true
            }).then(request.success, request.error);
        },

        read1: function (request) {
            ServiceClient.ajaxCall({
                url: dataCommon.getIdentityUrl(request.data),
                type: 'GET',
                dataType: 'json'
            }).then(request.success, request.error);
        },

        create: function (request) {
            ServiceClient.ajaxCall({
                url: this.url,
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify(request.data),
                contentType: dataCommon.MIME_JSON,
                processData: false
            }).then(request.success, request.error);
        },

        update: function (request) {
            ServiceClient.ajaxCall({
                url: dataCommon.getIdentityUrl(request.data),
                type: 'PUT',
                dataType: 'json',
                data: JSON.stringify(request.data),
                contentType: dataCommon.MIME_JSON,
                processData: false
            }).then(request.success, request.error);
        },

        destroy: function (request) {
            ServiceClient.ajaxCall({
                url: dataCommon.getIdentityUrl(request.data),
                type: 'DELETE',
                dataType: 'json'
            }).then(request.success, request.error);
        }
    });

    var SuperClass = kendo.data.DataSource.fn;

    var DataStore = kendo.data.DataSource.extend({

        options: {
            // The URL of the collection resource backing this store
            url: '',

            // Set "autoSync" to true so that add/remove calls go to the server first
            autoSync: true,

            // Default paging and sorting to the server
            serverPaging: true,
            serverSorting: true,

            // The schema is a config option that contains a set of functions which are added to the internal
            // DataSource "reader".
            schema: {
                type: 'json',
                parse: dataCommon.schemaParse,
                total: dataCommon.schemaTotal,
                data: dataCommon.schemaData,
                serialize: dataCommon.schemaSerialize
            }
        },

        init: function (options) {
            options.url = options.url || options.uri;

//            console.assert((options.url || options.data), 'Must provide either url or data');

            // A pageSize of zero means "no paging", so remove the property to prevent any confusion.
            if (options.pageSize === 0) {
                delete options.pageSize;
            }

            // The options schema will generally just define the model
            options.schema = _.extend({}, this.options.schema, options.schema);

            // Use our standard transport
            options.transport = new Transport(options.url, options.urlParams);

            // kendo expects lowercase "asc" or "desc"
            if (options.sort) {
                options.sort.dir = options.sort.dir.toLowerCase();
            }

            SuperClass.init.call(this, options);

            // In some cases we get the data inline alongside a url (e.g. the global header).  This is to save a network trip.
            // However, in these cases, Kendo ignores the inline data when there's a URL. So, we fat finger the data into the store.
            if (options.data) {
                this.data(options.data);
            }
        },

        reset: function (options) {
            console.log('Reset data store', options);

            if (_.isEmpty(options) || _.isEmpty(options.url) || (this.options.url === options.url)) {
                return;
            }

            // With our new URL, go to the server.
            // Any bound widgets will be updated when the 'change' event fires.
            this.options.url = options.url;
            this.transport.url = options.url;

            SuperClass.read.call(this);
        },

        insert: function (index, model) {
            SuperClass.insert.call(this, index, model);

            return dataCommon.promiseForSync(this);
        },

        sync: function () {
            if (!this.hasChanges()) {
                return Q();
            }

            SuperClass.sync.call(this);

            return dataCommon.promiseForSync(this);
        },

        remove: function (model) {
            SuperClass.remove.call(this, model);

            return dataCommon.promiseForSync(this);
        },

        read: function (params) {
            SuperClass.read.call(this, params);

            return dataCommon.promiseForRead(this);
        },

        refresh: function (id) {
            var self = this;
            var dataItem = this.get(id);

            if (!dataItem) {
                return;
            }

            this._send('read1', [dataItem]).pop().then(function (result) {
                // Now that we have new data, we can treat this result as an "update", like a sync() for a dirty object.
                result.type = 'update';
                self._accept(result);
                self._change({ action: result.type });
            });
        },

        aggregates: function () {
            if (this.total() === 0) {
                // Kendo does not compute aggregates for an empty data set, but that makes for a lousy API.
                return _.reduce(this.aggregate(), function (result, aggr) {
                    result[aggr.field] = NULL_AGGREGATES;
                    return result;
                }, {});
            }
            return SuperClass.aggregates.call(this);
        },

        success: function (data) {
            // If no model was provided in the initial config, try to create one using the payload metadata.
            // This is necessary for mutation operations because the model needs to know what the ID of the object is.
            if (_.isUndefined(this.reader.model) && data.metaData) {
                this.reader.model = DataModel.defineWithMetadata(data.metaData);
            }

            SuperClass.success.call(this, data);
        },

        filter : function (val) {
            // When the store is not using paging, see if we have all the data. If we do, temporarily turn off serverXXX options.
            // No need to get the data multiple times.
            if (_.isUndefined(this.options.pageSize) && this._data.length === this._total) {
                var self = this;
                return localQuery(this, function () {
                    return SuperClass.filter.call(self, val);
                });
            } else {
                return SuperClass.filter.call(this, val);
            }
        },

        error: function (error) {
            SuperClass.error.call(this, undefined, undefined, error);
        },

        _change: function (e) {
            // Do not sync() on individual change events because it's totally inefficient
            if (this.options.autoSync && _.isObject(e) && e.action === 'itemchange') {
                return;
            }

            SuperClass._change.call(this, e);
        }
    });

    var InlineDataStore = kendo.data.DataSource.extend({

        init: function (options) {
            console.assert(_.isUndefined(options.url), 'Should not use InlineDataStore with a URL');

            SuperClass.init.call(this, options);
        }
    });

    /**
     * Create an appropriate DataStore instance based on the options.
     * @param options Options object providing either inline "data" or an "url"
     * @returns {DataStore}
     */
    DataStore.create = function (options) {
        options = _.clone(options);     // Copy it so we can mutate as needed

        if (options.model) {
            options.schema = { model: options.model };
            delete options.model;
        }
        else if (options.metadata) {
            // TypeInfo field options will have metadata
            options.schema = { model: DataModel.defineWithMetadata(options.metadata) };
            delete options.metadata;
        }
        else if (options.RecordType) {
            // Any custom type must be adapted to be used within a kendo DataSource.
            // Note the use of defaults() to allow the models to override the ModelMixin behavior.
            _.defaults(options.RecordType.prototype, ModelMixin);

            options.schema = { model: options.RecordType };
            delete options.RecordType;
        }

        if (_.isUndefined(options.url)) {
            return new InlineDataStore(options);
        }

        return new DataStore(options);
    };

    return DataStore;
});

define('wingspan-data',[
    './data/ServiceClient',
    './data/DataStore',
    './data/DataModel',
    './data/dataCommon'
], function (ServiceClient, DataStore, DataModel, dataCommon) {
    'use strict';

    return {
        ServiceClient: ServiceClient,
        DataStore: DataStore,
        DataModel: DataModel,
        dataCommon: dataCommon
    };
});

    // Fake out the almond loader - shim these dependencies to their globals.
    // Make sure these globals are already on the page - e.g. by require-shims in the app
    define('underscore', function () { return _; });
    define('jquery', function () { return $; });
    define('kendo', function () { return kendo; });
    define('q', function () { return Q; });

    return require('wingspan-data');
}));