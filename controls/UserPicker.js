/** @jsx React.DOM */
define([
    'underscore', 'jquery', 'react', 'kendo',
    '../util/debug',
    '../ControlCommon'
], function (_, $, React, kendo, debug, controlCommon) {
    'use strict';

    void controlCommon;

    var QUERY_PARAM = 'nameOrEmail';
    var LIST_CLASS = 'userPicker';
    var TEMPLATE = '<div class="user"><p class="fullName">#: fullName #</p><p class="emailAddress">#: emailAddress #</p></div>';

    var UserPicker = React.createClass({

        fieldClass: 'formFieldAutocomplete',

        getDefaultProps: function () {
            return {
                value: undefined,
                onChange: function () {},
                id: undefined,
                placeholderText: 'Select User...', // l10n requires thought, no strings down here
                disabled: false,
                isValid: [true, ''],
                readonly: false,
                noControl: false
            };
        },

        componentWillMount: function () {
            debug.verify(this.props.dataSource);
        },

        componentDidMount: function (rootNode) {
            var $el = $(rootNode);
            debug.verify($el);

            var onChange = this.props.onChange,
                header = $('<h2></h2>'),
                autoComplete;

            $el.kendoAutoComplete({
                dataSource: this.props.dataSource,
                dataTextField: QUERY_PARAM,
                placeholder: this.props.placeholderText,
                highlightFirst: true,
                suggest: false,
                template: TEMPLATE,
                close: function (e) {
                    var widget = e.sender;
                    // Don't close the picker on an empty search result because we want to tell the user about it.
                    if (widget._typing && widget.dataSource.total() === 0) {
                        e.preventDefault();
                    }
                },
                dataBound: function (e) {
                    var widget = e.sender,
                        dataSource = widget.dataSource;

                    if (dataSource.total() === 0) {
                        header.text('No matches');
                        widget.popup.open();
                    }
                    else {
                        header.text(kendo.format('All Users ({0:n0} matches)', dataSource.total()));
                    }
                },
                change: function (e) {
                    var widget = e.sender;

                    if (widget.dataSource.total() === 1) {
                        // Exact match - so raise the change event
                        onChange(widget.dataItem(0));
                    }
                },
                select: function (e) {
                    onChange(this.dataItem(e.item.index()));
                }
            }).on('blur', this.onBlur);

            autoComplete = $el.data('kendoAutoComplete');
            // Add a special class to the popup element so we can style the list items
            autoComplete.list.addClass(LIST_CLASS);

            if (this.props.value) {
                autoComplete.value(this.props.value.fullName);
            }
            if (this.props.disabled) {
                autoComplete.enable(false);
            }
            else if (this.props.readonly) {
                autoComplete.readonly(true);
            }
            // Add an element to contain some text above the list of users
            header.prependTo(autoComplete.list);
        },

        componentWillUnmount: function () {
            var $el = $(this.getDOMNode());

            $el.data('kendoAutoComplete').destroy();
        },

        componentDidUpdate: function (prevProps, prevState, rootNode) {
            var $el = $(rootNode),
                autoComplete = $el.data('kendoAutoComplete');

            autoComplete.value(this.props.value ? this.props.value.fullName : null);

            if (this.props.disabled) {
                autoComplete.enable(false);
            }
            else {
                autoComplete.readonly(this.props.readonly);
            }
        },

        onBlur: function (e) {
            var autoComplete = $(e.target).data('kendoAutoComplete');

            // Always reset the text back to the current value, in case they typed stuff that didn't match anything
            autoComplete.value(this.props.value ? this.props.value.fullName : null);
        },

        /*jshint ignore:start */
        render: function () {
            debug.verify(!this.props.noControl);
            return (<input type="text" id={this.props.id} className="k-textbox"/>);
        }
        /*jshint ignore:end */
    });

    return UserPicker;

});
