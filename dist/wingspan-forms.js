(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("kendo"), require("jquery"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "kendo", "jquery", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["WingspanForms"] = factory(require("react"), require("kendo"), require("jquery"), require("react-dom"));
	else
		root["WingspanForms"] = factory(root["react"], root["kendo"], root["jquery"], root["react-dom"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_95__, __WEBPACK_EXTERNAL_MODULE_98__, __WEBPACK_EXTERNAL_MODULE_141__, __WEBPACK_EXTERNAL_MODULE_143__) {
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

	var _FormField = __webpack_require__(153);

	var _FormField2 = _interopRequireDefault(_FormField);

	var _AutoField = __webpack_require__(155);

	var _AutoField2 = _interopRequireDefault(_AutoField);

	var _ControlCommon = __webpack_require__(99);

	var ControlCommon = _interopRequireWildcard(_ControlCommon);

	var _Button = __webpack_require__(156);

	var _Button2 = _interopRequireDefault(_Button);

	var _Carousel = __webpack_require__(157);

	var _Carousel2 = _interopRequireDefault(_Carousel);

	var _CheckBox = __webpack_require__(158);

	var _CheckBox2 = _interopRequireDefault(_CheckBox);

	var _KendoAutoComplete = __webpack_require__(162);

	var _KendoAutoComplete2 = _interopRequireDefault(_KendoAutoComplete);

	var _KendoComboBox = __webpack_require__(96);

	var _KendoComboBox2 = _interopRequireDefault(_KendoComboBox);

	var _KendoDatePicker = __webpack_require__(144);

	var _KendoDatePicker2 = _interopRequireDefault(_KendoDatePicker);

	var _KendoDateTimePicker = __webpack_require__(146);

	var _KendoDateTimePicker2 = _interopRequireDefault(_KendoDateTimePicker);

	var _KendoDropDownList = __webpack_require__(163);

	var _KendoDropDownList2 = _interopRequireDefault(_KendoDropDownList);

	var _KendoGrid = __webpack_require__(164);

	var _KendoGrid2 = _interopRequireDefault(_KendoGrid);

	var _KendoGridPicker = __webpack_require__(165);

	var _KendoGridPicker2 = _interopRequireDefault(_KendoGridPicker);

	var _KendoListView = __webpack_require__(166);

	var _KendoListView2 = _interopRequireDefault(_KendoListView);

	var _KendoMultiSelect = __webpack_require__(148);

	var _KendoMultiSelect2 = _interopRequireDefault(_KendoMultiSelect);

	var _KendoNumericTextBox = __webpack_require__(149);

	var _KendoNumericTextBox2 = _interopRequireDefault(_KendoNumericTextBox);

	var _KendoPager = __webpack_require__(214);

	var _KendoPager2 = _interopRequireDefault(_KendoPager);

	var _KendoPanelBar = __webpack_require__(215);

	var _KendoPanelBar2 = _interopRequireDefault(_KendoPanelBar);

	var _KendoTabStrip = __webpack_require__(217);

	var _KendoTabStrip2 = _interopRequireDefault(_KendoTabStrip);

	var _KendoText = __webpack_require__(150);

	var _KendoText2 = _interopRequireDefault(_KendoText);

	var _KendoTimePicker = __webpack_require__(147);

	var _KendoTimePicker2 = _interopRequireDefault(_KendoTimePicker);

	var _KendoTreeView = __webpack_require__(218);

	var _KendoTreeView2 = _interopRequireDefault(_KendoTreeView);

	var _MultiSelect = __webpack_require__(219);

	var _MultiSelect2 = _interopRequireDefault(_MultiSelect);

	var _MultilineText = __webpack_require__(151);

	var _MultilineText2 = _interopRequireDefault(_MultilineText);

	var _Radio = __webpack_require__(220);

	var _Radio2 = _interopRequireDefault(_Radio);

	var _RadioGroup = __webpack_require__(221);

	var _RadioGroup2 = _interopRequireDefault(_RadioGroup);

	var _SwitchBox = __webpack_require__(152);

	var _SwitchBox2 = _interopRequireDefault(_SwitchBox);

	var _TabStrip = __webpack_require__(222);

	var _TabStrip2 = _interopRequireDefault(_TabStrip);

	var _PromiseButton = __webpack_require__(223);

	var _PromiseButton2 = _interopRequireDefault(_PromiseButton);

	var _SearchBox = __webpack_require__(224);

	var _SearchBox2 = _interopRequireDefault(_SearchBox);

	var _HoverView = __webpack_require__(225);

	var _HoverView2 = _interopRequireDefault(_HoverView);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* Library entry-point */
	module.exports = {
	    AutoControl: _AutoControl2.default,
	    FormField: _FormField2.default,
	    AutoField: _AutoField2.default,
	    ControlCommon: ControlCommon,
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
	    KendoTreeView: _KendoTreeView2.default,
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

	var _omit2 = __webpack_require__(2);

	var _omit3 = _interopRequireDefault(_omit2);

	var _react = __webpack_require__(95);

	var _react2 = _interopRequireDefault(_react);

	var _KendoComboBox = __webpack_require__(96);

	var _KendoComboBox2 = _interopRequireDefault(_KendoComboBox);

	var _KendoDatePicker = __webpack_require__(144);

	var _KendoDatePicker2 = _interopRequireDefault(_KendoDatePicker);

	var _KendoDateTimePicker = __webpack_require__(146);

	var _KendoDateTimePicker2 = _interopRequireDefault(_KendoDateTimePicker);

	var _KendoTimePicker = __webpack_require__(147);

	var _KendoTimePicker2 = _interopRequireDefault(_KendoTimePicker);

	var _KendoMultiSelect = __webpack_require__(148);

	var _KendoMultiSelect2 = _interopRequireDefault(_KendoMultiSelect);

	var _KendoNumericTextBox = __webpack_require__(149);

	var _KendoNumericTextBox2 = _interopRequireDefault(_KendoNumericTextBox);

	var _KendoText = __webpack_require__(150);

	var _KendoText2 = _interopRequireDefault(_KendoText);

	var _MultilineText = __webpack_require__(151);

	var _MultilineText2 = _interopRequireDefault(_MultilineText);

	var _SwitchBox = __webpack_require__(152);

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
	        var controlProps = (0, _omit3.default)(this.props, EXCLUDE_FROM_CONTROL);

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
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(3),
	    baseDifference = __webpack_require__(4),
	    basePick = __webpack_require__(50),
	    flatRest = __webpack_require__(54),
	    getAllKeysIn = __webpack_require__(71),
	    toKey = __webpack_require__(93);

	/**
	 * The opposite of `_.pick`; this method creates an object composed of the
	 * own and inherited enumerable string keyed properties of `object` that are
	 * not omitted.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The source object.
	 * @param {...(string|string[])} [props] The property identifiers to omit.
	 * @returns {Object} Returns the new object.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': '2', 'c': 3 };
	 *
	 * _.omit(object, ['a', 'c']);
	 * // => { 'b': '2' }
	 */
	var omit = flatRest(function(object, props) {
	  if (object == null) {
	    return {};
	  }
	  props = arrayMap(props, toKey);
	  return basePick(object, baseDifference(getAllKeysIn(object), props));
	});

	module.exports = omit;


/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array ? array.length : 0,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	module.exports = arrayMap;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(5),
	    arrayIncludes = __webpack_require__(42),
	    arrayIncludesWith = __webpack_require__(47),
	    arrayMap = __webpack_require__(3),
	    baseUnary = __webpack_require__(48),
	    cacheHas = __webpack_require__(49);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * The base implementation of methods like `_.difference` without support
	 * for excluding multiple arrays or iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Array} values The values to exclude.
	 * @param {Function} [iteratee] The iteratee invoked per element.
	 * @param {Function} [comparator] The comparator invoked per element.
	 * @returns {Array} Returns the new array of filtered values.
	 */
	function baseDifference(array, values, iteratee, comparator) {
	  var index = -1,
	      includes = arrayIncludes,
	      isCommon = true,
	      length = array.length,
	      result = [],
	      valuesLength = values.length;

	  if (!length) {
	    return result;
	  }
	  if (iteratee) {
	    values = arrayMap(values, baseUnary(iteratee));
	  }
	  if (comparator) {
	    includes = arrayIncludesWith;
	    isCommon = false;
	  }
	  else if (values.length >= LARGE_ARRAY_SIZE) {
	    includes = cacheHas;
	    isCommon = false;
	    values = new SetCache(values);
	  }
	  outer:
	  while (++index < length) {
	    var value = array[index],
	        computed = iteratee ? iteratee(value) : value;

	    value = (comparator || value !== 0) ? value : 0;
	    if (isCommon && computed === computed) {
	      var valuesIndex = valuesLength;
	      while (valuesIndex--) {
	        if (values[valuesIndex] === computed) {
	          continue outer;
	        }
	      }
	      result.push(value);
	    }
	    else if (!includes(values, computed, comparator)) {
	      result.push(value);
	    }
	  }
	  return result;
	}

	module.exports = baseDifference;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(6),
	    setCacheAdd = __webpack_require__(40),
	    setCacheHas = __webpack_require__(41);

	/**
	 *
	 * Creates an array cache object to store unique values.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function SetCache(values) {
	  var index = -1,
	      length = values ? values.length : 0;

	  this.__data__ = new MapCache;
	  while (++index < length) {
	    this.add(values[index]);
	  }
	}

	// Add methods to `SetCache`.
	SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
	SetCache.prototype.has = setCacheHas;

	module.exports = SetCache;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var mapCacheClear = __webpack_require__(7),
	    mapCacheDelete = __webpack_require__(34),
	    mapCacheGet = __webpack_require__(37),
	    mapCacheHas = __webpack_require__(38),
	    mapCacheSet = __webpack_require__(39);

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;

	module.exports = MapCache;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Hash = __webpack_require__(8),
	    ListCache = __webpack_require__(25),
	    Map = __webpack_require__(33);

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.size = 0;
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map || ListCache),
	    'string': new Hash
	  };
	}

	module.exports = mapCacheClear;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var hashClear = __webpack_require__(9),
	    hashDelete = __webpack_require__(21),
	    hashGet = __webpack_require__(22),
	    hashHas = __webpack_require__(23),
	    hashSet = __webpack_require__(24);

	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;

	module.exports = Hash;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(10);

	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	  this.size = 0;
	}

	module.exports = hashClear;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(11);

	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');

	module.exports = nativeCreate;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsNative = __webpack_require__(12),
	    getValue = __webpack_require__(20);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}

	module.exports = getNative;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(13),
	    isMasked = __webpack_require__(15),
	    isObject = __webpack_require__(14),
	    toSource = __webpack_require__(19);

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}

	module.exports = baseIsNative;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(14);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    proxyTag = '[object Proxy]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed array and other constructors.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag || tag == proxyTag;
	}

	module.exports = isFunction;


/***/ },
/* 14 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var coreJsData = __webpack_require__(16);

	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());

	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}

	module.exports = isMasked;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(17);

	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];

	module.exports = coreJsData;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(18);

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	module.exports = root;


/***/ },
/* 18 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	module.exports = freeGlobal;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 19 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var funcProto = Function.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to process.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}

	module.exports = toSource;


/***/ },
/* 20 */
/***/ function(module, exports) {

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	module.exports = getValue;


/***/ },
/* 21 */
/***/ function(module, exports) {

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  var result = this.has(key) && delete this.__data__[key];
	  this.size -= result ? 1 : 0;
	  return result;
	}

	module.exports = hashDelete;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(10);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(data, key) ? data[key] : undefined;
	}

	module.exports = hashGet;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(10);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
	}

	module.exports = hashHas;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(10);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  this.size += this.has(key) ? 0 : 1;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}

	module.exports = hashSet;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var listCacheClear = __webpack_require__(26),
	    listCacheDelete = __webpack_require__(27),
	    listCacheGet = __webpack_require__(30),
	    listCacheHas = __webpack_require__(31),
	    listCacheSet = __webpack_require__(32);

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;

	module.exports = ListCache;


/***/ },
/* 26 */
/***/ function(module, exports) {

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	  this.size = 0;
	}

	module.exports = listCacheClear;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(28);

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  --this.size;
	  return true;
	}

	module.exports = listCacheDelete;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(29);

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	module.exports = assocIndexOf;


/***/ },
/* 29 */
/***/ function(module, exports) {

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	module.exports = eq;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(28);

	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  return index < 0 ? undefined : data[index][1];
	}

	module.exports = listCacheGet;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(28);

	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}

	module.exports = listCacheHas;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(28);

	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    ++this.size;
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}

	module.exports = listCacheSet;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(11),
	    root = __webpack_require__(17);

	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');

	module.exports = Map;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(35);

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  var result = getMapData(this, key)['delete'](key);
	  this.size -= result ? 1 : 0;
	  return result;
	}

	module.exports = mapCacheDelete;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var isKeyable = __webpack_require__(36);

	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}

	module.exports = getMapData;


/***/ },
/* 36 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}

	module.exports = isKeyable;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(35);

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}

	module.exports = mapCacheGet;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(35);

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}

	module.exports = mapCacheHas;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(35);

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  var data = getMapData(this, key),
	      size = data.size;

	  data.set(key, value);
	  this.size += data.size == size ? 0 : 1;
	  return this;
	}

	module.exports = mapCacheSet;


/***/ },
/* 40 */
/***/ function(module, exports) {

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Adds `value` to the array cache.
	 *
	 * @private
	 * @name add
	 * @memberOf SetCache
	 * @alias push
	 * @param {*} value The value to cache.
	 * @returns {Object} Returns the cache instance.
	 */
	function setCacheAdd(value) {
	  this.__data__.set(value, HASH_UNDEFINED);
	  return this;
	}

	module.exports = setCacheAdd;


/***/ },
/* 41 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is in the array cache.
	 *
	 * @private
	 * @name has
	 * @memberOf SetCache
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `true` if `value` is found, else `false`.
	 */
	function setCacheHas(value) {
	  return this.__data__.has(value);
	}

	module.exports = setCacheHas;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var baseIndexOf = __webpack_require__(43);

	/**
	 * A specialized version of `_.includes` for arrays without support for
	 * specifying an index to search from.
	 *
	 * @private
	 * @param {Array} [array] The array to inspect.
	 * @param {*} target The value to search for.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludes(array, value) {
	  var length = array ? array.length : 0;
	  return !!length && baseIndexOf(array, value, 0) > -1;
	}

	module.exports = arrayIncludes;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var baseFindIndex = __webpack_require__(44),
	    baseIsNaN = __webpack_require__(45),
	    strictIndexOf = __webpack_require__(46);

	/**
	 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseIndexOf(array, value, fromIndex) {
	  return value === value
	    ? strictIndexOf(array, value, fromIndex)
	    : baseFindIndex(array, baseIsNaN, fromIndex);
	}

	module.exports = baseIndexOf;


/***/ },
/* 44 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.findIndex` and `_.findLastIndex` without
	 * support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Function} predicate The function invoked per iteration.
	 * @param {number} fromIndex The index to search from.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseFindIndex(array, predicate, fromIndex, fromRight) {
	  var length = array.length,
	      index = fromIndex + (fromRight ? 1 : -1);

	  while ((fromRight ? index-- : ++index < length)) {
	    if (predicate(array[index], index, array)) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = baseFindIndex;


/***/ },
/* 45 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.isNaN` without support for number objects.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
	 */
	function baseIsNaN(value) {
	  return value !== value;
	}

	module.exports = baseIsNaN;


