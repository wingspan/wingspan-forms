(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("underscore"), require("react"), require("kendo"), require("jquery"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["underscore", "react", "kendo", "jquery", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["WingspanForms"] = factory(require("underscore"), require("react"), require("kendo"), require("jquery"), require("react-dom"));
	else
		root["WingspanForms"] = factory(root["underscore"], root["react"], root["kendo"], root["jquery"], root["react-dom"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(8), __webpack_require__(22), __webpack_require__(21), __webpack_require__(24), __webpack_require__(25), __webpack_require__(26), __webpack_require__(27), __webpack_require__(18), __webpack_require__(16), __webpack_require__(9), __webpack_require__(28), __webpack_require__(29), __webpack_require__(30), __webpack_require__(31), __webpack_require__(20), __webpack_require__(15), __webpack_require__(1), __webpack_require__(32), __webpack_require__(12), __webpack_require__(17), __webpack_require__(33), __webpack_require__(13), __webpack_require__(34), __webpack_require__(35), __webpack_require__(14), __webpack_require__(36), __webpack_require__(37), __webpack_require__(38), __webpack_require__(23), __webpack_require__(39), __webpack_require__(11)], __WEBPACK_AMD_DEFINE_RESULT__ = function (AutoControl, FormField, AutoField, Button, Carousel, CheckBox, KendoAutoComplete, KendoComboBox, KendoDatePicker, KendoDateTimePicker, KendoDropDownList, KendoGrid, KendoGridPicker, KendoListView, KendoMultiSelect, KendoNumericTextBox, KendoPager, KendoTabStrip, KendoText, KendoTimePicker, MultiSelect, MultilineText, Radio, RadioGroup, SwitchBox, TabStrip, PromiseButton, SearchBox, ControlCommon, FluxFormMixin, ImmutableOptimizations) {
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
	        KendoDropDownList: KendoDropDownList,
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
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(3), __webpack_require__(4), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, React, kendo, Common) {
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
	        displayName: 'KendoPager',

	        propTypes: {
	            dataSource: React.PropTypes.object.isRequired,
	            className: React.PropTypes.string,
	            messages: React.PropTypes.object,
	            onChange: React.PropTypes.func
	        },

	        getDefaultProps: function getDefaultProps() {
	            return {
	                className: 'k-pager-wrap',
	                // Empty object means override none of kendo's defaults, which are shown above for convenience
	                messages: {},
	                change: $.noop
	            };
	        },

	        componentDidMount: function componentDidMount() {
	            var $el = Common.findWidget(this);

	            $el.kendoPager({
	                dataSource: this.props.dataSource,
	                messages: this.props.messages,
	                change: this.props.onChange
	            });
	        },

	        componentWillUnmount: function componentWillUnmount() {
	            Common.findWidget(this, 'kendoPager').destroy();
	        },

	        render: function render() {
	            return React.createElement('div', { className: this.props.className });
	        }
	    });

	    return KendoPager;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(6), __webpack_require__(3), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, $, React, ReactDOM) {
	    'use strict';

	    function findWidget(component, name) {
	        if (!name) {
	            // Just return the jquery node (helps with componentDidMount)
	            return $(ReactDOM.findDOMNode(component));
	        }
	        return $(ReactDOM.findDOMNode(component)).data(name);
	    }

	    function wrapItemsDiv(jsxs) {
	        var acc = [];
	        _.each(jsxs, function (jsx, i) {
	            acc.push(React.createElement('div', { key: i }, jsx));
	        });
	        return acc;
	    }

	    return {
	        findWidget: findWidget,
	        wrapItemsDiv: wrapItemsDiv
	    };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(3), __webpack_require__(12), __webpack_require__(13), __webpack_require__(14), __webpack_require__(15), __webpack_require__(9), __webpack_require__(16), __webpack_require__(17), __webpack_require__(18), __webpack_require__(20), __webpack_require__(11)], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, React, KendoText, MultilineText, SwitchBox, KendoNumericTextBox, KendoDateTimePicker, KendoDatePicker, KendoTimePicker, KendoComboBox, KendoMultiSelect, ImmutableOptimizations) {
	    'use strict';

	    var TYPE_TO_CONTROL = {
	        'text': KendoText,
	        'text:multiLine': MultilineText,
	        'number': KendoNumericTextBox,
	        'date': KendoDatePicker,
	        'datetime': KendoDateTimePicker,
	        'time': KendoTimePicker,
	        'boolean': SwitchBox
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
	            controlForField: function controlForField(fieldInfo) {
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

	        getDefaultProps: function getDefaultProps() {
	            return {
	                controlForField: function controlForField() {}
	            };
	        },

	        render: function render() {
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

	                // Right now, fields with options do not allow selections outside the available choices
	                controlProps.preventCustomValues = true;
	            }

	            return React.createElement(Control, controlProps);
	        }
	    });

	    return AutoControl;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(3), __webpack_require__(10), __webpack_require__(11)], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, React, DateWidgetMixin, ImmutableOptimizations) {
	    'use strict';

	    var KendoDateTimePicker = React.createClass({
	        displayName: 'KendoDateTimePicker',

	        mixins: [DateWidgetMixin('kendoDateTimePicker'), ImmutableOptimizations(['onChange'])],

	        statics: {
	            fieldClass: function fieldClass() {
	                return 'formFieldDatetimepicker';
	            }
	        },

	        getDefaultProps: function getDefaultProps() {
	            return {
	                format: 'MM/dd/yyyy h:mm tt'
	            };
	        },

	        /*jshint ignore:start */
	        render: function render() {
	            return this.props.noControl ? React.createElement(
	                'span',
	                null,
	                this.renderValue()
	            ) : React.createElement('input', { type: 'text' });
	        }
	        /*jshint ignore:end */
	    });

	    return KendoDateTimePicker;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(6), __webpack_require__(4), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, $, kendo, ReactDOM) {
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
	            getDefaultProps: function getDefaultProps() {
	                return {
	                    onChange: $.noop,
	                    disabled: false,
	                    readonly: false,
	                    noControl: false
	                };
	            },

	            getWidget: function getWidget() {
	                return $(ReactDOM.findDOMNode(this)).data(widgetName);
	            },

	            renderValue: function renderValue() {
	                if (_.isEmpty(this.props.value)) {
	                    return '';
	                }
	                return kendo.toString(fromISOString(this.props.value), this.props.format);
	            },

	            componentDidMount: function componentDidMount() {
	                if (this.props.noControl) {
	                    // Everything was done in JSX.
	                    return;
	                }

	                var $el = $(ReactDOM.findDOMNode(this));
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
	                } else if (this.props.readonly) {
	                    this.getWidget().readonly(true);
	                }
	            },

	            componentDidUpdate: function componentDidUpdate(prevProps) {
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
	                } else if (this.props.readonly !== prevProps.readonly) {
	                    kendoWidget.readonly(this.props.readonly);
	                }
	            },

	            componentWillUnmount: function componentWillUnmount() {
	                if (this.props.noControl) {
	                    return;
	                }
	                this.getWidget().destroy();
	            },

	            onChange: function onChange(event) {
	                var kendoWidget = event.sender;
	                var value = toISOString(kendoWidget.value());

	                // Put the original value back until new props force the change
	                kendoWidget.value(fromISOString(this.props.value));

	                this.props.onChange(value);
	            }
	        };
	    }

	    return DateWidgetMixin;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (_) {
	    'use strict';

	    function ImmutableOptimizations(refFields) {
	        return {
	            shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
	                var valuesChanged = !_.isEqual(_.omit(nextProps, refFields), _.omit(this.props, refFields));

	                var refsChanged = !_.every(refFields, (function (field) {
	                    return this.props[field] === nextProps[field];
	                }).bind(this));

	                return valuesChanged || refsChanged;
	            }
	        };
	    }

	    return ImmutableOptimizations;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(3), __webpack_require__(11)], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, React, ImmutableOptimizations) {
	    'use strict';

	    var PropTypes = React.PropTypes;

	    var KendoText = React.createClass({
	        displayName: 'KendoText',

	        mixins: [ImmutableOptimizations(['onChange'])],

	        propTypes: {
	            id: PropTypes.string,
	            value: PropTypes.string,
	            onChange: PropTypes.func,
	            placeholder: PropTypes.string,
	            disabled: PropTypes.bool,
	            readonly: PropTypes.bool,
	            noControl: PropTypes.bool,
	            minLength: PropTypes.number,
	            maxLength: PropTypes.number,
	            isPassword: PropTypes.bool,
	            trimValue: PropTypes.bool
	        },

	        statics: { fieldClass: function fieldClass() {
	                return 'formFieldInput';
	            } },

	        getDefaultProps: function getDefaultProps() {
	            return {
	                value: '',
	                onChange: function onChange() {},
	                placeholder: '',
	                disabled: false,
	                readonly: false,
	                noControl: false,
	                isPassword: false,
	                trimValue: true
	            };
	        },

	        render: function render() {
	            var value = this.props.value || '';
	            /*jshint ignore:start */
	            if (this.props.noControl) {
	                return React.createElement(
	                    'span',
	                    null,
	                    value
	                );
	            }
	            return React.createElement('input', { id: this.props.id,
	                type: this.props.isPassword ? 'password' : 'text',
	                className: 'k-textbox',
	                value: value,
	                onChange: this.onChange,
	                onBlur: this.onBlur,
	                placeholder: this.props.placeholder,
	                readOnly: this.props.readonly,
	                disabled: this.props.disabled });
	            /*jshint ignore:end */
	        },

	        onBlur: function onBlur(event) {
	            var val = event.target.value;

	            // Do not trim values for a password field since the whitespace may be intended
	            if (this.props.trimValue && event.target.type === 'text') {
	                // Only fire a change event if the trim() will change the value
	                if (val !== val.trim()) {
	                    this.props.onChange(val.trim());
	                }
	            }
	        },

	        onChange: function onChange(event) {
	            var val = event.target.value;

	            if (this.props.readonly) {
	                return;
	            }
	            if (this.props.maxLength && val.length > this.props.maxLength) {
	                return;
	            }
	            this.props.onChange(val);
	        }
	    });

	    return KendoText;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(3), __webpack_require__(11)], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, React, ImmutableOptimizations) {
	    'use strict';

	    var PropTypes = React.PropTypes;

	    var MultilineText = React.createClass({
	        displayName: 'MultilineText',

	        mixins: [ImmutableOptimizations(['onChange'])],

	        propTypes: {
	            id: PropTypes.string,
	            value: PropTypes.string,
	            onChange: PropTypes.func,
	            placeholder: PropTypes.string,
	            disabled: PropTypes.bool,
	            readonly: PropTypes.bool,
	            noControl: PropTypes.bool,
	            minLength: PropTypes.number,
	            maxLength: PropTypes.number,
	            trimValue: PropTypes.bool
	        },

	        statics: { fieldClass: function fieldClass() {
	                return 'formFieldTextarea';
	            } },

	        getDefaultProps: function getDefaultProps() {
	            return {
	                value: '',
	                onChange: function onChange() {},
	                placeholder: '',
	                disabled: false,
	                readonly: false,
	                noControl: false,
	                trimValue: true
	            };
	        },

	        /* jshint ignore:start */
	        render: function render() {
	            if (this.props.noControl) {
	                // Use a <pre> tag because there are newlines in the text that should be preserved.
	                return React.createElement(
	                    'pre',
	                    null,
	                    this.props.value || ''
	                );
	            }
	            return React.createElement('textarea', { id: this.props.id,
	                className: 'k-textbox',
	                value: this.props.value || '',
	                onChange: this.onChange,
	                onBlur: this.onBlur,
	                placeholder: this.props.placeholder,
	                readOnly: this.props.readonly,
	                disabled: this.props.disabled });
	        },
	        /* jshint ignore:end */

	        onBlur: function onBlur(event) {
	            var val = event.target.value;

	            // Only fire a change event if the trim() will change the value
	            if (this.props.trimValue && val !== val.trim()) {
	                this.props.onChange(val.trim());
	            }

	            if (this.props.onBlur) {
	                this.props.onBlur(event);
	            }
	        },

	        onChange: function onChange(event) {
	            var val = event.target.value;

	            if (this.props.maxLength && val.length > this.props.maxLength) {
	                return;
	            }
	            this.props.onChange(val);
	        }
	    });

	    return MultilineText;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(3), __webpack_require__(11)], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, React, ImmutableOptimizations) {
	    'use strict';

	    function noop() {}

	    var SwitchBox = React.createClass({ displayName: "SwitchBox",
	        mixins: [ImmutableOptimizations(['onChange'])],

	        statics: { fieldClass: function fieldClass() {
	                return 'formFieldSwitch';
	            } },

	        getDefaultProps: function getDefaultProps() {
	            return {
	                onChange: noop,
	                labels: { 'yes': 'Yes', 'no': 'No' },
	                disabled: false,
	                readonly: false,
	                noControl: false
	            };
	        },

	        getDisplayValue: function getDisplayValue() {
	            return !!this.props.value ? this.props.labels.yes : this.props.labels.no;
	        },

	        onKeyDown: function onKeyDown(e) {
	            if (e.key === ' ') {
	                if (!this.props.readonly) {
	                    this.props.onChange(!this.props.value);
	                }
	                // Prevent the default always so that the space key doesn't scroll the page.
	                e.preventDefault();
	            }
	        },

	        /*jshint ignore:start */
	        render: function render() {
	            var props = this.props;

	            if (props.noControl) {
	                return React.createElement("span", null, this.getDisplayValue());
	            }

	            var yes = props.value === true;
	            var no = props.value === false;

	            var clickYes = props.readonly ? noop : _.partial(props.onChange, true);
	            var clickNo = props.readonly ? noop : _.partial(props.onChange, false);

	            return React.createElement(
	                'div',
	                { tabIndex: '0', className: 'switch', onKeyDown: this.onKeyDown },
	                React.createElement(
	                    'ul',
	                    null,
	                    React.createElement(
	                        'li',
	                        { className: yes ? 'active' : '', onClick: clickYes },
	                        React.createElement(
	                            'span',
	                            { className: yes ? 'pos' : '' },
	                            props.labels.yes
	                        )
	                    ),
	                    React.createElement(
	                        'li',
	                        { className: no ? 'active' : '', onClick: clickNo },
	                        React.createElement(
	                            'span',
	                            { className: no ? 'neg' : '' },
	                            props.labels.no
	                        )
	                    )
	                )
	            );
	        }
	        /*jshint ignore:end */
	    });

	    return SwitchBox;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(3), __webpack_require__(4), __webpack_require__(5), __webpack_require__(11)], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, React, kendo, Common, ImmutableOptimizations) {
	    'use strict';

	    var KendoNumericTextBox = React.createClass({
	        displayName: 'KendoNumericTextBox',

	        mixins: [ImmutableOptimizations(['onChange'])],

	        statics: { fieldClass: function fieldClass() {
	                return 'formFieldNumeric';
	            } },

	        getDefaultProps: function getDefaultProps() {
	            return {
	                value: undefined,
	                onChange: function onChange() {},
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
	        render: function render() {
	            return this.props.noControl ? React.createElement(
	                'span',
	                null,
	                kendo.toString(this.props.value, this.props.format)
	            ) :
	            // KendoNumeric requires multiple onChange handlers, because kendo change event doesn't happen
	            // until blur. We need an event on each keyup on the input, as well as spin events on the widget.
	            React.createElement('input', { id: this.props.id, type: 'text', onChange: this.onInputChange });
	        },
	        /*jshint ignore:end */

	        componentDidMount: function componentDidMount() {
	            var $el = Common.findWidget(this);

	            if (this.props.noControl) {
	                // Everything was done in JSX.
	                return;
	            }

	            $el.kendoNumericTextBox({
	                value: this.props.value,
	                format: this.props.format,
	                min: this.props.min,
	                max: this.props.max,
	                step: this.props.step,
	                spinners: this.props.spinners,
	                // No change event - we get change events from the underlying react <input>,
	                // because react gives us an onChange for each keystroke which is needed for flux
	                spin: this.onSpinChange
	            });

	            if (this.props.disabled) {
	                // disabled beats readonly
	                $el.data('kendoNumericTextBox').enable(false);
	            } else if (this.props.readonly) {
	                $el.data('kendoNumericTextBox').readonly(true);
	            }
	        },

	        componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
	            if (this.props.noControl) {
	                // Everything was done in JSX.
	                return;
	            }

	            var kendoWidget = Common.findWidget(this, 'kendoNumericTextBox');

	            if (prevProps.value !== this.props.value) {
	                kendoWidget.value(this.props.value);
	            }

	            if (this.props.disabled !== prevProps.disabled) {
	                kendoWidget.enable(!this.props.disabled);
	            } else if (this.props.readonly !== prevProps.readonly) {
	                kendoWidget.readonly(this.props.readonly);
	            }
	        },

	        onSpinChange: function onSpinChange(event) {
	            var val = event.sender.value();
	            this.props.onChange(val);
	        },

	        onInputChange: function onInputChange(event) {
	            if (this.props.readonly) {
	                return;
	            }
	            var val = event.target.value;
	            this.props.onChange(val);
	        }
	    });

	    return KendoNumericTextBox;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(3), __webpack_require__(10), __webpack_require__(11)], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, React, DateWidgetMixin, ImmutableOptimizations) {
	    'use strict';

	    var KendoDatePicker = React.createClass({
	        displayName: 'KendoDatePicker',

	        mixins: [DateWidgetMixin('kendoDatePicker'), ImmutableOptimizations(['onChange'])],

	        statics: {
	            fieldClass: function fieldClass() {
	                return 'formFieldDatepicker';
	            }
	        },

	        getDefaultProps: function getDefaultProps() {
	            return {
	                format: 'dd-MMM-yyyy'
	            };
	        },

	        /*jshint ignore:start */
	        render: function render() {
	            return this.props.noControl ? React.createElement(
	                'span',
	                null,
	                this.renderValue()
	            ) : React.createElement('input', { type: 'text' });
	        }
	        /*jshint ignore:end */
	    });

	    return KendoDatePicker;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(3), __webpack_require__(10), __webpack_require__(11)], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, React, DateWidgetMixin, ImmutableOptimizations) {
	    'use strict';

	    /**
	     * value interface is ISO-8601, with the date portion omitted.
	     * HH:MM:SS
	     */

	    var KendoTimePicker = React.createClass({
	        displayName: 'KendoTimePicker',

	        mixins: [DateWidgetMixin('kendoTimePicker'), ImmutableOptimizations(['onChange'])],

	        statics: {
	            fieldClass: function fieldClass() {
	                return 'formFieldDatepicker';
	            }
	        },

	        getDefaultProps: function getDefaultProps() {
	            return {
	                format: 'h:mm tt' // display format
	            };
	        },

	        /*jshint ignore:start */
	        render: function render() {
	            return this.props.noControl ? React.createElement(
	                'span',
	                null,
	                this.renderValue()
	            ) : React.createElement('input', { type: 'text' });
	        }
	        /*jshint ignore:end */
	    });

	    return KendoTimePicker;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3), __webpack_require__(19), __webpack_require__(11)], __WEBPACK_AMD_DEFINE_RESULT__ = function (React, SelectWidgetMixin, ImmutableOptimizations) {
	    'use strict';

	    var PropTypes = React.PropTypes;

	    function resetCustomValue(mixinOnChange, e) {
	        var widget = e.sender;

	        if (widget.value() && widget.select() === -1) {
	            //custom has been selected
	            widget.value(''); //reset widget
	            // Also clear the filter that the custom value applied so all the options are available
	            if (widget.options.filter !== 'none') {
	                widget.dataSource.filter(null);
	            }
	        }

	        // Call the base onChange so that the value in props is put back
	        mixinOnChange.call(this, e);
	    }

	    var KendoComboBox = React.createClass({
	        displayName: 'KendoComboBox',

	        mixins: [SelectWidgetMixin('kendoComboBox'), ImmutableOptimizations(['onChange'])],

	        propTypes: {
	            id: PropTypes.string,
	            value: PropTypes.any,
	            onChange: PropTypes.func,
	            autoBind: PropTypes.bool,
	            dataSource: PropTypes.oneOfType([PropTypes.array.isRequired, PropTypes.object.isRequired]),
	            displayField: PropTypes.string,
	            valueField: PropTypes.string,
	            disabled: PropTypes.bool,
	            readonly: PropTypes.bool,
	            options: PropTypes.object,
	            filter: PropTypes.string,
	            placeholder: PropTypes.string,
	            template: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	            preventCustomValues: PropTypes.bool
	        },

	        statics: {
	            fieldClass: function fieldClass() {
	                return 'formFieldCombobox';
	            }
	        },

	        getDefaultProps: function getDefaultProps() {
	            return {
	                filter: 'startswith',
	                options: {
	                    highlightFirst: false
	                }
	            };
	        },

	        componentWillMount: function componentWillMount() {
	            // Preventing custom values requires us to hook the change event before the mixin's
	            // default behavior because we don't want the custom value to be passed to our parent.
	            if (this.props.preventCustomValues) {
	                this.onChange = resetCustomValue.bind(this, this.onChange);
	            }
	        },

	        /*jshint ignore:start */
	        render: function render() {
	            return this.props.noControl ? React.createElement(
	                'span',
	                { id: this.props.id },
	                this.renderValue()
	            ) : React.createElement('input', { id: this.props.id });
	        }
	        /*jshint ignore:end */
	    });

	    return KendoComboBox;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(6), __webpack_require__(4), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, $, kendo, ReactDOM) {
	    'use strict';

	    var DataSource = kendo.data.DataSource;

	    var CANNOT_CHANGE = ['template', 'valueField', 'displayField', 'placeholder', 'filter'];

	    function rawValue(props) {
	        return _.isObject(props.value) ? props.value[props.valueField] : props.value;
	    }

	    function displayValue(props) {
	        return _.isObject(props.value) ? props.value[props.displayField] : props.value;
	    }

	    /* Getting the display value when the prop value is a scalar means traversing the data source to find
	        the matching value.
	     */
	    function displayValueFromData(props) {
	        var dataSource = DataSource.create(props.dataSource);
	        var dataItem = dataSource.data().find(function (item) {
	            return item.get(props.valueField) === props.value;
	        });
	        // If no match is found, assume the value is a custom value
	        return dataItem ? dataItem.get(props.displayField) : props.value;
	    }

	    function SelectWidgetMixin(widgetName) {

	        return {
	            getDefaultProps: function getDefaultProps() {
	                return {
	                    onChange: $.noop,
	                    autoBind: true,
	                    disabled: false,
	                    readonly: false,
	                    noControl: false
	                };
	            },

	            getWidget: function getWidget() {
	                return $(ReactDOM.findDOMNode(this)).data(widgetName);
	            },

	            renderValue: function renderValue() {
	                var props = this.props;

	                if (_.isEmpty(props.value)) {
	                    return '';
	                }
	                if (_.isEmpty(props.displayField)) {
	                    return props.value;
	                }
	                // If the value is just an ID, the display value is in the DataSource.
	                if (!_.isObject(props.value)) {
	                    return displayValueFromData(props);
	                }
	                return kendo.toString(displayValue(props));
	            },

	            componentDidMount: function componentDidMount() {
	                if (this.props.noControl) {
	                    // Everything was done in JSX.
	                    return;
	                }

	                var props = this.props;
	                var $el = $(ReactDOM.findDOMNode(this));

	                $el[widgetName](_.defaults({
	                    autoBind: props.autoBind,
	                    dataSource: props.dataSource,
	                    dataTextField: props.displayField,
	                    dataValueField: props.valueField,
	                    filter: props.filter,
	                    optionLabel: props.optionLabel,
	                    placeholder: props.placeholder,
	                    template: props.template,
	                    value: rawValue(props),
	                    change: this.onChange
	                }, props.options));

	                if (props.disabled) {
	                    // disabled beats readonly
	                    this.getWidget().enable(false);
	                } else if (props.readonly) {
	                    this.getWidget().readonly(true);
	                }
	            },

	            componentDidUpdate: function componentDidUpdate(prevProps) {
	                if (this.props.noControl) {
	                    return;
	                }

	                var props = this.props;
	                var kendoWidget = this.getWidget();

	                if (props.dataSource !== prevProps.dataSource) {
	                    kendoWidget.setDataSource(props.dataSource);
	                }

	                if (props.value !== prevProps.value) {
	                    kendoWidget.value(rawValue(props));
	                }

	                if (props.disabled !== prevProps.disabled) {
	                    kendoWidget.enable(!props.disabled);
	                } else if (props.readonly !== prevProps.readonly) {
	                    kendoWidget.readonly(props.readonly);
	                }
	            },

	            componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	                console.assert(_.isEqual(_.pick(nextProps, CANNOT_CHANGE), _.pick(this.props, CANNOT_CHANGE)), 'these props cannot change after mount');
	            },

	            componentWillUnmount: function componentWillUnmount() {
	                if (this.props.noControl) {
	                    return;
	                }
	                this.getWidget().destroy();
	            },

	            onChange: function onChange(event) {
	                var kendoWidget = event.sender;
	                var value = kendoWidget.value();
	                var valueObject = kendoWidget.dataItem();

	                // Put the original value back until new props force the change
	                kendoWidget.value(rawValue(this.props));

	                // Don't return a model instance to the caller, just the object data
	                this.props.onChange(value, valueObject ? valueObject.toJSON() : null);
	            }
	        };
	    }

	    return SelectWidgetMixin;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(3), __webpack_require__(5), __webpack_require__(11)], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, React, Common, ImmutableOptimizations) {
	    'use strict';

	    var PropTypes = React.PropTypes;

	    function rawValue(props) {
	        var value = props.value;

	        if (_.isEmpty(value)) {
	            return value;
	        }

	        value = _.isArray(value) ? value : [value];

	        return value.map(function (val) {
	            return _.isObject(val) ? val[props.valueField] : val;
	        });
	    }

	    function toPlainObject(data) {
	        return data.toJSON();
	    }

	    var KendoMultiSelect = React.createClass({
	        displayName: 'KendoMultiSelect',

	        mixins: [ImmutableOptimizations(['onChange', 'dataSource'])],

	        statics: { fieldClass: function fieldClass() {
	                return 'formFieldMultiselect';
	            } },

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

	        getDefaultProps: function getDefaultProps() {
	            return {
	                disabled: false,
	                readonly: false,
	                value: [],
	                onChange: _.noop
	            };
	        },

	        /*jshint ignore:start */
	        render: function render() {
	            return React.createElement('select', { id: this.props.id, multiple: 'multiple' });
	        },
	        /*jshint ignore:end */

	        componentDidMount: function componentDidMount() {
	            var $el = Common.findWidget(this);

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
	                kendoWidget.value(rawValue(this.props));
	            }

	            if (this.props.disabled) {
	                // disabled beats readonly
	                kendoWidget.enable(false);
	            } else if (this.props.readonly) {
	                kendoWidget.readonly(true);
	            }
	        },

	        componentWillUnmount: function componentWillUnmount() {
	            Common.findWidget(this, 'kendoMultiSelect').destroy();
	        },

	        componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	            var cantChange = ['template', 'dataSource', 'valueField', 'displayField', 'placeholder'];
	            console.assert(_.isEqual(_.pick(nextProps, cantChange), _.pick(this.props, cantChange)), 'these props cant change after mount');
	        },

	        componentDidUpdate: function componentDidUpdate(prevProps) {
	            var kendoWidget = Common.findWidget(this, 'kendoMultiSelect');

	            if (prevProps.dataSource !== this.props.dataSource) {
	                kendoWidget.setDataSource(this.props.dataSource);
	            }

	            if (this.props.value !== prevProps.value) {
	                kendoWidget.value(rawValue(this.props));
	            }

	            if (this.props.disabled !== prevProps.disabled) {
	                kendoWidget.enable(!this.props.disabled);
	            } else if (this.props.readonly !== prevProps.readonly) {
	                kendoWidget.readonly(this.props.readonly);
	            }
	        },

	        onChange: function onChange(event) {
	            var kendoWidget = event.sender;
	            var values = _.clone(kendoWidget.value());
	            var dataItems = kendoWidget.dataItems().map(toPlainObject);

	            // Before we update the value, we need to clear the filter or some values may not
	            // be recognized as being in the data source.
	            if (kendoWidget.dataSource.filter()) {
	                kendoWidget.dataSource.filter(null);
	            }
	            // To keep the "Flux" loop, we need to reset the widget value to props so that data flows down.
	            kendoWidget.value(rawValue(this.props));

	            // Provide both scalar and object values for clients
	            this.props.onChange(values, dataItems);
	        }
	    });

	    return KendoMultiSelect;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(3), __webpack_require__(22), __webpack_require__(8), __webpack_require__(11)], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, React, FormField, AutoControl, ImmutableOptimizations) {
	    'use strict';

	    var EXCLUDE_FROM_CONTROL = ['isValid', 'layout'];

	    var PropTypes = React.PropTypes;

	    var AutoField = React.createClass({
	        displayName: 'AutoField',

	        mixins: [ImmutableOptimizations(['onChange', 'dataSource'])],

	        propTypes: _.extend({
	            fieldInfo: PropTypes.object.isRequired,
	            isValid: PropTypes.array,
	            layout: PropTypes.string
	        }, AutoControl.propTypes),

	        getDefaultProps: function getDefaultProps() {
	            return {
	                isValid: [true, '']
	            };
	        },

	        render: function render() {
	            var controlProps = _.omit(this.props, EXCLUDE_FROM_CONTROL);

	            return React.createElement(
	                FormField,
	                { fieldInfo: this.props.fieldInfo, isValid: this.props.isValid, layout: this.props.layout },
	                React.createElement(AutoControl, controlProps)
	            );
	        }
	    });

	    return AutoField;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(3), __webpack_require__(8), __webpack_require__(23)], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, React, AutoControl, ControlCommon) {
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

	    var FormField = React.createClass({
	        displayName: 'FormField',

	        getDefaultProps: function getDefaultProps() {
	            return {
	                fieldInfo: {},
	                layout: 'formField',
	                noControl: false,
	                isValid: [true, ''],
	                lockable: false,
	                locked: false,
	                onStickyChange: function onStickyChange(isLocked) {/* set or clear a sticky */},
	                width: '100%',
	                marginLeft: '0',
	                noLabel: false
	            };
	        },

	        /* jshint ignore:start */
	        render: function render() {
	            var fieldInfo = _.defaults({}, this.props.fieldInfo, DEFAULTS);

	            var hasInfoTooltip = !!fieldInfo.helpText;
	            var hasErrorTooltip = !this.props.isValid[0] && (this.props.isValid[1] || '').length > 0;

	            var classes = _.compact([this.props.layout, determineFieldClass(this.props.children), ControlCommon.quadState(fieldInfo.disabled, fieldInfo.readOnly, this.props.isValid, this.props.noControl), hasInfoTooltip ? 'hasTooltip' : null, hasErrorTooltip ? 'hasErrorTooltip' : null, this.props.lockable ? 'lockable' : null]);

	            var lockedClasses = _.compact(['fieldLock', this.props.locked ? 'fieldLockOn' : null]);
	            var lockDiv = this.props.lockable ? React.createElement('div', { className: lockedClasses.join(' '), onClick: this.toggleLock }) : null;

	            var styles = {
	                'width': this.props.width,
	                'marginLeft': this.props.marginLeft
	            };

	            var statusIcon = hasInfoTooltip ? React.createElement('span', { className: 'statusIcon' }) : null;

	            // If there is no label and no icon, we must render &nbsp; so the fields line up right.

	            var label = (fieldInfo.label || '').length === 0 && statusIcon === null ? React.createElement(
	                'label',
	                { className: 'formLabel' },
	                ' '
	            ) : // unicode &nbsp; to work around JSX bug:  https://groups.google.com/forum/?fromgroups=#!topic/reactjs/7FmlIyJBofA
	            React.createElement(
	                'label',
	                { className: 'formLabel' },
	                fieldInfo.label,
	                statusIcon
	            );

	            return React.createElement(
	                'div',
	                { className: classes.join(' '), 'data-tooltip': fieldInfo.helpText, 'data-error-tooltip': this.props.isValid[1], style: styles },
	                this.props.noLabel ? null : label,
	                React.createElement(
	                    'div',
	                    { className: 'formElement' },
	                    this.props.children
	                ),
	                lockDiv
	            );
	        },
	        /* jshint ignore:end */

	        componentWillReceiveProps: function componentWillReceiveProps(newProps) {
	            var wasInvalid = !this.props.isValid[0];

	            // If the field has become valid, hide the error tooltip.
	            if (wasInvalid && newProps.isValid[0]) {
	                ControlCommon.hideErrorTooltip();
	            }
	        },

	        componentDidUpdate: function componentDidUpdate(prevProps) {
	            var wasInvalid = prevProps.isValid[0] === false,
	                isStillInvalid = this.props.isValid[0] === false,
	                validationMessageChanged = prevProps.isValid[1] !== this.props.isValid[1];

	            if (wasInvalid && isStillInvalid && validationMessageChanged) {
	                ControlCommon.refreshErrorTooltip();
	            }
	        },

	        toggleLock: function toggleLock() {
	            var isLocked = !this.props.locked;
	            this.props.onStickyChange(isLocked);
	            this.setState({ locked: isLocked });
	        }
	    });

	    return FormField;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(6), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, $, kendo) {
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
	            content: function content(e) {
	                return e.target.parents('.hasTooltip').attr('data-tooltip');
	            },
	            show: function show() {
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
	            content: function content(e) {
	                return e.target.parents('.hasErrorTooltip').attr('data-error-tooltip');
	            },
	            show: function show() {
	                this.popup.element.addClass('formErrorTooltip');

	                this.targetMouseDown = this.hide.bind(this);
	                this.target().on('mousedown', this.targetMouseDown);
	            },
	            hide: function hide() {
	                this.target().off('mousedown', this.targetMouseDown);
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

	    /* Let tooltip users hook the popup open event to cancel showing an empty tooltip */
	    kendo.ui.Tooltip.fn._initPopup = _.wrap(kendo.ui.Tooltip.fn._initPopup, function (wrapped) {
	        wrapped.call(this);

	        if (this.options.open) {
	            this.popup.bind('open', this.options.open.bind(this));
	        }
	    });

	    return {
	        quadState: quadState,
	        attachFormTooltips: attachFormTooltips,
	        hideErrorTooltip: hideErrorTooltip,
	        refreshErrorTooltip: refreshErrorTooltip,
	        setKendoNumberState: setKendoNumberState,
	        setKendoNumberValue: setKendoNumberValue,
	        setKendoDisabledReadonly: setKendoDisabledReadonly
	    };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(3), __webpack_require__(11)], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, React, ImmutableOptimizations) {
	    'use strict';

	    var Button = React.createClass({
	        displayName: 'Button',

	        mixins: [ImmutableOptimizations(['onClick'])],

	        getDefaultProps: function getDefaultProps() {
	            return {
	                onClick: undefined,
	                disabled: false,
	                className: undefined // one string, space delimited (if you want to specify more than one class)
	            };
	        },

	        render: function render() {
	            var classes = _.compact([this.props.className, this.props.disabled ? 'buttonDisabled' : null]);
	            return React.createElement(
	                'button',
	                { className: classes.join(' '), onClick: this.props.onClick, disabled: this.props.disabled },
	                this.props.children
	            );
	        }
	    });

	    return Button;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(3), __webpack_require__(6), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, React, $, kendo) {
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

	    var Carousel = React.createClass({
	        displayName: 'Carousel',

	        statics: { fieldClass: function fieldClass() {
	                return 'formFieldCarousel';
	            } },

	        getDefaultProps: function getDefaultProps() {
	            return {
	                value: undefined, // integer - the selected index (0-based)
	                onChange: $.noop, // fluxes up the index as an integer
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

	        render: function render() {
	            var i = this.props.value;
	            var N = this.props.options.length;

	            if (this.props.options.length === 0) {
	                // If we have zero options (which can make sense sometimes),
	                // a selected value does not make sense.
	                console.assert(_.contains([undefined, null], this.props.value));
	            }

	            return React.createElement(
	                'div',
	                { className: 'carousel' },
	                React.createElement(
	                    'button',
	                    { disabled: N < 2, className: 'carouselButton backButton', onClick: _.partial(this.onChange, 'left') },
	                    React.createElement('i', { className: 'icon iconPrev' })
	                ),
	                React.createElement('input', { className: 'carouselInput', placeholder: this.props.placeholder, value: this.displayTextFn(i, N), readOnly: true, id: this.props.id }),
	                React.createElement(
	                    'button',
	                    { disabled: N < 2, className: 'carouselButton forwardButton', onClick: _.partial(this.onChange, 'right') },
	                    React.createElement('i', { className: 'icon iconNext' })
	                ),
	                React.createElement(
	                    'button',
	                    { className: 'carouselButton editButton', disabled: this.props.disabled, onClick: this.props.onEdit },
	                    'Edit Indices',
	                    React.createElement('i', { className: 'icon iconCaret' })
	                )
	            );
	        },

	        onChange: function onChange(direction) {
	            var i = this.props.value;
	            var N = this.props.options.length;

	            console.assert(_.contains(['left', 'right'], direction));
	            var nextIndex = direction === 'left' ? (i - 1 + N) % N : (i + 1) % N;

	            // don't actually move the carousel, the flux state must allow the change first.
	            this.props.onChange(nextIndex);
	        },

	        displayTextFn: function displayTextFn(i, N) {
	            if (this.props.displayTextFn) {
	                return this.props.displayTextFn(i, N);
	            } else {
	                return N === 0 ? '0 of 0' : kendo.format('{0} of {1}', i + 1, N);
	            }
	        }

	    });

	    return Carousel;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(6), __webpack_require__(3), __webpack_require__(11)], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, $, React, ImmutableOptimizations) {
	    'use strict';

	    return React.createClass({
	        mixins: [ImmutableOptimizations(['onChange'])],

	        statics: { fieldClass: function fieldClass() {
	                return 'formFieldCheckbox';
	            } },

	        getDefaultProps: function getDefaultProps() {
	            return {
	                value: undefined,
	                onChange: function onChange() {},
	                id: undefined,
	                label: undefined, //checkbox label, not field label
	                isValid: [true, ''],
	                disabled: false,
	                readonly: false
	            };
	        },

	        componentWillMount: function componentWillMount() {
	            this.stableUniqueId = this.props.id ? this.props.id : _.uniqueId();
	        },

	        /*jshint ignore:start */
	        render: function render() {
	            var props = this.props;

	            if (props.noControl) {
	                return React.createElement(
	                    'span',
	                    null,
	                    this.getDisplayValue()
	                );
	            }

	            function onKeyDown(e) {
	                if (e.key === ' ') {
	                    props.onChange(!props.value);
	                }
	            }
	            return React.createElement(
	                'span',
	                { className: 'CheckBox', tabIndex: '0', onKeyDown: onKeyDown },
	                React.createElement('input', { type: 'checkbox', id: this.stableUniqueId,
	                    checked: props.value, 'data-checked': props.value ? '' : null,
	                    onChange: this.onChange,
	                    disabled: props.disabled || props.readonly }),
	                React.createElement(
	                    'label',
	                    { htmlFor: this.stableUniqueId },
	                    props.label
	                )
	            );
	        },
	        /*jshint ignore:end */

	        onChange: function onChange(event) {
	            var val = event.target.checked;
	            this.props.onChange(val);
	        },

	        getDisplayValue: function getDisplayValue() {
	            return !!this.props.value ? 'Yes' : 'No';
	        }
	    });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(3), __webpack_require__(4), __webpack_require__(5), __webpack_require__(11)], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, React, kendo, Common, ImmutableOptimizations) {
	    'use strict';

	    var PropTypes = React.PropTypes;

	    var KendoAutoComplete = React.createClass({
	        displayName: 'KendoAutoComplete',

	        mixins: [ImmutableOptimizations(['onChange', 'onSelect', 'dataSource'])],

	        statics: {
	            fieldClass: function fieldClass() {
	                return 'formFieldAutocomplete';
	            }
	        },

	        propTypes: {
	            value: PropTypes.any,
	            onChange: PropTypes.func,
	            onSelect: PropTypes.func,
	            id: PropTypes.string,
	            dataSource: PropTypes.oneOfType([PropTypes.array.isRequired, PropTypes.object.isRequired]),
	            dataTextField: PropTypes.string,
	            disabled: PropTypes.bool,
	            readonly: PropTypes.bool,
	            options: PropTypes.object,
	            placeholder: PropTypes.string,
	            template: PropTypes.any
	        },

	        getDefaultProps: function getDefaultProps() {
	            return {
	                disabled: false,
	                readonly: false,
	                onChange: _.noop,
	                onSelect: _.noop
	            };
	        },

	        componentDidMount: function componentDidMount() {
	            var $el = Common.findWidget(this);

	            var widgetOptions = _.defaults({
	                dataSource: this.props.dataSource,
	                dataTextField: this.props.dataTextField,
	                placeholder: this.props.placeholder,
	                template: this.props.template,
	                change: this.onChange,
	                select: this.onSelect
	            }, this.props.options);

	            var autoComplete = $el.kendoAutoComplete(widgetOptions).data('kendoAutoComplete');

	            if (this.props.value) {
	                autoComplete.value(this.props.value);
	            }

	            if (this.props.disabled) {
	                autoComplete.enable(false);
	            } else if (this.props.readonly) {
	                autoComplete.readonly(true);
	            }
	        },

	        componentWillUnmount: function componentWillUnmount() {
	            Common.findWidget(this, 'kendoAutoComplete').destroy();
	        },

	        componentDidUpdate: function componentDidUpdate(prevProps) {
	            var autoComplete = Common.findWidget(this, 'kendoAutoComplete');

	            if (prevProps.dataSource !== this.props.dataSource) {
	                autoComplete.setDataSource(this.props.dataSource);
	            }

	            if (this.props.value !== prevProps.value) {
	                autoComplete.value(this.props.value);
	            }

	            if (this.props.disabled !== prevProps.disabled) {
	                autoComplete.enable(!this.props.disabled);
	            } else if (this.props.readonly !== prevProps.readonly) {
	                autoComplete.readonly(this.props.readonly);
	            }
	        },

	        /*jshint ignore:start */
	        render: function render() {
	            return React.createElement('input', { type: 'text', id: this.props.id, className: 'k-textbox' });
	        },
	        /*jshint ignore:end */

	        onChange: function onChange(e) {
	            var widget = e.sender;
	            var value = widget.value();

	            widget.value(this.props.value);

	            this.props.onChange(value);
	        },

	        onSelect: function onSelect(e) {
	            var widget = e.sender;

	            this.props.onSelect(widget.dataItem(e.item.index()));
	        }
	    });

	    return KendoAutoComplete;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(3), __webpack_require__(19), __webpack_require__(11)], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, React, SelectWidgetMixin, ImmutableOptimizations) {
	    'use strict';

	    var PropTypes = React.PropTypes;

	    var KendoDropDownList = React.createClass({
	        displayName: 'KendoDropDownList',

	        mixins: [SelectWidgetMixin('kendoDropDownList'), ImmutableOptimizations(['onChange'])],

	        propTypes: {
	            id: PropTypes.string,
	            value: PropTypes.any,
	            onChange: PropTypes.func,
	            autoBind: PropTypes.bool,
	            dataSource: PropTypes.oneOfType([PropTypes.array.isRequired, PropTypes.object.isRequired]),
	            displayField: PropTypes.string,
	            valueField: PropTypes.string,
	            disabled: PropTypes.bool,
	            readonly: PropTypes.bool,
	            options: PropTypes.object,
	            filter: PropTypes.string,
	            optionLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	            template: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
	        },

	        statics: {
	            fieldClass: function fieldClass() {
	                return 'formFieldCombobox';
	            }
	        },

	        /*jshint ignore:start */
	        render: function render() {
	            return this.props.noControl ? React.createElement(
	                'span',
	                { id: this.props.id },
	                this.renderValue()
	            ) : React.createElement('input', { id: this.props.id });
	        }
	        /*jshint ignore:end */
	    });

	    return KendoDropDownList;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(3), __webpack_require__(4), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, React, kendo, Common) {
	    'use strict';

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

	    function getValueIds(value) {
	        if (_.isArray(value)) {
	            return _.pluck(value, 'id');
	        }
	        if (_.isObject(value)) {
	            return [value.id];
	        }
	        return [];
	    }

	    function updateGridSelection(component, grid) {
	        var selectors = getValueIds(component.props.value).map(function (id) {
	            return grid.dataSource.get(id);
	        }).filter(function (dataItem) {
	            return !!dataItem;
	        }).map(function (dataItem) {
	            return 'tr[data-uid="' + dataItem.uid + '"]';
	        });

	        // Ignore change events while updating selection
	        grid.unbind('change', component.onGridChange);

	        // Clear the selection completely since we cannot de-select using grid.select()
	        grid.clearSelection();

	        if (selectors.length) {
	            grid.select(selectors.join(', '));
	        }

	        grid.bind('change', component.onGridChange);
	    }

	    function createRowTooltip(rowTooltip, $rootNode) {
	        var tooltipTemplate = kendo.template(rowTooltip);

	        $rootNode.kendoTooltip({
	            filter: 'tr',
	            showAfter: 800,
	            content: function content(e) {
	                // Run the template using the model object for the target's row
	                return tooltipTemplate($rootNode.data("kendoGrid").dataItem(e.target));
	            },
	            open: function open(e) {
	                // If the template returns empty text, cancel the popup
	                if (this.content.text().length === 0) {
	                    e.preventDefault();
	                }
	            }
	        });
	    }

	    var KendoGrid = React.createClass({
	        displayName: 'KendoGrid',

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
	            onChange: PropTypes.func,
	            rowTooltip: eitherType('string', 'func')
	        },

	        getDefaultProps: function getDefaultProps() {
	            return {
	                autoBind: true,
	                pageable: false,
	                scrollable: true,
	                selectable: false,
	                sortable: false,
	                onChange: _.noop
	            };
	        },

	        /*jshint ignore:start */
	        render: function render() {
	            return React.createElement('div', { className: this.props.className });
	        },
	        /*jshint ignore:end */

	        componentDidMount: function componentDidMount() {
	            var $rootNode = Common.findWidget(this);
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

	            if (this.props.rowTooltip) {
	                createRowTooltip(this.props.rowTooltip, $rootNode);
	            }
	        },

	        componentWillUnmount: function componentWillUnmount() {
	            Common.findWidget(this, 'kendoGrid').destroy();

	            if (this.props.rowTooltip) {
	                Common.findWidget(this, 'kendoTooltip').destroy();
	            }
	        },

	        componentDidUpdate: function componentDidUpdate(prevProps) {
	            var grid = Common.findWidget(this, 'kendoGrid');

	            if (this.props.dataSource instanceof Array) {
	                if (!_.isEqual(this.props.dataSource, prevProps.dataSource)) {
	                    // This better be a datasource that was originally built from inline data.
	                    // I don't know how to detect this to verify it.
	                    grid.dataSource.data(this.props.dataSource);
	                }
	            } else if (prevProps.dataSource !== this.props.dataSource) {
	                grid.setDataSource(this.props.dataSource);
	            }

	            if (prevProps.value !== this.props.value) {
	                if (grid.selectable) {
	                    updateGridSelection(this, grid);
	                }
	            }
	        },

	        onGridDataBound: function onGridDataBound(e) {
	            var grid = e.sender;

	            if (grid.selectable) {
	                updateGridSelection(this, grid);
	            }
	            if (this.props.options && this.props.options.dataBound) {
	                this.props.options.dataBound(e);
	            }
	        },

	        onGridChange: function onGridChange(e) {
	            var grid = e.sender;
	            var selectedNodes = grid.select().get(); // get() unwraps the jQuery object

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
	            if (!isMultiSelect(this.props.selectable)) {
	                selectedValues = _.first(selectedValues);
	            }

	            this.props.onChange(selectedValues);
	        }
	    });

	    return KendoGrid;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(3), __webpack_require__(4), __webpack_require__(5), __webpack_require__(29)], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, React, kendo, Common, KendoGrid) {
	    'use strict';

	    var PropTypes = React.PropTypes;

	    var CheckTemplate = '<div><input id="#: uid #" type="checkbox" value="#: uid #" name="selector"><label></label></div>';
	    var RadioTemplate = '<div><input id="#: uid #" type="radio"    value="#: uid #" name="selector"><label></label></div>';

	    var SelectAllTemplate = '<div><input id="kgp_sel_all" type="checkbox" value="on"><label for="kgp_sel_all"></label></div>';

	    function buttonColumn(multiple) {
	        return {
	            template: kendo.template(multiple ? CheckTemplate : RadioTemplate),
	            headerTemplate: kendo.template(multiple ? SelectAllTemplate : '<div></div>'),
	            width: 34
	        };
	    }

	    function enableCheckboxSelection(grid) {
	        grid.selectable.userEvents.notify = function (eventName, data) {
	            // Make all "tap/click" events seem like they have the ctrlKey pressed, which gives a checkbox-style UX
	            if (eventName === 'tap') {
	                data.event.ctrlKey = true;
	            }
	            this.trigger(eventName, data);
	        };
	    }

	    var KendoGridPicker = React.createClass({ displayName: "KendoGridPicker",

	        propTypes: {
	            columns: PropTypes.array.isRequired,
	            multiple: PropTypes.bool,
	            value: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	            onChange: PropTypes.func
	        },

	        getDefaultProps: function getDefaultProps() {
	            return {
	                autoBind: true,
	                editable: false,
	                pageable: false,
	                multiple: true,
	                height: 250,
	                onChange: _.noop,
	                value: [] // list of selected records, just like combo.
	            };
	        },

	        render: function render() {
	            var columns = [buttonColumn(this.props.multiple)].concat(this.props.columns);

	            var selectable = this.props.multiple ? 'multiple, row' : 'row';
	            var gridProps = { columns: columns, selectable: selectable, onChange: this.onGridChange };

	            return React.createElement(KendoGrid, _.defaults(gridProps, this.props));
	        },

	        componentDidMount: function componentDidMount() {
	            var grid = Common.findWidget(this, 'kendoGrid');

	            // The standard kendo grid multiple selection UI requires holding the Control key to select multiple rows.
	            // Change the behavior to allow individual clicks to toggle the row's selection state.
	            if (this.props.multiple) {
	                enableCheckboxSelection(grid);
	            }

	            this.updateCheckboxValues();
	            grid.bind('dataBound', this.updateCheckboxValues);

	            // Handle a change to the "Select All" checkbox column
	            grid.thead.on('change', '#kgp_sel_all', function (e) {
	                if (e.target.checked) {
	                    grid.select('tr');
	                } else {
	                    grid.clearSelection();
	                }
	            });
	        },

	        componentDidUpdate: function componentDidUpdate() {
	            this.updateCheckboxValues();
	        },

	        updateCheckboxValues: function updateCheckboxValues() {
	            // the SSP page has changed, so we have new DOM.
	            // Sync up the DOM with the checked state.
	            var grid = Common.findWidget(this, 'kendoGrid');

	            var valueIDs = grid.select().get().map(function (tr) {
	                return tr.getAttribute('data-uid');
	            });
	            var allSelected = valueIDs.length === grid.dataSource.view().length;

	            // Update the checked state of radio/checkbox inputs
	            grid.tbody.find('input[name="selector"]').val(valueIDs);

	            // Update the Select All checkbox if our selection is the whole page
	            grid.thead.find('#kgp_sel_all').val(allSelected ? ['on'] : []);
	        },

	        onGridChange: function onGridChange(selectedValues) {
	            var grid = Common.findWidget(this, 'kendoGrid');

	            if (!this.props.multiple) {
	                this.props.onChange(selectedValues ? selectedValues.toJSON() : null);
	                return;
	            }

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
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(6), __webpack_require__(3), __webpack_require__(4), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, $, React, kendo, Common) {
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

	        getDefaultProps: function getDefaultProps() {
	            return {
	                autoBind: false,
	                scrollToSelectedItem: false,
	                scrollDuration: 150,
	                selectable: false,
	                template: '<div data-model-id="${id}">${id}</div>',
	                onChange: _.noop
	            };
	        },

	        /* jshint ignore:start */
	        render: function render() {
	            return React.createElement('div', { className: this.props.className });
	        },
	        /* jshint ignore:end */

	        /**
	         * This method updates the ListView's selection and optionally animates scrolling that selection to the top of the list.
	         */
	        selectValue: function selectValue(selectedId, scrollToSelectedItem) {
	            var $rootNode = Common.findWidget(this);
	            var listView = Common.findWidget(this, 'kendoListView');
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

	        syncSelectionWithKendo: function syncSelectionWithKendo() {
	            this.selectValue(this.props.value, this.props.scrollToSelectedItem);
	        },

	        componentDidUpdate: function componentDidUpdate(prevProps) {
	            if (this.props.selectable && !_.isEqual(this.props.value, prevProps.value)) {
	                this.syncSelectionWithKendo();
	            }
	        },

	        componentDidMount: function componentDidMount() {
	            var $rootNode = Common.findWidget(this);
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

	        componentWillUnmount: function componentWillUnmount() {

	            Common.findWidget(this, 'kendoListView').destroy();
	        },

	        onValueChange: function onValueChange(e) {
	            var listView = e.sender;
	            var val = listView.select().data('modelId');

	            this.selectValue(this.props.value); // unwind the widget state change to respect flux lifecycle
	            this.props.onChange(val);
	        },

	        onDataBound: function onDataBound() {
	            if (this.props.selectable) {
	                this.syncSelectionWithKendo();
	            }
	        }
	    });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(6), __webpack_require__(3), __webpack_require__(4), __webpack_require__(5), __webpack_require__(11)], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, $, React, kendo, ReactCommon, ImmutableOptimizations) {
	    'use strict';

	    void ReactCommon;
	    /**
	     * Takes a "tabs" prop which is a map from title string to a JSX instance.
	     * This component is not presently stateful so we don't get to control what is selected.
	     */
	    var KendoTabStrip = React.createClass({
	        displayName: 'KendoTabStrip',

	        componentWillMount: function componentWillMount() {
	            console.assert(_.isObject(this.props.tabs) && _.keys(this.props.tabs).length > 0);
	        },

	        componentWillUnmount: function componentWillUnmount() {
	            this.tabStrip.unbind('select', this.onSelect);
	        },

	        componentDidMount: function componentDidMount() {
	            var $el = ReactCommon.findWidget(this);
	            $el.kendoTabStrip({
	                select: this.onSelect
	            });
	            this.tabStrip = $el.data('kendoTabStrip');
	        },

	        onSelect: function onSelect(event) {
	            var item = $(event.item);
	            var index = item.data('wspt-index');
	            if (this.props.onChange && !this.suppressEvents) {
	                //                this.props.onChange(index);
	            }
	        },

	        /* jshint ignore:start */
	        render: function render() {

	            var lis = [];
	            _.each(_.keys(this.props.tabs), function (title, index) {
	                var jsx = index === 0 ? React.createElement(
	                    'li',
	                    { className: 'k-state-active', 'data-wspt-index': index, key: index },
	                    title
	                ) : React.createElement(
	                    'li',
	                    { 'data-wspt-index': index, key: index },
	                    title
	                );
	                lis.push(jsx);
	            });

	            var content = ReactCommon.wrapItemsDiv(_.values(this.props.tabs));

	            //            if (this.tabStrip && this.props.selectedTab) {
	            //                this.suppressEvents = true;
	            //                this.tabStrip.select(this.props.selectedTab);
	            //                this.suppressEvents = false;
	            //            }

	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'ul',
	                    null,
	                    lis
	                ),
	                content
	            );
	        }
	        /* jshint ignore:end */
	    });

	    return KendoTabStrip;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(3), __webpack_require__(11)], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, React, ImmutableOptimizations) {
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
	    var MultiSelect = React.createClass({
	        displayName: 'MultiSelect',

	        mixins: [ImmutableOptimizations(['onChange'])],

	        statics: { fieldClass: function fieldClass() {
	                return 'formFieldMultiselect';
	            } },

	        propTypes: {
	            id: PropTypes.string,
	            selectors: PropTypes.array.isRequired,
	            selections: PropTypes.array,
	            isFlat: PropTypes.bool
	        },

	        getDefaultProps: function getDefaultProps() {
	            return {
	                disabled: false,
	                readonly: false,
	                isFlat: true,
	                selectors: [],
	                selections: [], // this is the value prop that pairs with onChange.
	                size: 3,
	                onChange: function onChange() {}
	            };
	        },

	        getInitialState: function getInitialState() {
	            // Here, we cull out all the inactive panels.
	            var selectors = this.props.selectors;

	            // implements the behavior that the absence of an active property makes it automatically active.
	            function isActive(selector) {
	                return _.isUndefined(selector.active) || !!selector.active;
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
	                    g.children = _.filter(group.children, function (child) {
	                        return isActive(child);
	                    });
	                    return g;
	                });
	                selectors = _.filter(selectors, function (g) {
	                    return 0 < g.children.length;
	                });
	            }
	            return { selectors: selectors };
	        },

	        /* jshint ignore:start */
	        render: function render() {
	            var props = this.props;
	            var selectors = this.state.selectors;
	            var selections = this.props.selections;

	            function option(selector) {
	                return React.createElement(
	                    'option',
	                    { key: selector.id, value: selector.id },
	                    selector.name
	                );
	            }

	            if (this.props.isFlat) {
	                selectors = _.map(selectors, function (selector) {
	                    return option(selector); // (<option value={selector.id}>{selector.name}</option>);
	                });
	            } else {
	                    selectors = _.map(selectors, function (group) {
	                        var options = _.map(group.children, function (child) {
	                            return option(child); // (<option value={child.id}>{child.name}</option>);
	                        });
	                        return React.createElement(
	                            'optgroup',
	                            { key: group.name, label: group.name },
	                            options
	                        );
	                    });
	                }

	            function onChange(event) {
	                var selections = _.map(_.filter(event.target.options, function (opt) {
	                    return opt.selected;
	                }), function (opt) {
	                    return opt.value;
	                });
	                props.onChange(selections);
	            }
	            return React.createElement(
	                'select',
	                { id: props.id, value: selections, multiple: 'multiple', disabled: this.props.disabled,
	                    onChange: !this.props.readonly ? onChange : undefined },
	                selectors
	            );
	        }
	        /* jshint ignore:end */
	    });

	    return MultiSelect;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, React) {
	    'use strict';

	    var PropTypes = React.PropTypes;

	    function fireChange(props) {
	        if (props.readonly) {
	            return;
	        }
	        props.onChange(props.value);
	    }

	    /**
	     *     Careful:
	     *       This must be contained by a RadioGroup or it won't style right.
	     */
	    var Radio = React.createClass({
	        displayName: 'Radio',

	        propTypes: {
	            name: PropTypes.string.isRequired,
	            value: PropTypes.any.isRequired,
	            onChange: PropTypes.func,
	            checked: PropTypes.bool,
	            disabled: PropTypes.bool,
	            readonly: PropTypes.bool
	        },

	        getDefaultProps: function getDefaultProps() {
	            return {
	                onChange: _.noop,
	                disabled: false,
	                readonly: false,
	                checked: false
	            };
	        },

	        componentWillMount: function componentWillMount() {
	            this.stableUniqueId = _.uniqueId();
	        },

	        /*jshint ignore:start */
	        render: function render() {
	            // Disabled controls should not receive focus
	            var tabIndex = this.props.disabled ? null : 0;

	            return React.createElement(
	                'span',
	                { className: 'formRadio', tabIndex: tabIndex, onKeyDown: this.onKeyDown },
	                React.createElement('input', { type: 'radio', name: this.props.name, id: this.stableUniqueId,
	                    value: this.props.value, onChange: this.onChange,
	                    checked: this.props.checked, 'data-checked': this.props.checked ? '' : null,
	                    disabled: this.props.disabled }),
	                React.createElement(
	                    'label',
	                    { htmlFor: this.stableUniqueId },
	                    this.props.children
	                )
	            );
	        },
	        /*jshint ignore:end */

	        onChange: function onChange() {
	            fireChange(this.props);
	        },

	        onKeyDown: function onKeyDown(e) {
	            if (e.key === ' ') {
	                // Prevent the default always so that the space key doesn't scroll the page.
	                e.preventDefault();

	                fireChange(this.props);
	            }
	        }
	    });

	    return Radio;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3), __webpack_require__(34)], __WEBPACK_AMD_DEFINE_RESULT__ = function (React, Radio) {
	    'use strict';

	    var PropTypes = React.PropTypes;

	    var RadioGroup = React.createClass({ displayName: "RadioGroup",

	        propTypes: {
	            name: PropTypes.string,
	            value: PropTypes.any,
	            onChange: PropTypes.func,
	            dataSource: PropTypes.arrayOf(PropTypes.shape({
	                value: PropTypes.any,
	                label: PropTypes.string
	            })),
	            className: PropTypes.string
	        },

	        statics: { fieldClass: function fieldClass() {
	                return 'formFieldRadio';
	            } },

	        render: function render() {
	            var props = this.props;

	            function renderRadio(option) {
	                return React.createElement(Radio, {
	                    key: option.value,
	                    name: props.name,
	                    value: option.value,
	                    onChange: props.onChange,
	                    checked: option.value == props.value
	                }, option.label);
	            }

	            React.Children.forEach(this.props.children, function (radio) {
	                // The use of double-equals is intentional here, so that numbers represented as strings will match.
	                radio.props.checked = radio.props.value == props.value;
	            });

	            return React.createElement("fieldset", { className: props.className }, this.props.dataSource ? this.props.dataSource.map(renderRadio) : this.props.children);
	        }
	    });

	    return RadioGroup;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(3), __webpack_require__(4), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, React, kendo, Common) {
	    'use strict';

	    /**
	     * Takes a "tabs" prop which is a map from title string to a JSX instance.
	     * This component is not presently stateful so we don't get to control what is selected.
	     */

	    var TabStrip = React.createClass({
	        displayName: 'TabStrip',

	        getDefaultProps: function getDefaultProps() {
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

	        componentWillMount: function componentWillMount() {
	            console.assert(_.isObject(this.props.tabs) && _.keys(this.props.tabs).length > 0);
	            this.stableUniqueId = _.uniqueId('tab-');
	        },

	        /**
	         * This fixes a problem with certain content that switches from hidden to shown.
	         * My theory is that browsers don't flow hidden elements.  The particular case involves picking a Task transition that make metadata editable.
	         * At the time this happens, the metadata are re-rendered but are not shown and the splitter gets confounded.  This is simply to force a reflow of the
	         * content that is newly made visible.
	         */
	        componentDidUpdate: function componentDidUpdate() {
	            Common.findWidget(this).find('.k-content.k-state-active').resize();
	        },

	        /* jshint ignore:start */
	        render: function render() {
	            var self = this;

	            var lis = [];
	            var keys = _.keys(this.props.tabs),
	                len = keys.length;
	            _.each(keys, function (title, index) {
	                var id = kendo.format('{0}-{1}', self.stableUniqueId, index);
	                var classes = [index === 0 ? 'k-first' : null, index === len - 1 ? 'k-last' : null, 'k-state-default', 'k-item', index === self.props.selectedTab ? 'k-tab-on-top k-state-active' : null];

	                lis.push(React.createElement(
	                    'li',
	                    { key: index, className: _.compact(classes).join(' '), role: 'tab', 'aria-controls': id },
	                    React.createElement(
	                        'a',
	                        { className: 'k-link', onClick: _.partial(self.onTabClick, index) },
	                        title
	                    )
	                ));
	            });

	            var divs = [];
	            _.each(_.values(this.props.tabs), function (jsx, index) {
	                var id = kendo.format('{0}-{1}', self.stableUniqueId, index);

	                var jsx = index === self.props.selectedTab ? React.createElement(
	                    'div',
	                    { key: index, className: 'k-content k-state-active', role: 'tabpanel', 'aria-expanded': 'true', style: visibleStyle },
	                    jsx
	                ) : React.createElement(
	                    'div',
	                    { key: index, className: 'k-content', 'aria-hidden': 'true', role: 'tabpanel', 'aria-expanded': 'false', style: hiddenStyle },
	                    self.props.elideInactiveContent ? null : jsx
	                );
	                divs.push(jsx);
	            });

	            var className = _.compact(['k-widget', 'k-header', 'k-tabstrip', this.props.className]).join(' ');
	            return React.createElement(
	                'div',
	                { 'data-role': 'tabstrip', tabIndex: '0', className: className, role: 'tablist' },
	                React.createElement(
	                    'ul',
	                    { className: 'k-tabstrip-items k-reset' },
	                    lis
	                ),
	                divs
	            );
	        },
	        /* jshint ignore:end */

	        onTabClick: function onTabClick(index) {
	            this.props.onChange(index);
	        }
	    });

	    var styleDisplayBlock = { display: 'block' };
	    var visibleStyle = { display: 'block', height: 'auto', overflow: 'visible', opacity: 1 };
	    var hiddenStyle = { height: 'auto', overflow: 'visible', opacity: 1, display: 'none' };

	    return TabStrip;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, React) {
	    'use strict';

	    var VISIBLE = { display: 'inline-block' };
	    void VISIBLE;
	    var INVISIBLE = { display: 'none' };
	    void INVISIBLE;

	    var PropTypes = React.PropTypes;

	    var PromiseButton = React.createClass({
	        displayName: 'PromiseButton',

	        propTypes: {
	            label: PropTypes.string,
	            className: PropTypes.string,
	            disabled: PropTypes.bool,
	            terminateChain: PropTypes.bool,
	            handler: PropTypes.func
	        },

	        getDefaultProps: function getDefaultProps() {
	            return {
	                label: '',
	                className: 'secondaryButton',
	                disabled: false,
	                terminateChain: true,
	                handler: _.identity
	            };
	        },

	        getInitialState: function getInitialState() {
	            return {
	                busy: false
	            };
	        },

	        render: function render() {
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
	            return React.createElement(
	                'button',
	                { className: this.props.className, disabled: disabled, onClick: clickHandler },
	                this.props.label || this.props.children,
	                React.createElement('i', { className: 'k-loading', style: this.state.busy ? VISIBLE : INVISIBLE })
	            );
	            /*jshint ignore:end */
	        }
	    });

	    return PromiseButton;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(6), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, $, React) {
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

	    var SearchBox = React.createClass({
	        displayName: 'SearchBox',

	        getDefaultProps: function getDefaultProps() {
	            return {
	                disabled: false,
	                fireClearEvent: false,
	                instantSearch: false,
	                onChange: function onChange() {}
	            };
	        },

	        componentWillMount: function componentWillMount() {
	            console.assert(this.props.handler, 'SearchBox requires a handler function');
	        },

	        /*jshint ignore:start */
	        render: function render() {
	            var iconClearStyle = { visibility: _.isEmpty(this.props.value) ? 'hidden' : 'visible' };

	            return React.createElement(
	                'span',
	                { className: 'searchBox' },
	                React.createElement('input', { type: 'text', disabled: this.props.disabled, placeholder: this.props.placeholder, value: this.props.value,
	                    autoComplete: 'off', onKeyDown: this.onKeyDown, defaultValue: this.props.defaultValue, onChange: this.onTextChange }),
	                React.createElement('span', { className: 'iconClear', onClick: this.onClickClear, onMouseDown: noBrowserDefault, style: iconClearStyle }),
	                React.createElement('span', { className: 'iconSearch', onClick: this.onClickSearch, onMouseDown: noBrowserDefault })
	            );
	        },
	        /*jshint ignore:end */

	        onKeyDown: function onKeyDown(event) {
	            // Don't let the Enter key propagate because it might cause parent components to do things we don't want
	            if (event.key === 'Enter') {
	                event.stopPropagation();
	                event.preventDefault();

	                this.props.handler(event.target.value);
	            }
	        },

	        onClickClear: function onClickClear(event) {
	            event.stopPropagation();

	            this.props.onChange('');

	            if (this.props.fireClearEvent) {
	                this.props.handler('');
	            }
	        },

	        onClickSearch: function onClickSearch(event) {
	            event.stopPropagation();

	            if (!this.props.disabled) {
	                this.props.handler(this.props.value);
	            }
	        },

	        onTextChange: function onTextChange(event) {
	            this.props.onChange(event.target.value);

	            if (this.props.instantSearch) {
	                this.props.handler(event.target.value);
	            }
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
	            setVisible(clearBtn, input.val().length > 0);
	        }
	        function iconClick(e) {
	            e.stopPropagation();

	            if (e.target.className === 'iconClear') {
	                input.val('');
	                setVisible(clearBtn, false);
	            } else if (e.target.className === 'iconSearch') {
	                handler(input.val());
	            }
	        }

	        input.attr('placeholder', placeholder).on('keydown', inputKey);
	        searchBox.find('span').on('mousedown', noBrowserDefault).on('click', iconClick);
	        setVisible(clearBtn, false);
	    };

	    return SearchBox;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (_) {
	    'use strict';

	    /**
	     * @Deprecated in favor of wingspan-cursors and Flux.js
	     */

	    var FluxFormMixin = {
	        componentWillMount: function componentWillMount() {
	            console.assert(this.formFields, 'Required to define the form; see SetOfficeStatusComponent for a working usage');
	            console.assert(_.isFunction(this.isFieldValid), 'Need a field validation function');
	        },

	        getInitialState: function getInitialState() {
	            return {
	                record: undefined
	            };
	        },

	        onFieldChange: function onFieldChange(fieldName, newValue) {
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

	        isFormValid: function isFormValid() {
	            if (this.state.record) {
	                // form is valid if each field is valid
	                return _.chain(this.formFields).map(this.isFieldValid).map(_.first).reduce(and).value();
	            } else {
	                return false;
	            }

	            function and(a, b) {
	                return a && b;
	            }
	        }
	    };

	    return FluxFormMixin;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }
/******/ ])
});
;