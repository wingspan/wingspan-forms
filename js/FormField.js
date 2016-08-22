import React from 'react'
import AutoControl from './AutoControl'
import ControlCommon from './ControlCommon'


var DEFAULTS = {
    readOnly: false,
    disabled: false,
    label: '',
    helpText: ''
};
var SUBTEXT_STYLE = {
    width: '33%',
    textAlign: 'right',
    lineHeight: '0.5em'
};

function determineFieldClass(children) {
    if (Array.isArray(children)) {
        children = children[0];
    }

    if (children && !children.type.fieldClass) {
        // Support a textnode child, which won't have a fieldinfo
        if (children.props && children.props.fieldInfo) {
            return AutoControl.controlForField(children.props.fieldInfo).fieldClass();
        }
        //console.warn('Unknown fieldClass for child component', children);

        return 'formFieldInput';
    }

    return children && children.type.fieldClass();
}

function when(condition, element) {
    return condition ? element : null;
}

var FormField = React.createClass({
    getDefaultProps: function () {
        return {
            fieldInfo: {},
            layout: 'formField',
            noControl: false,
            isValid: [true, ''],
            lockable: false,
            locked: false,
            onStickyChange: function (isLocked) { /* set or clear a sticky */},
            width: '100%',
            marginLeft: '0',
            noLabel: false
        };
    },

    /* jshint ignore:start */
    render: function () {
        var props = this.props;
        var fieldInfo = _.defaults({}, this.props.fieldInfo, DEFAULTS);

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

        var lockedClasses = _.compact(['fieldLock', this.props.locked ? 'fieldLockOn' : null]);
        var styles = {
           'width': this.props.width,
           'marginLeft': this.props.marginLeft
        };

        var statusIcon = (hasInfoTooltip ? (<span className="statusIcon" />) : null);

        // If there is no label and no icon, we must render &nbsp; so the fields line up right.
        var label = fieldInfo.label || '\u00A0';

        return (
            <div className={classes.join(' ')}
                 data-tooltip={fieldInfo.helpText}
                 data-error-tooltip={this.props.isValid[1]}
                 style={styles}>
                {when(!props.noLabel, (
                    <label className="formLabel">{label}{statusIcon}</label>
                ))}
                <div className="formElement">
                    {this.props.children}
                </div>
                {when(props.lockable, (
                    <div className={lockedClasses.join(' ')} onClick={this.toggleLock}></div>
                ))}
                {when(fieldInfo.subText, (
                    <p style={SUBTEXT_STYLE}><em>{fieldInfo.subText}</em></p>
                ))}
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

    componentDidUpdate: function (prevProps) {
        var wasInvalid = prevProps.isValid[0] === false,
            isStillInvalid = this.props.isValid[0] === false,
            validationMessageChanged = prevProps.isValid[1] !== this.props.isValid[1];

        if (wasInvalid && isStillInvalid && validationMessageChanged) {
            ControlCommon.refreshErrorTooltip();
        }
    },

    toggleLock: function () {
        var isLocked = !this.props.locked;
        this.props.onStickyChange(isLocked);
        this.setState({ locked: isLocked });
    }
});

export default FormField;