/***/ },
/* 46 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.indexOf` which performs strict equality
	 * comparisons of values, i.e. `===`.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function strictIndexOf(array, value, fromIndex) {
	  var index = fromIndex - 1,
	      length = array.length;

	  while (++index < length) {
	    if (array[index] === value) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = strictIndexOf;


/***/ },
/* 47 */
/***/ function(module, exports) {

	/**
	 * This function is like `arrayIncludes` except that it accepts a comparator.
	 *
	 * @private
	 * @param {Array} [array] The array to inspect.
	 * @param {*} target The value to search for.
	 * @param {Function} comparator The comparator invoked per element.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludesWith(array, value, comparator) {
	  var index = -1,
	      length = array ? array.length : 0;

	  while (++index < length) {
	    if (comparator(value, array[index])) {
	      return true;
	    }
	  }
	  return false;
	}

	module.exports = arrayIncludesWith;


/***/ },
/* 48 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}

	module.exports = baseUnary;


/***/ },
/* 49 */
/***/ function(module, exports) {

	/**
	 * Checks if a `cache` value for `key` exists.
	 *
	 * @private
	 * @param {Object} cache The cache to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function cacheHas(cache, key) {
	  return cache.has(key);
	}

	module.exports = cacheHas;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var basePickBy = __webpack_require__(51);

	/**
	 * The base implementation of `_.pick` without support for individual
	 * property identifiers.
	 *
	 * @private
	 * @param {Object} object The source object.
	 * @param {string[]} props The property identifiers to pick.
	 * @returns {Object} Returns the new object.
	 */
	function basePick(object, props) {
	  object = Object(object);
	  return basePickBy(object, props, function(value, key) {
	    return key in object;
	  });
	}

	module.exports = basePick;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var baseAssignValue = __webpack_require__(52);

	/**
	 * The base implementation of  `_.pickBy` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The source object.
	 * @param {string[]} props The property identifiers to pick from.
	 * @param {Function} predicate The function invoked per property.
	 * @returns {Object} Returns the new object.
	 */
	function basePickBy(object, props, predicate) {
	  var index = -1,
	      length = props.length,
	      result = {};

	  while (++index < length) {
	    var key = props[index],
	        value = object[key];

	    if (predicate(value, key)) {
	      baseAssignValue(result, key, value);
	    }
	  }
	  return result;
	}

	module.exports = basePickBy;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var defineProperty = __webpack_require__(53);

	/**
	 * The base implementation of `assignValue` and `assignMergeValue` without
	 * value checks.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function baseAssignValue(object, key, value) {
	  if (key == '__proto__' && defineProperty) {
	    defineProperty(object, key, {
	      'configurable': true,
	      'enumerable': true,
	      'value': value,
	      'writable': true
	    });
	  } else {
	    object[key] = value;
	  }
	}

	module.exports = baseAssignValue;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(11);

	var defineProperty = (function() {
	  try {
	    var func = getNative(Object, 'defineProperty');
	    func({}, '', {});
	    return func;
	  } catch (e) {}
	}());

	module.exports = defineProperty;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var flatten = __webpack_require__(55),
	    overRest = __webpack_require__(64),
	    setToString = __webpack_require__(66);

	/**
	 * A specialized version of `baseRest` which flattens the rest array.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @returns {Function} Returns the new function.
	 */
	function flatRest(func) {
	  return setToString(overRest(func, undefined, flatten), func + '');
	}

	module.exports = flatRest;


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var baseFlatten = __webpack_require__(56);

	/**
	 * Flattens `array` a single level deep.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {Array} array The array to flatten.
	 * @returns {Array} Returns the new flattened array.
	 * @example
	 *
	 * _.flatten([1, [2, [3, [4]], 5]]);
	 * // => [1, 2, [3, [4]], 5]
	 */
	function flatten(array) {
	  var length = array ? array.length : 0;
	  return length ? baseFlatten(array, 1) : [];
	}

	module.exports = flatten;


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(57),
	    isFlattenable = __webpack_require__(58);

	/**
	 * The base implementation of `_.flatten` with support for restricting flattening.
	 *
	 * @private
	 * @param {Array} array The array to flatten.
	 * @param {number} depth The maximum recursion depth.
	 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
	 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
	 * @param {Array} [result=[]] The initial result value.
	 * @returns {Array} Returns the new flattened array.
	 */
	function baseFlatten(array, depth, predicate, isStrict, result) {
	  var index = -1,
	      length = array.length;

	  predicate || (predicate = isFlattenable);
	  result || (result = []);

	  while (++index < length) {
	    var value = array[index];
	    if (depth > 0 && predicate(value)) {
	      if (depth > 1) {
	        // Recursively flatten arrays (susceptible to call stack limits).
	        baseFlatten(value, depth - 1, predicate, isStrict, result);
	      } else {
	        arrayPush(result, value);
	      }
	    } else if (!isStrict) {
	      result[result.length] = value;
	    }
	  }
	  return result;
	}

	module.exports = baseFlatten;


/***/ },
/* 57 */
/***/ function(module, exports) {

	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;

	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}

	module.exports = arrayPush;


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(59),
	    isArguments = __webpack_require__(60),
	    isArray = __webpack_require__(63);

	/** Built-in value references. */
	var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

	/**
	 * Checks if `value` is a flattenable `arguments` object or array.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
	 */
	function isFlattenable(value) {
	  return isArray(value) || isArguments(value) ||
	    !!(spreadableSymbol && value && value[spreadableSymbol]);
	}

	module.exports = isFlattenable;


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(17);

	/** Built-in value references. */
	var Symbol = root.Symbol;

	module.exports = Symbol;


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsArguments = __webpack_require__(61),
	    isObjectLike = __webpack_require__(62);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
	  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
	    !propertyIsEnumerable.call(value, 'callee');
	};

	module.exports = isArguments;


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(62);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * The base implementation of `_.isArguments`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 */
	function baseIsArguments(value) {
	  return isObjectLike(value) && objectToString.call(value) == argsTag;
	}

	module.exports = baseIsArguments;


/***/ },
/* 62 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 63 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	module.exports = isArray;


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(65);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * A specialized version of `baseRest` which transforms the rest array.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @param {Function} transform The rest array transform.
	 * @returns {Function} Returns the new function.
	 */
	function overRest(func, start, transform) {
	  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);

	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    index = -1;
	    var otherArgs = Array(start + 1);
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = transform(array);
	    return apply(func, this, otherArgs);
	  };
	}

	module.exports = overRest;


/***/ },
/* 65 */
/***/ function(module, exports) {

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  switch (args.length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}

	module.exports = apply;


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var baseSetToString = __webpack_require__(67),
	    shortOut = __webpack_require__(70);

	/**
	 * Sets the `toString` method of `func` to return `string`.
	 *
	 * @private
	 * @param {Function} func The function to modify.
	 * @param {Function} string The `toString` result.
	 * @returns {Function} Returns `func`.
	 */
	var setToString = shortOut(baseSetToString);

	module.exports = setToString;


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var constant = __webpack_require__(68),
	    defineProperty = __webpack_require__(53),
	    identity = __webpack_require__(69);

	/**
	 * The base implementation of `setToString` without support for hot loop shorting.
	 *
	 * @private
	 * @param {Function} func The function to modify.
	 * @param {Function} string The `toString` result.
	 * @returns {Function} Returns `func`.
	 */
	var baseSetToString = !defineProperty ? identity : function(func, string) {
	  return defineProperty(func, 'toString', {
	    'configurable': true,
	    'enumerable': false,
	    'value': constant(string),
	    'writable': true
	  });
	};

	module.exports = baseSetToString;


/***/ },
/* 68 */
/***/ function(module, exports) {

	/**
	 * Creates a function that returns `value`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {*} value The value to return from the new function.
	 * @returns {Function} Returns the new constant function.
	 * @example
	 *
	 * var objects = _.times(2, _.constant({ 'a': 1 }));
	 *
	 * console.log(objects);
	 * // => [{ 'a': 1 }, { 'a': 1 }]
	 *
	 * console.log(objects[0] === objects[1]);
	 * // => true
	 */
	function constant(value) {
	  return function() {
	    return value;
	  };
	}

	module.exports = constant;


/***/ },
/* 69 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 70 */
/***/ function(module, exports) {

	/** Used to detect hot functions by number of calls within a span of milliseconds. */
	var HOT_COUNT = 500,
	    HOT_SPAN = 16;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeNow = Date.now;

	/**
	 * Creates a function that'll short out and invoke `identity` instead
	 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
	 * milliseconds.
	 *
	 * @private
	 * @param {Function} func The function to restrict.
	 * @returns {Function} Returns the new shortable function.
	 */
	function shortOut(func) {
	  var count = 0,
	      lastCalled = 0;

	  return function() {
	    var stamp = nativeNow(),
	        remaining = HOT_SPAN - (stamp - lastCalled);

	    lastCalled = stamp;
	    if (remaining > 0) {
	      if (++count >= HOT_COUNT) {
	        return arguments[0];
	      }
	    } else {
	      count = 0;
	    }
	    return func.apply(undefined, arguments);
	  };
	}

	module.exports = shortOut;


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetAllKeys = __webpack_require__(72),
	    getSymbolsIn = __webpack_require__(73),
	    keysIn = __webpack_require__(78);

	/**
	 * Creates an array of own and inherited enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function getAllKeysIn(object) {
	  return baseGetAllKeys(object, keysIn, getSymbolsIn);
	}

	module.exports = getAllKeysIn;


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(57),
	    isArray = __webpack_require__(63);

	/**
	 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
	 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @param {Function} symbolsFunc The function to get the symbols of `object`.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function baseGetAllKeys(object, keysFunc, symbolsFunc) {
	  var result = keysFunc(object);
	  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
	}

	module.exports = baseGetAllKeys;


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(57),
	    getPrototype = __webpack_require__(74),
	    getSymbols = __webpack_require__(76),
	    stubArray = __webpack_require__(77);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetSymbols = Object.getOwnPropertySymbols;

	/**
	 * Creates an array of the own and inherited enumerable symbol properties
	 * of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
	  var result = [];
	  while (object) {
	    arrayPush(result, getSymbols(object));
	    object = getPrototype(object);
	  }
	  return result;
	};

	module.exports = getSymbolsIn;


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(75);

	/** Built-in value references. */
	var getPrototype = overArg(Object.getPrototypeOf, Object);

	module.exports = getPrototype;


/***/ },
/* 75 */
/***/ function(module, exports) {

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	module.exports = overArg;


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(75),
	    stubArray = __webpack_require__(77);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetSymbols = Object.getOwnPropertySymbols;

	/**
	 * Creates an array of the own enumerable symbol properties of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;

	module.exports = getSymbols;


/***/ },
/* 77 */
/***/ function(module, exports) {

	/**
	 * This method returns a new empty array.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {Array} Returns the new empty array.
	 * @example
	 *
	 * var arrays = _.times(2, _.stubArray);
	 *
	 * console.log(arrays);
	 * // => [[], []]
	 *
	 * console.log(arrays[0] === arrays[1]);
	 * // => false
	 */
	function stubArray() {
	  return [];
	}

	module.exports = stubArray;


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var arrayLikeKeys = __webpack_require__(79),
	    baseKeysIn = __webpack_require__(89),
	    isArrayLike = __webpack_require__(92);

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
	}

	module.exports = keysIn;


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(80),
	    isArguments = __webpack_require__(60),
	    isArray = __webpack_require__(63),
	    isBuffer = __webpack_require__(81),
	    isIndex = __webpack_require__(84),
	    isTypedArray = __webpack_require__(85);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  var isArr = isArray(value),
	      isArg = !isArr && isArguments(value),
	      isBuff = !isArr && !isArg && isBuffer(value),
	      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
	      skipIndexes = isArr || isArg || isBuff || isType,
	      result = skipIndexes ? baseTimes(value.length, String) : [],
	      length = result.length;

	  for (var key in value) {
	    if ((inherited || hasOwnProperty.call(value, key)) &&
	        !(skipIndexes && (
	           // Safari 9 has enumerable `arguments.length` in strict mode.
	           key == 'length' ||
	           // Node.js 0.10 has enumerable non-index properties on buffers.
	           (isBuff && (key == 'offset' || key == 'parent')) ||
	           // PhantomJS 2 has enumerable non-index properties on typed arrays.
	           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
	           // Skip index properties.
	           isIndex(key, length)
	        ))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = arrayLikeKeys;


/***/ },
/* 80 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	module.exports = baseTimes;


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(17),
	    stubFalse = __webpack_require__(83);

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer = nativeIsBuffer || stubFalse;

	module.exports = isBuffer;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(82)(module)))

/***/ },
/* 82 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 83 */
/***/ function(module, exports) {

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}

	module.exports = stubFalse;


/***/ },
/* 84 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}

	module.exports = isIndex;


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsTypedArray = __webpack_require__(86),
	    baseUnary = __webpack_require__(48),
	    nodeUtil = __webpack_require__(88);

	/* Node.js helper references. */
	var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

	module.exports = isTypedArray;


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(87),
	    isObjectLike = __webpack_require__(62);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */
	function baseIsTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
	}

	module.exports = baseIsTypedArray;


