/** @jsx React.DOM */
define([
    'underscore', 'react', 'wingspan-forms', 'ReactCursor'
], function (_, React, Forms, Cursor) {
    'use strict';

    var FormField = Forms.FormField;
    var KendoText = Forms.KendoText;
    var KendoComboBox = Forms.KendoComboBox;
    var AutoControl = Forms.AutoControl;

    var fieldInfos = {
        firstName: { dataType: 'text', label: 'First Name', name: 'firstName' },
        lastName: { dataType: 'text', label: 'Last Name', name: 'lastName' },
        gender: {
            dataType: 'enum',
            label: 'Gender',
            name: 'gender',
            options: {
                metadata: { idProperty: 'id', nameProperty: 'label' },
                dataSource: [
                    { id: 'male', label: 'Male' },
                    { id: 'female', label: 'Female' }
                ]
            }
        },
        age: { dataType: 'number', label: 'Age', name: 'age' },
        birthday: { dataType: 'date', label: 'Birthday', name: 'birthday' }
    };

    var genders = fieldInfos.gender.options.dataSource;

    var PrettyJSON = React.createClass({
        render: function () {
            return <pre>{JSON.stringify(this.props.value, undefined, 2)}</pre>;
        }
    });

    var App = React.createClass({
        getInitialState: function () {
            return {
                form: {
                    firstName: '',
                    lastName: ''
                },
                foo: {
                    canary: 0
                }
            };
        },

        pendingState: function () {
            return this._pendingState || this.state;
        },

        render: function () {
            var cursor = Cursor.build(this.state, this.pendingState, this.setState.bind(this));
            return <View cursor={cursor} />;
        },
        componentDidUpdate: function () {
            console.log("\n");
        }
    });

    var View = React.createClass({
        render: function () {
            return (
                <div>
                    <Form cursor={this.props.cursor.refine('form')} />
                    <Foo cursor={this.props.cursor.refine('foo')} />
                    <PrettyJSON value={this.props.cursor.value} />
                </div>
            );
        }
    });

    var Form = React.createClass({
        render: function () {
            return (
                <div>
                    <KendoText value={this.props.cursor.refine('firstName').value} onChange={this.props.cursor.refine('firstName').onChange} />
                    <KendoText value={this.props.cursor.refine('lastName').value} onChange={this.props.cursor.refine('lastName').onChange} />
                </div>
            );
        },
        shouldComponentUpdate: function (nextProps, nextState) {
            var shouldUpdate = !_.isEqual(_.omit(this.props, ['cursor']), _.omit(nextProps, ['cursor'])) ||
                this.props.cursor.value !== nextProps.cursor.value;
            console.log('Should form update? ', shouldUpdate);
            return  shouldUpdate;
        }
    });

    var Foo = React.createClass({
        render: function () {
            return (
                <div>
                    <span>{this.props.cursor.refine('canary').value}</span>
                    <button onClick={this.pokeTheCanary}>+2</button>
                </div>
            );
        },

        shouldComponentUpdate: function (nextProps) {
            var shouldUpdate = this.props.cursor.value !== nextProps.cursor.value;
            console.log('should foo update? ', shouldUpdate);
            return  shouldUpdate;
        },

        pokeTheCanary: function () {
            var canary = this.props.cursor.refine('canary');
            canary.onChange(canary.pendingValue() + 1);
            canary.onChange(canary.pendingValue() + 1);
        }
    });



    function entrypoint() {
        React.renderComponent(<App />, document.getElementById('root'));
        Forms.ControlCommon.attachFormTooltips($('body'));
    }

    var exports = {};

    exports.hashString = function (str) {
        var hash = 0, i, ch, l;
        if (str.length === 0) {
            return hash;
        }
        for (i = 0, l = str.length; i < l; i++) {
            ch  = str.charCodeAt(i);
            hash  = ((hash << 5) - hash) + ch;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    };


    exports.hashRecord = function (record) {
        return exports.hashString(JSON.stringify(record));
    };

    function resolver () {
        return exports.hashRecord(_.tail(arguments));
    }

    var mpartial = _.memoize(_.partial, resolver);

    return {
        entrypoint: entrypoint
    };
});
