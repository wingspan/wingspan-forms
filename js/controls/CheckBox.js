/** @jsx React.DOM */
define([
    'underscore', 'jquery', 'react'
], function (_, $, React) {
    'use strict';

    var SPACE_KEY = 32;

    return React.createClass({

        fieldClass: 'formFieldCheckbox',

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

        /*jshint ignore:start */
        render: function () {
            var elemId = this.props.id + 'CheckBox';

            if (this.props.noControl) {
                return (<span>{this.getDisplayValue()}</span>);
            }

            return (
                <span className="CheckBox" tabIndex="0">
                    <input type="checkbox" id={elemId}
                        checked={this.props.value} data-checked={this.props.value ? '' : null}
                        onChange={this.onChange}
                        disabled={this.props.disabled || this.props.readonly} />
                    <label htmlFor={elemId}>{this.props.label}</label>
                </span>
            );
        },
        /*jshint ignore:end */

        componentDidMount: function (rootNode) {
            var self = this;

            $(rootNode).on('keypress', function (e) {
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
