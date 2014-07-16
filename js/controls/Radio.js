/** @jsx React.DOM */
define([
    'underscore', 'react', 'jquery'
], function (_, React, $) {
    'use strict';

    var PropTypes = React.PropTypes;

    /**
     *     Careful:
     *       This must be contained by a RadioGroup or it won't style right.
     */
    var Radio = React.createClass({

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
                onChange: $.noop,
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
            return (
                <span>
                    <input type="radio" name={this.props.name} id={this.stableUniqueId} value={this.props.value} onChange={this.onChange}
                           checked={this.props.checked} data-checked={this.props.checked ? '' : null}
                           disabled={this.props.disabled} />
                    <label htmlFor={this.stableUniqueId}>{this.props.children}</label>
                </span>
            );
        },
        /*jshint ignore:end */

        onChange: function (e) {
            if (!this.props.readonly) {
                this.props.onChange(e.target.value);
            }
        }
    });


    return Radio;
});