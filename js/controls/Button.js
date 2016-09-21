import React from 'react'
import { noop } from '../ReactCommon'

var Button = React.createClass({

    getDefaultProps: function () {
        return {
            onClick: noop,
            disabled: false,
            className: ''
        };
    },

    render: function () {
        var classes = this.props.className;

        if (this.props.diabled) {
            classes += ' buttonDisabled';
        }
        return (<button className={classes} onClick={this.props.onClick} disabled={this.props.disabled}>{this.props.children}</button>);
    }
});

export default Button;