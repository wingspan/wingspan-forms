/** @jsx React.DOM */
define([
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
            return (<div className={this.props.className} />);
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
