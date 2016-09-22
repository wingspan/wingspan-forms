'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _kendo = require('kendo');

var _kendo2 = _interopRequireDefault(_kendo);

var _ReactCommon = require('../ReactCommon');

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