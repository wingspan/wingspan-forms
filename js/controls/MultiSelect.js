import React from 'react'
import { noop } from '../ReactCommon'

const PropTypes = React.PropTypes;

/**
 * Creates a multi-select control.
 * isFlat controls whether the selectors are interpreted as containing optgroups.
 * If isFlat is true selectors will be a two level array of arrays.  The top level will be pairs of (name, children). Children, the second level, will be pairs of (id, name).
 * If isFlat is false selectors will  simply be an array of (id, name).
 * Each level can also have an active property that will be assumed to be true if undefined.
 * Empty optgroups will be elided.
 */
var MultiSelect = React.createClass({

    statics: { fieldClass: function () { return 'formFieldMultiselect'; } },

    propTypes: {
        id: PropTypes.string,
        selectors: PropTypes.array.isRequired,
        selections: PropTypes.array,
        isFlat: PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            disabled: false,
            readonly: false,
            isFlat: true,
            selectors: [],
            selections: [], // this is the value prop that pairs with onChange.
            size: 3,
            onChange: noop
        };
    },

    getInitialState: function () {
        // Here, we cull out all the inactive panels.
        var selectors = this.props.selectors;

        // implements the behavior that the absence of an active property makes it automatically active.
        function isActive(selector) {
            return selector.active === undefined || !!selector.active;
        }

        if (this.props.isFlat) {
            selectors = selectors.filter(isActive);
        } else {
            selectors = selectors.filter(isActive);
            selectors = selectors.map(function (group) {
                // this clone will copy the primitive valued properties and leave the arrays as references.
                // this is fine since we'll be replacing those arrays with filtered versions.
                var g = Object.assign({}, group);
                g.children = group.children.filter(isActive);
                return g;
            });
            selectors = selectors.filter(function (g) { return 0 < g.children.length; });
        }
        return { selectors: selectors };
    },

    /* jshint ignore:start */
    render: function () {
        var props = this.props;
        var selectors = this.state.selectors;
        var selections = this.props.selections;

        function option(selector) {
            return (<option key={selector.id} value={selector.id} title={selector.name}>{selector.name}</option>);
        }

        if (this.props.isFlat) {
            selectors = selectors.map(option);
        } else {
            selectors = selectors.map(function (group) {
                var options = group.children.map(option);
                return (<optgroup key={group.name} label={group.name}>{options}</optgroup>);
            });
        }

        function onChange(event) {
            var optArray = [].slice.call(event.target.options);
            var selections = optArray
                .filter(opt => opt.selected)
                .map(opt => opt.value);
            props.onChange(selections);
        }
        return (
            <select id={props.id} value={selections}  multiple="multiple" disabled={this.props.disabled}
                onChange={!this.props.readonly ? onChange : undefined}>
                {selectors}
            </select>);
    }
    /* jshint ignore:end */
});

export default MultiSelect;