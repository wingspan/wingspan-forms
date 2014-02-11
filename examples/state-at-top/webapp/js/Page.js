/** @jsx React.DOM */
define([
    'underscore', 'react', 'jquery', 'wingspan-forms', 'Timer',
    'underscore-string'
], function (_, React, $, Forms, Timer) {
    'use strict';


    function entrypoint(rootElement) {

        var TimerStateAtTopExample = React.createClass({
            mixins: [Forms.TopStateMixin],

            getInitialState: function () {
                return {
                    timer1: 13,
                    timer2: 2,
                    timer3: 145,
                    timer4: 989,
                    timer5: 3452,
                    fooForm: {
                        timer: 0
                    }
                };
            },

            render: function () {
                return (
                    <div className="TimerStateAtTopExample">
                        <Timer value={this.state.timer1} onChange={_.partial(this.onChange, 'timer1')} />
                        <Timer value={this.state.timer2} onChange={_.partial(this.onChange, 'timer2')} />
                        <Timer value={this.state.timer3} onChange={_.partial(this.onChange, 'timer3')} />
                        <Timer value={this.state.timer4} onChange={_.partial(this.onChange, 'timer4')} />
                        <Timer value={this.state.timer5} onChange={_.partial(this.onChange, 'timer5')} />
                        <FooForm value={this.state.fooForm} onChange={_.partial(this.onChange, 'fooForm')} />
                        <hr />
                        <pre>{JSON.stringify(this.state, undefined, 2)}</pre>
                    </div>

                );
            }
        });


        var FooForm = React.createClass({
            getDefaultProps: function () {
                return {
                    value: undefined,
                    onChange: undefined
                };
            },

            render: function () {
                return (
                    <div className="FooForm">
                        <Timer value={this.props.value.timer} onChange={_.partial(this.props.onChange, 'timer')}/>
                    </div>
                );
            }
        });

        React.renderComponent(<TimerStateAtTopExample />, rootElement);
    }

    return {
        entrypoint: entrypoint
    };
});
