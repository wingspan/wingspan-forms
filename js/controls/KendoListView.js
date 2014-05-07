/** @jsx React.DOM */
define([
    'underscore', 'jquery', 'react', 'kendo',
    '../util/kendoutil',
    '../ImmutableOptimizations'
], function (_, $, React, kendo, kendoutil, ImmutableOptimizations) {
    'use strict';

    return React.createClass({
        displayName: 'KendoListView',
        mixins: [ImmutableOptimizations],

        getDefaultProps: function () {
            return {
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

        syncSelectionWithKendo: function (rootEl) {
            var listView = rootEl.data('kendoListView');
            var selectedChildIndex = 0; // default to first index if no selection is found
            var maybeSelectedChild = null; // if our selection is not on the current page of results, this is null.

            if (this.props.selectedId) {
                maybeSelectedChild = _.find(
                    listView.element.children(),
                    function (child, childIndex) {
                        var found = this.props.selectedId === $(child).data('modelId');
                        if (found) {
                            selectedChildIndex = childIndex;
                        }
                        return found;
                    }.bind(this)
                );
            }

            var syncSelection = (maybeSelectedChild
                ? function () { listView.select($(maybeSelectedChild)); }
                : function () { listView.clearSelection(); });

            this.preventReentry = true;
            // this line causes a widget value change event, so we need to prevent reentry to the value change callback
            syncSelection();
            this.preventReentry = false;


            if (maybeSelectedChild && this.props.scrollToSelectedItem) {
                var $selectedChild = $(maybeSelectedChild);
                var scrollTop = selectedChildIndex * $selectedChild.height();
                $(rootEl).animate({ scrollTop: scrollTop }, this.props.scrollDuration);
            }
        },

        componentDidUpdate: function (prevProps, prevState) {
            if (this.props.selectable && !_.isEqual(this.props.selectedId, prevProps.selectedId)) {
                this.syncSelectionWithKendo($(this.getDOMNode()));
            }
        },

        componentDidMount: function () {
            var $el = $(this.getDOMNode());

            $el.kendoListView({
                autoBind: false,
                dataSource: this.props.dataSource,
                template: kendoutil.templateWith(kendo.template(this.props.template), this.props.paramMapper),
                selectable: this.props.selectable,
                change: this.onValueChange
            }).data('kendoListView');

            if (this.props.selectable) {
                this.syncSelectionWithKendo($el);
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
            this.props.onChange(val);
        },

        onDataStoreChange: function () {
            this.syncSelectionWithKendo($(this.getDOMNode()));
        }
    });
});
