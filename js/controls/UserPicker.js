/** @jsx React.DOM */
define([
    'underscore', 'jquery', 'react', 'kendo',
    '../util/debug',
    '../ControlCommon',
    '../ImmutableOptimizations'
], function (_, $, React, kendo, debug, controlCommon, ImmutableOptimizations) {
    'use strict';

    void controlCommon;
    var userPickerTemplate = '<div class="user"># if ((typeof currentlyOutOfOffice !== "undefined" && currentlyOutOfOffice) || (typeof status !== "undefined" && status) === "UNAVAILABLE") { #<div class="outOfOffice"></div># } #<p class="fullName">#: fullName #</p><p class="emailAddress">#: emailAddress #</p></div>';

    var UserPicker = React.createClass({
        mixins: [ImmutableOptimizations],

        fieldClass: 'formFieldAutocomplete',

        getDefaultProps: function () {
            return {
                value: undefined,
                onChange: function () {},
                id: undefined,
                placeholder: 'Select User...', // l10n requires thought, no strings down here
                template: userPickerTemplate,
                dataTextField: 'nameOrEmail',
                listClass: 'userPicker',
                disabled: false,
                isValid: [true, ''],
                readonly: false,
                noControl: false
            };
        },

        componentWillMount: function () {
            debug.verify(this.props.dataSource);
        },

        componentDidMount: function () {
            var $el = $(this.getDOMNode());
            debug.verify($el);

            var onChange = this.props.onChange,
                header = $('<h2></h2>'),
                autoComplete;

            $el.kendoAutoComplete({
                dataSource: this.props.dataSource,
                dataTextField: this.props.dataTextField,
                placeholder: this.props.placeholder,
                highlightFirst: true,
                suggest: false,
                template: this.props.template,
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

                    header.text(dataSource.message);

                    if (dataSource.total() === 0) {
                        widget.popup.open();
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

            if (this.props.listClass) {
                // Add a special class to the popup element so we can style the list items
                autoComplete.list.addClass(this.props.listClass);
            }

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

        componentDidUpdate: function (prevProps, prevState) {
            var $el = $(this.getDOMNode()),
                autoComplete = $el.data('kendoAutoComplete');

            if (prevProps.dataSource !== this.props.dataSource) {
                autoComplete.setDataSource(this.props.dataSource);
            }

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

            if (autoComplete) {
                // Always reset the text back to the current value, in case they typed stuff that didn't match anything
                autoComplete.value(this.props.value ? this.props.value.fullName : null);
            }
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
