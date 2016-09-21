'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _kendo = require('kendo');

var _kendo2 = _interopRequireDefault(_kendo);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ReactCommon = require('../ReactCommon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PropTypes = _react2.default.PropTypes; /* Copyright (c) 2015-2016 Wingspan Technology, Inc. */


var KendoSlider = _react2.default.createClass({
    displayName: 'KendoSlider',

    propTypes: {
        min: PropTypes.number,
        max: PropTypes.number,
        value: PropTypes.number,
        onChange: PropTypes.func
    },

    createSlider: function createSlider() {
        var props = this.props;
        var $el = (0, _ReactCommon.findWidget)(this);

        $el.kendoSlider({
            min: props.min,
            max: props.max,
            value: props.value,
            change: function change(e) {
                return props.onChange(e.value);
            },
            slide: function slide(e) {
                return props.onChange(e.value);
            }
        });
    },

    destroySlider: function destroySlider() {
        var slider = (0, _ReactCommon.findWidget)(this, 'kendoSlider');

        slider.destroy();

        // The slider's destroy() method does not completely clean up the generated DOM.
        // http://www.telerik.com/forums/how-do-i-update-the-slider-max-option-after-creation
        slider.element.show();
        slider.wrapper.before(slider.element).remove();
    },

    componentDidMount: function componentDidMount() {
        this.createSlider();
    },

    componentWillUnmount: function componentWillUnmount() {
        this.destroySlider();
    },

    componentDidUpdate: function componentDidUpdate(prevProps) {
        var props = this.props;

        // The slider does not support changing min/max via setOptions() so we must tear down and rebuild
        if (props.min !== prevProps.min || props.max !== prevProps.max) {
            this.destroySlider();
            this.createSlider();
        } else if (props.value !== prevProps.value) {
            (0, _ReactCommon.findWidget)(this, 'kendoSlider').value(props.value);
        }
    },

    render: function render() {
        return _react2.default.createElement('input', { className: this.props.className });
    }
});

exports.default = KendoSlider;