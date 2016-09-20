define([
    'underscore', 'react', 'react-dom', 'jquery', 'wingspan-forms',
    './wingspan-cursor',
    './Timer'
], function (_, React, ReactDOM, $, Forms, Cursor, Timer) {
    'use strict';


    function entrypoint(rootElement) {

        var App = React.createClass({

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
                var rootCursor = Cursor.build(this.state, this.setState.bind(this), cloneDeep);

                var sum = rootCursor.refine('foo', 'timer').value +
                    rootCursor.refine('foo', 'bar', 'timer').value +
                    rootCursor.refine('foo', 'bar', 'baz', 'timer').value;

                return (
                    <div className="App">
                        <div>
                            <Foo cursor={rootCursor.refine('foo')} />
                            <p>Sum of timers: {sum}</p>
                        </div>
                        <pre>{JSON.stringify(rootCursor.value, undefined, 2)}</pre>
                    </div>

                );
            }
        });


        var Foo = React.createClass({
            render: function () {
                var timerCursor = this.props.cursor.refine('timer');
                return (
                    <div className="Foo">
                        <Timer value={timerCursor.value} onChange={timerCursor.onChange}/>
                        <Bar cursor={this.props.cursor.refine('bar')} />
                    </div>
                );
            }
        });

        var Bar = React.createClass({
            render: function () {
                var timerCursor = this.props.cursor.refine('timer');
                return (
                    <div className="Bar">
                        <Timer value={timerCursor.value} onChange={timerCursor.onChange}/>
                        <Baz cursor={this.props.cursor.refine('baz')} />
                    </div>
                );
            }
        });

        var Baz = React.createClass({
            render: function () {
                var timerCursor = this.props.cursor.refine('timer');
                return (
                    <div className="Baz">
                        <Timer value={timerCursor.value} onChange={timerCursor.onChange}/>
                    </div>
                );
            }
        });

        ReactDOM.render(<App />, rootElement);
    }

    function cloneDeep (o) { return JSON.parse(JSON.stringify(o)); }

    return {
        entrypoint: entrypoint
    };
});
