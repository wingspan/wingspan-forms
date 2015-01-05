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
