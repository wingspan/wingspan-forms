'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _kendo = require('kendo');

var _kendo2 = _interopRequireDefault(_kendo);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ReactCommon = require('../ReactCommon');

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
        var values = Object.assign({}, kendoWidget.value());
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