/***/ },
/* 87 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(18);

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports && freeGlobal.process;

	/** Used to access faster Node.js helpers. */
	var nodeUtil = (function() {
	  try {
	    return freeProcess && freeProcess.binding('util');
	  } catch (e) {}
	}());

	module.exports = nodeUtil;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(82)(module)))

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(14),
	    isPrototype = __webpack_require__(90),
	    nativeKeysIn = __webpack_require__(91);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeysIn(object) {
	  if (!isObject(object)) {
	    return nativeKeysIn(object);
	  }
	  var isProto = isPrototype(object),
	      result = [];

	  for (var key in object) {
	    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = baseKeysIn;


/***/ },
/* 90 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

	  return value === proto;
	}

	module.exports = isPrototype;


/***/ },
/* 91 */
/***/ function(module, exports) {

	/**
	 * This function is like
	 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * except that it includes inherited enumerable properties.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function nativeKeysIn(object) {
	  var result = [];
	  if (object != null) {
	    for (var key in Object(object)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = nativeKeysIn;


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(13),
	    isLength = __webpack_require__(87);

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}

	module.exports = isArrayLike;


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var isSymbol = __webpack_require__(94);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/**
	 * Converts `value` to a string key if it's not a string or symbol.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {string|symbol} Returns the key.
	 */
	function toKey(value) {
	  if (typeof value == 'string' || isSymbol(value)) {
	    return value;
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	module.exports = toKey;


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(62);

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}

	module.exports = isSymbol;


/***/ },
/* 95 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_95__;

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(95);

	var _react2 = _interopRequireDefault(_react);

	var _SelectWidgetMixin = __webpack_require__(97);

	var _SelectWidgetMixin2 = _interopRequireDefault(_SelectWidgetMixin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PropTypes = _react2.default.PropTypes;

	function resetCustomValue(e) {
	    var widget = e.sender;

	    if (widget.value() && widget.select() === -1) {
	        //custom has been selected
	        widget.value('');
	        // Also clear the filter that the custom value applied so all the options are available
	        if (widget.options.filter !== 'none') {
	            widget.dataSource.filter(null);
	        }
	    }
	}

	var KendoComboBox = _react2.default.createClass({
	    displayName: 'KendoComboBox',

	    mixins: [(0, _SelectWidgetMixin2.default)('kendoComboBox')],

	    propTypes: {
	        id: PropTypes.string,
	        value: PropTypes.any,
	        onChange: PropTypes.func,
	        autoBind: PropTypes.bool,
	        dataSource: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
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
	        var _this = this;

	        // Preventing custom values requires us to hook the change event before the mixin's
	        // default behavior because we don't want the custom value to be passed to our parent.
	        if (this.props.preventCustomValues) {
	            this.onChange = function (e) {
	                resetCustomValue(e);
	                Object.getPrototypeOf(_this).onChange.call(_this, e);
	            };
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
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _kendo = __webpack_require__(98);

	var _kendo2 = _interopRequireDefault(_kendo);

	var _ControlCommon = __webpack_require__(99);

	var _ReactCommon = __webpack_require__(142);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var DataSource = _kendo2.default.data.DataSource;

	var CANNOT_CHANGE = ['template', 'valueField', 'displayField', 'placeholder', 'filter'];

	/* Don't ever return "undefined" as a value because kendo assumes you're doing a "get" instead of a "set" */
	function notUndefined(value) {
	    return value !== undefined ? value : '';
	}

	function rawValue(props) {
	    return notUndefined((0, _ReactCommon.isObject)(props.value) ? props.value[props.valueField] : props.value);
	}

	function displayValue(props) {
	    return notUndefined((0, _ReactCommon.isObject)(props.value) ? props.value[props.displayField] : props.value);
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

	            if ((0, _ReactCommon.isEmpty)(props.value)) {
	                return '';
	            }
	            if ((0, _ReactCommon.isEmpty)(props.displayField)) {
	                return props.value;
	            }
	            // If the value is just an ID, the display value is in the DataSource.
	            if (!(0, _ReactCommon.isObject)(props.value)) {
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

	            $el[widgetName]((0, _ReactCommon.widgetConfig)({
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

	            if ((0, _ReactCommon.isObject)(props.value)) {
	                this.getWidget().text(displayValue(props));
	            }
	        },

	        componentDidUpdate: function componentDidUpdate(prevProps) {
	            if (this.props.noControl) {
	                return;
	            }

	            var props = this.props;
	            var kendoWidget = this.getWidget();

	            if (!(0, _ControlCommon.isEqualDataSource)(props.dataSource, prevProps.dataSource)) {
	                kendoWidget.setDataSource(props.dataSource);
	            }

	            if (props.value !== prevProps.value) {
	                kendoWidget.value(rawValue(props));

	                if ((0, _ReactCommon.isObject)(props.value)) {
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
	            var _this = this;

	            console.assert(CANNOT_CHANGE.every(function (name) {
	                return nextProps[name] == _this.props[name];
	            }), 'cannot change these props after mount', CANNOT_CHANGE);
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

	            // Don't return a model instance to the caller, just the object data
	            if ((0, _ReactCommon.isObject)(valueObject)) {
	                valueObject = valueObject.toJSON();
	            }

	            // Put the original value back until new props force the change
	            kendoWidget.value(rawValue(this.props));

	            this.props.onChange(value, valueObject);
	        }
	    };
	}

	exports.default = SelectWidgetMixin;

/***/ },
/* 98 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_98__;

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _wrap2 = __webpack_require__(100);

	var _wrap3 = _interopRequireDefault(_wrap2);

	exports.quadState = quadState;
	exports.isEqualDataSource = isEqualDataSource;
	exports.attachFormTooltips = attachFormTooltips;
	exports.hideErrorTooltip = hideErrorTooltip;
	exports.refreshErrorTooltip = refreshErrorTooltip;

	var _jquery = __webpack_require__(141);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _kendo = __webpack_require__(98);

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

	function isEqualDataSource(d1, d2) {
	    if (d1 === d2) {
	        return true;
	    }
	    // Cannot compare DataSource objects, so return false if either param is not an array.
	    if (!Array.isArray(d1) || !Array.isArray(d2)) {
	        return false;
	    }
	    if (d1.length !== d2.length) {
	        return false;
	    }
	    // Arrays are equal if all items are equal.
	    return d1.every(function (item, index) {
	        return item === d2[index];
	    });
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
	_kendo2.default.ui.Tooltip.fn._initPopup = (0, _wrap3.default)(_kendo2.default.ui.Tooltip.fn._initPopup, function (wrapped) {
	    wrapped.call(this);

	    if (this.options.open) {
	        this.popup.bind('open', this.options.open.bind(this));
	    }
	});

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(69),
	    partial = __webpack_require__(101);

	/**
	 * Creates a function that provides `value` to `wrapper` as its first
	 * argument. Any additional arguments provided to the function are appended
	 * to those provided to the `wrapper`. The wrapper is invoked with the `this`
	 * binding of the created function.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {*} value The value to wrap.
	 * @param {Function} [wrapper=identity] The wrapper function.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var p = _.wrap(_.escape, function(func, text) {
	 *   return '<p>' + func(text) + '</p>';
	 * });
	 *
	 * p('fred, barney, & pebbles');
	 * // => '<p>fred, barney, &amp; pebbles</p>'
	 */
	function wrap(value, wrapper) {
	  wrapper = wrapper == null ? identity : wrapper;
	  return partial(wrapper, value);
	}

	module.exports = wrap;


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var baseRest = __webpack_require__(102),
	    createWrap = __webpack_require__(103),
	    getHolder = __webpack_require__(133),
	    replaceHolders = __webpack_require__(135);

	/** Used to compose bitmasks for function metadata. */
	var PARTIAL_FLAG = 32;

	/**
	 * Creates a function that invokes `func` with `partials` prepended to the
	 * arguments it receives. This method is like `_.bind` except it does **not**
	 * alter the `this` binding.
	 *
	 * The `_.partial.placeholder` value, which defaults to `_` in monolithic
	 * builds, may be used as a placeholder for partially applied arguments.
	 *
	 * **Note:** This method doesn't set the "length" property of partially
	 * applied functions.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.2.0
	 * @category Function
	 * @param {Function} func The function to partially apply arguments to.
	 * @param {...*} [partials] The arguments to be partially applied.
	 * @returns {Function} Returns the new partially applied function.
	 * @example
	 *
	 * function greet(greeting, name) {
	 *   return greeting + ' ' + name;
	 * }
	 *
	 * var sayHelloTo = _.partial(greet, 'hello');
	 * sayHelloTo('fred');
	 * // => 'hello fred'
	 *
	 * // Partially applied with placeholders.
	 * var greetFred = _.partial(greet, _, 'fred');
	 * greetFred('hi');
	 * // => 'hi fred'
	 */
	var partial = baseRest(function(func, partials) {
	  var holders = replaceHolders(partials, getHolder(partial));
	  return createWrap(func, PARTIAL_FLAG, undefined, partials, holders);
	});

	// Assign default placeholders.
	partial.placeholder = {};

	module.exports = partial;


/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(69),
	    overRest = __webpack_require__(64),
	    setToString = __webpack_require__(66);

	/**
	 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 */
	function baseRest(func, start) {
	  return setToString(overRest(func, start, identity), func + '');
	}

	module.exports = baseRest;


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var baseSetData = __webpack_require__(104),
	    createBind = __webpack_require__(107),
	    createCurry = __webpack_require__(110),
	    createHybrid = __webpack_require__(111),
	    createPartial = __webpack_require__(136),
	    getData = __webpack_require__(119),
	    mergeData = __webpack_require__(137),
	    setData = __webpack_require__(127),
	    setWrapToString = __webpack_require__(128),
	    toInteger = __webpack_require__(138);

	/** Error message constants. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/** Used to compose bitmasks for function metadata. */
	var BIND_FLAG = 1,
	    BIND_KEY_FLAG = 2,
	    CURRY_FLAG = 8,
	    CURRY_RIGHT_FLAG = 16,
	    PARTIAL_FLAG = 32,
	    PARTIAL_RIGHT_FLAG = 64;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Creates a function that either curries or invokes `func` with optional
	 * `this` binding and partially applied arguments.
	 *
	 * @private
	 * @param {Function|string} func The function or method name to wrap.
	 * @param {number} bitmask The bitmask flags.
	 *  The bitmask may be composed of the following flags:
	 *     1 - `_.bind`
	 *     2 - `_.bindKey`
	 *     4 - `_.curry` or `_.curryRight` of a bound function
	 *     8 - `_.curry`
	 *    16 - `_.curryRight`
	 *    32 - `_.partial`
	 *    64 - `_.partialRight`
	 *   128 - `_.rearg`
	 *   256 - `_.ary`
	 *   512 - `_.flip`
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {Array} [partials] The arguments to be partially applied.
	 * @param {Array} [holders] The `partials` placeholder indexes.
	 * @param {Array} [argPos] The argument positions of the new function.
	 * @param {number} [ary] The arity cap of `func`.
	 * @param {number} [arity] The arity of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
	  var isBindKey = bitmask & BIND_KEY_FLAG;
	  if (!isBindKey && typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var length = partials ? partials.length : 0;
	  if (!length) {
	    bitmask &= ~(PARTIAL_FLAG | PARTIAL_RIGHT_FLAG);
	    partials = holders = undefined;
	  }
	  ary = ary === undefined ? ary : nativeMax(toInteger(ary), 0);
	  arity = arity === undefined ? arity : toInteger(arity);
	  length -= holders ? holders.length : 0;

	  if (bitmask & PARTIAL_RIGHT_FLAG) {
	    var partialsRight = partials,
	        holdersRight = holders;

	    partials = holders = undefined;
	  }
	  var data = isBindKey ? undefined : getData(func);

	  var newData = [
	    func, bitmask, thisArg, partials, holders, partialsRight, holdersRight,
	    argPos, ary, arity
	  ];

	  if (data) {
	    mergeData(newData, data);
	  }
	  func = newData[0];
	  bitmask = newData[1];
	  thisArg = newData[2];
	  partials = newData[3];
	  holders = newData[4];
	  arity = newData[9] = newData[9] == null
	    ? (isBindKey ? 0 : func.length)
	    : nativeMax(newData[9] - length, 0);

	  if (!arity && bitmask & (CURRY_FLAG | CURRY_RIGHT_FLAG)) {
	    bitmask &= ~(CURRY_FLAG | CURRY_RIGHT_FLAG);
	  }
	  if (!bitmask || bitmask == BIND_FLAG) {
	    var result = createBind(func, bitmask, thisArg);
	  } else if (bitmask == CURRY_FLAG || bitmask == CURRY_RIGHT_FLAG) {
	    result = createCurry(func, bitmask, arity);
	  } else if ((bitmask == PARTIAL_FLAG || bitmask == (BIND_FLAG | PARTIAL_FLAG)) && !holders.length) {
	    result = createPartial(func, bitmask, thisArg, partials);
	  } else {
	    result = createHybrid.apply(undefined, newData);
	  }
	  var setter = data ? baseSetData : setData;
	  return setWrapToString(setter(result, newData), func, bitmask);
	}

	module.exports = createWrap;


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(69),
	    metaMap = __webpack_require__(105);

	/**
	 * The base implementation of `setData` without support for hot loop shorting.
	 *
	 * @private
	 * @param {Function} func The function to associate metadata with.
	 * @param {*} data The metadata.
	 * @returns {Function} Returns `func`.
	 */
	var baseSetData = !metaMap ? identity : function(func, data) {
	  metaMap.set(func, data);
	  return func;
	};

	module.exports = baseSetData;


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var WeakMap = __webpack_require__(106);

	/** Used to store function metadata. */
	var metaMap = WeakMap && new WeakMap;

	module.exports = metaMap;


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(11),
	    root = __webpack_require__(17);

	/* Built-in method references that are verified to be native. */
	var WeakMap = getNative(root, 'WeakMap');

	module.exports = WeakMap;


/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	var createCtor = __webpack_require__(108),
	    root = __webpack_require__(17);

	/** Used to compose bitmasks for function metadata. */
	var BIND_FLAG = 1;

	/**
	 * Creates a function that wraps `func` to invoke it with the optional `this`
	 * binding of `thisArg`.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createBind(func, bitmask, thisArg) {
	  var isBind = bitmask & BIND_FLAG,
	      Ctor = createCtor(func);

	  function wrapper() {
	    var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
	    return fn.apply(isBind ? thisArg : this, arguments);
	  }
	  return wrapper;
	}

	module.exports = createBind;


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(109),
	    isObject = __webpack_require__(14);

	/**
	 * Creates a function that produces an instance of `Ctor` regardless of
	 * whether it was invoked as part of a `new` expression or by `call` or `apply`.
	 *
	 * @private
	 * @param {Function} Ctor The constructor to wrap.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createCtor(Ctor) {
	  return function() {
	    // Use a `switch` statement to work with class constructors. See
	    // http://ecma-international.org/ecma-262/7.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
	    // for more details.
	    var args = arguments;
	    switch (args.length) {
	      case 0: return new Ctor;
	      case 1: return new Ctor(args[0]);
	      case 2: return new Ctor(args[0], args[1]);
	      case 3: return new Ctor(args[0], args[1], args[2]);
	      case 4: return new Ctor(args[0], args[1], args[2], args[3]);
	      case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
	      case 6: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
	      case 7: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
	    }
	    var thisBinding = baseCreate(Ctor.prototype),
	        result = Ctor.apply(thisBinding, args);

	    // Mimic the constructor's `return` behavior.
	    // See https://es5.github.io/#x13.2.2 for more details.
	    return isObject(result) ? result : thisBinding;
	  };
	}

	module.exports = createCtor;


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(14);

	/** Built-in value references. */
	var objectCreate = Object.create;

	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} proto The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	var baseCreate = (function() {
	  function object() {}
	  return function(proto) {
	    if (!isObject(proto)) {
	      return {};
	    }
	    if (objectCreate) {
	      return objectCreate(proto);
	    }
	    object.prototype = proto;
	    var result = new object;
	    object.prototype = undefined;
	    return result;
	  };
	}());

	module.exports = baseCreate;


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(65),
	    createCtor = __webpack_require__(108),
	    createHybrid = __webpack_require__(111),
	    createRecurry = __webpack_require__(115),
	    getHolder = __webpack_require__(133),
	    replaceHolders = __webpack_require__(135),
	    root = __webpack_require__(17);

	/**
	 * Creates a function that wraps `func` to enable currying.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	 * @param {number} arity The arity of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createCurry(func, bitmask, arity) {
	  var Ctor = createCtor(func);

	  function wrapper() {
	    var length = arguments.length,
	        args = Array(length),
	        index = length,
	        placeholder = getHolder(wrapper);

	    while (index--) {
	      args[index] = arguments[index];
	    }
	    var holders = (length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder)
	      ? []
	      : replaceHolders(args, placeholder);

	    length -= holders.length;
	    if (length < arity) {
	      return createRecurry(
	        func, bitmask, createHybrid, wrapper.placeholder, undefined,
	        args, holders, undefined, undefined, arity - length);
	    }
	    var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
	    return apply(fn, this, args);
	  }
	  return wrapper;
	}

	module.exports = createCurry;


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	var composeArgs = __webpack_require__(112),
	    composeArgsRight = __webpack_require__(113),
	    countHolders = __webpack_require__(114),
	    createCtor = __webpack_require__(108),
	    createRecurry = __webpack_require__(115),
	    getHolder = __webpack_require__(133),
	    reorder = __webpack_require__(134),
	    replaceHolders = __webpack_require__(135),
	    root = __webpack_require__(17);

	/** Used to compose bitmasks for function metadata. */
	var BIND_FLAG = 1,
	    BIND_KEY_FLAG = 2,
	    CURRY_FLAG = 8,
	    CURRY_RIGHT_FLAG = 16,
	    ARY_FLAG = 128,
	    FLIP_FLAG = 512;

	/**
	 * Creates a function that wraps `func` to invoke it with optional `this`
	 * binding of `thisArg`, partial application, and currying.
	 *
	 * @private
	 * @param {Function|string} func The function or method name to wrap.
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {Array} [partials] The arguments to prepend to those provided to
	 *  the new function.
	 * @param {Array} [holders] The `partials` placeholder indexes.
	 * @param {Array} [partialsRight] The arguments to append to those provided
	 *  to the new function.
	 * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
	 * @param {Array} [argPos] The argument positions of the new function.
	 * @param {number} [ary] The arity cap of `func`.
	 * @param {number} [arity] The arity of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
	  var isAry = bitmask & ARY_FLAG,
	      isBind = bitmask & BIND_FLAG,
	      isBindKey = bitmask & BIND_KEY_FLAG,
	      isCurried = bitmask & (CURRY_FLAG | CURRY_RIGHT_FLAG),
	      isFlip = bitmask & FLIP_FLAG,
	      Ctor = isBindKey ? undefined : createCtor(func);

	  function wrapper() {
	    var length = arguments.length,
	        args = Array(length),
	        index = length;

	    while (index--) {
	      args[index] = arguments[index];
	    }
	    if (isCurried) {
	      var placeholder = getHolder(wrapper),
	          holdersCount = countHolders(args, placeholder);
	    }
	    if (partials) {
	      args = composeArgs(args, partials, holders, isCurried);
	    }
	    if (partialsRight) {
	      args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
	    }
	    length -= holdersCount;
	    if (isCurried && length < arity) {
	      var newHolders = replaceHolders(args, placeholder);
	      return createRecurry(
	        func, bitmask, createHybrid, wrapper.placeholder, thisArg,
	        args, newHolders, argPos, ary, arity - length
	      );
	    }
	    var thisBinding = isBind ? thisArg : this,
	        fn = isBindKey ? thisBinding[func] : func;

	    length = args.length;
	    if (argPos) {
	      args = reorder(args, argPos);
	    } else if (isFlip && length > 1) {
	      args.reverse();
	    }
	    if (isAry && ary < length) {
	      args.length = ary;
	    }
	    if (this && this !== root && this instanceof wrapper) {
	      fn = Ctor || createCtor(fn);
	    }
	    return fn.apply(thisBinding, args);
	  }
	  return wrapper;
	}

	module.exports = createHybrid;


/***/ },
/* 112 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Creates an array that is the composition of partially applied arguments,
	 * placeholders, and provided arguments into a single array of arguments.
	 *
	 * @private
	 * @param {Array} args The provided arguments.
	 * @param {Array} partials The arguments to prepend to those provided.
	 * @param {Array} holders The `partials` placeholder indexes.
	 * @params {boolean} [isCurried] Specify composing for a curried function.
	 * @returns {Array} Returns the new array of composed arguments.
	 */
	function composeArgs(args, partials, holders, isCurried) {
	  var argsIndex = -1,
	      argsLength = args.length,
	      holdersLength = holders.length,
	      leftIndex = -1,
	      leftLength = partials.length,
	      rangeLength = nativeMax(argsLength - holdersLength, 0),
	      result = Array(leftLength + rangeLength),
	      isUncurried = !isCurried;

	  while (++leftIndex < leftLength) {
	    result[leftIndex] = partials[leftIndex];
	  }
	  while (++argsIndex < holdersLength) {
	    if (isUncurried || argsIndex < argsLength) {
	      result[holders[argsIndex]] = args[argsIndex];
	    }
	  }
	  while (rangeLength--) {
	    result[leftIndex++] = args[argsIndex++];
	  }
	  return result;
	}

	module.exports = composeArgs;


/***/ },
/* 113 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * This function is like `composeArgs` except that the arguments composition
	 * is tailored for `_.partialRight`.
	 *
	 * @private
	 * @param {Array} args The provided arguments.
	 * @param {Array} partials The arguments to append to those provided.
	 * @param {Array} holders The `partials` placeholder indexes.
	 * @params {boolean} [isCurried] Specify composing for a curried function.
	 * @returns {Array} Returns the new array of composed arguments.
	 */
	function composeArgsRight(args, partials, holders, isCurried) {
	  var argsIndex = -1,
	      argsLength = args.length,
	      holdersIndex = -1,
	      holdersLength = holders.length,
	      rightIndex = -1,
	      rightLength = partials.length,
	      rangeLength = nativeMax(argsLength - holdersLength, 0),
	      result = Array(rangeLength + rightLength),
	      isUncurried = !isCurried;

	  while (++argsIndex < rangeLength) {
	    result[argsIndex] = args[argsIndex];
	  }
	  var offset = argsIndex;
	  while (++rightIndex < rightLength) {
	    result[offset + rightIndex] = partials[rightIndex];
	  }
	  while (++holdersIndex < holdersLength) {
	    if (isUncurried || argsIndex < argsLength) {
	      result[offset + holders[holdersIndex]] = args[argsIndex++];
	    }
	  }
	  return result;
	}

	module.exports = composeArgsRight;


/***/ },
/* 114 */
/***/ function(module, exports) {

	/**
	 * Gets the number of `placeholder` occurrences in `array`.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} placeholder The placeholder to search for.
	 * @returns {number} Returns the placeholder count.
	 */
	function countHolders(array, placeholder) {
	  var length = array.length,
	      result = 0;

	  while (length--) {
	    if (array[length] === placeholder) {
	      ++result;
	    }
	  }
	  return result;
	}

	module.exports = countHolders;


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	var isLaziable = __webpack_require__(116),
	    setData = __webpack_require__(127),
	    setWrapToString = __webpack_require__(128);

	/** Used to compose bitmasks for function metadata. */
	var BIND_FLAG = 1,
	    BIND_KEY_FLAG = 2,
	    CURRY_BOUND_FLAG = 4,
	    CURRY_FLAG = 8,
	    PARTIAL_FLAG = 32,
	    PARTIAL_RIGHT_FLAG = 64;

	/**
	 * Creates a function that wraps `func` to continue currying.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	 * @param {Function} wrapFunc The function to create the `func` wrapper.
	 * @param {*} placeholder The placeholder value.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {Array} [partials] The arguments to prepend to those provided to
	 *  the new function.
	 * @param {Array} [holders] The `partials` placeholder indexes.
	 * @param {Array} [argPos] The argument positions of the new function.
	 * @param {number} [ary] The arity cap of `func`.
	 * @param {number} [arity] The arity of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
	  var isCurry = bitmask & CURRY_FLAG,
	      newHolders = isCurry ? holders : undefined,
	      newHoldersRight = isCurry ? undefined : holders,
	      newPartials = isCurry ? partials : undefined,
	      newPartialsRight = isCurry ? undefined : partials;

	  bitmask |= (isCurry ? PARTIAL_FLAG : PARTIAL_RIGHT_FLAG);
	  bitmask &= ~(isCurry ? PARTIAL_RIGHT_FLAG : PARTIAL_FLAG);

	  if (!(bitmask & CURRY_BOUND_FLAG)) {
	    bitmask &= ~(BIND_FLAG | BIND_KEY_FLAG);
	  }
	  var newData = [
	    func, bitmask, thisArg, newPartials, newHolders, newPartialsRight,
	    newHoldersRight, argPos, ary, arity
	  ];

	  var result = wrapFunc.apply(undefined, newData);
	  if (isLaziable(func)) {
	    setData(result, newData);
	  }
	  result.placeholder = placeholder;
	  return setWrapToString(result, func, bitmask);
	}

	module.exports = createRecurry;


/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	var LazyWrapper = __webpack_require__(117),
	    getData = __webpack_require__(119),
	    getFuncName = __webpack_require__(121),
	    lodash = __webpack_require__(123);

	/**
	 * Checks if `func` has a lazy counterpart.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` has a lazy counterpart,
	 *  else `false`.
	 */
	function isLaziable(func) {
	  var funcName = getFuncName(func),
	      other = lodash[funcName];

	  if (typeof other != 'function' || !(funcName in LazyWrapper.prototype)) {
	    return false;
	  }
	  if (func === other) {
	    return true;
	  }
	  var data = getData(other);
	  return !!data && func === data[0];
	}

	module.exports = isLaziable;


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(109),
	    baseLodash = __webpack_require__(118);

	/** Used as references for the maximum length and index of an array. */
	var MAX_ARRAY_LENGTH = 4294967295;

	/**
	 * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
	 *
	 * @private
	 * @constructor
	 * @param {*} value The value to wrap.
	 */
	function LazyWrapper(value) {
	  this.__wrapped__ = value;
	  this.__actions__ = [];
	  this.__dir__ = 1;
	  this.__filtered__ = false;
	  this.__iteratees__ = [];
	  this.__takeCount__ = MAX_ARRAY_LENGTH;
	  this.__views__ = [];
	}

	// Ensure `LazyWrapper` is an instance of `baseLodash`.
	LazyWrapper.prototype = baseCreate(baseLodash.prototype);
	LazyWrapper.prototype.constructor = LazyWrapper;

	module.exports = LazyWrapper;


/***/ },
/* 118 */
/***/ function(module, exports) {

	/**
	 * The function whose prototype chain sequence wrappers inherit from.
	 *
	 * @private
	 */
	function baseLodash() {
	  // No operation performed.
	}

	module.exports = baseLodash;


/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	var metaMap = __webpack_require__(105),
	    noop = __webpack_require__(120);

	/**
	 * Gets metadata for `func`.
	 *
	 * @private
	 * @param {Function} func The function to query.
	 * @returns {*} Returns the metadata for `func`.
	 */
	var getData = !metaMap ? noop : function(func) {
	  return metaMap.get(func);
	};

	module.exports = getData;


/***/ },
/* 120 */
/***/ function(module, exports) {

	/**
	 * This method returns `undefined`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.3.0
	 * @category Util
	 * @example
	 *
	 * _.times(2, _.noop);
	 * // => [undefined, undefined]
	 */
	function noop() {
	  // No operation performed.
	}

	module.exports = noop;


/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	var realNames = __webpack_require__(122);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Gets the name of `func`.
	 *
	 * @private
	 * @param {Function} func The function to query.
	 * @returns {string} Returns the function name.
	 */
	function getFuncName(func) {
	  var result = (func.name + ''),
	      array = realNames[result],
	      length = hasOwnProperty.call(realNames, result) ? array.length : 0;

	  while (length--) {
	    var data = array[length],
	        otherFunc = data.func;
	    if (otherFunc == null || otherFunc == func) {
	      return data.name;
	    }
	  }
	  return result;
	}

	module.exports = getFuncName;


/***/ },
/* 122 */
/***/ function(module, exports) {

	/** Used to lookup unminified function names. */
	var realNames = {};

	module.exports = realNames;


/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	var LazyWrapper = __webpack_require__(117),
	    LodashWrapper = __webpack_require__(124),
	    baseLodash = __webpack_require__(118),
	    isArray = __webpack_require__(63),
	    isObjectLike = __webpack_require__(62),
	    wrapperClone = __webpack_require__(125);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates a `lodash` object which wraps `value` to enable implicit method
	 * chain sequences. Methods that operate on and return arrays, collections,
	 * and functions can be chained together. Methods that retrieve a single value
	 * or may return a primitive value will automatically end the chain sequence
	 * and return the unwrapped value. Otherwise, the value must be unwrapped
	 * with `_#value`.
	 *
	 * Explicit chain sequences, which must be unwrapped with `_#value`, may be
	 * enabled using `_.chain`.
	 *
	 * The execution of chained methods is lazy, that is, it's deferred until
	 * `_#value` is implicitly or explicitly called.
	 *
	 * Lazy evaluation allows several methods to support shortcut fusion.
	 * Shortcut fusion is an optimization to merge iteratee calls; this avoids
	 * the creation of intermediate arrays and can greatly reduce the number of
	 * iteratee executions. Sections of a chain sequence qualify for shortcut
	 * fusion if the section is applied to an array of at least `200` elements
	 * and any iteratees accept only one argument. The heuristic for whether a
	 * section qualifies for shortcut fusion is subject to change.
	 *
	 * Chaining is supported in custom builds as long as the `_#value` method is
	 * directly or indirectly included in the build.
	 *
	 * In addition to lodash methods, wrappers have `Array` and `String` methods.
	 *
	 * The wrapper `Array` methods are:
	 * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`
	 *
	 * The wrapper `String` methods are:
	 * `replace` and `split`
	 *
	 * The wrapper methods that support shortcut fusion are:
	 * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
	 * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
	 * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`
	 *
	 * The chainable wrapper methods are:
	 * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`, `at`,
	 * `before`, `bind`, `bindAll`, `bindKey`, `castArray`, `chain`, `chunk`,
	 * `commit`, `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`,
	 * `curry`, `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`,
	 * `difference`, `differenceBy`, `differenceWith`, `drop`, `dropRight`,
	 * `dropRightWhile`, `dropWhile`, `extend`, `extendWith`, `fill`, `filter`,
	 * `flatMap`, `flatMapDeep`, `flatMapDepth`, `flatten`, `flattenDeep`,
	 * `flattenDepth`, `flip`, `flow`, `flowRight`, `fromPairs`, `functions`,
	 * `functionsIn`, `groupBy`, `initial`, `intersection`, `intersectionBy`,
	 * `intersectionWith`, `invert`, `invertBy`, `invokeMap`, `iteratee`, `keyBy`,
	 * `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`,
	 * `memoize`, `merge`, `mergeWith`, `method`, `methodOf`, `mixin`, `negate`,
	 * `nthArg`, `omit`, `omitBy`, `once`, `orderBy`, `over`, `overArgs`,
	 * `overEvery`, `overSome`, `partial`, `partialRight`, `partition`, `pick`,
	 * `pickBy`, `plant`, `property`, `propertyOf`, `pull`, `pullAll`, `pullAllBy`,
	 * `pullAllWith`, `pullAt`, `push`, `range`, `rangeRight`, `rearg`, `reject`,
	 * `remove`, `rest`, `reverse`, `sampleSize`, `set`, `setWith`, `shuffle`,
	 * `slice`, `sort`, `sortBy`, `splice`, `spread`, `tail`, `take`, `takeRight`,
	 * `takeRightWhile`, `takeWhile`, `tap`, `throttle`, `thru`, `toArray`,
	 * `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`, `transform`, `unary`,
	 * `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `unset`,
	 * `unshift`, `unzip`, `unzipWith`, `update`, `updateWith`, `values`,
	 * `valuesIn`, `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`,
	 * `zipObject`, `zipObjectDeep`, and `zipWith`
	 *
	 * The wrapper methods that are **not** chainable by default are:
	 * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
	 * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `conformsTo`, `deburr`,
	 * `defaultTo`, `divide`, `each`, `eachRight`, `endsWith`, `eq`, `escape`,
	 * `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`, `findLast`,
	 * `findLastIndex`, `findLastKey`, `first`, `floor`, `forEach`, `forEachRight`,
	 * `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `get`, `gt`, `gte`, `has`,
	 * `hasIn`, `head`, `identity`, `includes`, `indexOf`, `inRange`, `invoke`,
	 * `isArguments`, `isArray`, `isArrayBuffer`, `isArrayLike`, `isArrayLikeObject`,
	 * `isBoolean`, `isBuffer`, `isDate`, `isElement`, `isEmpty`, `isEqual`,
	 * `isEqualWith`, `isError`, `isFinite`, `isFunction`, `isInteger`, `isLength`,
	 * `isMap`, `isMatch`, `isMatchWith`, `isNaN`, `isNative`, `isNil`, `isNull`,
	 * `isNumber`, `isObject`, `isObjectLike`, `isPlainObject`, `isRegExp`,
	 * `isSafeInteger`, `isSet`, `isString`, `isUndefined`, `isTypedArray`,
	 * `isWeakMap`, `isWeakSet`, `join`, `kebabCase`, `last`, `lastIndexOf`,
	 * `lowerCase`, `lowerFirst`, `lt`, `lte`, `max`, `maxBy`, `mean`, `meanBy`,
	 * `min`, `minBy`, `multiply`, `noConflict`, `noop`, `now`, `nth`, `pad`,
	 * `padEnd`, `padStart`, `parseInt`, `pop`, `random`, `reduce`, `reduceRight`,
	 * `repeat`, `result`, `round`, `runInContext`, `sample`, `shift`, `size`,
	 * `snakeCase`, `some`, `sortedIndex`, `sortedIndexBy`, `sortedLastIndex`,
	 * `sortedLastIndexBy`, `startCase`, `startsWith`, `stubArray`, `stubFalse`,
	 * `stubObject`, `stubString`, `stubTrue`, `subtract`, `sum`, `sumBy`,
	 * `template`, `times`, `toFinite`, `toInteger`, `toJSON`, `toLength`,
	 * `toLower`, `toNumber`, `toSafeInteger`, `toString`, `toUpper`, `trim`,
	 * `trimEnd`, `trimStart`, `truncate`, `unescape`, `uniqueId`, `upperCase`,
	 * `upperFirst`, `value`, and `words`
	 *
	 * @name _
	 * @constructor
	 * @category Seq
	 * @param {*} value The value to wrap in a `lodash` instance.
	 * @returns {Object} Returns the new `lodash` wrapper instance.
	 * @example
	 *
	 * function square(n) {
	 *   return n * n;
	 * }
	 *
	 * var wrapped = _([1, 2, 3]);
	 *
	 * // Returns an unwrapped value.
	 * wrapped.reduce(_.add);
	 * // => 6
	 *
	 * // Returns a wrapped value.
	 * var squares = wrapped.map(square);
	 *
	 * _.isArray(squares);
	 * // => false
	 *
	 * _.isArray(squares.value());
	 * // => true
	 */
	function lodash(value) {
	  if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
	    if (value instanceof LodashWrapper) {
	      return value;
	    }
	    if (hasOwnProperty.call(value, '__wrapped__')) {
	      return wrapperClone(value);
	    }
	  }
	  return new LodashWrapper(value);
	}

	// Ensure wrappers are instances of `baseLodash`.
	lodash.prototype = baseLodash.prototype;
	lodash.prototype.constructor = lodash;

	module.exports = lodash;


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(109),
	    baseLodash = __webpack_require__(118);

	/**
	 * The base constructor for creating `lodash` wrapper objects.
	 *
	 * @private
	 * @param {*} value The value to wrap.
	 * @param {boolean} [chainAll] Enable explicit method chain sequences.
	 */
	function LodashWrapper(value, chainAll) {
	  this.__wrapped__ = value;
	  this.__actions__ = [];
	  this.__chain__ = !!chainAll;
	  this.__index__ = 0;
	  this.__values__ = undefined;
	}

	LodashWrapper.prototype = baseCreate(baseLodash.prototype);
	LodashWrapper.prototype.constructor = LodashWrapper;

	module.exports = LodashWrapper;


/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	var LazyWrapper = __webpack_require__(117),
	    LodashWrapper = __webpack_require__(124),
	    copyArray = __webpack_require__(126);

	/**
	 * Creates a clone of `wrapper`.
	 *
	 * @private
	 * @param {Object} wrapper The wrapper to clone.
	 * @returns {Object} Returns the cloned wrapper.
	 */
	function wrapperClone(wrapper) {
	  if (wrapper instanceof LazyWrapper) {
	    return wrapper.clone();
	  }
	  var result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
	  result.__actions__ = copyArray(wrapper.__actions__);
	  result.__index__  = wrapper.__index__;
	  result.__values__ = wrapper.__values__;
	  return result;
	}

	module.exports = wrapperClone;


/***/ },
/* 126 */
/***/ function(module, exports) {

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function copyArray(source, array) {
	  var index = -1,
	      length = source.length;

	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	module.exports = copyArray;


/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	var baseSetData = __webpack_require__(104),
	    shortOut = __webpack_require__(70);

	/**
	 * Sets metadata for `func`.
	 *
	 * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
	 * period of time, it will trip its breaker and transition to an identity
	 * function to avoid garbage collection pauses in V8. See
	 * [V8 issue 2070](https://bugs.chromium.org/p/v8/issues/detail?id=2070)
	 * for more details.
	 *
	 * @private
	 * @param {Function} func The function to associate metadata with.
	 * @param {*} data The metadata.
	 * @returns {Function} Returns `func`.
	 */
	var setData = shortOut(baseSetData);

	module.exports = setData;


/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	var getWrapDetails = __webpack_require__(129),
	    insertWrapDetails = __webpack_require__(130),
	    setToString = __webpack_require__(66),
	    updateWrapDetails = __webpack_require__(131);

	/**
	 * Sets the `toString` method of `wrapper` to mimic the source of `reference`
	 * with wrapper details in a comment at the top of the source body.
	 *
	 * @private
	 * @param {Function} wrapper The function to modify.
	 * @param {Function} reference The reference function.
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	 * @returns {Function} Returns `wrapper`.
	 */
	function setWrapToString(wrapper, reference, bitmask) {
	  var source = (reference + '');
	  return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
	}

	module.exports = setWrapToString;


/***/ },
/* 129 */
/***/ function(module, exports) {

	/** Used to match wrap detail comments. */
	var reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/,
	    reSplitDetails = /,? & /;

	/**
	 * Extracts wrapper details from the `source` body comment.
	 *
	 * @private
	 * @param {string} source The source to inspect.
	 * @returns {Array} Returns the wrapper details.
	 */
	function getWrapDetails(source) {
	  var match = source.match(reWrapDetails);
	  return match ? match[1].split(reSplitDetails) : [];
	}

	module.exports = getWrapDetails;


/***/ },
/* 130 */
/***/ function(module, exports) {

	/** Used to match wrap detail comments. */
	var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/;

	/**
	 * Inserts wrapper `details` in a comment at the top of the `source` body.
	 *
	 * @private
	 * @param {string} source The source to modify.
	 * @returns {Array} details The details to insert.
	 * @returns {string} Returns the modified source.
	 */
	function insertWrapDetails(source, details) {
	  var length = details.length;
	  if (!length) {
	    return source;
	  }
	  var lastIndex = length - 1;
	  details[lastIndex] = (length > 1 ? '& ' : '') + details[lastIndex];
	  details = details.join(length > 2 ? ', ' : ' ');
	  return source.replace(reWrapComment, '{\n/* [wrapped with ' + details + '] */\n');
	}

	module.exports = insertWrapDetails;


/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(132),
	    arrayIncludes = __webpack_require__(42);

	/** Used to compose bitmasks for function metadata. */
	var BIND_FLAG = 1,
	    BIND_KEY_FLAG = 2,
	    CURRY_FLAG = 8,
	    CURRY_RIGHT_FLAG = 16,
	    PARTIAL_FLAG = 32,
	    PARTIAL_RIGHT_FLAG = 64,
	    ARY_FLAG = 128,
	    REARG_FLAG = 256,
	    FLIP_FLAG = 512;

	/** Used to associate wrap methods with their bit flags. */
	var wrapFlags = [
	  ['ary', ARY_FLAG],
	  ['bind', BIND_FLAG],
	  ['bindKey', BIND_KEY_FLAG],
	  ['curry', CURRY_FLAG],
	  ['curryRight', CURRY_RIGHT_FLAG],
	  ['flip', FLIP_FLAG],
	  ['partial', PARTIAL_FLAG],
	  ['partialRight', PARTIAL_RIGHT_FLAG],
	  ['rearg', REARG_FLAG]
	];

	/**
	 * Updates wrapper `details` based on `bitmask` flags.
	 *
	 * @private
	 * @returns {Array} details The details to modify.
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	 * @returns {Array} Returns `details`.
	 */
	function updateWrapDetails(details, bitmask) {
	  arrayEach(wrapFlags, function(pair) {
	    var value = '_.' + pair[0];
	    if ((bitmask & pair[1]) && !arrayIncludes(details, value)) {
	      details.push(value);
	    }
	  });
	  return details.sort();
	}

	module.exports = updateWrapDetails;


/***/ },
/* 132 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.forEach` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array ? array.length : 0;

	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}

	module.exports = arrayEach;


