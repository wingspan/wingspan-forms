(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("kendo"), require("underscore"), require("react-dom"), require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "kendo", "underscore", "react-dom", "jquery"], factory);
	else if(typeof exports === 'object')
		exports["WingspanForms"] = factory(require("react"), require("kendo"), require("underscore"), require("react-dom"), require("jquery"));
	else
		root["WingspanForms"] = factory(root["react"], root["kendo"], root["underscore"], root["react-dom"], root["jquery"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__) {
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

	'use strict';

	var _AutoControl = __webpack_require__(1);

	var _AutoControl2 = _interopRequireDefault(_AutoControl);

	var _FormField = __webpack_require__(19);

	var _FormField2 = _interopRequireDefault(_FormField);

	var _AutoField = __webpack_require__(21);

	var _AutoField2 = _interopRequireDefault(_AutoField);

	var _Button = __webpack_require__(22);

	var _Button2 = _interopRequireDefault(_Button);

	var _Carousel = __webpack_require__(23);

	var _Carousel2 = _interopRequireDefault(_Carousel);

	var _CheckBox = __webpack_require__(24);

	var _CheckBox2 = _interopRequireDefault(_CheckBox);

	var _KendoAutoComplete = __webpack_require__(25);

	var _KendoAutoComplete2 = _interopRequireDefault(_KendoAutoComplete);

	var _KendoComboBox = __webpack_require__(3);

	var _KendoComboBox2 = _interopRequireDefault(_KendoComboBox);

	var _KendoDatePicker = __webpack_require__(10);

	var _KendoDatePicker2 = _interopRequireDefault(_KendoDatePicker);

	var _KendoDateTimePicker = __webpack_require__(12);

	var _KendoDateTimePicker2 = _interopRequireDefault(_KendoDateTimePicker);

	var _KendoDropDownList = __webpack_require__(26);

	var _KendoDropDownList2 = _interopRequireDefault(_KendoDropDownList);

	var _KendoGrid = __webpack_require__(27);

	var _KendoGrid2 = _interopRequireDefault(_KendoGrid);

	var _KendoGridPicker = __webpack_require__(28);

	var _KendoGridPicker2 = _interopRequireDefault(_KendoGridPicker);

	var _KendoListView = __webpack_require__(29);

	var _KendoListView2 = _interopRequireDefault(_KendoListView);

	var _KendoMultiSelect = __webpack_require__(14);

	var _KendoMultiSelect2 = _interopRequireDefault(_KendoMultiSelect);

	var _KendoNumericTextBox = __webpack_require__(15);

	var _KendoNumericTextBox2 = _interopRequireDefault(_KendoNumericTextBox);

	var _KendoPager = __webpack_require__(30);

	var _KendoPager2 = _interopRequireDefault(_KendoPager);

	var _KendoPanelBar = __webpack_require__(31);

	var _KendoPanelBar2 = _interopRequireDefault(_KendoPanelBar);

	var _KendoTabStrip = __webpack_require__(32);

	var _KendoTabStrip2 = _interopRequireDefault(_KendoTabStrip);

	var _KendoText = __webpack_require__(16);

	var _KendoText2 = _interopRequireDefault(_KendoText);

	var _KendoTimePicker = __webpack_require__(13);

	var _KendoTimePicker2 = _interopRequireDefault(_KendoTimePicker);

	var _MultiSelect = __webpack_require__(33);

	var _MultiSelect2 = _interopRequireDefault(_MultiSelect);

	var _MultilineText = __webpack_require__(17);

	var _MultilineText2 = _interopRequireDefault(_MultilineText);

	var _Radio = __webpack_require__(34);

	var _Radio2 = _interopRequireDefault(_Radio);

	var _RadioGroup = __webpack_require__(35);

	var _RadioGroup2 = _interopRequireDefault(_RadioGroup);

	var _SwitchBox = __webpack_require__(18);

	var _SwitchBox2 = _interopRequireDefault(_SwitchBox);

	var _TabStrip = __webpack_require__(36);

	var _TabStrip2 = _interopRequireDefault(_TabStrip);

	var _PromiseButton = __webpack_require__(37);

	var _PromiseButton2 = _interopRequireDefault(_PromiseButton);

	var _SearchBox = __webpack_require__(38);

	var _SearchBox2 = _interopRequireDefault(_SearchBox);

	var _HoverView = __webpack_require__(39);

	var _HoverView2 = _interopRequireDefault(_HoverView);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* Library entry-point */
	module.exports = {
	    AutoControl: _AutoControl2.default,
	    FormField: _FormField2.default,
	    AutoField: _AutoField2.default,
	    Button: _Button2.default,
	    Carousel: _Carousel2.default,
	    CheckBox: _CheckBox2.default,
	    KendoAutoComplete: _KendoAutoComplete2.default,
	    KendoComboBox: _KendoComboBox2.default,
	    KendoDatePicker: _KendoDatePicker2.default,
	    KendoDateTimePicker: _KendoDateTimePicker2.default,
	    KendoDropDownList: _KendoDropDownList2.default,
	    KendoGrid: _KendoGrid2.default,
	    KendoGridPicker: _KendoGridPicker2.default,
	    KendoListView: _KendoListView2.default,
	    KendoMultiSelect: _KendoMultiSelect2.default,
	    KendoNumericTextBox: _KendoNumericTextBox2.default,
	    KendoPager: _KendoPager2.default,
	    KendoPanelBar: _KendoPanelBar2.default,
	    KendoTabStrip: _KendoTabStrip2.default,
	    KendoText: _KendoText2.default,
	    KendoTimePicker: _KendoTimePicker2.default,
	    MultiSelect: _MultiSelect2.default,
	    MultilineText: _MultilineText2.default,
	    Radio: _Radio2.default,
	    RadioGroup: _RadioGroup2.default,
	    SwitchBox: _SwitchBox2.default,
	    TabStrip: _TabStrip2.default,
	    PromiseButton: _PromiseButton2.default,
	    SearchBox: _SearchBox2.default,
	    HoverView: _HoverView2.default
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _KendoComboBox = __webpack_require__(3);

	var _KendoComboBox2 = _interopRequireDefault(_KendoComboBox);

	var _KendoDatePicker = __webpack_require__(10);

	var _KendoDatePicker2 = _interopRequireDefault(_KendoDatePicker);

	var _KendoDateTimePicker = __webpack_require__(12);

	var _KendoDateTimePicker2 = _interopRequireDefault(_KendoDateTimePicker);

	var _KendoTimePicker = __webpack_require__(13);

	var _KendoTimePicker2 = _interopRequireDefault(_KendoTimePicker);

	var _KendoMultiSelect = __webpack_require__(14);

	var _KendoMultiSelect2 = _interopRequireDefault(_KendoMultiSelect);

	var _KendoNumericTextBox = __webpack_require__(15);

	var _KendoNumericTextBox2 = _interopRequireDefault(_KendoNumericTextBox);

	var _KendoText = __webpack_require__(16);

	var _KendoText2 = _interopRequireDefault(_KendoText);

	var _MultilineText = __webpack_require__(17);

	var _MultilineText2 = _interopRequireDefault(_MultilineText);

	var _SwitchBox = __webpack_require__(18);

	var _SwitchBox2 = _interopRequireDefault(_SwitchBox);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var TYPE_TO_CONTROL = {
	    'text': _KendoText2.default,
	    'text:multiLine': _MultilineText2.default,
	    'number': _KendoNumericTextBox2.default,
	    'date': _KendoDatePicker2.default,
	    'datetime': _KendoDateTimePicker2.default,
	    'time': _KendoTimePicker2.default,
	    'boolean': _SwitchBox2.default
	};
	var EXCLUDE_FROM_CONTROL = ['fieldInfo', 'controlForField'];

	var PropTypes = _react2.default.PropTypes;

	var FieldInfoType = _react2.default.PropTypes.shape({
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

	var AutoControl = _react2.default.createClass({
	    displayName: 'AutoControl',


	    statics: {
	        controlForField: function controlForField(fieldInfo) {
	            var dataType = fieldInfo.dataType;

	            if (fieldInfo.options) {
	                return fieldInfo.array ? _KendoMultiSelect2.default : _KendoComboBox2.default;
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

	            controlProps.preventCustomValues = !fieldInfo.options.allowCustomValues;
	        }

	        return _react2.default.createElement(Control, controlProps);
	    }
	});

	exports.default = AutoControl;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _SelectWidgetMixin = __webpack_require__(4);

	var _SelectWidgetMixin2 = _interopRequireDefault(_SelectWidgetMixin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PropTypes = _react2.default.PropTypes;

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

	var KendoComboBox = _react2.default.createClass({
	    displayName: 'KendoComboBox',

	    mixins: [(0, _SelectWidgetMixin2.default)('kendoComboBox')],

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
	        return this.props.noControl ? _react2.default.createElement(
	            'span',
	            { id: this.props.id },
	            this.renderValue()
	        ) : _react2.default.createElement('input', { id: this.props.id });
	    }
	    /*jshint ignore:end */
	});

	exports.default = KendoComboBox;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _kendo = __webpack_require__(5);

	var _kendo2 = _interopRequireDefault(_kendo);

	var _underscore = __webpack_require__(6);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _ReactCommon = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var DataSource = _kendo2.default.data.DataSource;

	var CANNOT_CHANGE = ['template', 'valueField', 'displayField', 'placeholder', 'filter'];

	function rawValue(props) {
	    return _underscore2.default.isObject(props.value) ? props.value[props.valueField] : props.value;
	}

	function displayValue(props) {
	    return _underscore2.default.isObject(props.value) ? props.value[props.displayField] : props.value;
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
	                onChange: _ReactCommon.noop,
	                autoBind: true,
	                disabled: false,
	                readonly: false,
	                noControl: false
	            };
	        },

	        getWidget: function getWidget() {
	            return (0, _ReactCommon.findWidget)(this, widgetName);
	        },

	        renderValue: function renderValue() {
	            var props = this.props;

	            if (_underscore2.default.isEmpty(props.value)) {
	                return '';
	            }
	            if (_underscore2.default.isEmpty(props.displayField)) {
	                return props.value;
	            }
	            // If the value is just an ID, the display value is in the DataSource.
	            if (!_underscore2.default.isObject(props.value)) {
	                return displayValueFromData(props);
	            }
	            return _kendo2.default.toString(displayValue(props));
	        },

	        componentDidMount: function componentDidMount() {
	            if (this.props.noControl) {
	                // Everything was done in JSX.
	                return;
	            }

	            var props = this.props;
	            var $el = (0, _ReactCommon.findWidget)(this);

	            $el[widgetName](_underscore2.default.defaults({
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

	            if (_underscore2.default.isObject(props.value)) {
	                this.getWidget().text(displayValue(props));
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

	                if (_underscore2.default.isObject(props.value)) {
	                    kendoWidget.text(displayValue(props));
	                }
	            }

	            if (props.disabled !== prevProps.disabled) {
	                kendoWidget.enable(!props.disabled);
	            } else if (props.readonly !== prevProps.readonly) {
	                kendoWidget.readonly(props.readonly);
	            }
	        },

	        componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	            console.assert(_underscore2.default.isEqual(_underscore2.default.pick(nextProps, CANNOT_CHANGE), _underscore2.default.pick(this.props, CANNOT_CHANGE)), 'these props cannot change after mount');
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

	exports.default = SelectWidgetMixin;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.noop = noop;
	exports.findWidget = findWidget;
	exports.wrapItemsDiv = wrapItemsDiv;
	exports.widgetPropTypes = widgetPropTypes;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(8);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _jquery = __webpack_require__(9);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PropTypes = _react2.default.PropTypes;

	function noop() {}

	function findWidget(component, name) {
	    if (!name) {
	        // Just return the jquery node (helps with componentDidMount)
	        return (0, _jquery2.default)(_reactDom2.default.findDOMNode(component));
	    }
	    return (0, _jquery2.default)(_reactDom2.default.findDOMNode(component)).data(name);
	}

	function wrapItemsDiv() {
	    var jsxs = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

	    return jsxs.map(function (jsx, i) {
	        _react2.default.createElement('div', { key: i }, jsx);
	    });
	}

	function widgetPropTypes(customPropTypes) {
	    return Object.assign({
	        id: PropTypes.string,
	        value: PropTypes.any,
	        onChange: PropTypes.func
	    }, customPropTypes);
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _DateWidgetMixin = __webpack_require__(11);

	var _DateWidgetMixin2 = _interopRequireDefault(_DateWidgetMixin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var KendoDatePicker = _react2.default.createClass({
	    displayName: 'KendoDatePicker',

	    mixins: [(0, _DateWidgetMixin2.default)('kendoDatePicker')],

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
	        return this.props.noControl ? _react2.default.createElement(
	            'span',
	            null,
	            this.renderValue()
	        ) : _react2.default.createElement('input', { type: 'text' });
	    }
	    /*jshint ignore:end */
	});

	exports.default = KendoDatePicker;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _kendo = __webpack_require__(5);

	var _kendo2 = _interopRequireDefault(_kendo);

	var _ReactCommon = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ISO_DATE_ONLY = 'yyyy-MM-dd';
	var ISO_TIME_ONLY = 'HH:mm:ss';

	function parseISODate(widgetName, dateStr) {
	    // Handle the unusual format used by FieldInfo for specifying the current time/date.
	    if (dateStr === 'NOW') {
	        return new Date();
	    } else if (dateStr === '' || dateStr == null) {
	        return dateStr;
	    }
	    // For date-only and time-only controls, use kendo to parse because the value needs to be parsed
	    // in the local time zone. ES5 Date.parse can handle date+time values.
	    if (widgetName === 'kendoDatePicker') {
	        return _kendo2.default.parseDate(dateStr, ISO_DATE_ONLY);
	    } else if (widgetName === 'kendoTimePicker') {
	        return _kendo2.default.parseDate(dateStr, ISO_TIME_ONLY);
	    } else {
	        return new Date(Date.parse(dateStr));
	    }
	}

	function formatISODate(widgetName, date) {
	    if (date === null) {
	        return null;
	    }
	    if (widgetName === 'kendoDatePicker') {
	        return _kendo2.default.toString(date, ISO_DATE_ONLY);
	    } else if (widgetName === 'kendoTimePicker') {
	        return _kendo2.default.toString(date, ISO_TIME_ONLY);
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
	                onChange: _ReactCommon.noop,
	                disabled: false,
	                readonly: false,
	                noControl: false
	            };
	        },

	        getWidget: function getWidget() {
	            return (0, _ReactCommon.findWidget)(this, widgetName);
	        },

	        renderValue: function renderValue() {
	            if (!this.props.value) {
	                return '';
	            }
	            return _kendo2.default.toString(fromISOString(this.props.value), this.props.format);
	        },

	        componentDidMount: function componentDidMount() {
	            if (this.props.noControl) {
	                // Everything was done in JSX.
	                return;
	            }

	            var $el = (0, _ReactCommon.findWidget)(this);
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
	                kendoWidget.dateView.calendar.navigate(new Date());
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

	exports.default = DateWidgetMixin;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _DateWidgetMixin = __webpack_require__(11);

	var _DateWidgetMixin2 = _interopRequireDefault(_DateWidgetMixin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var KendoDateTimePicker = _react2.default.createClass({
	    displayName: 'KendoDateTimePicker',

	    mixins: [(0, _DateWidgetMixin2.default)('kendoDateTimePicker')],

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
	        return this.props.noControl ? _react2.default.createElement(
	            'span',
	            null,
	            this.renderValue()
	        ) : _react2.default.createElement('input', { type: 'text' });
	    }
	    /*jshint ignore:end */
	});

	exports.default = KendoDateTimePicker;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _DateWidgetMixin = __webpack_require__(11);

	var _DateWidgetMixin2 = _interopRequireDefault(_DateWidgetMixin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * value interface is ISO-8601, with the date portion omitted.
	 * HH:MM:SS
	 */
	var KendoTimePicker = _react2.default.createClass({
	    displayName: 'KendoTimePicker',

	    mixins: [(0, _DateWidgetMixin2.default)('kendoTimePicker')],

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
	        return this.props.noControl ? _react2.default.createElement(
	            'span',
	            null,
	            this.renderValue()
	        ) : _react2.default.createElement('input', { type: 'text' });
	    }
	    /*jshint ignore:end */
	});

	exports.default = KendoTimePicker;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _kendo = __webpack_require__(5);

	var _kendo2 = _interopRequireDefault(_kendo);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _ReactCommon = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PropTypes = _react2.default.PropTypes;

	function rawValue(props) {
	    var value = props.value;

	    if (_.isEmpty(value)) {
	        return value;
	    }

	    value = Array.isArray(value) ? value : [value];

	    return value.map(function (val) {
	        return _.isObject(val) ? val[props.valueField] : val;
	    });
	}

	function toPlainObject(data) {
	    return data.toJSON();
	}

	var KendoMultiSelect = _react2.default.createClass({
	    displayName: 'KendoMultiSelect',


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
	            onChange: _ReactCommon.noop
	        };
	    },

	    /*jshint ignore:start */
	    render: function render() {
	        return _react2.default.createElement('select', { id: this.props.id, multiple: 'multiple' });
	    },
	    /*jshint ignore:end */

	    componentDidMount: function componentDidMount() {
	        var $el = (0, _ReactCommon.findWidget)(this);

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
	        (0, _ReactCommon.findWidget)(this, 'kendoMultiSelect').destroy();
	    },

	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        var cantChange = ['template', 'dataSource', 'valueField', 'displayField', 'placeholder'];
	        console.assert(_.isEqual(_.pick(nextProps, cantChange), _.pick(this.props, cantChange)), 'these props cant change after mount');
	    },

	    componentDidUpdate: function componentDidUpdate(prevProps) {
	        var kendoWidget = (0, _ReactCommon.findWidget)(this, 'kendoMultiSelect');

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

	exports.default = KendoMultiSelect;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _kendo = __webpack_require__(5);

	var _kendo2 = _interopRequireDefault(_kendo);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _ReactCommon = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var KendoNumericTextBox = _react2.default.createClass({
	    displayName: 'KendoNumericTextBox',


	    statics: { fieldClass: function fieldClass() {
	            return 'formFieldNumeric';
	        } },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            onChange: _ReactCommon.noop,
	            placeholder: '',
	            format: '',
	            spinners: false,
	            step: 1,
	            disabled: false,
	            readonly: false,
	            noControl: false
	        };
	    },

	    /*jshint ignore:start */
	    render: function render() {
	        return this.props.noControl ? _react2.default.createElement(
	            'span',
	            null,
	            _kendo2.default.toString(this.props.value, this.props.format)
	        ) :
	        // KendoNumeric requires multiple onChange handlers, because kendo change event doesn't happen
	        // until blur. We need an event on each keyup on the input, as well as spin events on the widget.
	        _react2.default.createElement('input', { id: this.props.id, type: 'text', onChange: this.onInputChange });
	    },
	    /*jshint ignore:end */

	    componentDidMount: function componentDidMount() {
	        var $el = (0, _ReactCommon.findWidget)(this);

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

	        var kendoWidget = (0, _ReactCommon.findWidget)(this, 'kendoNumericTextBox');

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

	exports.default = KendoNumericTextBox;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _ReactCommon = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PropTypes = _react2.default.PropTypes;

	var KendoText = _react2.default.createClass({
	    displayName: 'KendoText',


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
	            onChange: _ReactCommon.noop,
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
	            return _react2.default.createElement(
	                'span',
	                null,
	                value
	            );
	        }
	        return _react2.default.createElement('input', { id: this.props.id,
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

	exports.default = KendoText;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _ReactCommon = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PropTypes = _react2.default.PropTypes;

	var MultilineText = _react2.default.createClass({
	    displayName: 'MultilineText',


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
	            onChange: _ReactCommon.noop,
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
	            return _react2.default.createElement(
	                'pre',
	                null,
	                this.props.value || ''
	            );
	        }
	        return _react2.default.createElement('textarea', { id: this.props.id,
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

	exports.default = MultilineText;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _jquery = __webpack_require__(9);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _ReactCommon = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var SwitchBox = _react2.default.createClass({
	    displayName: 'SwitchBox',


	    statics: { fieldClass: function fieldClass() {
	            return 'formFieldSwitch';
	        } },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            onChange: _ReactCommon.noop,
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
	        var _this = this;

	        var props = this.props;

	        if (props.noControl) {
	            return _react2.default.createElement("span", null, this.getDisplayValue());
	        }

	        var yes = props.value === true;
	        var no = props.value === false;

	        var toggle = function toggle(onChange, val) {
	            // Prevent toggle if already in that state
	            if (val !== _this.props.value) {
	                return _.partial(onChange, val);
	            }
	        };

	        var clickYes = props.readonly ? _ReactCommon.noop : toggle(props.onChange, true);
	        var clickNo = props.readonly ? _ReactCommon.noop : toggle(props.onChange, false);

	        return _react2.default.createElement(
	            'div',
	            { tabIndex: '0', className: 'switch', onKeyDown: this.onKeyDown },
	            _react2.default.createElement(
	                'ul',
	                null,
	                _react2.default.createElement(
	                    'li',
	                    { className: yes ? 'active' : '', onClick: clickYes },
	                    _react2.default.createElement(
	                        'span',
	                        { className: yes ? 'pos' : '' },
	                        props.labels.yes
	                    )
	                ),
	                _react2.default.createElement(
	                    'li',
	                    { className: no ? 'active' : '', onClick: clickNo },
	                    _react2.default.createElement(
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

	exports.default = SwitchBox;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _AutoControl = __webpack_require__(1);

	var _AutoControl2 = _interopRequireDefault(_AutoControl);

	var _ControlCommon = __webpack_require__(20);

	var _ControlCommon2 = _interopRequireDefault(_ControlCommon);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var DEFAULTS = {
	    readOnly: false,
	    disabled: false,
	    label: '',
	    helpText: ''
	};
	var SUBTEXT_STYLE = {
	    width: '33%',
	    textAlign: 'right',
	    lineHeight: '0.5em'
	};

	function determineFieldClass(children) {
	    if (Array.isArray(children)) {
	        children = children[0];
	    }

	    if (children && !children.type.fieldClass) {
	        // Support a textnode child, which won't have a fieldinfo
	        if (children.props && children.props.fieldInfo) {
	            return _AutoControl2.default.controlForField(children.props.fieldInfo).fieldClass();
	        }
	        //console.warn('Unknown fieldClass for child component', children);

	        return 'formFieldInput';
	    }

	    return children && children.type.fieldClass();
	}

	function when(condition, element) {
	    return condition ? element : null;
	}

	var FormField = _react2.default.createClass({
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
	        var props = this.props;
	        var fieldInfo = _.defaults({}, this.props.fieldInfo, DEFAULTS);

	        var hasInfoTooltip = !!fieldInfo.helpText;
	        var hasErrorTooltip = !this.props.isValid[0] && (this.props.isValid[1] || '').length > 0;

	        var classes = _.compact([this.props.layout, determineFieldClass(this.props.children), _ControlCommon2.default.quadState(fieldInfo.disabled, fieldInfo.readOnly, this.props.isValid, this.props.noControl), hasInfoTooltip ? 'hasTooltip' : null, hasErrorTooltip ? 'hasErrorTooltip' : null, this.props.lockable ? 'lockable' : null]);

	        var lockedClasses = _.compact(['fieldLock', this.props.locked ? 'fieldLockOn' : null]);
	        var styles = {
	            'width': this.props.width,
	            'marginLeft': this.props.marginLeft
	        };

	        var statusIcon = hasInfoTooltip ? _react2.default.createElement('span', { className: 'statusIcon' }) : null;

	        // If there is no label and no icon, we must render &nbsp; so the fields line up right.
	        var label = fieldInfo.label || ' ';

	        return _react2.default.createElement(
	            'div',
	            { className: classes.join(' '),
	                'data-tooltip': fieldInfo.helpText,
	                'data-error-tooltip': this.props.isValid[1],
	                style: styles },
	            when(!props.noLabel, _react2.default.createElement(
	                'label',
	                { className: 'formLabel' },
	                label,
	                statusIcon
	            )),
	            _react2.default.createElement(
	                'div',
	                { className: 'formElement' },
	                this.props.children
	            ),
	            when(props.lockable, _react2.default.createElement('div', { className: lockedClasses.join(' '), onClick: this.toggleLock })),
	            when(fieldInfo.subText, _react2.default.createElement(
	                'p',
	                { style: SUBTEXT_STYLE },
	                _react2.default.createElement(
	                    'em',
	                    null,
	                    fieldInfo.subText
	                )
	            ))
	        );
	    },
	    /* jshint ignore:end */

	    componentWillReceiveProps: function componentWillReceiveProps(newProps) {
	        var wasInvalid = !this.props.isValid[0];

	        // If the field has become valid, hide the error tooltip.
	        if (wasInvalid && newProps.isValid[0]) {
	            _ControlCommon2.default.hideErrorTooltip();
	        }
	    },

	    componentDidUpdate: function componentDidUpdate(prevProps) {
	        var wasInvalid = prevProps.isValid[0] === false,
	            isStillInvalid = this.props.isValid[0] === false,
	            validationMessageChanged = prevProps.isValid[1] !== this.props.isValid[1];

	        if (wasInvalid && isStillInvalid && validationMessageChanged) {
	            _ControlCommon2.default.refreshErrorTooltip();
	        }
	    },

	    toggleLock: function toggleLock() {
	        var isLocked = !this.props.locked;
	        this.props.onStickyChange(isLocked);
	        this.setState({ locked: isLocked });
	    }
	});

	exports.default = FormField;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _jquery = __webpack_require__(9);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _kendo = __webpack_require__(5);

	var _kendo2 = _interopRequireDefault(_kendo);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	function attachFormTooltips(body) {
	    var $body = (0, _jquery2.default)(body);

	    function tooltipMarginLeft(target) {
	        return target.parent().hasClass('formFieldNoWrap') ? '90px' : '';
	    }

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

	            // (AHG) Fields with labels on the left should have the tooltips move over
	            this.popup.element.css('margin-left', tooltipMarginLeft(this.target()));
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
	    var $body = (0, _jquery2.default)('body');

	    $body.data('kendoErrorTooltip').hide();
	}

	function refreshErrorTooltip() {
	    var $body = (0, _jquery2.default)('body');
	    $body.data('kendoErrorTooltip').refresh();
	}

	_kendo2.default.ui.Tooltip.fn.hide = function () {
	    if (this.popup) {
	        this.popup.close();
	    }
	    // (AHG) If we're in the middle of a delay to show the popup, we want to cancel the delayed show too.
	    if (this.timeout) {
	        clearTimeout(this.timeout);
	    }
	};

	/* Let tooltip users hook the popup open event to cancel showing an empty tooltip */
	_kendo2.default.ui.Tooltip.fn._initPopup = _.wrap(_kendo2.default.ui.Tooltip.fn._initPopup, function (wrapped) {
	    wrapped.call(this);

	    if (this.options.open) {
	        this.popup.bind('open', this.options.open.bind(this));
	    }
	});

	module.exports = {
	    quadState: quadState,
	    attachFormTooltips: attachFormTooltips,
	    hideErrorTooltip: hideErrorTooltip,
	    refreshErrorTooltip: refreshErrorTooltip,
	    setKendoNumberState: setKendoNumberState,
	    setKendoNumberValue: setKendoNumberValue,
	    setKendoDisabledReadonly: setKendoDisabledReadonly
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _AutoControl = __webpack_require__(1);

	var _AutoControl2 = _interopRequireDefault(_AutoControl);

	var _FormField = __webpack_require__(19);

	var _FormField2 = _interopRequireDefault(_FormField);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var EXCLUDE_FROM_CONTROL = ['isValid', 'layout'];

	var PropTypes = _react2.default.PropTypes;

	var AutoField = _react2.default.createClass({
	    displayName: 'AutoField',


	    propTypes: Object.assign({
	        fieldInfo: PropTypes.object.isRequired,
	        isValid: PropTypes.array,
	        layout: PropTypes.string
	    }, _AutoControl2.default.propTypes),

	    getDefaultProps: function getDefaultProps() {
	        return {
	            isValid: [true, '']
	        };
	    },

	    render: function render() {
	        var controlProps = _.omit(this.props, EXCLUDE_FROM_CONTROL);

	        return _react2.default.createElement(
	            _FormField2.default,
	            { fieldInfo: this.props.fieldInfo, isValid: this.props.isValid, layout: this.props.layout },
	            _react2.default.createElement(_AutoControl2.default, controlProps)
	        );
	    }
	});

	exports.default = AutoField;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _ReactCommon = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Button = _react2.default.createClass({
	    displayName: 'Button',


	    getDefaultProps: function getDefaultProps() {
	        return {
	            onClick: _ReactCommon.noop,
	            disabled: false,
	            className: ''
	        };
	    },

	    render: function render() {
	        var classes = this.props.className;

	        if (this.props.diabled) {
	            classes += ' buttonDisabled';
	        }
	        return _react2.default.createElement(
	            'button',
	            { className: classes, onClick: this.props.onClick, disabled: this.props.disabled },
	            this.props.children
	        );
	    }
	});

	exports.default = Button;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _ReactCommon = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	var Carousel = _react2.default.createClass({
	    displayName: 'Carousel',


	    statics: { fieldClass: function fieldClass() {
	            return 'formFieldCarousel';
	        } },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            value: undefined, // integer - the selected index (0-based)
	            onChange: _ReactCommon.noop,
	            disabled: false,
	            readonly: false,
	            noControl: false,
	            id: undefined,
	            options: undefined,
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

	        if (this.props.noControl) {
	            return _react2.default.createElement('div', { className: 'carousel' });
	        }

	        return _react2.default.createElement(
	            'div',
	            { className: 'carousel' },
	            _react2.default.createElement(
	                'button',
	                { disabled: N < 2, className: 'carouselButton backButton',
	                    onClick: _.partial(this.onChange, 'left') },
	                _react2.default.createElement('i', { className: 'icon iconPrev' })
	            ),
	            _react2.default.createElement('input', { className: 'carouselInput',
	                value: this.displayTextFn(i, N),
	                readOnly: true,
	                id: this.props.id }),
	            _react2.default.createElement(
	                'button',
	                { disabled: N < 2, className: 'carouselButton forwardButton',
	                    onClick: _.partial(this.onChange, 'right') },
	                _react2.default.createElement('i', { className: 'icon iconNext' })
	            ),
	            this.props.onEdit ? _react2.default.createElement(
	                'button',
	                { className: 'carouselButton editButton', disabled: this.props.disabled,
	                    onClick: this.props.onEdit },
	                this.props.buttonLabel
	            ) : null
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
	            return N === 0 ? '(none)' : i + 1 + ' of ' + N;
	        }
	    }

	});

	exports.default = Carousel;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _ReactCommon = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var CheckBox = _react2.default.createClass({
	    displayName: 'CheckBox',


	    statics: { fieldClass: function fieldClass() {
	            return 'formFieldCheckbox';
	        } },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            value: undefined,
	            onChange: _ReactCommon.noop,
	            id: undefined,
	            label: undefined, //checkbox label, not field label
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
	            return _react2.default.createElement(
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
	        return _react2.default.createElement(
	            'span',
	            { className: 'CheckBox', tabIndex: '0', onKeyDown: onKeyDown },
	            _react2.default.createElement('input', { type: 'checkbox', id: this.stableUniqueId,
	                checked: props.value, 'data-checked': props.value ? '' : null,
	                onChange: this.onChange,
	                disabled: props.disabled || props.readonly }),
	            _react2.default.createElement(
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

	exports.default = CheckBox;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _kendo = __webpack_require__(5);

	var _kendo2 = _interopRequireDefault(_kendo);

	var _ReactCommon = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var $ = _kendo2.default.jQuery;
	var PropTypes = _react2.default.PropTypes;

	function noResultsOnDataBound(e) {
	    var widget = e.sender;
	    var noItems = widget.list.find(".noResults");

	    if (!widget.dataSource.view()[0]) {
	        noItems.show();
	        widget.popup.open();
	    } else {
	        noItems.hide();
	    }
	}

	function noResultsOnClose(e) {
	    var widget = e.sender;

	    if (!widget.shouldClose && !widget.dataSource.view()[0]) {
	        e.preventDefault();
	    }
	}

	var KendoAutoComplete = _react2.default.createClass({
	    displayName: 'KendoAutoComplete',


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
	        noResultsMsg: PropTypes.string,
	        placeholder: PropTypes.string,
	        template: PropTypes.any
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            disabled: false,
	            readonly: false,
	            onChange: $.noop,
	            onSelect: $.noop
	        };
	    },

	    componentDidMount: function componentDidMount() {
	        var props = this.props;
	        var $el = (0, _ReactCommon.findWidget)(this);

	        var widgetOptions = $.extend({}, this.props.options, {
	            dataSource: this.props.dataSource,
	            dataTextField: this.props.dataTextField,
	            placeholder: this.props.placeholder,
	            template: this.props.template,
	            change: this.onChange,
	            select: this.onSelect
	        });

	        if (props.noResultsMsg) {
	            widgetOptions.dataBound = noResultsOnDataBound;
	            widgetOptions.close = noResultsOnClose;
	            widgetOptions.headerTemplate = '<em class="noResults">' + props.noResultsMsg + '</em>';
	        }

	        var autoComplete = $el.kendoAutoComplete(widgetOptions).data('kendoAutoComplete');

	        if (this.props.value) {
	            autoComplete.value(this.props.value);
	        }

	        if (this.props.disabled) {
	            autoComplete.enable(false);
	        } else if (this.props.readonly) {
	            autoComplete.readonly(true);
	        }

	        if (props.noResultsMsg) {
	            autoComplete.element.on('blur', function () {
	                autoComplete.shouldClose = true;
	                autoComplete.close();
	                autoComplete.shouldClose = false;
	            });
	        }
	    },

	    componentWillUnmount: function componentWillUnmount() {
	        (0, _ReactCommon.findWidget)(this, 'kendoAutoComplete').destroy();
	    },

	    componentDidUpdate: function componentDidUpdate(prevProps) {
	        var autoComplete = (0, _ReactCommon.findWidget)(this, 'kendoAutoComplete');

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
	        return _react2.default.createElement('input', { type: 'text', id: this.props.id, className: 'k-textbox', style: this.props.style });
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

	exports.default = KendoAutoComplete;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _SelectWidgetMixin = __webpack_require__(4);

	var _SelectWidgetMixin2 = _interopRequireDefault(_SelectWidgetMixin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PropTypes = _react2.default.PropTypes;

	var KendoDropDownList = _react2.default.createClass({
	    displayName: 'KendoDropDownList',

	    mixins: [(0, _SelectWidgetMixin2.default)('kendoDropDownList')],

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
	        return this.props.noControl ? _react2.default.createElement(
	            'span',
	            { id: this.props.id },
	            this.renderValue()
	        ) : _react2.default.createElement('input', { id: this.props.id });
	    }
	    /*jshint ignore:end */
	});

	exports.default = KendoDropDownList;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _kendo = __webpack_require__(5);

	var _kendo2 = _interopRequireDefault(_kendo);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _underscore = __webpack_require__(6);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _ReactCommon = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var $ = _kendo2.default.jQuery;
	var PropTypes = _react2.default.PropTypes;

	function eitherType(type1, type2) {
	    type1 = _underscore2.default.isString(type1) ? PropTypes[type1] : type1;
	    type2 = _underscore2.default.isString(type2) ? PropTypes[type2] : type2;

	    return PropTypes.oneOfType([type1, type2]);
	}

	function isCellSelection(selectable) {
	    return _underscore2.default.isString(selectable) ? selectable.indexOf('cell') !== -1 : false;
	}

	function isMultiSelect(selectable) {
	    return _underscore2.default.isString(selectable) ? selectable.indexOf('multiple') !== -1 : false;
	}

	function getValueIds(value) {
	    if (Array.isArray(value)) {
	        return _underscore2.default.pluck(value, 'id');
	    }
	    if (_underscore2.default.isObject(value)) {
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
	    var tooltipTemplate = _kendo2.default.template(rowTooltip);

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

	var KendoGrid = _react2.default.createClass({
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
	        rowTooltip: eitherType('string', 'func'),
	        rowDataBind: PropTypes.func
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            autoBind: true,
	            pageable: false,
	            scrollable: true,
	            selectable: false,
	            sortable: false,
	            onChange: _ReactCommon.noop
	        };
	    },

	    /*jshint ignore:start */
	    render: function render() {
	        return _react2.default.createElement('div', { className: this.props.className });
	    },
	    /*jshint ignore:end */

	    componentDidMount: function componentDidMount() {
	        var $rootNode = (0, _ReactCommon.findWidget)(this);
	        var widgetOptions = _underscore2.default.defaults({
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
	        if (this.props.rowDataBind) {
	            $rootNode.data('kendoGrid').bind('dataBinding', this.onGridDataBinding);
	        }
	    },

	    componentWillUnmount: function componentWillUnmount() {
	        (0, _ReactCommon.findWidget)(this, 'kendoGrid').destroy();

	        // The rowTooltip widget doesn't need to be explicitly destroyed
	        // because the grid destroy() method destroys all kendo widgets bound to the DOM element.
	    },

	    componentDidUpdate: function componentDidUpdate(prevProps) {
	        var grid = (0, _ReactCommon.findWidget)(this, 'kendoGrid');

	        if (this.props.dataSource instanceof Array) {
	            if (!_underscore2.default.isEqual(this.props.dataSource, prevProps.dataSource)) {
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

	    onGridDataBinding: function onGridDataBinding(e) {
	        var grid = e.sender;

	        // If the rowDataBind function installed widgets, they need to be destroyed before grid refresh.
	        if (e.action === 'rebind') {
	            _kendo2.default.destroy(grid.table.find('tr'));
	        }
	    },

	    onGridDataBound: function onGridDataBound(e) {
	        var grid = e.sender;
	        var props = this.props;

	        if (grid.selectable) {
	            updateGridSelection(this, grid);
	        }

	        if (props.options && props.options.dataBound) {
	            props.options.dataBound(e);
	        }

	        // Render any custom widgets using the provided function
	        if (props.rowDataBind) {
	            grid.table.find('tr').each(function () {
	                var $el = $(this);
	                props.rowDataBind($el, grid.dataItem($el));
	            });
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
	            selectedValues = _underscore2.default.first(selectedValues);
	        }

	        this.props.onChange(selectedValues);
	    }
	});

	exports.default = KendoGrid;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _kendo = __webpack_require__(5);

	var _kendo2 = _interopRequireDefault(_kendo);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _KendoGrid = __webpack_require__(27);

	var _KendoGrid2 = _interopRequireDefault(_KendoGrid);

	var _ReactCommon = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PropTypes = _react2.default.PropTypes;

	var CheckTemplate = '<div><input id="#: uid #" type="checkbox" value="#: uid #" name="selector"><label></label></div>';
	var RadioTemplate = '<div><input id="#: uid #" type="radio"    value="#: uid #" name="selector"><label></label></div>';

	var SelectAllTemplate = '<div><input id="kgp_sel_all" type="checkbox" value="on"><label for="kgp_sel_all"></label></div>';

	function buttonColumn(multiple) {
	    return {
	        template: _kendo2.default.template(multiple ? CheckTemplate : RadioTemplate),
	        headerTemplate: _kendo2.default.template(multiple ? SelectAllTemplate : '<div></div>'),
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

	var KendoGridPicker = _react2.default.createClass({ displayName: "KendoGridPicker",

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
	            onChange: _ReactCommon.noop,
	            value: [] // list of selected records, just like combo.
	        };
	    },

	    render: function render() {
	        var columns = [buttonColumn(this.props.multiple)].concat(this.props.columns);

	        var selectable = this.props.multiple ? 'multiple, row' : 'row';
	        var gridProps = { columns: columns, selectable: selectable, onChange: this.onGridChange };

	        return _react2.default.createElement(_KendoGrid2.default, Object.assign({}, this.props, gridProps));
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

	exports.default = KendoGridPicker;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _kendo = __webpack_require__(5);

	var _kendo2 = _interopRequireDefault(_kendo);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _ReactCommon = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var $ = _kendo2.default.jQuery;

	var PropTypes = _react2.default.PropTypes;

	function eitherType(type1, type2) {
	    type1 = _.isString(type1) ? PropTypes[type1] : type1;
	    type2 = _.isString(type2) ? PropTypes[type2] : type2;

	    return PropTypes.oneOfType([type1, type2]);
	}

	var KendoListView = _react2.default.createClass({
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
	            onChange: _ReactCommon.noop
	        };
	    },

	    /* jshint ignore:start */
	    render: function render() {
	        return _react2.default.createElement('div', { className: this.props.className });
	    },
	    /* jshint ignore:end */

	    /**
	     * This method updates the ListView's selection and optionally animates scrolling that selection to the top of the list.
	     */
	    selectValue: function selectValue(selectedId, scrollToSelectedItem) {
	        var $rootNode = (0, _ReactCommon.findWidget)(this);
	        var listView = (0, _ReactCommon.findWidget)(this, 'kendoListView');
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
	        var $rootNode = (0, _ReactCommon.findWidget)(this);
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

	        (0, _ReactCommon.findWidget)(this, 'kendoListView').destroy();
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

	exports.default = KendoListView;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _kendo = __webpack_require__(5);

	var _kendo2 = _interopRequireDefault(_kendo);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _ReactCommon = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PropTypes = _react2.default.PropTypes;

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

	var KendoPager = _react2.default.createClass({
	    displayName: 'KendoPager',

	    propTypes: {
	        dataSource: PropTypes.object.isRequired,
	        className: PropTypes.string,
	        messages: PropTypes.object,
	        onChange: PropTypes.func
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            className: 'k-pager-wrap',
	            // Empty object means override none of kendo's defaults, which are shown above for convenience
	            messages: {},
	            change: _ReactCommon.noop
	        };
	    },

	    componentDidMount: function componentDidMount() {
	        var $el = (0, _ReactCommon.findWidget)(this);

	        $el.kendoPager({
	            dataSource: this.props.dataSource,
	            messages: this.props.messages,
	            change: this.props.onChange
	        });
	    },

	    componentWillUnmount: function componentWillUnmount() {
	        (0, _ReactCommon.findWidget)(this, 'kendoPager').destroy();
	    },

	    render: function render() {
	        return _react2.default.createElement('div', { className: this.props.className });
	    }
	});

	exports.default = KendoPager;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _kendo = __webpack_require__(5);

	var _kendo2 = _interopRequireDefault(_kendo);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _ReactCommon = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Children = _react2.default.Children; /* Copyright (c) 2015-2016 Wingspan Technology, Inc. */

	var PropTypes = _react2.default.PropTypes;

	var KendoPanelBar = _react2.default.createClass({
	    displayName: 'KendoPanelBar',

	    /* Not supporting "contentUrls" or "dataSource" because React components are better content */
	    propTypes: {
	        animation: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
	        className: PropTypes.string,
	        expandMode: PropTypes.string
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            expandMode: 'multiple'
	        };
	    },

	    componentDidMount: function componentDidMount() {
	        var $el = (0, _ReactCommon.findWidget)(this);

	        // The PanelBar is populated via the DOM generated by render
	        $el.kendoPanelBar({
	            animation: this.props.animation,
	            expandMode: this.props.expandMode
	        });

	        // expand based on the 'data-expand' attribute used in render()
	        $el.data('kendoPanelBar').expand($el.children('[data-expand=true]'));
	    },

	    componentWillUnmount: function componentWillUnmount() {
	        // Don't destroy() because it destroys all kendo widgets owned by nested components.
	        // findWidget(this, 'kendoPanelBar').destroy();
	    },

	    render: function render() {
	        var kids = Children.toArray(this.props.children);

	        return _react2.default.createElement(
	            'ul',
	            { className: this.props.className },
	            kids.filter(function (child) {
	                return child.props.visible !== false;
	            })
	        );
	    }
	});

	KendoPanelBar.Item = _react2.default.createClass({
	    displayName: 'Item',

	    propTypes: {
	        title: PropTypes.string,
	        expand: PropTypes.bool,
	        visible: PropTypes.bool
	    },

	    render: function render() {
	        return _react2.default.createElement(
	            'li',
	            { 'data-expand': this.props.expand },
	            _react2.default.createElement(
	                'span',
	                { className: 'k-link k-header' },
	                this.props.title
	            ),
	            _react2.default.createElement(
	                'div',
	                null,
	                this.props.children
	            )
	        );
	    }
	});

	exports.default = KendoPanelBar;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _kendo = __webpack_require__(5);

	var _kendo2 = _interopRequireDefault(_kendo);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _ReactCommon = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Takes a "tabs" prop which is a map from title string to a JSX instance.
	 * This component is not presently stateful so we don't get to control what is selected.
	 */
	var KendoTabStrip = _react2.default.createClass({
	    displayName: 'KendoTabStrip',


	    componentWillMount: function componentWillMount() {
	        console.assert(_.isObject(this.props.tabs) && Object.keys(this.props.tabs).length > 0);
	    },

	    componentWillUnmount: function componentWillUnmount() {
	        this.tabStrip.unbind('select', this.onSelect);
	    },

	    componentDidMount: function componentDidMount() {
	        var $el = (0, _ReactCommon.findWidget)(this);
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
	        Object.keys(this.props.tabs).forEach(function (title, index) {
	            var jsx = index === 0 ? _react2.default.createElement(
	                'li',
	                { className: 'k-state-active', 'data-wspt-index': index, key: index },
	                title
	            ) : _react2.default.createElement(
	                'li',
	                { 'data-wspt-index': index, key: index },
	                title
	            );
	            lis.push(jsx);
	        });

	        var content = (0, _ReactCommon.wrapItemsDiv)(_.values(this.props.tabs));

	        return _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	                'ul',
	                null,
	                lis
	            ),
	            content
	        );
	    }
	    /* jshint ignore:end */
	});

	exports.default = KendoTabStrip;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _ReactCommon = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PropTypes = _react2.default.PropTypes;

	/**
	 * Creates a multi-select control.
	 * isFlat controls whether the selectors are interpreted as containing optgroups.
	 * If isFlat is true selectors will be a two level array of arrays.  The top level will be pairs of (name, children). Children, the second level, will be pairs of (id, name).
	 * If isFlat is false selectors will  simply be an array of (id, name).
	 * Each level can also have an active property that will be assumed to be true if undefined.
	 * Empty optgroups will be elided.
	 */
	var MultiSelect = _react2.default.createClass({
	    displayName: 'MultiSelect',


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
	            onChange: _ReactCommon.noop
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
	            return _react2.default.createElement(
	                'option',
	                { key: selector.id, value: selector.id, title: selector.name },
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
	                return _react2.default.createElement(
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
	        return _react2.default.createElement(
	            'select',
	            { id: props.id, value: selections, multiple: 'multiple', disabled: this.props.disabled,
	                onChange: !this.props.readonly ? onChange : undefined },
	            selectors
	        );
	    }
	    /* jshint ignore:end */
	});

	exports.default = MultiSelect;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _ReactCommon = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PropTypes = _react2.default.PropTypes;

	function fireChange(props) {
	    if (props.readonly) {
	        return;
	    }
	    props.onChange(props.value);
	}

	/**
	 * Careful:
	 * This must be contained by a RadioGroup or it won't style right.
	 */
	var Radio = _react2.default.createClass({
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
	            onChange: _ReactCommon.noop,
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

	        return _react2.default.createElement(
	            'span',
	            { className: 'formRadio', tabIndex: tabIndex, onKeyDown: this.onKeyDown },
	            _react2.default.createElement('input', { type: 'radio', name: this.props.name, id: this.stableUniqueId,
	                value: this.props.value, onChange: this.onChange,
	                checked: this.props.checked, 'data-checked': this.props.checked ? '' : null,
	                disabled: this.props.disabled }),
	            _react2.default.createElement(
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

	exports.default = Radio;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _Radio = __webpack_require__(34);

	var _Radio2 = _interopRequireDefault(_Radio);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PropTypes = _react2.default.PropTypes;

	var RadioGroup = _react2.default.createClass({
	    displayName: "RadioGroup",

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
	        var children;

	        function renderRadio(option) {
	            return _react2.default.createElement(_Radio2.default, {
	                key: option.value,
	                name: props.name,
	                value: option.value,
	                onChange: props.onChange,
	                checked: option.value == props.value
	            }, option.label);
	        }

	        function setRadioChecked(child) {
	            if (!child.props.hasOwnProperty('value')) {
	                return child;
	            }
	            // The use of double-equals is intentional here, so that numbers represented as strings will match.
	            var checked = child.props.value == props.value;
	            return _react2.default.cloneElement(child, { checked: checked });
	        }

	        if (props.dataSource) {
	            children = props.dataSource.map(renderRadio);
	        } else {
	            children = _react2.default.Children.map(props.children, setRadioChecked);
	        }

	        return _react2.default.createElement("fieldset", { className: props.className }, children);
	    }
	});

	exports.default = RadioGroup;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _ReactCommon = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PropTypes = _react2.default.PropTypes;

	/**
	 * Takes a "tabs" prop which is a map from title string to a JSX instance.
	 * This component is not presently stateful so we don't get to control what is selected.
	 */
	var TabStrip = _react2.default.createClass({
	    displayName: 'TabStrip',

	    propTypes: {
	        tabs: PropTypes.object.isRequired,
	        selectedTab: PropTypes.number,
	        onChange: PropTypes.func.isRequired,
	        elideInactiveContent: PropTypes.bool
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            selectedTab: 0,
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
	        console.assert(_.isObject(this.props.tabs) && Object.keys(this.props.tabs).length > 0);
	        this.stableUniqueId = _.uniqueId('tab-');
	    },

	    /**
	     * This fixes a problem with certain content that switches from hidden to shown.
	     * My theory is that browsers don't flow hidden elements.  The particular case involves picking a Task transition that make metadata editable.
	     * At the time this happens, the metadata are re-rendered but are not shown and the splitter gets confounded.  This is simply to force a reflow of the
	     * content that is newly made visible.
	     */
	    componentDidUpdate: function componentDidUpdate() {
	        (0, _ReactCommon.findWidget)(this).find('.k-content.k-state-active').resize();
	    },

	    /* jshint ignore:start */
	    render: function render() {
	        var self = this;

	        var lis = [];
	        var keys = Object.keys(this.props.tabs),
	            len = keys.length;
	        _.each(keys, function (title, index) {
	            var id = self.stableUniqueId + '-' + index;
	            var classes = [index === 0 ? 'k-first' : null, index === len - 1 ? 'k-last' : null, 'k-state-default', 'k-item', index === self.props.selectedTab ? 'k-tab-on-top k-state-active' : null];

	            lis.push(_react2.default.createElement(
	                'li',
	                { key: index, className: _.compact(classes).join(' '), role: 'tab', 'aria-controls': id },
	                _react2.default.createElement(
	                    'a',
	                    { className: 'k-link', onClick: _.partial(self.onTabClick, index) },
	                    title
	                )
	            ));
	        });

	        var divs = [];
	        _.each(_.values(this.props.tabs), function (jsx, index) {
	            var jsx = index === self.props.selectedTab ? _react2.default.createElement(
	                'div',
	                { key: index, className: 'k-content k-state-active', role: 'tabpanel', 'aria-expanded': 'true', style: visibleStyle },
	                jsx
	            ) : _react2.default.createElement(
	                'div',
	                { key: index, className: 'k-content', 'aria-hidden': 'true', role: 'tabpanel', 'aria-expanded': 'false', style: hiddenStyle },
	                self.props.elideInactiveContent ? null : jsx
	            );
	            divs.push(jsx);
	        });

	        var className = _.compact(['k-widget', 'k-header', 'k-tabstrip', this.props.className]).join(' ');
	        return _react2.default.createElement(
	            'div',
	            { 'data-role': 'tabstrip', tabIndex: '0', className: className, role: 'tablist' },
	            _react2.default.createElement(
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

	var visibleStyle = { display: 'block', height: 'auto', overflow: 'visible', opacity: 1 };
	var hiddenStyle = { height: 'auto', overflow: 'visible', opacity: 1, display: 'none' };

	exports.default = TabStrip;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _ReactCommon = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var VISIBLE = { display: 'inline-block' };
	void VISIBLE;
	var INVISIBLE = { display: 'none' };
	void INVISIBLE;

	var PropTypes = _react2.default.PropTypes;

	var PromiseButton = _react2.default.createClass({
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
	            handler: _ReactCommon.noop
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
	        return _react2.default.createElement(
	            'button',
	            { className: this.props.className, disabled: disabled, onClick: clickHandler },
	            this.props.label || this.props.children,
	            _react2.default.createElement('i', { className: 'k-loading', style: this.state.busy ? VISIBLE : INVISIBLE })
	        );
	        /*jshint ignore:end */
	    }
	});

	exports.default = PromiseButton;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _jquery = __webpack_require__(9);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _ReactCommon = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ENTER_KEY = 13;

	function setVisible(el, visible) {
	    // I'm using visibility instead of $.hide/show because I don't want to change the icon's "display" style. Something
	    // goes wrong in jQuery and it changes the span's display from inline-block to block when showing it using $.show().
	    (0, _jquery2.default)(el).css('visibility', visible ? 'visible' : 'hidden');
	}

	function noBrowserDefault(e) {
	    // The browser changes focus on mouse down, but we don't want that.
	    e.preventDefault();
	}

	var SearchBox = _react2.default.createClass({
	    displayName: 'SearchBox',


	    getDefaultProps: function getDefaultProps() {
	        return {
	            disabled: false,
	            fireClearEvent: false,
	            instantSearch: false,
	            onChange: _ReactCommon.noop
	        };
	    },

	    componentWillMount: function componentWillMount() {
	        console.assert(this.props.handler, 'SearchBox requires a handler function');
	    },

	    /*jshint ignore:start */
	    render: function render() {
	        var iconClearStyle = { visibility: !this.props.value ? 'hidden' : 'visible' };

	        return _react2.default.createElement(
	            'span',
	            { className: 'searchBox' },
	            _react2.default.createElement('input', { type: 'text', disabled: this.props.disabled, placeholder: this.props.placeholder, value: this.props.value,
	                autoComplete: 'off', onKeyDown: this.onKeyDown, defaultValue: this.props.defaultValue, onChange: this.onTextChange }),
	            _react2.default.createElement('span', { className: 'iconClear', onClick: this.onClickClear, onMouseDown: noBrowserDefault, style: iconClearStyle }),
	            _react2.default.createElement('span', { className: 'iconSearch', onClick: this.onClickSearch, onMouseDown: noBrowserDefault })
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

	exports.default = SearchBox;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _kendo = __webpack_require__(5);

	var _kendo2 = _interopRequireDefault(_kendo);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _ReactCommon = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ROOT_STYLE = {
	    position: 'relative'
	}; /* Copyright (c) 2015-2016 Wingspan Technology, Inc. */

	var TOOLBAR_STYLE = {
	    position: 'absolute',
	    left: 0,
	    right: 0,
	    bottom: 0,
	    height: 0,
	    overflow: 'hidden',
	    paddingLeft: '10px',
	    backgroundColor: 'gray'
	};

	var HoverView = _react2.default.createClass({
	    displayName: 'HoverView',

	    propTypes: {
	        enabled: _react2.default.PropTypes.bool
	    },

	    componentDidMount: function componentDidMount() {
	        var _this = this;

	        var $el = (0, _ReactCommon.findWidget)(this);

	        this.onMouseEnter = function () {
	            if (!_this.props.enabled) {
	                return;
	            }
	            _kendo2.default.fx($el.find('.toolbar')).expand('vertical').stop().play();
	        };
	        this.onMouseLeave = function () {
	            if (!_this.props.enabled) {
	                return;
	            }
	            _kendo2.default.fx($el.find('.toolbar')).expand('vertical').stop().reverse();
	        };

	        $el.on('mouseenter', this.onMouseEnter);
	        $el.on('mouseleave', this.onMouseLeave);
	    },

	    componentWillUnmount: function componentWillUnmount() {
	        var $el = (0, _ReactCommon.findWidget)(this);

	        $el.off('mouseenter', this.onMouseEnter);
	        $el.off('mouseleave', this.onMouseLeave);
	    },

	    render: function render() {
	        var kids = _react2.default.Children.toArray(this.props.children);

	        return _react2.default.createElement(
	            'div',
	            { className: 'hoverPager', style: ROOT_STYLE },
	            kids[0],
	            _react2.default.createElement(
	                'div',
	                { className: 'toolbar', style: TOOLBAR_STYLE },
	                kids[1]
	            )
	        );
	    }
	});

	exports.default = HoverView;

/***/ }
/******/ ])
});
;