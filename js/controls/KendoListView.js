/** @jsx React.DOM */
define([
    'underscore', 'jquery', 'react', 'kendo',
    '../util/kendoutil',
    '../ImmutableOptimizations'
], function (_, $, React, kendo, kendoutil, ImmutableOptimizations) {
    'use strict';

    return React.createClass({
        displayName: 'KendoListView',

        getDefaultProps: function () {
            return {
                autoBind: false,
                className: 'content',
                scrollToSelectedItem: false,
                scrollDuration: 150,
                dataSource: undefined,
                selectable: true,
                selectedId: null,
                template: '<div data-model-id="${id}">${id}</div>',
                paramMapper: _.identity,       // function to map the datastore record into template params
                onChange: function () {}
            };
        },

        componentWillMount: function () {
            this.preventReentry = false;
            console.assert(this.props.dataSource);
        },

        /* jshint ignore:start */
        render: function () {
            return (<div className={this.props.className} />);
        },
        /* jshint ignore:end */


        /**
         * This method compensates for weird stuff in kendoListView, which has an immature API. Specifically,
         * there is no way to set the value without causing change events to fire, which makes it difficult for React to
         * control the widget.
         */
        effectListSelectionById: function (selectedId) {
            if (!this.isMounted()) {
                return;
            }

            var listView = $(this.getDOMNode()).data('kendoListView');
            var maybeSelectedChild = _.find(listView.element.children(), function (child) {
                return selectedId === $(child).data('modelId');
            }.bind(this));

            var syncSelection = (maybeSelectedChild
                ? function () { listView.select($(maybeSelectedChild)); }
                : function () { listView.clearSelection(); });

            this.preventReentry = true;
            // this line causes a widget value change event, so we need to prevent reentry to the value change callback
            syncSelection();
            this.preventReentry = false;
        },

        syncSelectionWithKendo: function () {
            if (!this.isMounted()) {
                return;
            }

            this.effectListSelectionById(this.props.selectedId);

            if (this.props.selectedId && this.props.scrollToSelectedItem) {
                var rootEl = $(this.getDOMNode());
                var listView = rootEl.data('kendoListView');
                var maybeSelectedChild = _.find(listView.element.children(), function (child) {
                    return this.props.selectedId === $(child).data('modelId');
                }.bind(this));

                var selectedChildIndex = _.indexOf(listView.element.children(), maybeSelectedChild);
                if (selectedChildIndex >= 0) {
                    var scrollTop = selectedChildIndex * $(maybeSelectedChild).height();
                    rootEl.animate({ scrollTop: scrollTop }, this.props.scrollDuration);
                }
            }
        },

        componentDidUpdate: function (prevProps, prevState) {
            if (this.props.selectable && !_.isEqual(this.props.selectedId, prevProps.selectedId)) {
                this.syncSelectionWithKendo();
            }
        },

        componentDidMount: function () {
            var listViewWidget = $(this.getDOMNode()).kendoListView({
                autoBind: this.props.autoBind,
                dataSource: this.props.dataSource,
                template: kendoutil.templateWith(kendo.template(this.props.template), this.props.paramMapper),
                selectable: this.props.selectable,
                change: this.onValueChange
            }).data('kendoListView');

            if (! this.props.autoBind) {
                listViewWidget.refresh();
            }

            if (this.props.selectable) {
                this.syncSelectionWithKendo();
            }

            this.props.dataSource.bind('change', this.onDataStoreChange);
        },

        componentWillUnmount: function () {
            this.props.dataSource.unbind('change', this.onDataStoreChange);
        },

        onValueChange: function (e) {
            if (this.preventReentry) return;
            var listView = $(e.sender.element[0]).data('kendoListView');
            var val = listView.select().data('modelId');
            this.effectListSelectionById(this.props.selectedId); // unwind the kendo state change to respect flux lifecycle
            this.props.onChange(val);
        },

        onDataStoreChange: function () {
            this.syncSelectionWithKendo();
        }
    });
});
