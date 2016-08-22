/* Copyright (c) 2015-2016 Wingspan Technology, Inc. */
import kendo from 'kendo'
import React from 'react'
import { findWidget, noop } from '../ReactCommon'

var PropTypes = React.PropTypes;

var KendoSlider = React.createClass({
    propTypes: {
        min: PropTypes.number,
        max: PropTypes.number,
        value: PropTypes.number,
        onChange: PropTypes.func
    },

    createSlider: function () {
        var props = this.props;
        var $el = findWidget(this);

        $el.kendoSlider({
            min: props.min,
            max: props.max,
            value: props.value,
            change: (e) => props.onChange(e.value),
            slide: (e) => props.onChange(e.value)
        });
    },

    destroySlider: function () {
        var slider = findWidget(this, 'kendoSlider');

        slider.destroy();

        // The slider's destroy() method does not completely clean up the generated DOM.
        // http://www.telerik.com/forums/how-do-i-update-the-slider-max-option-after-creation
        slider.element.show();
        slider.wrapper.before(slider.element).remove();
    },

    componentDidMount: function () {
        this.createSlider();
    },

    componentWillUnmount: function () {
        this.destroySlider();
    },

    componentDidUpdate: function (prevProps) {
        var props = this.props;

        // The slider does not support changing min/max via setOptions() so we must tear down and rebuild
        if (props.min !== prevProps.min || props.max !== prevProps.max) {
            this.destroySlider();
            this.createSlider();
        }
        else if (props.value !== prevProps.value) {
            findWidget(this, 'kendoSlider').value(props.value);
        }
    },

    render: function () {
        return (<input className={this.props.className}/>);
    }
});

export default KendoSlider;