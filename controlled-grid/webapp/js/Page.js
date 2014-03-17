/** @jsx React.DOM */
define([
    'underscore', 'react', 'jquery', 'kendo', 'wingspan-forms',
    'underscore-string'
], function (_, React, $, kendo, Forms) {
    'use strict';

    var FormField = Forms.FormField;
    var KendoText = Forms.KendoText;
    var MultilineText = Forms.MultilineText;
    var MultiSelect = Forms.MultiSelect;
    var KendoComboBox = Forms.KendoComboBox;
    var KendoNumber = Forms.KendoNumber;
    var KendoDate = Forms.KendoDate;
    var KendoDatetime = Forms.KendoDatetime;
    var CheckBox = Forms.CheckBox;
    var Radio = Forms.Radio;
    var RadioGroup = Forms.RadioGroup;
    var SwitchBox = Forms.SwitchBox;
    var Carousel = Forms.Carousel;
    var KendoGridPicker = Forms.KendoGridPicker;

    function entrypoint(rootElement) {

        var App = React.createClass({
            mixins: [Forms.TopStateMixin],

            getInitialState: function () {
                return {
                    dataSource: [
                        { name: 'Danny', id: 'danny' },
                        { name: 'Mark',  id: 'mark' },
                        { name: 'Bob',   id: 'bob' },
                        { name: 'JY',    id: 'jy' },
                        { name: 'Jason', id: 'jason' }
                    ],
                    selection: '',
                    visible: []
                };
            },

            componentWillMount: function () {
                this.visibleDataSource = new kendo.data.DataSource({ data: this.visibleValues() });
                this.pristineDataSource = new kendo.data.DataSource({ data: this.state.dataSource });
            },

            componentDidUpdate: function () {
                this.visibleDataSource.data(this.visibleValues());

                if (this.state.selection && !_.contains(_.pluck(this.visibleValues(), 'id'), this.state.selection)) {
                    this.onChange('selection', '');
                }
            },

            visibleValues: function () {
                var visibleIds = this.visibleIds();
                return _.filter(this.state.dataSource, function (record) { return _.contains(visibleIds, record.id); });
            },

            visibleIds: function () {
                return _.pluck(this.state.visible, 'id');
            },

            render: function () {
                var self = this, visibleIds = _.pluck(this.state.visible, 'id');

                var checkboxes = _.map(this.state.dataSource, function (record) {
                    return (
                        <CheckBox
                            key={record.id}
                            id={record.id}
                            label={record.name}
                            value={_.contains(visibleIds, record.id)}
                            onChange={_.partial(self.onCheckboxChecked, record)} />
                    );
                });

                var gridColumns = [
                    { title: 'Name', template: '#: name #', sortable: false },
                    { title: 'Id', template: '#: id #', sortable: false }
                ];

                var selectedPerson = (this.state.selection && _.findWhere(this.state.dataSource, _.object([['id', this.state.selection]]))).name || 'Nobody!';
                var css = {
                    clear: 'both'
                };

                return (
                    <div className="App">
                        <FormField fieldInfo={_.object([['label', 'Pick a Person']])}>
                            <KendoComboBox
                                value={this.state.selection}
                                dataSource={this.visibleDataSource}
                                onChange={_.partial(this.onChange, 'selection')}
                                displayField="name"
                                valueField="id" />
                        </FormField>
                        <FormField fieldInfo={_.object([['label', 'Selected Person']])}>
                            <KendoText value={selectedPerson} />
                        </FormField>
                        <FormField fieldInfo={_.object([['label', 'People as Checkboxes']])} isValid={[true, '']} layout="formField">
                            {checkboxes}
                        </FormField>
                        <FormField fieldInfo={_.object([['label', 'People as Grid']])}>
                            <KendoGridPicker
                                dataSource={this.pristineDataSource}
                                value={this.state.visible}
                                columns={gridColumns}
                                onChange={_.partial(this.onChange, 'visible')} />
                        </FormField>
                        <div style={css} />
                        <pre>
                            {JSON.stringify(this.state, undefined, 2)}
                        </pre>
                    </div>
                );
            },

            onCheckboxChecked: function (record, checked) {
                var newVisible = (checked ? unionDeep : differenceDeep)(this.state.visible, record);
                this.onChange('visible', newVisible);
            }
        });

        React.renderComponent(<App />, rootElement);
    }

    function containsDeep(haystack, needle) {
        return !!_.find(haystack, function (h) {
            return _.isEqual(h, needle);
        });
    }

    function uniqueDeep(xs) {
        return _.reduce(xs, function (acc, x) {
            return (!containsDeep(acc, x)
                ? acc.concat(x)
                : acc);
        }, []);
    }

    function unionDeep (/* set1, set2, ... */) {
        return uniqueDeep(_.flatten(arguments));
    };

    function differenceDeep (/* set1, set2, ... */) {
        var removeTheseItems = _.flatten(_.tail(arguments));
        var fromTheseItems = _.head(arguments);
        return _.filter(fromTheseItems, function (x) {
            // if the current item in the first set exists in any of the other sets,
            // it should not be in the difference.
            var shouldRemove = containsDeep(removeTheseItems, x);
            return !shouldRemove;
        });
    };


    return {
        entrypoint: entrypoint
    };
});
