/** @jsx React.DOM */
define([
    'underscore', 'react',
    './FormField',
    './AutoControl',
    './ImmutableOptimizations'
], function (_, React, FormField, AutoControl, ImmutableOptimizations) {
    'use strict';

    var EXCLUDE_FROM_CONTROL = ['isValid', 'layout'];

    var PropTypes = React.PropTypes;

    var AutoField = React.createClass({
        mixins: [ImmutableOptimizations(['onChange', 'dataSource'])],

        propTypes: _.extend({
            fieldInfo: PropTypes.object.isRequired,
            isValid: PropTypes.array,
            layout: PropTypes.string
        }, AutoControl.propTypes),

        getDefaultProps: function () {
            return {
                isValid: [true, '']
            };
        },

        render: function () {
            var controlProps = _.omit(this.props, EXCLUDE_FROM_CONTROL);

            return (
                <FormField fieldInfo={this.props.fieldInfo} isValid={this.props.isValid} layout={this.props.layout}>
                    {React.createElement(AutoControl, controlProps)}
                </FormField>
            );
        }
    });

    return AutoField;
});