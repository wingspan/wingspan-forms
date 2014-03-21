/** @jsx React.DOM */
define([
    'underscore', 'jquery', 'react', 'kendo',
    '../util/debug',
    '../ControlCommon',
    '../ImmutableOptimizations'
], function (_, $, React, kendo, debug, ControlCommon, ImmutableOptimizations) {
    'use strict';


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

            // We are papering over a bug in kendo ComboBox wherein it doesn't refresh its html representation of the
            // old dataSource models when it gets a new dataSource but no value was previously set.
            // When a truthy value is passed into the comboWidget.value(), the comboWidget will fetch() the dataSource,
            // refresh()-ing itself as well.
            if (!value) {
                comboWidget.refresh();
            }
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
                placeholder: ''
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
                    placeholder: props.placeholder,
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
            var cantChange = ['template', 'valueField', 'displayField', 'placeholder', 'filter'];
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
                }

                setComboValue(kendoWidget, this.props);
                ControlCommon.setKendoDisabledReadonly(kendoWidget, this.props.disabled, this.props.readonly);
            }
        },

        onChange: function (event) {
            var model = event.sender.dataItem();

            // pass up the same structure as was originally passed down to us.
            var nextValue;
            if (_.isString(this.props.value) || _.isNumber(this.props.value)) {
                nextValue = (model ? model.get(this.props.valueField) : model);
            } else {
                // Do not return the internal kendo model objects, since they're an implementation detail of the combo/store.
                nextValue = (model instanceof kendo.data.Model) ? model.toJSON() : model;
            }

            // the KendoCombo maintains its own value state, which has just been set by a user interaction,
            // and in fact we just extracted the value from the model. Rewind the state to the prior value,
            // to support the Flux loop, it will be set if the controller accepts the change.
            setComboValue($(this.getDOMNode()).data('kendoComboBox'), this.props);

            this.props.onChange(nextValue);
        },

        setNoControlValue: function ($el) {

            if (_.contains(['', null, undefined], this.props.value)) {
                $el.text('');
                return;
            }

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
            else {
                // valueAsOption, so can skip the query.
                $el.text(getDisplayValue(this.props.value, this.props.displayField));
            }
        }
    });

    void getDisplayValue;
    void KendoComboBox;

    return KendoComboBox;
});
