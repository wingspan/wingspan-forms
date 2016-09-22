import _ from 'lodash'
import kendo from 'kendo'
import React from 'react'
import { findWidget, noop, eitherType } from '../ReactCommon'

const $ = kendo.jQuery;

var PropTypes = React.PropTypes;

const KendoListView = React.createClass({
    displayName: 'KendoListView',

    propTypes: {
        autoBind: PropTypes.bool,
        className: PropTypes.string,
        dataSource: eitherType('object', 'array').isRequired,
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
            onChange: noop
        };
    },

    /* jshint ignore:start */
    render: function () {
        return (<div className={this.props.className} />);
    },
    /* jshint ignore:end */


    /**
     * This method updates the ListView's selection and optionally animates scrolling that selection to the top of the list.
     */
    selectValue: function (selectedId, scrollToSelectedItem) {
        var $rootNode = findWidget(this);
        var listView = findWidget(this, 'kendoListView');
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
        if (this.props.selectable && (this.props.value != prevProps.value)) {
            this.syncSelectionWithKendo();
        }
    },

    componentDidMount: function () {
        var $rootNode = findWidget(this);
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
        findWidget(this, 'kendoListView').destroy();
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

export default KendoListView;