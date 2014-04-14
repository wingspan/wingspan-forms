/** @jsx React.DOM */
define([
    'underscore', 'jquery', 'react'
], function (_, $, React) {
    'use strict';

    var ENTER_KEY = 13;

    function setVisible(el, visible) {
        // I'm using visibility instead of $.hide/show because I don't want to change the icon's "display" style. Something
        // goes wrong in jQuery and it changes the span's display from inline-block to block when showing it using $.show().
        $(el).css('visibility', visible ? 'visible' : 'hidden');
    }

    function noBrowserDefault(e) {
        // The browser changes focus on mouse down, but we don't want that.
        e.preventDefault();
    }

    var SearchBox = React.createClass({

        getDefaultProps: function () {
            return {
                disabled: false,
                fireClearEvent: false,
                instantSearch: false,
                onChange: function () {}
            };
        },

        componentWillMount : function () {
            console.assert(this.props.handler, 'SearchBox requires a handler function');
        },

        componentDidMount : function () {
            // Hide the clear button if there's no text
            setVisible($(this.getDOMNode()).find('.iconClear'), this.refs.myInput.getDOMNode().value.length > 0);
        },

        /*jshint ignore:start */
        render: function () {
            return (
                <span className="searchBox">
                    <input type="text" disabled={this.props.disabled} placeholder={this.props.placeholder} value={this.props.value}
                           autoComplete="off" onKeyDown={this.onKeyDown} defaultValue={this.props.defaultValue} ref="myInput" onChange={this.onTextChange}/>
                    <span className="iconClear" onClick={this.onClickClear} onMouseDown={noBrowserDefault} />
                    <span className="iconSearch" onClick={this.onClickSearch} onMouseDown={noBrowserDefault} />
                </span>)
        },
        /*jshint ignore:end */

        onKeyDown: function (event) {
            // Don't let the Enter key propagate because it might cause parent components to do things we don't want
            if (event.keyCode === ENTER_KEY) {
                event.stopPropagation();
                event.preventDefault();
            }

            if (event.keyCode === ENTER_KEY || this.props.instantSearch) {
                this.props.handler(event.target.value);
                return;
            }

            var icon = $(event.target).siblings('.iconClear');
            setVisible(icon, (event.target.value.length > 0));
        },

        onClickClear: function (event) {
            event.stopPropagation();

            this.refs.myInput.getDOMNode().value = '';
            setVisible(event.target, false);
            if (this.props.fireClearEvent) {
                this.props.handler('');
            }
        },

        onClickSearch: function (event) {
            event.stopPropagation();

            if (!this.props.disabled) {
                this.props.handler(this.refs.myInput.getDOMNode().value);
            }
        },

        onTextChange: function (event) {
            this.props.onChange(event.target.value);
        }
    });

    /* An installer for non-react users */
    SearchBox.install = function (searchBox, placeholder, handler) {
        var input = searchBox.find('input');
        var clearBtn = searchBox.find('.iconClear');

        console.assert(handler, 'SearchBox requires a handler function');

        function inputKey(e) {
            e.stopPropagation();

            if (e.keyCode === ENTER_KEY) {
                // keep the event from bubbling up to where react can see it (whence it will attempt to confirm the dialog).
                e.preventDefault();
                handler(input.val());
            }
            setVisible(clearBtn, (input.val().length > 0));
        }
        function iconClick(e) {
            e.stopPropagation();

            if (e.target.className === 'iconClear') {
                input.val('');
                setVisible(clearBtn, false);
            }
            else if (e.target.className === 'iconSearch') {
                handler(input.val());
            }
        }

        input.attr('placeholder', placeholder)
            .on('keydown', inputKey);
        searchBox.find('span')
            .on('mousedown', noBrowserDefault)
            .on('click', iconClick);
        setVisible(clearBtn, false);
    };

    return SearchBox;
});
