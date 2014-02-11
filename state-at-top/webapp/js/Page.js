/** @jsx React.DOM */
define([
    'underscore', 'react', 'jquery', 'wingspan-forms', 'Timer',
    'underscore-string'
], function (_, React, $, Forms, Timer) {
    'use strict';


    function entrypoint(rootElement) {

        var App = React.createClass({
            mixins: [Forms.TopStateMixin],

            getInitialState: function () {
                return {
                    foo: {
                        timer: 0,
                        bar: {
                            timer: 1,
                            baz: {
                                timer: 2
                            }
                        }
                    }
                };
            },

            render: function () {
                var sum = this.state.foo.timer + this.state.foo.bar.timer + this.state.foo.bar.baz.timer;
                return (
                    <div className="App">
                        <div>
                            <Foo
                                value={this.state.foo}
                                onChange={_.partial(this.onChange, 'foo')} />
                            <p>Sum of timers: {sum}</p>
                        </div>
                        <pre>{JSON.stringify(this.state, undefined, 2)}</pre>
                    </div>

                );
            }
        });


        var Foo = React.createClass({
            render: function () {
                return (
                    <div className="Foo">
                        <Timer
                            value={this.props.value.timer}
                            onChange={_.partial(this.props.onChange, 'timer')}/>
                        <Bar
                            value={this.props.value.bar}
                            onChange={_.partial(this.props.onChange, 'bar')} />
                    </div>
                );
            }
        });

        var Bar = React.createClass({
            render: function () {
                return (
                    <div className="Bar">
                        <Timer
                            value={this.props.value.timer}
                            onChange={_.partial(this.props.onChange, 'timer')}/>
                        <Baz
                            value={this.props.value.baz}
                            onChange={_.partial(this.props.onChange, 'baz')} />
                    </div>
                );
            }
        });

        var Baz = React.createClass({
            render: function () {
                return (
                    <div className="Baz">
                        <Timer
                            value={this.props.value.timer}
                            onChange={_.partial(this.props.onChange, 'timer')}/>
                    </div>
                );
            }
        });

        React.renderComponent(<App />, rootElement);
    }

    return {
        entrypoint: entrypoint
    };
});
