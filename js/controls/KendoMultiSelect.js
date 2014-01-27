/** @jsx React.DOM */
define([
    'underscore', 'jquery', 'react',
    '../util/debug',
    '../ControlCommon'
], function (_, $, React, debug, controlCommon) {
    'use strict';


    return React.createClass({

        getDefaultProps: function() {
            return {
                label: ' ', // will this render as nbsp? No, FIXME
                layout: 'formField',
                disabled: false,
                isValid: [true, ''],
                template: _.str.sprintf('${%s} - ${%s}', this.props.valueField, this.props.displayField),
                onChange: function () {},
                readonly: false,
                noControl: false,
                placeholder: '',
                width: null // use whatever the default is
            };
        },

        componentWillMount: function () {
            debug.verify(this.props.displayField);
            debug.verify(this.props.valueField);
            debug.verify(this.props.dataSource);

            this.stableUniqueId = _.uniqueId();
        },

        render: function () {

            var classes = _.compact([
                this.props.layout,
                'formFieldMultiselect',
                controlCommon.quadState(this.props.disabled, this.props.readonly, this.props.isValid, this.props.noControl)
            ]).join(' ');

            void classes;
            /*jshint ignore:start */
            var control = (this.props.noControl
                ? (<span data-wspt-id="displayValue">{this.props.value}</span>)
                : (<select id={this.stableUniqueId}/>));

            return(
                <div className={classes}>
                    <label className="formLabel" htmlFor={this.stableUniqueId}>{this.props.label}</label>
                    <div className="formElement">
                        {control}
                    </div>
                </div>
            );
            /*jshint ignore:end */
        },

        getDisplayValue: function () {
            // for displaying as a string in noControl mode
            var displayVals = _.map(this.props.value, function (val) {
                return val[this.props.displayField];
            });

            return _.str.join(displayVals, ', '); // l10n?
        },

        componentDidMount: function (rootNode) {
            debug.verify(!!rootNode);

            if (this.props.noControl) {
                // Nothing to do - all done in JSX.
                return;
            }

            var $el = $(rootNode).find('#' + this.stableUniqueId);
            debug.verify($el);

            if (this.props.width) {
                $el.width(340);
            }
            $el.kendoMultiSelect({
                filter: 'contains',
                highlightFirst: false,
                dataTextField: this.props.displayField,
                dataValueField: this.props.valueField,
                dataSource: this.props.dataSource,
                placeholder: this.props.placeholder,
                itemTemplate: this.props.template,
                change: this.onChange
            });

            var kendoWidget = $el.data('kendoMultiSelect');

            // the 'value' method is a getter/setter that gets/sets the valueField. It will look up the record
            // in the store via the value set here.
            kendoWidget.value((!_.isEmpty(this.props.value)) ? this.props.value[this.props.valueField] : '');

            if (this.props.disabled) {
                // disabled beats readonly
                kendoWidget.enable(false);
            } else if (this.props.readonly) {
                kendoWidget.readonly(true);
            } else {
                kendoWidget.enable(true);
            }
        },

        componentWillReceiveProps: function (nextProps) {
            var cantChange = ['template', 'dataSource', 'valueField', 'displayField', 'placeholder'];
            debug.verify(_.isEqual(_.pick(nextProps, cantChange), _.pick(this.props, cantChange)), 'these props cant change after mount');
        },

        componentDidUpdate: function (prevProps, prevState, rootNode) {
            debug.verify(!!rootNode);

            if (this.props.noControl) {
                // Nothing to do - all done in JSX.
                return;
            }

            var $el = $(rootNode).find('#' + this.stableUniqueId);
            var kendoWidget = $el.data('kendoMultiSelect');

            if (prevProps.dataSource !== this.props.dataSource) {
                kendoWidget.setDataSource(this.props.dataSource);
            }

            var vals = [];
            var self = this;
            _.each(this.props.value, function (item) {
                vals.push(item[self.props.valueField]);
            });

            kendoWidget.value(vals);

            if (this.props.disabled) {
                // disabled beats readonly
                kendoWidget.enable(false);
            } else if (this.props.readonly) {
                kendoWidget.readonly(true);
            } else {
                kendoWidget.enable(true);
            }
        },

        onChange: function (event) {
            var kendoMultiSelect = event.sender;
            var records = kendoMultiSelect.dataItems();
            this.props.onChange(records);
        }
    });

});
