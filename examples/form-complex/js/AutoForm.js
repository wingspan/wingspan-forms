/** @jsx React.DOM */
define([
    'underscore', 'react', 'kendo', 'wingspan-forms'
], function (_, React, kendo, Forms) {
    'use strict';


    var AutoForm = React.createClass({

        getDefaultProps: function () {
            return {
                value: undefined,
                onChange: undefined,
                model: undefined
            };
        },

        getInitialState: function () {
            return { value: this.props.value };
        },

        componentWillMount: function () {
            // Initialize datastores
            _.each(this.props.model.properties, function (fieldInfo) {
                if (fieldInfo.options) {
                    fieldInfo.options.dataSource = new kendo.data.DataSource(fieldInfo.options);
                }
            }.bind(this));
        },

        componentWillReceiveProps: function (nextProps) {
            this.setState({ value: nextProps.value })
        },

        render: function () {
            var controls = _.map(this.props.model.properties, function (fieldInfo) {
                return (
                    <FormField fieldInfo={fieldInfo} layout="formFieldInline" key={fieldInfo.name}>
                        <AutoControl
                            fieldInfo={fieldInfo}
                            value={this.state.value[fieldInfo.name]}
                            onChange={_.partial(this.onFieldChange, fieldInfo.name)} />
                    </FormField>
                );
            }.bind(this));

            return (
                <div>
                    {controls}
                    <div className="formClear"/>
                    <button onClick={this.onFormSave}>Save</button>
                </div>
            );
        },

        onFieldChange: function (fieldName, value) {
            var nextValue = _.extend(this.state.value, _.object([[fieldName, value]]))
            this.setState({ value: nextValue });
        },

        onFormSave: function () {
            this.props.onChange(this.state.value);
        }
    });

    var FormField = Forms.FormField;
    var AutoControl = Forms.AutoControl;

    return AutoForm;
});
