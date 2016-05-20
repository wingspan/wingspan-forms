
define([
    'underscore', 'react'
], function (_, React) {
    'use strict';

    var VISIBLE = {display: 'inline-block'};
    void VISIBLE;
    var INVISIBLE = {display: 'none'};
    void INVISIBLE;

    var PropTypes = React.PropTypes;

    var PromiseButton = React.createClass({

        propTypes: {
            label: PropTypes.string,
            className: PropTypes.string,
            disabled: PropTypes.bool,
            terminateChain: PropTypes.bool,
            handler: PropTypes.func
        },

        getDefaultProps: function () {
            return {
                label: '',
                className: 'secondaryButton',
                disabled: false,
                terminateChain: true,
                handler: _.identity
            };
        },

        getInitialState: function () {
            return {
                busy: false
            };
        },

        render: function () {
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
            return (
                <button className={this.props.className} disabled={disabled} onClick={clickHandler}>
                    {this.props.label || this.props.children}
                    <i className="k-loading" style={this.state.busy ? VISIBLE : INVISIBLE}/>
                </button>
            );
            /*jshint ignore:end */
        }
    });

    return PromiseButton;
});
