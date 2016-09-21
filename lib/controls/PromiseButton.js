'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ReactCommon = require('../ReactCommon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VISIBLE = { display: 'inline-block' };
void VISIBLE;
var INVISIBLE = { display: 'none' };
void INVISIBLE;

var PropTypes = _react2.default.PropTypes;

var PromiseButton = _react2.default.createClass({
    displayName: 'PromiseButton',


    propTypes: {
        label: PropTypes.string,
        className: PropTypes.string,
        disabled: PropTypes.bool,
        terminateChain: PropTypes.bool,
        handler: PropTypes.func
    },

    getDefaultProps: function getDefaultProps() {
        return {
            label: '',
            className: 'secondaryButton',
            disabled: false,
            terminateChain: true,
            handler: _ReactCommon.noop
        };
    },

    getInitialState: function getInitialState() {
        return {
            busy: false
        };
    },

    render: function render() {
        var self = this,
            handler = this.props.handler,
            disabled = this.props.disabled || this.state.busy;

        function onSettled() {
            if (self.isMounted()) {
                self.setState({ busy: false });
            }
        }
        function clickHandler() {
            var promise = handler();

            // If the handler returns a promise, enter "busy" mode and disable the button.
            if (promise) {
                self.setState({ busy: true });
                promise = promise.then(onSettled, onSettled);

                // By default component calls "done()" to complete the promise chain, since this click handler
                // does not have a return value.
                if (self.props.terminateChain) {
                    promise.done();
                }
            }
        }

        void clickHandler;
        void disabled;
        /*jshint ignore:start */
        return _react2.default.createElement(
            'button',
            { className: this.props.className, disabled: disabled, onClick: clickHandler },
            this.props.label || this.props.children,
            _react2.default.createElement('i', { className: 'k-loading', style: this.state.busy ? VISIBLE : INVISIBLE })
        );
        /*jshint ignore:end */
    }
});

exports.default = PromiseButton;