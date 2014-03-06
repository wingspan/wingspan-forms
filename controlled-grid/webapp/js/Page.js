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
                        <FormField fieldInfo={_.object([['label', 'People']])} isValid={[true, '']} layout="formField">
                            {checkboxes}
                        </FormField>
                        <FormField fieldInfo={_.object([['label', 'Grid']])}>
                            <KendoGridPicker
                                dataSource={this.pristineDataSource}
                                value={this.state.visible}
                                columns={gridColumns}
                                onChange={_.partial(this.onChange, 'visible')} />
                        </FormField>
                    </div>
                );
            },

            onCheckboxChecked: function (record, checked) {
                var newVisible;

                // I want to write this, but reference equality foils me again!
                // newVisible = (checked ? _.union : _.difference)(this.state.visible, record);

                // So I have to write this instead:
                if (checked) {
                    newVisible = _.union(this.state.visible, record);
                } else {
                    newVisible = _.compact(_.map(this.state.visible, function (previousRecord) {
                        return previousRecord.id === record.id ? null : previousRecord;
                    }));
                }
                this.onChange('visible', newVisible);
            }
        });

        React.renderComponent(<App />, rootElement);
    }

    return {
        entrypoint: entrypoint
    };
});
