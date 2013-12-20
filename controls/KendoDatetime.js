/** @jsx React.DOM */
define([
    'underscore', 'jquery', 'react', 'kendo', 'moment', 'platform/debug',
    'wingspan-forms/ControlCommon'
], function (_, $, React, kendo, moment, debug, ControlCommon) {
    'use strict';


    var KendoDateTime = React.createClass({

        fieldClass: 'formFieldDatetimepicker',

        getDefaultProps: function () {
            return {
                value: undefined,
                onChange: function () {},
                id: undefined,
                disabled: false,
                isValid: [true, ''],
                readonly: false,
                noControl: false
            };
        },

        /*jshint ignore:start */
        render: function () {
            return (this.props.noControl
                ? (<span>{this.props.value ? moment(this.props.value).format('MMMM Do YYYY, h:mm:ss a') : ''}</span>)
                : (<input id={this.props.id} type="text" />));
        },
        /*jshint ignore:end */

        componentDidMount: function (rootNode) {
            debug.verify(!!rootNode);

            if (this.props.noControl) {
                // Everything was done in JSX.
                return;
            }

            var $el = $(rootNode);
            debug.verify($el);

            $el.kendoDateTimePicker({
                change: this.onChange
            });

            ControlCommon.setKendoDateState(
                $el.data('kendoDateTimePicker'),
                this.props.value, this.props.disabled, this.props.readonly,
                this.props.max, this.props.min);
        },

        componentDidUpdate: function (prevProps, prevState, rootNode) {
            debug.verify(!!rootNode);

            if (this.props.noControl) {
                // Everything was done in JSX.
                return;
            }

            var $el = $(rootNode);
            debug.verify($el);

            ControlCommon.setKendoDateState(
                $el.data('kendoDateTimePicker'),
                this.props.value, this.props.disabled, this.props.readonly,
                this.props.max, this.props.min);
        },

        onChange: function (event) {
            var kendoWidget = event.sender;
            var val = kendoWidget.value();
            this.props.onChange(val);
        }
    });

    return KendoDateTime;
});
