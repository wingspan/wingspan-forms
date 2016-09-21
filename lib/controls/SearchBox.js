'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _ReactCommon = require('../ReactCommon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ENTER_KEY = 13;

function setVisible(el, visible) {
    // I'm using visibility instead of $.hide/show because I don't want to change the icon's "display" style. Something
    // goes wrong in jQuery and it changes the span's display from inline-block to block when showing it using $.show().
    (0, _jquery2.default)(el).css('visibility', visible ? 'visible' : 'hidden');
}

function noBrowserDefault(e) {
    // The browser changes focus on mouse down, but we don't want that.
    e.preventDefault();
}

var SearchBox = _react2.default.createClass({
    displayName: 'SearchBox',


    getDefaultProps: function getDefaultProps() {
        return {
            disabled: false,
            fireClearEvent: false,
            instantSearch: false,
            onChange: _ReactCommon.noop
        };
    },

    componentWillMount: function componentWillMount() {
        console.assert(this.props.handler, 'SearchBox requires a handler function');
    },

    /*jshint ignore:start */
    render: function render() {
        var iconClearStyle = { visibility: !this.props.value ? 'hidden' : 'visible' };

        return _react2.default.createElement(
            'span',
            { className: 'searchBox' },
            _react2.default.createElement('input', { type: 'text', disabled: this.props.disabled, placeholder: this.props.placeholder, value: this.props.value,
                autoComplete: 'off', onKeyDown: this.onKeyDown, defaultValue: this.props.defaultValue, onChange: this.onTextChange }),
            _react2.default.createElement('span', { className: 'iconClear', onClick: this.onClickClear, onMouseDown: noBrowserDefault, style: iconClearStyle }),
            _react2.default.createElement('span', { className: 'iconSearch', onClick: this.onClickSearch, onMouseDown: noBrowserDefault })
        );
    },
    /*jshint ignore:end */

    onKeyDown: function onKeyDown(event) {
        // Don't let the Enter key propagate because it might cause parent components to do things we don't want
        if (event.key === 'Enter') {
            event.stopPropagation();
            event.preventDefault();

            this.props.handler(event.target.value);
        }
    },

    onClickClear: function onClickClear(event) {
        event.stopPropagation();

        this.props.onChange('');

        if (this.props.fireClearEvent) {
            this.props.handler('');
        }
    },

    onClickSearch: function onClickSearch(event) {
        event.stopPropagation();

        if (!this.props.disabled) {
            this.props.handler(this.props.value);
        }
    },

    onTextChange: function onTextChange(event) {
        this.props.onChange(event.target.value);

        if (this.props.instantSearch) {
            this.props.handler(event.target.value);
        }
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
        setVisible(clearBtn, input.val().length > 0);
    }
    function iconClick(e) {
        e.stopPropagation();

        if (e.target.className === 'iconClear') {
            input.val('');
            setVisible(clearBtn, false);
        } else if (e.target.className === 'iconSearch') {
            handler(input.val());
        }
    }

    input.attr('placeholder', placeholder).on('keydown', inputKey);
    searchBox.find('span').on('mousedown', noBrowserDefault).on('click', iconClick);
    setVisible(clearBtn, false);
};

exports.default = SearchBox;