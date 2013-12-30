/** @jsx React.DOM */
define([
    'underscore', 'jquery', 'react', 'kendo',
    'wingspan-forms/util/debug',
    'wingspan-forms/ControlCommon',
    'wingspan-forms/ImmutableOptimizations'
], function (_, $, React, kendo, debug, ControlCommon, ImmutableOptimizations) {
    'use strict';

    var FILTER_KIND = 'startswith';

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

        function applyPropToValue(propName) {
            var prop = props[propName];

            if (_.isFunction(prop)) {
                return prop.call(undefined, value);
            } else {
                return value[prop];
            }
        }

        // (AHG) If we have an object (with both display text and value), set both the text and the value. The value needs to be set
        // so the widget knows if the value changes and needs to fire the event. The text needs to be set in case the store has no
        // data.
        if (_.isObject(value)) {
            comboWidget.value(applyPropToValue('valueField'));
            comboWidget.text(applyPropToValue('displayField'));
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
                // fetch the data and update the text in the span...
                if (!_.isObject(props.value)) {
                    props.dataSource.fetch().then(function () {
                        $el.text(getDisplayValue(props.dataSource.get(props.value), props.displayField));
                    }).done();
                }
                return;
            }

            if (props.width) {
                $el.width(props.width);
            }
            $el.kendoComboBox({
                autoBind: false,
                filter: FILTER_KIND,
                highlightFirst: false,
                dataTextField: _.isFunction(props.displayField) ? '' : props.displayField,
                dataValueField: _.isFunction(props.valueField) ? '' : props.valueField,
                dataSource: props.dataSource,
                placeholder: props.placeholderText,
                template: props.template,
                change: this.onChange
            });

            setComboValue($el.data('kendoComboBox'), props);
            ControlCommon.setKendoDisabledReadonly($el.data('kendoComboBox'), props.disabled, props.readonly);
        },

        componentWillUnmount: function () {
            var kendoWidget = $(this.getDOMNode()).data('kendoComboBox');

            if (kendoWidget) {
                kendoWidget.destroy();
            }
        },

        componentWillReceiveProps: function (nextProps) {
            var cantChange = ['template', 'placeholderText'];
            debug.verify(_.isEqual(_.pick(nextProps, cantChange), _.pick(this.props, cantChange)), 'these props cant change after mount');
        },

        componentDidUpdate: function (prevProps, prevState, rootNode) {
            debug.verify(!!rootNode);

            if (this.props.noControl) {
                // nothing left to do - it was all done in JSX
                return;
            }

            var kendoWidget = $(rootNode).data('kendoComboBox');

            if (prevProps.dataSource !== this.props.dataSource) {
                kendoWidget.setDataSource(this.props.dataSource);
                //AHG: Well, this is needed to workaround some odd behavior in the kendo refresh() method,
                // specifically the call to _selectItem(). That causes a surprise change in value without firing the change event.
                // It's important to refresh() the widget _before_ updating the value, because the _selectItem in refresh() changes the value.
                kendoWidget.refresh();
            }

            setComboValue(kendoWidget, this.props);
            ControlCommon.setKendoDisabledReadonly(kendoWidget, this.props.disabled, this.props.readonly);
        },

        onChange: function (event) {
            var model = event.sender.dataItem();

            // pass up the same structure as was originally passed down to us.
            if (_.isString(this.props.value) || _.isNumber(this.props.value)) {
                this.props.onChange((model && model.get && model.get(this.props.valueField)));
            } else {
                // Do not return the internal kendo model objects, since they're an implementation detail of the combo/store.
                this.props.onChange((model instanceof kendo.data.Model) ? model.toJSON() : model);
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