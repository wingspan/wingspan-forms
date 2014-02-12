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
                    data: [{name: 'Danny', value: 'danny'}, {name: 'Mark', value: 'mark'},{name: 'Bob', value: 'bob'},{name: 'JY', value: 'jy'}, {name: 'Jason', value: 'jason'} ]
                };
            },

            componentWillMount: function () {
                this.columns = [{ title: 'name', template: '#: name #' }];
                //var data = _.filter(this.state.data, function (record) { return record.visible; });
                this.dataSource = new kendo.data.DataSource({ data: [] });
            },

            componentDidUpdate: function () {
                //var data = _.filter(this.state.data, function (record) { return record.visible; });
                this.dataSource.data([]);
            },

            render: function () {
                return (
                    <div className="App">
                        <KendoGrid dataSource={this.dataSource} columns={this.columns} />
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
