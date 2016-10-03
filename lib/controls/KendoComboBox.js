'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SelectWidgetMixin = require('../mixins/SelectWidgetMixin');

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