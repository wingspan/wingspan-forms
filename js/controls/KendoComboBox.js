/** @jsx React.DOM */
define([
    'underscore', 'jquery', 'react', 'kendo',
    '../util/debug',
    '../ControlCommon',
    '../ImmutableOptimizations'
], function (_, $, React, kendo, debug, ControlCommon, ImmutableOptimizations) {
    'use strict';

    // (AHG) This "turns off" behavior in the kendo.ui.Select widget that selects the first option when refreshing the
    // combo with new data. When the widget has no value set, this causes a value change without firing an event.
    // We don't want the combo selection to change unless the user makes the change
    kendo.ui.ComboBox.fn._options = function (data, optionLabel) {
        var selectedIndex = this.element[0].selectedIndex;

        kendo.ui.Select.fn._options.call(this, data, optionLabel);
        this.element[0].selectedIndex = selectedIndex;
    };

    function getDisplayValue(value, displayField) {
        return _.isObject(value) ? value[displayField] : '';
    }

    function setComboValue(comboWidget, props) {
        var value = props.value;

        // (AHG) If we have an object (with both display text and value), set both the text and the value. The value needs to be set
        // so the widget knows if the value changes and needs to fire the event. The text needs to be set in case the store has no
        // data.
        if (_.isObject(value)) {
            comboWidget.value(value[props.valueField]);
            comboWidget.text(value[props.displayField]);
        }
        else if (value !== undefined) {
            comboWidget.value(value);
        }
    }

    var KendoComboBox = React.createClass({
        mixins: [ImmutableOptimizations],

        fieldClass: 'formFieldCombobox',

        getDefaultProps: function () {
            return {
                value: undefined,
                onChange: $.noop,
                id: undefined,
                displayField: undefined,
                valueField: undefined,
                dataSource: undefined,
                template: undefined,
                filter: 'startswith',
                width: null, // use default width whatever that is...
                disabled: false,
                readonly: false,
                noControl: false,
                placeholderText: ''
            };
        },

        componentWillMount: function () {
            debug.verify(this.props.displayField);
            debug.verify(this.props.valueField);

            if (!this.props.noControl) {
                debug.verify(this.props.dataSource);
            }
        },

        /*jshint ignore:start */
        render: function () {
            return (this.props.noControl
                ? (<span id={this.props.id}>{getDisplayValue(this.props.value, this.props.displayField)}</span>)
                : (<select id={this.props.id}/>));
        },
        /*jshint ignore:end */

        componentDidMount: function (rootNode) {
            var $el = $(rootNode),
                props = this.props;

            if (props.noControl) {
                this.setNoControlValue($el);
            }
            else {
                if (props.width) {
                    $el.width(props.width);
                }
                $el.kendoComboBox({
                    autoBind: false,
                    filter: this.props.filter,
                    highlightFirst: false,
                    dataTextField: props.displayField,
                    dataValueField: props.valueField,
                    dataSource: props.dataSource,
                    placeholder: props.placeholderText,
                    template: props.template,
                    change: this.onChange
                });

                setComboValue($el.data('kendoComboBox'), props);
                ControlCommon.setKendoDisabledReadonly($el.data('kendoComboBox'), props.disabled, props.readonly);
            }
        },

        componentWillUnmount: function () {
            var kendoWidget = $(this.getDOMNode()).data('kendoComboBox');

            if (kendoWidget) {
                kendoWidget.destroy();
            }
        },

        componentWillReceiveProps: function (nextProps) {
            var cantChange = ['template', 'valueField', 'displayField', 'placeholderText', 'filter'];
            debug.verify(_.isEqual(_.pick(nextProps, cantChange), _.pick(this.props, cantChange)), 'these props cant change after mount');
        },

        componentDidUpdate: function (prevProps, prevState, rootNode) {
            debug.verify(!!rootNode);
            var $el = $(rootNode)

            if (this.props.noControl) {
                this.setNoControlValue($el);
            }
            else {
                var kendoWidget = $el.data('kendoComboBox');

                if (prevProps.dataSource !== this.props.dataSource) {
                    kendoWidget.setDataSource(this.props.dataSource);
                    //AHG: Well, this is needed to workaround some odd behavior in the kendo refresh() method,
                    // specifically the call to _selectItem(). That causes a surprise change in value without firing the change event.
                    // It's important to refresh() the widget _before_ updating the value, because the _selectItem in refresh() changes the value.
                    kendoWidget.refresh();
                }

                setComboValue(kendoWidget, this.props);
                ControlCommon.setKendoDisabledReadonly(kendoWidget, this.props.disabled, this.props.readonly);
            }
        },

        onChange: function (event) {
            var model = event.sender.dataItem();

            // pass up the same structure as was originally passed down to us.
            if (_.isString(this.props.value) || _.isNumber(this.props.value)) {
                this.props.onChange((model ? model.get(this.props.valueField) : model));
            } else {
                // Do not return the internal kendo model objects, since they're an implementation detail of the combo/store.
                this.props.onChange((model instanceof kendo.data.Model) ? model.toJSON() : model);
            }
        },

        setNoControlValue: function ($el) {
            // If the value is just an ID, we need to fetch data from the server to get the display value.
            if (!_.isObject(this.props.value)) {
                // However, if the ID is the display value, we can use it as is.
                if (this.props.valueField === this.props.displayField) {
                    $el.text(this.props.value);
                    return;
                }
                var self = this;
                this.props.dataSource.fetch().then(function () {
                    $el.text(getDisplayValue(self.props.dataSource.get(self.props.value), self.props.displayField));
                }).done();
            }
        }
/*
        readFieldFromSelectedValue: function(field) {
            if (!_.isEmpty(this.props.value)) {
                // Not sure where this came from, but you can specify a dataItem function as a value/display
                // property in Kendo, and we use this, at least we use it on the facet combos on the Document
                // Type Picker and Related Document Picker.
                //
                // This part of the code manages the value state of the kendo control in React, and it was running
                // afoul of this mechanism because it didn't know how to look up the value property correctly
                // when using this facility.  We manually implement a compatible lookup procedure to keep everyone
                // happy without writing any code outside of this class.
                if (_.str.endsWith(field, '()')) {
                    var self = this;
                    var functionName = field.substring(0, field.length - 2);
                    var item = _.find(this.props.dataSource.data(), function(item){ return _.isEqual(item.value.toJSON(), self.props.value.value)});
                    return !!item ? item[functionName]() : '';
                } else {
                    return this.props.value[field];
                }
            } else {
                return '';
            }
        }*/
    });

    void getDisplayValue;
    void KendoComboBox;

    return KendoComboBox;
});