/***/ },
/* 133 */
/***/ function(module, exports) {

	/**
	 * Gets the argument placeholder value for `func`.
	 *
	 * @private
	 * @param {Function} func The function to inspect.
	 * @returns {*} Returns the placeholder value.
	 */
	function getHolder(func) {
	  var object = func;
	  return object.placeholder;
	}

	module.exports = getHolder;


/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	var copyArray = __webpack_require__(126),
	    isIndex = __webpack_require__(84);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMin = Math.min;

	/**
	 * Reorder `array` according to the specified indexes where the element at
	 * the first index is assigned as the first element, the element at
	 * the second index is assigned as the second element, and so on.
	 *
	 * @private
	 * @param {Array} array The array to reorder.
	 * @param {Array} indexes The arranged array indexes.
	 * @returns {Array} Returns `array`.
	 */
	function reorder(array, indexes) {
	  var arrLength = array.length,
	      length = nativeMin(indexes.length, arrLength),
	      oldArray = copyArray(array);

	  while (length--) {
	    var index = indexes[length];
	    array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
	  }
	  return array;
	}

	module.exports = reorder;


/***/ },
/* 135 */
/***/ function(module, exports) {

	/** Used as the internal argument placeholder. */
	var PLACEHOLDER = '__lodash_placeholder__';

	/**
	 * Replaces all `placeholder` elements in `array` with an internal placeholder
	 * and returns an array of their indexes.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {*} placeholder The placeholder to replace.
	 * @returns {Array} Returns the new array of placeholder indexes.
	 */
	function replaceHolders(array, placeholder) {
	  var index = -1,
	      length = array.length,
	      resIndex = 0,
	      result = [];

	  while (++index < length) {
	    var value = array[index];
	    if (value === placeholder || value === PLACEHOLDER) {
	      array[index] = PLACEHOLDER;
	      result[resIndex++] = index;
	    }
	  }
	  return result;
	}

	module.exports = replaceHolders;


/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(65),
	    createCtor = __webpack_require__(108),
	    root = __webpack_require__(17);

	/** Used to compose bitmasks for function metadata. */
	var BIND_FLAG = 1;

	/**
	 * Creates a function that wraps `func` to invoke it with the `this` binding
	 * of `thisArg` and `partials` prepended to the arguments it receives.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} partials The arguments to prepend to those provided to
	 *  the new function.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createPartial(func, bitmask, thisArg, partials) {
	  var isBind = bitmask & BIND_FLAG,
	      Ctor = createCtor(func);

	  function wrapper() {
	    var argsIndex = -1,
	        argsLength = arguments.length,
	        leftIndex = -1,
	        leftLength = partials.length,
	        args = Array(leftLength + argsLength),
	        fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;

	    while (++leftIndex < leftLength) {
	      args[leftIndex] = partials[leftIndex];
	    }
	    while (argsLength--) {
	      args[leftIndex++] = arguments[++argsIndex];
	    }
	    return apply(fn, isBind ? thisArg : this, args);
	  }
	  return wrapper;
	}

	module.exports = createPartial;


/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	var composeArgs = __webpack_require__(112),
	    composeArgsRight = __webpack_require__(113),
	    replaceHolders = __webpack_require__(135);

	/** Used as the internal argument placeholder. */
	var PLACEHOLDER = '__lodash_placeholder__';

	/** Used to compose bitmasks for function metadata. */
	var BIND_FLAG = 1,
	    BIND_KEY_FLAG = 2,
	    CURRY_BOUND_FLAG = 4,
	    CURRY_FLAG = 8,
	    ARY_FLAG = 128,
	    REARG_FLAG = 256;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMin = Math.min;

	/**
	 * Merges the function metadata of `source` into `data`.
	 *
	 * Merging metadata reduces the number of wrappers used to invoke a function.
	 * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
	 * may be applied regardless of execution order. Methods like `_.ary` and
	 * `_.rearg` modify function arguments, making the order in which they are
	 * executed important, preventing the merging of metadata. However, we make
	 * an exception for a safe combined case where curried functions have `_.ary`
	 * and or `_.rearg` applied.
	 *
	 * @private
	 * @param {Array} data The destination metadata.
	 * @param {Array} source The source metadata.
	 * @returns {Array} Returns `data`.
	 */
	function mergeData(data, source) {
	  var bitmask = data[1],
	      srcBitmask = source[1],
	      newBitmask = bitmask | srcBitmask,
	      isCommon = newBitmask < (BIND_FLAG | BIND_KEY_FLAG | ARY_FLAG);

	  var isCombo =
	    ((srcBitmask == ARY_FLAG) && (bitmask == CURRY_FLAG)) ||
	    ((srcBitmask == ARY_FLAG) && (bitmask == REARG_FLAG) && (data[7].length <= source[8])) ||
	    ((srcBitmask == (ARY_FLAG | REARG_FLAG)) && (source[7].length <= source[8]) && (bitmask == CURRY_FLAG));

	  // Exit early if metadata can't be merged.
	  if (!(isCommon || isCombo)) {
	    return data;
	  }
	  // Use source `thisArg` if available.
	  if (srcBitmask & BIND_FLAG) {
	    data[2] = source[2];
	    // Set when currying a bound function.
	    newBitmask |= bitmask & BIND_FLAG ? 0 : CURRY_BOUND_FLAG;
	  }
	  // Compose partial arguments.
	  var value = source[3];
	  if (value) {
	    var partials = data[3];
	    data[3] = partials ? composeArgs(partials, value, source[4]) : value;
	    data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
	  }
	  // Compose partial right arguments.
	  value = source[5];
	  if (value) {
	    partials = data[5];
	    data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
	    data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
	  }
	  // Use source `argPos` if available.
	  value = source[7];
	  if (value) {
	    data[7] = value;
	  }
	  // Use source `ary` if it's smaller.
	  if (srcBitmask & ARY_FLAG) {
	    data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
	  }
	  // Use source `arity` if one is not provided.
	  if (data[9] == null) {
	    data[9] = source[9];
	  }
	  // Use source `func` and merge bitmasks.
	  data[0] = source[0];
	  data[1] = newBitmask;

	  return data;
	}

	module.exports = mergeData;


/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	var toFinite = __webpack_require__(139);

	/**
	 * Converts `value` to an integer.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted integer.
	 * @example
	 *
	 * _.toInteger(3.2);
	 * // => 3
	 *
	 * _.toInteger(Number.MIN_VALUE);
	 * // => 0
	 *
	 * _.toInteger(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toInteger('3.2');
	 * // => 3
	 */
	function toInteger(value) {
	  var result = toFinite(value),
	      remainder = result % 1;

	  return result === result ? (remainder ? result - remainder : result) : 0;
	}

	module.exports = toInteger;


/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	var toNumber = __webpack_require__(140);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0,
	    MAX_INTEGER = 1.7976931348623157e+308;

	/**
	 * Converts `value` to a finite number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.12.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted number.
	 * @example
	 *
	 * _.toFinite(3.2);
	 * // => 3.2
	 *
	 * _.toFinite(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toFinite(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toFinite('3.2');
	 * // => 3.2
	 */
	function toFinite(value) {
	  if (!value) {
	    return value === 0 ? value : 0;
	  }
	  value = toNumber(value);
	  if (value === INFINITY || value === -INFINITY) {
	    var sign = (value < 0 ? -1 : 1);
	    return sign * MAX_INTEGER;
	  }
	  return value === value ? value : 0;
	}

	module.exports = toFinite;


/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(14),
	    isSymbol = __webpack_require__(94);

	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;

	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}

	module.exports = toNumber;


