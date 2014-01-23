/** @jsx React.DOM */
define([
    'underscore', 'react', 'jquery', '../util/debug'
], function (_, React, $, debug) {
    'use strict';

    /**
     *     Careful:
     *       This must be contained by a RadioGroup or it won't style right.
     */
    var Radio = React.createClass({

        getDefaultProps: function () {
            return {
                onChange: $.noop,
                disabled: false,
                readonly: false,
                checked: false,
                value: undefined
            };
        },

        componentWillMount: function () {
            debug.verify(this.props.name, 'Radio \'name\' prop is required');
            //debug.verify(this.props.value !== undefined, 'Radio needs a value to distinguish choices');
            // Also, value can't be null, i think, or the <input> will not be controlled.

            this.stableUniqueId = _.uniqueId();
        },

        render: function () {
            return (
                <span>
                    <input type="radio" name={this.props.name} id={this.stableUniqueId} value={this.props.value} onChange={this.onChange}
                           checked={this.props.checked} data-checked={this.props.checked ? '' : null}
                           disabled={this.props.disabled} readOnly={this.props.readonly} />
                    <label htmlFor={this.stableUniqueId}>{this.props.children}</label>
                </span>
            );
        },

        onChange: function (e) {
            !this.props.readonly && this.props.onChange(e.target.value);
        }
    });


    return Radio;
});