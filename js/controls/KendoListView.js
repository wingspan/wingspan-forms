/** @jsx React.DOM */
define([
    'underscore', 'jquery', 'react', 'kendo',
    '../util/kendoutil',
    '../util/debug'
], function (_, $, React, kendo, kendoutil, debug) {
    'use strict';

    return React.createClass({
        displayName: 'KendoListView',

        getDefaultProps: function () {
            return {
                className: 'content',
                scrollToSelectedItem: false,
                scrollDuration: 150,
                dataSource: undefined,
                selectable: true,
                selectedId: null,
                template: '<div>${id}</div>',
                paramMapper: _.identity,       // function to map the datastore record into template params
                // tells the list whether it can move to a new selection.
                canChange: function () {
                    return true;
                },
                // announces that the selection has changed.
                onChange: function () {}
            };
        },

        componentWillMount: function () {
            debug.verify(this.props.dataSource);
        },

        /* jshint ignore:start */
        render: function () {
            return (<div className={this.props.className} />);
        },
        /* jshint ignore:end */

        syncSelectionWithKendo: function (rootEl) {
            var self = this;
            var listView = rootEl.data('kendoListView');
            var selectedChildIndex = 0; // default to first index if no selection is found
            var selectedChild = null;

            if (this.props.selectedId) {
                selectedChild = _.find(
                    listView.element.children(),
                    function (child, childIndex) {
                        var found = self.props.selectedId === $(child).data('modelId');
                        if (found) {
                            selectedChildIndex = childIndex;
                        }
                        return found;
                    }
                );
            }

            // Verify that we found the child we were looking for, if any
            if (!!this.props.selectedId && !selectedChild) {
                // This happens when a user disposes an item out of a details page.  The Top-level details page controller
                // hangs onto state.record too long, so it attempts to make this selection after the data store is reloaded
                // and the item the action was performed on no longer exists.
                //
                // One way to fix this (I think) is to remove the data store event listener in DetailComponentCommon must be removed in favor
                // of attaching functions to the promise chains in the action handlers themselves.
                //
                // Another thought would be to set state.record to null when the actions are taken, though by itself this may cause other
                // problems
                console.warn('Could not find props.selectedId in KendoList view.  Check warning block for details.');
            }

            this.suppressEvents = true;
            if (selectedChild && this.props.scrollToSelectedItem) {
                var $selectedChild = $(selectedChild);
                var scrollTop = selectedChildIndex * $selectedChild.height();
                listView.select($selectedChild);

                $(rootEl).animate({ scrollTop: scrollTop }, this.props.scrollDuration);
            } else {
                listView.clearSelection();
            }
            this.suppressEvents = false;
        },

        componentDidUpdate: function (prevProps, prevState, rootNode) {
            if (this.props.selectable) {
                this.syncSelectionWithKendo($(rootNode));
            }
        },

        componentDidMount: function (rootNode) {
            debug.verify(rootNode);
            var $el = $(rootNode);

            var listView = $el.kendoListView({
                autoBind: false,
                dataSource: this.props.dataSource,
                template: kendoutil.templateWith(kendo.template(this.props.template), this.props.paramMapper),
                selectable: this.props.selectable,
                change: this.onChange
            }).data('kendoListView');

            // We need to force the ListView to generate it's DOM children immediately in order
            // to support the scenario where a user clicks on an item in the List View and the
            // system wants to generate the details view AND select the item the user clicked on
            // at the same time
            listView.refresh();

            if (this.props.selectable) {
                // Initialize this member variable so it is always set.  We use it to prevent
                // our control from firing events as a result of us changing the Kendo state ourselves
                this.suppressEvents = false;

                this.syncSelectionWithKendo($el);
            }
        },

        onChange: function (e) {
            e.preventDefault();
            var listView = $(e.sender.element[0]).data('kendoListView');
            if (!this.suppressEvents) {
                if (this.props.canChange()) {
                    var nextSelectedId = listView.select().data('modelId');
                    if (this.props.selectedId !== nextSelectedId) {
                        this.props.onChange(nextSelectedId);
                    }
                } else {
                    this.syncSelectionWithKendo($(this.getDOMNode()));
                }
            }
        }
    });
});