/***/ },
/* 141 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_141__;

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.noop = noop;
	exports.isEmpty = isEmpty;
	exports.isObject = isObject;
	exports.isString = isString;
	exports.findWidget = findWidget;
	exports.wrapItemsDiv = wrapItemsDiv;
	exports.widgetConfig = widgetConfig;
	exports.eitherType = eitherType;

	var _react = __webpack_require__(95);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(143);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _jquery = __webpack_require__(141);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PropTypes = _react2.default.PropTypes;

	function noop() {}

	function isEmpty(thing) {
	    return thing == null || thing === '';
	}

	function isObject(thing) {
	    return (typeof thing === 'undefined' ? 'undefined' : _typeof(thing)) === "object" && !!thing;
	}

	function isString(thing) {
	    return typeof thing === "string";
	}

	function findWidget(component, name) {
	    if (!name) {
	        // Just return the jquery node (helps with componentDidMount)
	        return (0, _jquery2.default)(_reactDom2.default.findDOMNode(component));
	    }
	    return (0, _jquery2.default)(_reactDom2.default.findDOMNode(component)).data(name);
	}

	function wrapItemsDiv() {
	    var jsxs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

	    return jsxs.map(function (jsx, i) {
	        _react2.default.createElement('div', { key: i }, jsx);
	    });
	}

	function widgetConfig(config, moreOptions) {
	    for (var key in moreOptions) {
	        if (moreOptions.hasOwnProperty(key) && config[key] == null) {
	            config[key] = moreOptions[key];
	        }
	    }
	    return config;
	}

	function eitherType(type1, type2) {
	    type1 = isString(type1) ? PropTypes[type1] : type1;
	    type2 = isString(type2) ? PropTypes[type2] : type2;

	    return PropTypes.oneOfType([type1, type2]);
	}

/***/ },
/* 143 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_143__;

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(95);

	var _react2 = _interopRequireDefault(_react);

	var _DateWidgetMixin = __webpack_require__(145);

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
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _kendo = __webpack_require__(98);

	var _kendo2 = _interopRequireDefault(_kendo);

	var _ReactCommon = __webpack_require__(142);

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
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(95);

	var _react2 = _interopRequireDefault(_react);

	var _DateWidgetMixin = __webpack_require__(145);

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
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(95);

	var _react2 = _interopRequireDefault(_react);

	var _DateWidgetMixin = __webpack_require__(145);

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
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _kendo = __webpack_require__(98);

	var _kendo2 = _interopRequireDefault(_kendo);

	var _react = __webpack_require__(95);

	var _react2 = _interopRequireDefault(_react);

	var _ReactCommon = __webpack_require__(142);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PropTypes = _react2.default.PropTypes;

	var CANNOT_CHANGE = ['template', 'valueField', 'displayField', 'placeholder'];

	function rawValue(props) {
	    var value = props.value;

	    if ((0, _ReactCommon.isEmpty)(value)) {
	        return value;
	    }

	    value = Array.isArray(value) ? value : [value];

	    return value.map(function (val) {
	        return (0, _ReactCommon.isObject)(val) ? val[props.valueField] : val;
	    });
	}

	function toPlainObject(data) {
	    return data.toJSON();
	}

	function dataSource(props) {
	    if (!_.isEmpty(props.dataSource)) {
	        return props.dataSource;
	    }
	    return Array.isArray(props.value) ? Array.from(props.value) : Array.of(props.value);
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
	        dataSource: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
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
	        var props = this.props;

	        $el.kendoMultiSelect((0, _ReactCommon.widgetConfig)({
	            dataTextField: props.displayField,
	            dataValueField: props.valueField,
	            dataSource: dataSource(props),
	            placeholder: props.placeholder,
	            itemTemplate: props.template,
	            change: this.onChange
	        }, props.options));

	        var kendoWidget = $el.data('kendoMultiSelect');

	        // the 'value' method is a getter/setter that gets/sets the valueField. It will look up the record
	        // in the store via the value set here.
	        if (props.value) {
	            kendoWidget.value(rawValue(props));
	        }

	        if (props.disabled) {
	            // disabled beats readonly
	            kendoWidget.enable(false);
	        } else if (props.readonly) {
	            kendoWidget.readonly(true);
	        }
	    },

	    componentWillUnmount: function componentWillUnmount() {
	        (0, _ReactCommon.findWidget)(this, 'kendoMultiSelect').destroy();
	    },

	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        var _this = this;

	        console.assert(CANNOT_CHANGE.every(function (name) {
	            return nextProps[name] == _this.props[name];
	        }), 'cannot change these props after mount', CANNOT_CHANGE);
	    },

	    componentDidUpdate: function componentDidUpdate(prevProps) {
	        var kendoWidget = (0, _ReactCommon.findWidget)(this, 'kendoMultiSelect');

	        if (prevProps.dataSource !== this.props.dataSource) {
	            kendoWidget.setDataSource(dataSource(this.props));
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
	        var values = Array.from(kendoWidget.value());
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
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _kendo = __webpack_require__(98);

	var _kendo2 = _interopRequireDefault(_kendo);

	var _react = __webpack_require__(95);

	var _react2 = _interopRequireDefault(_react);

	var _ReactCommon = __webpack_require__(142);

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
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(95);

	var _react2 = _interopRequireDefault(_react);

	var _ReactCommon = __webpack_require__(142);

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
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(95);

	var _react2 = _interopRequireDefault(_react);

	var _ReactCommon = __webpack_require__(142);

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
	        trimValue: PropTypes.bool,
	        style: PropTypes.any
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
	            trimValue: true,
	            style: {}
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
	            style: this.props.style,
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
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _partial2 = __webpack_require__(101);

	var _partial3 = _interopRequireDefault(_partial2);

	var _react = __webpack_require__(95);

	var _react2 = _interopRequireDefault(_react);

	var _jquery = __webpack_require__(141);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _ReactCommon = __webpack_require__(142);

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
	                return (0, _partial3.default)(onChange, val);
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
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _compact2 = __webpack_require__(154);

	var _compact3 = _interopRequireDefault(_compact2);

	var _react = __webpack_require__(95);

	var _react2 = _interopRequireDefault(_react);

	var _AutoControl = __webpack_require__(1);

	var _AutoControl2 = _interopRequireDefault(_AutoControl);

	var _ControlCommon = __webpack_require__(99);

	var ControlCommon = _interopRequireWildcard(_ControlCommon);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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
	        var fieldInfo = Object.assign({}, DEFAULTS, this.props.fieldInfo);

	        var hasInfoTooltip = !!fieldInfo.helpText;
	        var hasErrorTooltip = !this.props.isValid[0] && (this.props.isValid[1] || '').length > 0;

	        var classes = (0, _compact3.default)([this.props.layout, determineFieldClass(this.props.children), ControlCommon.quadState(fieldInfo.disabled, fieldInfo.readOnly, this.props.isValid, this.props.noControl), hasInfoTooltip ? 'hasTooltip' : null, hasErrorTooltip ? 'hasErrorTooltip' : null, this.props.lockable ? 'lockable' : null]);

	        var lockedClasses = (0, _compact3.default)(['fieldLock', this.props.locked ? 'fieldLockOn' : null]);
	        var styles = {
	            'width': this.props.width,
	            'marginLeft': this.props.marginLeft
	        };

	        var statusIcon = hasInfoTooltip ? _react2.default.createElement('span', { className: 'statusIcon' }) : null;

	        // If there is no label and no icon, we must render &nbsp; so the fields line up right.
	        var label = fieldInfo.label || '\xA0';

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

	exports.default = FormField;

/***/ },
/* 154 */
/***/ function(module, exports) {

	/**
	 * Creates an array with all falsey values removed. The values `false`, `null`,
	 * `0`, `""`, `undefined`, and `NaN` are falsey.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {Array} array The array to compact.
	 * @returns {Array} Returns the new array of filtered values.
	 * @example
	 *
	 * _.compact([0, 1, false, 2, '', 3]);
	 * // => [1, 2, 3]
	 */
	function compact(array) {
	  var index = -1,
	      length = array ? array.length : 0,
	      resIndex = 0,
	      result = [];

	  while (++index < length) {
	    var value = array[index];
	    if (value) {
	      result[resIndex++] = value;
	    }
	  }
	  return result;
	}

	module.exports = compact;


/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _omit2 = __webpack_require__(2);

	var _omit3 = _interopRequireDefault(_omit2);

	var _react = __webpack_require__(95);

	var _react2 = _interopRequireDefault(_react);

	var _AutoControl = __webpack_require__(1);

	var _AutoControl2 = _interopRequireDefault(_AutoControl);

	var _FormField = __webpack_require__(153);

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
	        var controlProps = (0, _omit3.default)(this.props, EXCLUDE_FROM_CONTROL);

	        return _react2.default.createElement(
	            _FormField2.default,
	            { fieldInfo: this.props.fieldInfo, isValid: this.props.isValid, layout: this.props.layout },
	            _react2.default.createElement(_AutoControl2.default, controlProps)
	        );
	    }
	});

	exports.default = AutoField;

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(95);

	var _react2 = _interopRequireDefault(_react);

	var _ReactCommon = __webpack_require__(142);

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
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(95);

	var _react2 = _interopRequireDefault(_react);

	var _ReactCommon = __webpack_require__(142);

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
	            console.assert(this.props.value == null);
	        }

	        if (this.props.noControl) {
	            return _react2.default.createElement('div', { className: 'carousel' });
	        }

	        return _react2.default.createElement(
	            'div',
	            { className: 'carousel' },
	            _react2.default.createElement(
	                'button',
	                { disabled: N < 2, className: 'carouselButton backButton', 'data-dir': 'left',
	                    onClick: this.onChange },
	                _react2.default.createElement('i', { className: 'icon iconPrev' })
	            ),
	            _react2.default.createElement('input', { className: 'carouselInput',
	                value: this.displayTextFn(i, N),
	                readOnly: true,
	                id: this.props.id }),
	            _react2.default.createElement(
	                'button',
	                { disabled: N < 2, className: 'carouselButton forwardButton', 'data-dir': 'right',
	                    onClick: this.onChange },
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

	    onChange: function onChange(e) {
	        var i = this.props.value;
	        var N = this.props.options.length;
	        var direction = e.target.getAttribute('data-dir');

	        console.assert(direction === 'left' || direction === 'right');
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
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _uniqueId2 = __webpack_require__(159);

	var _uniqueId3 = _interopRequireDefault(_uniqueId2);

	var _react = __webpack_require__(95);

	var _react2 = _interopRequireDefault(_react);

	var _ReactCommon = __webpack_require__(142);

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
	        this.stableUniqueId = this.props.id ? this.props.id : (0, _uniqueId3.default)();
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
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(160);

	/** Used to generate unique IDs. */
	var idCounter = 0;

	/**
	 * Generates a unique ID. If `prefix` is given, the ID is appended to it.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {string} [prefix=''] The value to prefix the ID with.
	 * @returns {string} Returns the unique ID.
	 * @example
	 *
	 * _.uniqueId('contact_');
	 * // => 'contact_104'
	 *
	 * _.uniqueId();
	 * // => '105'
	 */
	function uniqueId(prefix) {
	  var id = ++idCounter;
	  return toString(prefix) + id;
	}

	module.exports = uniqueId;


/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(161);

	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  return value == null ? '' : baseToString(value);
	}

	module.exports = toString;


/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(59),
	    arrayMap = __webpack_require__(3),
	    isArray = __webpack_require__(63),
	    isSymbol = __webpack_require__(94);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;

	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (isArray(value)) {
	    // Recursively convert values (susceptible to call stack limits).
	    return arrayMap(value, baseToString) + '';
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	module.exports = baseToString;


/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(95);

	var _react2 = _interopRequireDefault(_react);

	var _kendo = __webpack_require__(98);

	var _kendo2 = _interopRequireDefault(_kendo);

	var _ReactCommon = __webpack_require__(142);

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
	        dataSource: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
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
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(95);

	var _react2 = _interopRequireDefault(_react);

	var _SelectWidgetMixin = __webpack_require__(97);

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
	        dataSource: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
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
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _kendo = __webpack_require__(98);

	var _kendo2 = _interopRequireDefault(_kendo);

	var _react = __webpack_require__(95);

	var _react2 = _interopRequireDefault(_react);

	var _ControlCommon = __webpack_require__(99);

	var _ReactCommon = __webpack_require__(142);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var $ = _kendo2.default.jQuery;
	var PropTypes = _react2.default.PropTypes;

	function isCellSelection(selectable) {
	    return (0, _ReactCommon.isString)(selectable) ? selectable.indexOf('cell') !== -1 : false;
	}

	function isMultiSelect(selectable) {
	    return (0, _ReactCommon.isString)(selectable) ? selectable.indexOf('multiple') !== -1 : false;
	}

	function getValueIds(value) {
	    if (Array.isArray(value)) {
	        return value.map(function (item) {
	            return item.id;
	        });
	    }
	    if ((0, _ReactCommon.isObject)(value)) {
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
	        height: (0, _ReactCommon.eitherType)('number', 'string'),
	        dataSource: (0, _ReactCommon.eitherType)('object', 'array').isRequired,
	        autoBind: PropTypes.bool,
	        columns: PropTypes.array,
	        toolbar: PropTypes.array,
	        rowTemplate: (0, _ReactCommon.eitherType)('string', 'func'),
	        pageable: (0, _ReactCommon.eitherType)('bool', 'object'),
	        scrollable: (0, _ReactCommon.eitherType)('bool', 'object'),
	        selectable: (0, _ReactCommon.eitherType)('bool', 'string'),
	        sortable: (0, _ReactCommon.eitherType)('bool', 'object'),
	        options: PropTypes.object,
	        value: PropTypes.any,
	        onChange: PropTypes.func,
	        rowTooltip: (0, _ReactCommon.eitherType)('string', 'func'),
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
	        var widgetOptions = (0, _ReactCommon.widgetConfig)({
	            autoBind: this.props.autoBind,
	            dataSource: this.props.dataSource,
	            height: this.props.height,
	            columns: this.props.columns,
	            toolbar: this.props.toolbar,
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
	        var dataSource = this.props.dataSource;

	        if (!(0, _ControlCommon.isEqualDataSource)(prevProps.dataSource, dataSource)) {
	            // Cannot call setDataSource() with an array so just update the existing DataSource.
	            if (Array.isArray(dataSource)) {
	                grid.dataSource.data(dataSource);
	            } else {
	                grid.setDataSource(dataSource);
	            }
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
	            selectedValues = selectedValues[0];
	        }

	        this.props.onChange(selectedValues);
	    }
	});

	exports.default = KendoGrid;

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _kendo = __webpack_require__(98);

	var _kendo2 = _interopRequireDefault(_kendo);

	var _react = __webpack_require__(95);

	var _react2 = _interopRequireDefault(_react);

	var _KendoGrid = __webpack_require__(164);

	var _KendoGrid2 = _interopRequireDefault(_KendoGrid);

	var _ReactCommon = __webpack_require__(142);

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
	        var grid = (0, _ReactCommon.findWidget)(this, 'kendoGrid');

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
	        var grid = (0, _ReactCommon.findWidget)(this, 'kendoGrid');

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
	        var grid = (0, _ReactCommon.findWidget)(this, 'kendoGrid');

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
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _indexOf2 = __webpack_require__(167);

	var _indexOf3 = _interopRequireDefault(_indexOf2);

	var _find2 = __webpack_require__(168);

	var _find3 = _interopRequireDefault(_find2);

	var _kendo = __webpack_require__(98);

	var _kendo2 = _interopRequireDefault(_kendo);

	var _react = __webpack_require__(95);

	var _react2 = _interopRequireDefault(_react);

	var _ReactCommon = __webpack_require__(142);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var $ = _kendo2.default.jQuery;

	var PropTypes = _react2.default.PropTypes;

	var KendoListView = _react2.default.createClass({
	    displayName: 'KendoListView',

	    propTypes: {
	        autoBind: PropTypes.bool,
	        className: PropTypes.string,
	        dataSource: (0, _ReactCommon.eitherType)('object', 'array').isRequired,
	        template: (0, _ReactCommon.eitherType)('string', 'func'),
	        selectable: (0, _ReactCommon.eitherType)('bool', 'string'),
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
	        var maybeSelectedChild = (0, _find3.default)(listView.element.children(), function (child) {
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
	            selectedChildIndex = (0, _indexOf3.default)(listView.element.children(), maybeSelectedChild);
	            $rootNode.animate({ scrollTop: selectedChildIndex * $(maybeSelectedChild).height() }, this.props.scrollDuration);
	        }
	    },

	    syncSelectionWithKendo: function syncSelectionWithKendo() {
	        this.selectValue(this.props.value, this.props.scrollToSelectedItem);
	    },

	    componentDidUpdate: function componentDidUpdate(prevProps) {
	        if (this.props.selectable && this.props.value != prevProps.value) {
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
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	var baseIndexOf = __webpack_require__(43),
	    toInteger = __webpack_require__(138);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Gets the index at which the first occurrence of `value` is found in `array`
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons. If `fromIndex` is negative, it's used as the
	 * offset from the end of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {Array} array The array to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} [fromIndex=0] The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 * @example
	 *
	 * _.indexOf([1, 2, 1, 2], 2);
	 * // => 1
	 *
	 * // Search from the `fromIndex`.
	 * _.indexOf([1, 2, 1, 2], 2, 2);
	 * // => 3
	 */
	function indexOf(array, value, fromIndex) {
	  var length = array ? array.length : 0;
	  if (!length) {
	    return -1;
	  }
	  var index = fromIndex == null ? 0 : toInteger(fromIndex);
	  if (index < 0) {
	    index = nativeMax(length + index, 0);
	  }
	  return baseIndexOf(array, value, index);
	}

	module.exports = indexOf;


/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	var createFind = __webpack_require__(169),
	    findIndex = __webpack_require__(213);

	/**
	 * Iterates over elements of `collection`, returning the first element
	 * `predicate` returns truthy for. The predicate is invoked with three
	 * arguments: (value, index|key, collection).
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to inspect.
	 * @param {Function} [predicate=_.identity]
	 *  The function invoked per iteration.
	 * @param {number} [fromIndex=0] The index to search from.
	 * @returns {*} Returns the matched element, else `undefined`.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney',  'age': 36, 'active': true },
	 *   { 'user': 'fred',    'age': 40, 'active': false },
	 *   { 'user': 'pebbles', 'age': 1,  'active': true }
	 * ];
	 *
	 * _.find(users, function(o) { return o.age < 40; });
	 * // => object for 'barney'
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.find(users, { 'age': 1, 'active': true });
	 * // => object for 'pebbles'
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.find(users, ['active', false]);
	 * // => object for 'fred'
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.find(users, 'active');
	 * // => object for 'barney'
	 */
	var find = createFind(findIndex);

	module.exports = find;


/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	var baseIteratee = __webpack_require__(170),
	    isArrayLike = __webpack_require__(92),
	    keys = __webpack_require__(188);

	/**
	 * Creates a `_.find` or `_.findLast` function.
	 *
	 * @private
	 * @param {Function} findIndexFunc The function to find the collection index.
	 * @returns {Function} Returns the new find function.
	 */
	function createFind(findIndexFunc) {
	  return function(collection, predicate, fromIndex) {
	    var iterable = Object(collection);
	    if (!isArrayLike(collection)) {
	      var iteratee = baseIteratee(predicate, 3);
	      collection = keys(collection);
	      predicate = function(key) { return iteratee(iterable[key], key, iterable); };
	    }
	    var index = findIndexFunc(collection, predicate, fromIndex);
	    return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
	  };
	}

	module.exports = createFind;


/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	var baseMatches = __webpack_require__(171),
	    baseMatchesProperty = __webpack_require__(199),
	    identity = __webpack_require__(69),
	    isArray = __webpack_require__(63),
	    property = __webpack_require__(210);

	/**
	 * The base implementation of `_.iteratee`.
	 *
	 * @private
	 * @param {*} [value=_.identity] The value to convert to an iteratee.
	 * @returns {Function} Returns the iteratee.
	 */
	function baseIteratee(value) {
	  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
	  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
	  if (typeof value == 'function') {
	    return value;
	  }
	  if (value == null) {
	    return identity;
	  }
	  if (typeof value == 'object') {
	    return isArray(value)
	      ? baseMatchesProperty(value[0], value[1])
	      : baseMatches(value);
	  }
	  return property(value);
	}

	module.exports = baseIteratee;


/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsMatch = __webpack_require__(172),
	    getMatchData = __webpack_require__(196),
	    matchesStrictComparable = __webpack_require__(198);

	/**
	 * The base implementation of `_.matches` which doesn't clone `source`.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatches(source) {
	  var matchData = getMatchData(source);
	  if (matchData.length == 1 && matchData[0][2]) {
	    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
	  }
	  return function(object) {
	    return object === source || baseIsMatch(object, source, matchData);
	  };
	}

	module.exports = baseMatches;


/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(173),
	    baseIsEqual = __webpack_require__(179);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/**
	 * The base implementation of `_.isMatch` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Object} source The object of property values to match.
	 * @param {Array} matchData The property names, values, and compare flags to match.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, source, matchData, customizer) {
	  var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;

	  if (object == null) {
	    return !length;
	  }
	  object = Object(object);
	  while (index--) {
	    var data = matchData[index];
	    if ((noCustomizer && data[2])
	          ? data[1] !== object[data[0]]
	          : !(data[0] in object)
	        ) {
	      return false;
	    }
	  }
	  while (++index < length) {
	    data = matchData[index];
	    var key = data[0],
	        objValue = object[key],
	        srcValue = data[1];

	    if (noCustomizer && data[2]) {
	      if (objValue === undefined && !(key in object)) {
	        return false;
	      }
	    } else {
	      var stack = new Stack;
	      if (customizer) {
	        var result = customizer(objValue, srcValue, key, object, source, stack);
	      }
	      if (!(result === undefined
	            ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack)
	            : result
	          )) {
	        return false;
	      }
	    }
	  }
	  return true;
	}

	module.exports = baseIsMatch;


/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(25),
	    stackClear = __webpack_require__(174),
	    stackDelete = __webpack_require__(175),
	    stackGet = __webpack_require__(176),
	    stackHas = __webpack_require__(177),
	    stackSet = __webpack_require__(178);

	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Stack(entries) {
	  var data = this.__data__ = new ListCache(entries);
	  this.size = data.size;
	}

	// Add methods to `Stack`.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;

	module.exports = Stack;


/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(25);

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = new ListCache;
	  this.size = 0;
	}

	module.exports = stackClear;


/***/ },
/* 175 */
/***/ function(module, exports) {

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  var data = this.__data__,
	      result = data['delete'](key);

	  this.size = data.size;
	  return result;
	}

	module.exports = stackDelete;


/***/ },
/* 176 */
/***/ function(module, exports) {

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  return this.__data__.get(key);
	}

	module.exports = stackGet;


/***/ },
/* 177 */
/***/ function(module, exports) {

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  return this.__data__.has(key);
	}

	module.exports = stackHas;


/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(25),
	    Map = __webpack_require__(33),
	    MapCache = __webpack_require__(6);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache instance.
	 */
	function stackSet(key, value) {
	  var data = this.__data__;
	  if (data instanceof ListCache) {
	    var pairs = data.__data__;
	    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
	      pairs.push([key, value]);
	      this.size = ++data.size;
	      return this;
	    }
	    data = this.__data__ = new MapCache(pairs);
	  }
	  data.set(key, value);
	  this.size = data.size;
	  return this;
	}

	module.exports = stackSet;


/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqualDeep = __webpack_require__(180),
	    isObject = __webpack_require__(14),
	    isObjectLike = __webpack_require__(62);

	/**
	 * The base implementation of `_.isEqual` which supports partial comparisons
	 * and tracks traversed objects.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {boolean} [bitmask] The bitmask of comparison flags.
	 *  The bitmask may be composed of the following flags:
	 *     1 - Unordered comparison
	 *     2 - Partial comparison
	 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, customizer, bitmask, stack) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
	}

	module.exports = baseIsEqual;


/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(173),
	    equalArrays = __webpack_require__(181),
	    equalByTag = __webpack_require__(183),
	    equalObjects = __webpack_require__(187),
	    getTag = __webpack_require__(191),
	    isArray = __webpack_require__(63),
	    isBuffer = __webpack_require__(81),
	    isTypedArray = __webpack_require__(85);

	/** Used to compose bitmasks for comparison styles. */
	var PARTIAL_COMPARE_FLAG = 2;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;

	  if (!objIsArr) {
	    objTag = getTag(object);
	    objTag = objTag == argsTag ? objectTag : objTag;
	  }
	  if (!othIsArr) {
	    othTag = getTag(other);
	    othTag = othTag == argsTag ? objectTag : othTag;
	  }
	  var objIsObj = objTag == objectTag,
	      othIsObj = othTag == objectTag,
	      isSameTag = objTag == othTag;

	  if (isSameTag && isBuffer(object)) {
	    if (!isBuffer(other)) {
	      return false;
	    }
	    objIsArr = true;
	    objIsObj = false;
	  }
	  if (isSameTag && !objIsObj) {
	    stack || (stack = new Stack);
	    return (objIsArr || isTypedArray(object))
	      ? equalArrays(object, other, equalFunc, customizer, bitmask, stack)
	      : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
	  }
	  if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	    if (objIsWrapped || othIsWrapped) {
	      var objUnwrapped = objIsWrapped ? object.value() : object,
	          othUnwrapped = othIsWrapped ? other.value() : other;

	      stack || (stack = new Stack);
	      return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  stack || (stack = new Stack);
	  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
	}

	module.exports = baseIsEqualDeep;


/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(5),
	    arraySome = __webpack_require__(182),
	    cacheHas = __webpack_require__(49);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `array` and `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      arrLength = array.length,
	      othLength = other.length;

	  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(array);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var index = -1,
	      result = true,
	      seen = (bitmask & UNORDERED_COMPARE_FLAG) ? new SetCache : undefined;

	  stack.set(array, other);
	  stack.set(other, array);

	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, arrValue, index, other, array, stack)
	        : customizer(arrValue, othValue, index, array, other, stack);
	    }
	    if (compared !== undefined) {
	      if (compared) {
	        continue;
	      }
	      result = false;
	      break;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (seen) {
	      if (!arraySome(other, function(othValue, othIndex) {
	            if (!cacheHas(seen, othIndex) &&
	                (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
	              return seen.push(othIndex);
	            }
	          })) {
	        result = false;
	        break;
	      }
	    } else if (!(
	          arrValue === othValue ||
	            equalFunc(arrValue, othValue, customizer, bitmask, stack)
	        )) {
	      result = false;
	      break;
	    }
	  }
	  stack['delete'](array);
	  stack['delete'](other);
	  return result;
	}

	module.exports = equalArrays;


/***/ },
/* 182 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.some` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array ? array.length : 0;

	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}

	module.exports = arraySome;


/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(59),
	    Uint8Array = __webpack_require__(184),
	    eq = __webpack_require__(29),
	    equalArrays = __webpack_require__(181),
	    mapToArray = __webpack_require__(185),
	    setToArray = __webpack_require__(186);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]';

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
	  switch (tag) {
	    case dataViewTag:
	      if ((object.byteLength != other.byteLength) ||
	          (object.byteOffset != other.byteOffset)) {
	        return false;
	      }
	      object = object.buffer;
	      other = other.buffer;

	    case arrayBufferTag:
	      if ((object.byteLength != other.byteLength) ||
	          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
	        return false;
	      }
	      return true;

	    case boolTag:
	    case dateTag:
	    case numberTag:
	      // Coerce booleans to `1` or `0` and dates to milliseconds.
	      // Invalid dates are coerced to `NaN`.
	      return eq(+object, +other);

	    case errorTag:
	      return object.name == other.name && object.message == other.message;

	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings, primitives and objects,
	      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
	      // for more details.
	      return object == (other + '');

	    case mapTag:
	      var convert = mapToArray;

	    case setTag:
	      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
	      convert || (convert = setToArray);

	      if (object.size != other.size && !isPartial) {
	        return false;
	      }
	      // Assume cyclic values are equal.
	      var stacked = stack.get(object);
	      if (stacked) {
	        return stacked == other;
	      }
	      bitmask |= UNORDERED_COMPARE_FLAG;

	      // Recursively compare objects (susceptible to call stack limits).
	      stack.set(object, other);
	      var result = equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);
	      stack['delete'](object);
	      return result;

	    case symbolTag:
	      if (symbolValueOf) {
	        return symbolValueOf.call(object) == symbolValueOf.call(other);
	      }
	  }
	  return false;
	}

	module.exports = equalByTag;


