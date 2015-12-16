
define([
    'underscore', 'react',
    '../ImmutableOptimizations'
], function (_, React, ImmutableOptimizations) {
    'use strict';

    var PropTypes = React.PropTypes;

    /**
     * Creates a multi-select control.
     * isFlat controls whether the selectors are interpreted as containing optgroups.
     * If isFlat is true selectors will be a two level array of arrays.  The top level will be pairs of (name, children). Children, the second level, will be pairs of (id, name).
     * If isFlat is false selectors will  simply be an array of (id, name).
     * Each level can also have an active property that will be assumed to be true if undefined.
     * Empty optgroups will be elided.
     */
    var MultiSelect = React.createClass({
        mixins: [ImmutableOptimizations(['onChange'])],

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
                onChange: function () {}
            };
        },

        getInitialState: function () {
            // Here, we cull out all the inactive panels.
            var selectors = this.props.selectors;

            // implements the behavior that the absence of an active property makes it automatically active.
            function isActive(selector) {
                return _.isUndefined(selector.active) || !! selector.active;
            }

            if (this.props.isFlat) {
                selectors = _.filter(selectors, function (selector) {
                    return isActive(selector);
                });
            } else {
                selectors = _.filter(selectors, function (group) {
                    return isActive(group);
                });
                selectors = _.map(selectors, function (group) {
                    // this clone will copy the primitive valued properties and leave the arrays as references.
                    // this is fine since we'll be replacing those arrays with filtered versions.
                    var g = _.clone(group);
                    g.children = _.filter(group.children, function (child) { return isActive(child); });
                    return g;
                });
                selectors = _.filter(selectors, function (g) { return 0 < g.children.length; });
            }
            return { selectors: selectors };
        },

        /* jshint ignore:start */
        render: function () {
            var props = this.props;
            var selectors = this.state.selectors;
            var selections = this.props.selections;

            function option(selector) {
                return (<option key={selector.id} value={selector.id}>{selector.name}</option>);
            }

            if (this.props.isFlat) {
                selectors = _.map(selectors, function (selector) {
                    return option(selector); // (<option value={selector.id}>{selector.name}</option>);
                });
            } else {
                selectors = _.map(selectors, function (group) {
                    var options = _.map(group.children, function(child) {
                        return option(child); // (<option value={child.id}>{child.name}</option>);
                    });
                    return (<optgroup key={group.name} label={group.name}>{options}</optgroup>);
                });
            }

            function onChange(event) {
                var selections = _.map(_.filter(event.target.options, function (opt) {
                    return opt.selected;
                }), function (opt) {
                    return opt.value;
                });
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

    return MultiSelect;
});
