/** @jsx React.DOM */
define([
    'underscore', 'jquery', 'react',
    '../ImmutableOptimizations'
], function (_, $, React, ImmutableOptimizations) {
    'use strict';

    var SPACE_KEY = 32;

    return React.createClass({
        mixins: [ImmutableOptimizations(['onChange'])],

        statics: { fieldClass: function () { return 'formFieldCheckbox'; } },

        getDefaultProps: function () {
            return {
                value: undefined,
                onChange: function () {},
                id: undefined,
                label: undefined, //checkbox label, not field label
                isValid: [true, ''],
                disabled: false,
                readonly: false
            };
        },

        componentWillMount: function () {
          this.stableUniqueId = this.props.id ? this.props.id : _.uniqueId();
        },

        /*jshint ignore:start */
        render: function () {
            if (this.props.noControl) {
                return (<span>{this.getDisplayValue()}</span>);
            }

            return (
                <span className="CheckBox" tabIndex="0">
                    <input type="checkbox" id={this.stableUniqueId}
                        checked={this.props.value} data-checked={this.props.value ? '' : null}
                        onChange={this.onChange}
                        disabled={this.props.disabled || this.props.readonly} />
                    <label htmlFor={this.stableUniqueId}>{this.props.label}</label>
                </span>
            );
        },
        /*jshint ignore:end */

        componentDidMount: function () {
            var self = this,
                $el = $(this.getDOMNode());

            $el.on('keypress', function (e) {
                if (e.keyCode === SPACE_KEY) {
                    self.props.onChange(!self.props.value);
                }
            });
        },

        componentWillUnmount: function () {
            $(this.getDOMNode()).off('keypress');
        },

        onChange: function (event) {
            var val = event.target.checked;
            this.props.onChange(val);
        },

        getDisplayValue: function () {
            return !!this.props.value ? 'Yes' : 'No';
        }
    });

});
