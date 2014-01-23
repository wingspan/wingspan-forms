/** @jsx React.DOM */
define([
    'underscore', 'jquery', 'react', '../util/util', '../ControlCommon'
], function (_, $, React, u, controlCommon) {
    'use strict';


    /**
     * Creates a multi-select control.
     * isFlat controls whether the selectors are interpreted as containing optgroups.
     * If isFlat is true selectors will be a two level array of arrays.  The top level will be pairs of (name, children). Children, the second level, will be pairs of (id, name).
     * If isFlat is false selectors will  simply be an array of (id, name).
     * Each level can also have an active property that will be assumed to be true if undefined.
     * Empty optgroups will be elided.
     */
    return React.createClass({

        fieldClass: 'formFieldMultiselect',

        getDefaultProps: function () {
            return {
                disabled: false,
                readonly: false,
                isValid: [true, ''],
                isFlat: true,
                selectors: [],
                selections: [], // this is the value prop that pairs with onChange.
                size: 3,
                onChange: function (selections) { console.log(selections); }
            };
        },

        getInitialState: function () {
            // Here, we cull out all the inactive panels.
            var selectors = this.props.selectors;
            u.test(_.isArray(selectors), 'array required for selectors');
            // implements the behavior that the absence of an active property makes it automatically active.
            function isActive(selector) {
                return _.isUndefined(selector.active) || !! selector.active;
            }
            u.test(_.isArray(selectors), 'array required for selectors');
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
            return ({
                selectors: selectors,
                selections: this.props.selections,
                isValid: this.props.isValid
            });
        },

        /* jshint ignore:start */
        render: function () {
            var selectors = this.state.selectors;
            var selections = this.props.selections;
            function option(selector) {
                return (<option value={selector.id}>{selector.name}</option>);
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
                    return (<optgroup label={group.name}>{options}</optgroup>);
                });
            }

            return(
                        <select id={this.props.id} ref="multiselector" value={selections} multiple="multiple">{selectors}</select>
            );
        },
        /* jshint ignore:end */

        componentDidMount: function (rootNode) {
            var self = this;
            $(rootNode).on('change', function (event) {
                void event;
                var selections = _.map(_.filter(self.refs['multiselector'].getDOMNode().options, function (opt) {
                    return opt.selected;
                }), function (opt) {
                    return opt.value;
                });
                self.props.onChange(selections);
                return true;
            });
        }
    });
});
