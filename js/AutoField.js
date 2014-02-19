/** @jsx React.DOM */
define([
    'underscore', 'react', './FormField', './AutoControl'
], function (_, React, FormField, AutoControl) {
    'use strict';


    var AutoField = React.createClass({
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
                        onChange={this.props.onChange} />
                </FormField>
            );
        }
    });


    return AutoField;
});