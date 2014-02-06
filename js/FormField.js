/** @jsx React.DOM */
define([
    'underscore', 'react',
    './util/debug',
    './AutoControl',
    './ControlCommon'
], function (_, React, debug, AutoControl, ControlCommon) {
    'use strict';

    function determineFieldClass(children) {
        if (_.isArray(children)) {
            children = children[0];
        }

        if (children && _.isUndefined(children.fieldClass)) {
            // Support a textnode child, which won't have a fieldinfo
            if (children.props && children.props.fieldInfo) {
                return AutoControl.fieldClassForField(children.props.fieldInfo);
            }
            //console.warn('Unknown fieldClass for child component', children);

            return 'formFieldInput';
        }

        return children && children.fieldClass;
    }

    var FormField = React.createClass({

        getDefaultProps: function () {
            return {
                fieldInfo: {},
                layout: 'formField',
                noControl: false,
                isValid: [true, ''],
                lockable: false,
                onStickyChange: function (isLocked) { /* set or clear a sticky */},
                width: '100%',
                marginLeft: '0'
            };
        },

        getInitialState: function () {
            return {
                locked: false
            };
        },

        /* jshint ignore:start */
        render: function () {
            var fieldInfo = _.defaults(this.props.fieldInfo, {
                readOnly: false,
                disabled: false,
                label: '',
                helpText: ''
            });

            var hasInfoTooltip = !!fieldInfo.helpText;
            var hasErrorTooltip = (!this.props.isValid[0] && (this.props.isValid[1] || '').length > 0);

            var classes = _.compact([
                this.props.layout,
                determineFieldClass(this.props.children),
                ControlCommon.quadState(fieldInfo.disabled, fieldInfo.readOnly, this.props.isValid, this.props.noControl),
                hasInfoTooltip ? 'hasTooltip' : null,
                hasErrorTooltip ? 'hasErrorTooltip' : null,
                this.props.lockable ? 'lockable' : null
            ]);

            var lockedClasses = _.compact(['fieldLock', this.state.locked ? 'fieldLockOn' : null]);
            var lockDiv = this.props.lockable ? (<div className={lockedClasses.join(' ')} onClick={this.toggleLock} />) : null;

            var styles = {
               'width': this.props.width,
               'margin-left': this.props.marginLeft
            };

            var statusIcon = (hasInfoTooltip ? (<span className="statusIcon" />) : null);

            // If there is no label and no icon, we must render &nbsp; so the fields line up right.


            var label = ((fieldInfo.label || '').length === 0 && statusIcon === null
                ? (<label className="formLabel">{'\u00A0'}</label>) // unicode &nbsp; to work around JSX bug:  https://groups.google.com/forum/?fromgroups=#!topic/reactjs/7FmlIyJBofA
                : (<label className="formLabel">{fieldInfo.label}{statusIcon}</label>));

            return (
                <div className={classes.join(' ')} data-tooltip={fieldInfo.helpText} data-error-tooltip={this.props.isValid[1]} style={styles}>
                    {label}
                    <div className="formElement">
                        {this.props.children}
                    </div>
                    {lockDiv}
                </div>
            );
        },
        /* jshint ignore:end */

        componentWillReceiveProps: function (newProps) {
            var wasInvalid = !this.props.isValid[0];

            // If the field has become valid, hide the error tooltip.
            if (wasInvalid && newProps.isValid[0]) {
                ControlCommon.hideErrorTooltip();
            }
        },

        toggleLock: function () {
            var isLocked = !this.state.locked;
            this.props.onStickyChange(isLocked);
            this.setState({ locked: isLocked });
        }
    });

    return FormField;
});
