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
    var KendoGrid = Forms.KendoGrid;

    function entrypoint(rootElement) {

        var App = React.createClass({
            mixins: [Forms.TopStateMixin],

            getInitialState: function () {
                return {
                    dataSource: [
                        { name: 'Danny', id: 'danny', visible: false },
                        { name: 'Mark',  id: 'mark',  visible: false },
                        { name: 'Bob',   id: 'bob',   visible: false },
                        { name: 'JY',    id: 'jy',    visible: false },
                        { name: 'Jason', id: 'jason', visible: false }
                    ],
                    selection: ''
                };
            },

            componentWillMount: function () {
                this.visibleDataSource = new kendo.data.DataSource({ data: this.visibleValues() });
            },

            componentDidUpdate: function () {
                this.visibleDataSource.data(this.visibleValues());

                if (this.state.selection && !_.contains(_.pluck(this.visibleValues(), 'id'), this.state.selection)) {
                    this.onChange('selection', '');
                }
            },

            visibleValues: function () {
                return _.filter(this.state.dataSource, function (record) { return record.visible; });
            },

            render: function () {
                var self = this;

                var checkboxes = _.map(this.state.dataSource, function (record, index) {
                    return (
                        <CheckBox
                            key={record.id}
                            id={record.id}
                            label={record.name}
                            value={record.visible}
                            onChange={_.partial(self.onChange, 'dataSource', index, 'visible')} />
                    );
                });

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
