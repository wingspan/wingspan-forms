/** @jsx React.DOM */
define([
    'underscore', 'react', './FormField', './AutoControl', './ImmutableOptimizations'
], function (_, React, FormField, AutoControl, ImmutableOptimizations) {
    'use strict';


    var AutoField = React.createClass({
        mixins: [ImmutableOptimizations],

        getDefaultProps: function () {
            return {
                fieldInfo: undefined,
                value: undefined,
                onChange: undefined,
                isValid: [true, '']
            };
        },

        render: function () {
            return (
                <FormField fieldInfo={this.props.fieldInfo} isValid={this.props.isValid} key={this.props.fieldInfo.name}>
                    <AutoControl
                        fieldInfo={this.props.fieldInfo}
                        value={this.props.value}
                        onChange={this.props.onChange}
                        dataSource={this.props.fieldInfo.options} />
                </FormField>
            );
        }
    });


    return AutoField;
});