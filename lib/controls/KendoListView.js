'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _indexOf2 = require('lodash/indexOf');

var _indexOf3 = _interopRequireDefault(_indexOf2);

var _find2 = require('lodash/find');

var _find3 = _interopRequireDefault(_find2);

var _kendo = require('kendo');

var _kendo2 = _interopRequireDefault(_kendo);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ReactCommon = require('../ReactCommon');

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