/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(17);

	/** Built-in value references. */
	var Uint8Array = root.Uint8Array;

	module.exports = Uint8Array;


/***/ },
/* 185 */
/***/ function(module, exports) {

	/**
	 * Converts `map` to its key-value pairs.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the key-value pairs.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);

	  map.forEach(function(value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}

	module.exports = mapToArray;


/***/ },
/* 186 */
/***/ function(module, exports) {

	/**
	 * Converts `set` to an array of its values.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the values.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);

	  set.forEach(function(value) {
	    result[++index] = value;
	  });
	  return result;
	}

	module.exports = setToArray;


/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	var keys = __webpack_require__(188);

	/** Used to compose bitmasks for comparison styles. */
	var PARTIAL_COMPARE_FLAG = 2;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;

	  if (objLength != othLength && !isPartial) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
	      return false;
	    }
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(object);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(object, other);
	  stack.set(other, object);

	  var skipCtor = isPartial;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, objValue, key, other, object, stack)
	        : customizer(objValue, othValue, key, object, other, stack);
	    }
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(compared === undefined
	          ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
	          : compared
	        )) {
	      result = false;
	      break;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (result && !skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;

	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      result = false;
	    }
	  }
	  stack['delete'](object);
	  stack['delete'](other);
	  return result;
	}

	module.exports = equalObjects;


