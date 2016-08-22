/* Copyright (c) 2015-2016 Wingspan Technology, Inc. */
import kendo from 'kendo'
import React from 'react'
import { findWidget, noop } from '../ReactCommon'


const ROOT_STYLE = {
    position: 'relative'
};
const TOOLBAR_STYLE = {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 0,
    overflow: 'hidden',
    paddingLeft: '10px',
    backgroundColor: 'gray'
};

var HoverView = React.createClass({
    propTypes: {
        enabled: React.PropTypes.bool
    },

    componentDidMount: function () {
        var $el = findWidget(this);

        this.onMouseEnter = () => {
            if (!this.props.enabled) {
                return;
            }
            kendo.fx($el.find('.toolbar'))
                .expand('vertical').stop().play();

        };
        this.onMouseLeave = () => {
            if (!this.props.enabled) {
                return;
            }
            kendo.fx($el.find('.toolbar'))
                .expand('vertical').stop().reverse();
        };

        $el.on('mouseenter', this.onMouseEnter);
        $el.on('mouseleave', this.onMouseLeave);
    },

    componentWillUnmount: function () {
        var $el = findWidget(this);

        $el.off('mouseenter', this.onMouseEnter);
        $el.off('mouseleave', this.onMouseLeave);
    },

    render: function () {
        let kids = React.Children.toArray(this.props.children);

        return (
            <div className="hoverPager" style={ROOT_STYLE}>
                {kids[0]}
                <div className="toolbar" style={TOOLBAR_STYLE}>
                    {kids[1]}
                </div>
            </div>
        );
    }
});

export default HoverView;