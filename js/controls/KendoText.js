import React from 'react'
import { noop } from '../ReactCommon'

const PropTypes = React.PropTypes;

const KendoText = React.createClass({

    propTypes: {
        id: PropTypes.string,
        value: PropTypes.string,
        onChange: PropTypes.func,
        placeholder: PropTypes.string,
        disabled: PropTypes.bool,
        readonly: PropTypes.bool,
        noControl: PropTypes.bool,
        minLength: PropTypes.number,
        maxLength: PropTypes.number,
        isPassword: PropTypes.bool,
        trimValue: PropTypes.bool
    },

    statics: { fieldClass: function () { return 'formFieldInput'; } },

    getDefaultProps: function () {
        return {
            value: '',
            onChange: noop,
            placeholder: '',
            disabled: false,
            readonly: false,
            noControl: false,
            isPassword: false,
            trimValue: true
        };
    },

    render: function () {
        var value = this.props.value || '';
        /*jshint ignore:start */
        if (this.props.noControl) {
            return (<span>{value}</span>);
        }
        return (
            <input id={this.props.id}
                type={this.props.isPassword ? 'password' : 'text'}
                className="k-textbox"
                value={value}
                onChange={this.onChange}
                onBlur={this.onBlur}
                placeholder={this.props.placeholder}
                readOnly={this.props.readonly}
                disabled={this.props.disabled} />
        );
        /*jshint ignore:end */
    },

    onBlur: function (event) {
        var val = event.target.value;

        // Do not trim values for a password field since the whitespace may be intended
        if (this.props.trimValue && event.target.type === 'text') {
            // Only fire a change event if the trim() will change the value
            if (val !== val.trim()) {
                this.props.onChange(val.trim());
            }
        }
    },

    onChange: function (event) {
        var val = event.target.value;

        if (this.props.readonly) {
            return;
        }
        if (this.props.maxLength && val.length > this.props.maxLength) {
            return;
        }
        this.props.onChange(val);
    }
});

export default KendoText;