/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	var arrayLikeKeys = __webpack_require__(79),
	    baseKeys = __webpack_require__(189),
	    isArrayLike = __webpack_require__(92);

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}

	module.exports = keys;


/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	var isPrototype = __webpack_require__(90),
	    nativeKeys = __webpack_require__(190);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!isPrototype(object)) {
	    return nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = baseKeys;


/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(75);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);

	module.exports = nativeKeys;


/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	var DataView = __webpack_require__(192),
	    Map = __webpack_require__(33),
	    Promise = __webpack_require__(193),
	    Set = __webpack_require__(194),
	    WeakMap = __webpack_require__(106),
	    baseGetTag = __webpack_require__(195),
	    toSource = __webpack_require__(19);

	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    objectTag = '[object Object]',
	    promiseTag = '[object Promise]',
	    setTag = '[object Set]',
	    weakMapTag = '[object WeakMap]';

	var dataViewTag = '[object DataView]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView),
	    mapCtorString = toSource(Map),
	    promiseCtorString = toSource(Promise),
	    setCtorString = toSource(Set),
	    weakMapCtorString = toSource(WeakMap);

	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	var getTag = baseGetTag;

	// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
	if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
	    (Map && getTag(new Map) != mapTag) ||
	    (Promise && getTag(Promise.resolve()) != promiseTag) ||
	    (Set && getTag(new Set) != setTag) ||
	    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
	  getTag = function(value) {
	    var result = objectToString.call(value),
	        Ctor = result == objectTag ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : undefined;

	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString: return dataViewTag;
	        case mapCtorString: return mapTag;
	        case promiseCtorString: return promiseTag;
	        case setCtorString: return setTag;
	        case weakMapCtorString: return weakMapTag;
	      }
	    }
	    return result;
	  };
	}

	module.exports = getTag;


/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(11),
	    root = __webpack_require__(17);

	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView');

	module.exports = DataView;


/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(11),
	    root = __webpack_require__(17);

	/* Built-in method references that are verified to be native. */
	var Promise = getNative(root, 'Promise');

	module.exports = Promise;


/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(11),
	    root = __webpack_require__(17);

	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');

	module.exports = Set;


/***/ },
/* 195 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * The base implementation of `getTag`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  return objectToString.call(value);
	}

	module.exports = baseGetTag;


/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	var isStrictComparable = __webpack_require__(197),
	    keys = __webpack_require__(188);

	/**
	 * Gets the property names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = keys(object),
	      length = result.length;

	  while (length--) {
	    var key = result[length],
	        value = object[key];

	    result[length] = [key, value, isStrictComparable(value)];
	  }
	  return result;
	}

	module.exports = getMatchData;


/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(14);

	/**
	 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` if suitable for strict
	 *  equality comparisons, else `false`.
	 */
	function isStrictComparable(value) {
	  return value === value && !isObject(value);
	}

	module.exports = isStrictComparable;


/***/ },
/* 198 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `matchesProperty` for source values suitable
	 * for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function matchesStrictComparable(key, srcValue) {
	  return function(object) {
	    if (object == null) {
	      return false;
	    }
	    return object[key] === srcValue &&
	      (srcValue !== undefined || (key in Object(object)));
	  };
	}

	module.exports = matchesStrictComparable;


/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(179),
	    get = __webpack_require__(200),
	    hasIn = __webpack_require__(207),
	    isKey = __webpack_require__(206),
	    isStrictComparable = __webpack_require__(197),
	    matchesStrictComparable = __webpack_require__(198),
	    toKey = __webpack_require__(93);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/**
	 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatchesProperty(path, srcValue) {
	  if (isKey(path) && isStrictComparable(srcValue)) {
	    return matchesStrictComparable(toKey(path), srcValue);
	  }
	  return function(object) {
	    var objValue = get(object, path);
	    return (objValue === undefined && objValue === srcValue)
	      ? hasIn(object, path)
	      : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
	  };
	}

	module.exports = baseMatchesProperty;


/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(201);

	/**
	 * Gets the value at `path` of `object`. If the resolved value is
	 * `undefined`, the `defaultValue` is returned in its place.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.7.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.get(object, 'a[0].b.c');
	 * // => 3
	 *
	 * _.get(object, ['a', '0', 'b', 'c']);
	 * // => 3
	 *
	 * _.get(object, 'a.b.c', 'default');
	 * // => 'default'
	 */
	function get(object, path, defaultValue) {
	  var result = object == null ? undefined : baseGet(object, path);
	  return result === undefined ? defaultValue : result;
	}

	module.exports = get;


/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(202),
	    isKey = __webpack_require__(206),
	    toKey = __webpack_require__(93);

	/**
	 * The base implementation of `_.get` without support for default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path) {
	  path = isKey(path, object) ? [path] : castPath(path);

	  var index = 0,
	      length = path.length;

	  while (object != null && index < length) {
	    object = object[toKey(path[index++])];
	  }
	  return (index && index == length) ? object : undefined;
	}

	module.exports = baseGet;


/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(63),
	    stringToPath = __webpack_require__(203);

	/**
	 * Casts `value` to a path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {Array} Returns the cast property path array.
	 */
	function castPath(value) {
	  return isArray(value) ? value : stringToPath(value);
	}

	module.exports = castPath;


/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	var memoizeCapped = __webpack_require__(204),
	    toString = __webpack_require__(160);

	/** Used to match property names within property paths. */
	var reLeadingDot = /^\./,
	    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;

	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	var stringToPath = memoizeCapped(function(string) {
	  string = toString(string);

	  var result = [];
	  if (reLeadingDot.test(string)) {
	    result.push('');
	  }
	  string.replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	});

	module.exports = stringToPath;


/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	var memoize = __webpack_require__(205);

	/** Used as the maximum memoize cache size. */
	var MAX_MEMOIZE_SIZE = 500;

	/**
	 * A specialized version of `_.memoize` which clears the memoized function's
	 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
	 *
	 * @private
	 * @param {Function} func The function to have its output memoized.
	 * @returns {Function} Returns the new memoized function.
	 */
	function memoizeCapped(func) {
	  var result = memoize(func, function(key) {
	    if (cache.size === MAX_MEMOIZE_SIZE) {
	      cache.clear();
	    }
	    return key;
	  });

	  var cache = result.cache;
	  return result;
	}

	module.exports = memoizeCapped;


