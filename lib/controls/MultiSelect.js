'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ReactCommon = require('../ReactCommon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PropTypes = _react2.default.PropTypes;

/**
 * Creates a multi-select control.
 * isFlat controls whether the selectors are interpreted as containing optgroups.
 * If isFlat is true selectors will be a two level array of arrays.  The top level will be pairs of (name, children). Children, the second level, will be pairs of (id, name).
 * If isFlat is false selectors will  simply be an array of (id, name).
 * Each level can also have an active property that will be assumed to be true if undefined.
 * Empty optgroups will be elided.
 */
var MultiSelect = _react2.default.createClass({
    displayName: 'MultiSelect',


    statics: { fieldClass: function fieldClass() {
            return 'formFieldMultiselect';
        } },

    propTypes: {
        id: PropTypes.string,
        selectors: PropTypes.array.isRequired,
        selections: PropTypes.array,
        isFlat: PropTypes.bool
    },

    getDefaultProps: function getDefaultProps() {
        return {
            disabled: false,
            readonly: false,
            isFlat: true,
            selectors: [],
            selections: [], // this is the value prop that pairs with onChange.
            size: 3,
            onChange: _ReactCommon.noop
        };
    },

    getInitialState: function getInitialState() {
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
            selectors = selectors.filter(function (g) {
                return 0 < g.children.length;
            });
        }
        return { selectors: selectors };
    },

    /* jshint ignore:start */
    render: function render() {
        var props = this.props;
        var selectors = this.state.selectors;
        var selections = this.props.selections;

        function option(selector) {
            return _react2.default.createElement(
                'option',
                { key: selector.id, value: selector.id, title: selector.name },
                selector.name
            );
        }

        if (this.props.isFlat) {
            selectors = selectors.map(option);
        } else {
            selectors = selectors.map(function (group) {
                var options = group.children.map(option);
                return _react2.default.createElement(
                    'optgroup',
                    { key: group.name, label: group.name },
                    options
                );
            });
        }

        function onChange(event) {
            var optArray = [].slice.call(event.target.options);
            var selections = optArray.filter(function (opt) {
                return opt.selected;
            }).map(function (opt) {
                return opt.value;
            });
            props.onChange(selections);
        }
        return _react2.default.createElement(
            'select',
            { id: props.id, value: selections, multiple: 'multiple', disabled: this.props.disabled,
                onChange: !this.props.readonly ? onChange : undefined },
            selectors
        );
    }
    /* jshint ignore:end */
});

exports.default = MultiSelect;