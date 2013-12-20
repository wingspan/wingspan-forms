/** @jsx React.DOM */
define([
    'underscore', 'jquery', 'react', 'platform/debug'
], function (_, $, React, debug) {
    'use strict';


    return React.createClass({

        fieldClass: 'formFieldInput',

        getDefaultProps: function () {
            return {
                value: undefined,
                onChange: function () {},
                placeholder: '',
                disabled: false,
                isValid: [true, ''],
                readonly: false,
                noControl: false,
                id: undefined
            };
        },

        render: function () {

            /*jshint ignore:start */
            return (this.props.noControl ? (<span>{this.props.value || ''}</span>) : (
                <input className="k-textbox" value={this.props.value || ''} onChange={this.onChange}
                    placeholder={this.props.placeholder} id={this.props.id}
                    readOnly={this.props.readonly}
                    disabled={this.props.disabled} />
            ));
            /*jshint ignore:end */
        },

        onChange: function (event) {
            if (this.props.readonly) {
                return;
            }
            var val = event.target.value;
            this.props.onChange(val);
        }

    });

});