/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(6);

	/** Error message constants. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/**
	 * Creates a function that memoizes the result of `func`. If `resolver` is
	 * provided, it determines the cache key for storing the result based on the
	 * arguments provided to the memoized function. By default, the first argument
	 * provided to the memoized function is used as the map cache key. The `func`
	 * is invoked with the `this` binding of the memoized function.
	 *
	 * **Note:** The cache is exposed as the `cache` property on the memoized
	 * function. Its creation may be customized by replacing the `_.memoize.Cache`
	 * constructor with one whose instances implement the
	 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
	 * method interface of `delete`, `get`, `has`, and `set`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to have its output memoized.
	 * @param {Function} [resolver] The function to resolve the cache key.
	 * @returns {Function} Returns the new memoized function.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': 2 };
	 * var other = { 'c': 3, 'd': 4 };
	 *
	 * var values = _.memoize(_.values);
	 * values(object);
	 * // => [1, 2]
	 *
	 * values(other);
	 * // => [3, 4]
	 *
	 * object.a = 2;
	 * values(object);
	 * // => [1, 2]
	 *
	 * // Modify the result cache.
	 * values.cache.set(object, ['a', 'b']);
	 * values(object);
	 * // => ['a', 'b']
	 *
	 * // Replace `_.memoize.Cache`.
	 * _.memoize.Cache = WeakMap;
	 */
	function memoize(func, resolver) {
	  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var memoized = function() {
	    var args = arguments,
	        key = resolver ? resolver.apply(this, args) : args[0],
	        cache = memoized.cache;

	    if (cache.has(key)) {
	      return cache.get(key);
	    }
	    var result = func.apply(this, args);
	    memoized.cache = cache.set(key, result) || cache;
	    return result;
	  };
	  memoized.cache = new (memoize.Cache || MapCache);
	  return memoized;
	}

	// Expose `MapCache`.
	memoize.Cache = MapCache;

	module.exports = memoize;


/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(63),
	    isSymbol = __webpack_require__(94);

	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;

	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  if (isArray(value)) {
	    return false;
	  }
	  var type = typeof value;
	  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
	      value == null || isSymbol(value)) {
	    return true;
	  }
	  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
	    (object != null && value in Object(object));
	}

	module.exports = isKey;


/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	var baseHasIn = __webpack_require__(208),
	    hasPath = __webpack_require__(209);

	/**
	 * Checks if `path` is a direct or inherited property of `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 * @example
	 *
	 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
	 *
	 * _.hasIn(object, 'a');
	 * // => true
	 *
	 * _.hasIn(object, 'a.b');
	 * // => true
	 *
	 * _.hasIn(object, ['a', 'b']);
	 * // => true
	 *
	 * _.hasIn(object, 'b');
	 * // => false
	 */
	function hasIn(object, path) {
	  return object != null && hasPath(object, path, baseHasIn);
	}

	module.exports = hasIn;


/***/ },
/* 208 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.hasIn` without support for deep paths.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHasIn(object, key) {
	  return object != null && key in Object(object);
	}

	module.exports = baseHasIn;


/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(202),
	    isArguments = __webpack_require__(60),
	    isArray = __webpack_require__(63),
	    isIndex = __webpack_require__(84),
	    isKey = __webpack_require__(206),
	    isLength = __webpack_require__(87),
	    toKey = __webpack_require__(93);

	/**
	 * Checks if `path` exists on `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @param {Function} hasFunc The function to check properties.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 */
	function hasPath(object, path, hasFunc) {
	  path = isKey(path, object) ? [path] : castPath(path);

	  var index = -1,
	      length = path.length,
	      result = false;

	  while (++index < length) {
	    var key = toKey(path[index]);
	    if (!(result = object != null && hasFunc(object, key))) {
	      break;
	    }
	    object = object[key];
	  }
	  if (result || ++index != length) {
	    return result;
	  }
	  length = object ? object.length : 0;
	  return !!length && isLength(length) && isIndex(key, length) &&
	    (isArray(object) || isArguments(object));
	}

	module.exports = hasPath;


/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(211),
	    basePropertyDeep = __webpack_require__(212),
	    isKey = __webpack_require__(206),
	    toKey = __webpack_require__(93);

	/**
	 * Creates a function that returns the value at `path` of a given object.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': 2 } },
	 *   { 'a': { 'b': 1 } }
	 * ];
	 *
	 * _.map(objects, _.property('a.b'));
	 * // => [2, 1]
	 *
	 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
	}

	module.exports = property;


/***/ },
/* 211 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = baseProperty;


/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(201);

	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function basePropertyDeep(path) {
	  return function(object) {
	    return baseGet(object, path);
	  };
	}

	module.exports = basePropertyDeep;


/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	var baseFindIndex = __webpack_require__(44),
	    baseIteratee = __webpack_require__(170),
	    toInteger = __webpack_require__(138);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * This method is like `_.find` except that it returns the index of the first
	 * element `predicate` returns truthy for instead of the element itself.
	 *
	 * @static
	 * @memberOf _
	 * @since 1.1.0
	 * @category Array
	 * @param {Array} array The array to inspect.
	 * @param {Function} [predicate=_.identity]
	 *  The function invoked per iteration.
	 * @param {number} [fromIndex=0] The index to search from.
	 * @returns {number} Returns the index of the found element, else `-1`.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney',  'active': false },
	 *   { 'user': 'fred',    'active': false },
	 *   { 'user': 'pebbles', 'active': true }
	 * ];
	 *
	 * _.findIndex(users, function(o) { return o.user == 'barney'; });
	 * // => 0
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.findIndex(users, { 'user': 'fred', 'active': false });
	 * // => 1
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.findIndex(users, ['active', false]);
	 * // => 0
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.findIndex(users, 'active');
	 * // => 2
	 */
	function findIndex(array, predicate, fromIndex) {
	  var length = array ? array.length : 0;
	  if (!length) {
	    return -1;
	  }
	  var index = fromIndex == null ? 0 : toInteger(fromIndex);
	  if (index < 0) {
	    index = nativeMax(length + index, 0);
	  }
	  return baseFindIndex(array, baseIteratee(predicate, 3), index);
	}

	module.exports = findIndex;


/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _kendo = __webpack_require__(98);

	var _kendo2 = _interopRequireDefault(_kendo);

	var _react = __webpack_require__(95);

	var _react2 = _interopRequireDefault(_react);

	var _ReactCommon = __webpack_require__(142);

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
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _isEqual2 = __webpack_require__(216);

	var _isEqual3 = _interopRequireDefault(_isEqual2);

	var _kendo = __webpack_require__(98);

	var _kendo2 = _interopRequireDefault(_kendo);

	var _react = __webpack_require__(95);

	var _react2 = _interopRequireDefault(_react);

	var _ReactCommon = __webpack_require__(142);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Children = _react2.default.Children; /* Copyright (c) 2015-2016 Wingspan Technology, Inc. */

	var PropTypes = _react2.default.PropTypes;

	var NO_ANIMATION = false;

	function panelsChanged(kids1, kids2) {
	    var toTitle = function toTitle(c) {
	        return c.props.title;
	    };

	    return !(0, _isEqual3.default)(Children.map(kids1, toTitle), Children.map(kids2, toTitle));
	}

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

	    componentDidUpdate: function componentDidUpdate(prevProps) {
	        // When new panels are added in an update, they need to be styled properly
	        if (panelsChanged(this.props.children, prevProps.children)) {
	            var panelBar = (0, _ReactCommon.findWidget)(this, 'kendoPanelBar');

	            panelBar._updateClasses(); // Forced to use this private method
	            panelBar.expand(panelBar.element.children('[data-expand=true]'), NO_ANIMATION);
	        }
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
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(179);

	/**
	 * Performs a deep comparison between two values to determine if they are
	 * equivalent.
	 *
	 * **Note:** This method supports comparing arrays, array buffers, booleans,
	 * date objects, error objects, maps, numbers, `Object` objects, regexes,
	 * sets, strings, symbols, and typed arrays. `Object` objects are compared
	 * by their own, not inherited, enumerable properties. Functions and DOM
	 * nodes are **not** supported.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.isEqual(object, other);
	 * // => true
	 *
	 * object === other;
	 * // => false
	 */
	function isEqual(value, other) {
	  return baseIsEqual(value, other);
	}

	module.exports = isEqual;


/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _kendo = __webpack_require__(98);

	var _kendo2 = _interopRequireDefault(_kendo);

	var _react = __webpack_require__(95);

	var _react2 = _interopRequireDefault(_react);

	var _ReactCommon = __webpack_require__(142);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var $ = _kendo2.default.jQuery;

	/**
	 * Takes a "tabs" prop which is a map from title string to a JSX instance.
	 * This component is not presently stateful so we don't get to control what is selected.
	 */
	var KendoTabStrip = _react2.default.createClass({
	    displayName: 'KendoTabStrip',


	    componentWillMount: function componentWillMount() {
	        console.assert((0, _ReactCommon.isObject)(this.props.tabs) && Object.keys(this.props.tabs).length > 0);
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
	        var _this = this;

	        var keys = Object.keys(this.props.tabs);
	        var lis = keys.map(function (title, index) {
	            return index === 0 ? _react2.default.createElement(
	                'li',
	                { className: 'k-state-active', 'data-wspt-index': index, key: index },
	                title
	            ) : _react2.default.createElement(
	                'li',
	                { 'data-wspt-index': index, key: index },
	                title
	            );
	        });

	        return _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	                'ul',
	                null,
	                lis
	            ),
	            (0, _ReactCommon.wrapItemsDiv)(keys.map(function (title) {
	                return _this.props.tabs[title];
	            }))
	        );
	    }
	    /* jshint ignore:end */
	});

	exports.default = KendoTabStrip;

/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _kendo = __webpack_require__(98);

	var _kendo2 = _interopRequireDefault(_kendo);

	var _react = __webpack_require__(95);

	var _react2 = _interopRequireDefault(_react);

	var _ReactCommon = __webpack_require__(142);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PropTypes = _react2.default.PropTypes;

	var KendoTreeView = _react2.default.createClass({
	    displayName: 'KendoTreeView',


	    propTypes: {
	        dataSource: PropTypes.object.isRequired,
	        onExpand: PropTypes.func,
	        onCollapse: PropTypes.func,
	        onSelect: PropTypes.func
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            onExpand: _ReactCommon.noop,
	            onCollapse: _ReactCommon.noop,
	            onSelect: _ReactCommon.noop
	        };
	    },

	    componentDidMount: function componentDidMount() {
	        var $el = (0, _ReactCommon.findWidget)(this);

	        function propCallback(callback) {
	            // Return an event handler that invokes the callback with the relevant node data
	            // The event can be canceled if the callback returns false
	            return function (e) {
	                if (callback(this.dataItem(e.node)) === false) {
	                    e.preventDefault();
	                }
	            };
	        }

	        $el.kendoTreeView({
	            dataSource: this.props.dataSource,
	            expand: propCallback(this.props.onExpand),
	            collapse: propCallback(this.props.onCollapse),
	            select: propCallback(this.props.onSelect)
	        });
	    },

	    componentWillUnmount: function componentWillUnmount() {
	        (0, _ReactCommon.findWidget)(this, 'kendoTreeView').destroy();
	    },

	    componentDidUpdate: function componentDidUpdate(prevProps) {
	        if (this.props.dataSource !== prevProps.dataSource) {
	            (0, _ReactCommon.findWidget)(this, 'kendoTreeView').setDataSource(this.props.dataSource);
	        }
	    },

	    /*jshint ignore:start */
	    render: function render() {
	        return _react2.default.createElement('div', { className: this.props.className });
	    }
	    /*jshint ignore:end */
	});

	exports.default = KendoTreeView;

/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(95);

	var _react2 = _interopRequireDefault(_react);

	var _ReactCommon = __webpack_require__(142);

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
	            return selector.active === undefined || !!selector.active;
	        }

	        if (this.props.isFlat) {
	            selectors = selectors.filter(isActive);
	        } else {
	            selectors = selectors.filter(isActive);
	            selectors = selectors.map(function (group) {
	                // this clone will copy the primitive valued properties and leave the arrays as references.
	                // this is fine since we'll be replacing those arrays with filtered versions.
	                var g = Object.assign({}, group);
	                g.children = group.children.filter(isActive);
	                return g;
	            });
	            selectors = selectors.filter(function (g) {
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
	            selectors = selectors.map(option);
	        } else {
	            selectors = selectors.map(function (group) {
	                var options = group.children.map(option);
	                return _react2.default.createElement(
	                    'optgroup',
	                    { key: group.name, label: group.name },
	                    options
	                );
	            });
	        }

	        function onChange(event) {
	            var optArray = [].slice.call(event.target.options);
	            var selections = optArray.filter(function (opt) {
	                return opt.selected;
	            }).map(function (opt) {
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
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _uniqueId2 = __webpack_require__(159);

	var _uniqueId3 = _interopRequireDefault(_uniqueId2);

	var _react = __webpack_require__(95);

	var _react2 = _interopRequireDefault(_react);

	var _ReactCommon = __webpack_require__(142);

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
	        this.stableUniqueId = (0, _uniqueId3.default)();
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
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(95);

	var _react2 = _interopRequireDefault(_react);

	var _Radio = __webpack_require__(220);

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
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _partial2 = __webpack_require__(101);

	var _partial3 = _interopRequireDefault(_partial2);

	var _compact2 = __webpack_require__(154);

	var _compact3 = _interopRequireDefault(_compact2);

	var _uniqueId2 = __webpack_require__(159);

	var _uniqueId3 = _interopRequireDefault(_uniqueId2);

	var _react = __webpack_require__(95);

	var _react2 = _interopRequireDefault(_react);

	var _ReactCommon = __webpack_require__(142);

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
	        console.assert((0, _ReactCommon.isObject)(this.props.tabs) && Object.keys(this.props.tabs).length > 0);
	        this.stableUniqueId = (0, _uniqueId3.default)('tab-');
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
	        var _this = this;

	        var self = this;

	        var keys = Object.keys(this.props.tabs),
	            len = keys.length;
	        var lis = keys.map(function (title, index) {
	            var id = self.stableUniqueId + '-' + index;
	            var classes = [index === 0 ? 'k-first' : null, index === len - 1 ? 'k-last' : null, 'k-state-default', 'k-item', index === self.props.selectedTab ? 'k-tab-on-top k-state-active' : null];

	            return _react2.default.createElement(
	                'li',
	                { key: index, className: (0, _compact3.default)(classes).join(' '), role: 'tab', 'aria-controls': id },
	                _react2.default.createElement(
	                    'a',
	                    { className: 'k-link', onClick: (0, _partial3.default)(self.onTabClick, index) },
	                    title
	                )
	            );
	        });

	        var divs = keys.map(function (key) {
	            return _this.props.tabs[key];
	        }).map(function (jsx, index) {
	            return index === self.props.selectedTab ? _react2.default.createElement(
	                'div',
	                { key: index, className: 'k-content k-state-active', role: 'tabpanel', 'aria-expanded': 'true', style: VISIBLE },
	                jsx
	            ) : _react2.default.createElement(
	                'div',
	                { key: index, className: 'k-content', 'aria-hidden': 'true', role: 'tabpanel', 'aria-expanded': 'false', style: HIDDEN },
	                self.props.elideInactiveContent ? null : jsx
	            );
	        });

	        var className = (0, _compact3.default)(['k-widget', 'k-header', 'k-tabstrip', this.props.className]).join(' ');
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

	var VISIBLE = { display: 'block', height: 'auto', overflow: 'visible', opacity: 1 };
	var HIDDEN = { height: 'auto', overflow: 'visible', opacity: 1, display: 'none' };

	exports.default = TabStrip;

/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(95);

	var _react2 = _interopRequireDefault(_react);

	var _ReactCommon = __webpack_require__(142);

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
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(95);

	var _react2 = _interopRequireDefault(_react);

	var _jquery = __webpack_require__(141);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _ReactCommon = __webpack_require__(142);

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
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _kendo = __webpack_require__(98);

	var _kendo2 = _interopRequireDefault(_kendo);

	var _react = __webpack_require__(95);

	var _react2 = _interopRequireDefault(_react);

	var _ReactCommon = __webpack_require__(142);

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