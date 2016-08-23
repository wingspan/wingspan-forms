import _ from 'lodash'
import React from 'react'
import { noop } from '../ReactCommon'

const PropTypes = React.PropTypes;

function fireChange(props) {
    if (props.readonly) {
        return;
    }
    props.onChange(props.value);
}

/**
 * Careful:
 * This must be contained by a RadioGroup or it won't style right.
 */
const Radio = React.createClass({

    propTypes: {
        name: PropTypes.string.isRequired,
        value: PropTypes.any.isRequired,
        onChange: PropTypes.func,
        checked: PropTypes.bool,
        disabled: PropTypes.bool,
        readonly: PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            onChange: noop,
            disabled: false,
            readonly: false,
            checked: false
        };
    },

    componentWillMount: function () {
        this.stableUniqueId = _.uniqueId();
    },

    /*jshint ignore:start */
    render: function () {
        // Disabled controls should not receive focus
        var tabIndex = this.props.disabled ? null : 0;

        return (
            <span className="formRadio" tabIndex={tabIndex} onKeyDown={this.onKeyDown}>
                <input type="radio" name={this.props.name} id={this.stableUniqueId}
                       value={this.props.value} onChange={this.onChange}
                       checked={this.props.checked} data-checked={this.props.checked ? '' : null}
                       disabled={this.props.disabled} />
                <label htmlFor={this.stableUniqueId}>{this.props.children}</label>
            </span>
        );
    },
    /*jshint ignore:end */

    onChange: function () {
        fireChange(this.props);
    },

    onKeyDown: function (e) {
        if (e.key === ' ') {
            // Prevent the default always so that the space key doesn't scroll the page.
            e.preventDefault();

            fireChange(this.props);
        }
    }
});


export default Radio;