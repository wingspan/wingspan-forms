/** @jsx React.DOM */
define([
    'underscore', 'react', 'q'
], function (_, React, Q) {
    'use strict';

    var VISIBLE = {display: 'inline-block'};
    void VISIBLE;
    var INVISIBLE = {display: 'none'};
    void INVISIBLE;

    var PromiseButton = React.createClass({
        mixins: [],

        getDefaultProps: function () {
            return {
                label: '',
                className: 'secondaryButton',
                disabled: false,
                handler: _.identity
            };
        },

        getInitialState: function () {
            return {
                busy: false
            };
        },

        componentWillReceiveProps : function (nextProps) {
            this.setState({ disabled: nextProps.disabled });
        },

        render: function () {
            var self = this,
                handler = this.props.handler,
                disabled = this.props.disabled || this.state.busy;

            function onFinally() {
                if (self.isMounted()) {
                    self.setState({ busy: false });
                }
            }
            function clickHandler() {
                var promise = handler();

                // If the handler returns a promise, enter "busy" mode and disable the button.
                // Note that this component calls "done()" to complete the promise chain, since this click handler
                // does not have a return value.
                if (promise) {
                    self.setState({ busy: true });
                    Q(promise).fin(onFinally).done();
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
