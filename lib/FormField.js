'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _compact2 = require('lodash/compact');

var _compact3 = _interopRequireDefault(_compact2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AutoControl = require('./AutoControl');

var _AutoControl2 = _interopRequireDefault(_AutoControl);

var _ControlCommon = require('./ControlCommon');

var ControlCommon = _interopRequireWildcard(_ControlCommon);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
            return _AutoControl2.default.controlForField(children.props.fieldInfo).fieldClass();
        }
        //console.warn('Unknown fieldClass for child component', children);

        return 'formFieldInput';
    }

    return children && children.type.fieldClass();
}

function when(condition, element) {
    return condition ? element : null;
}

var FormField = _react2.default.createClass({
    displayName: 'FormField',

    getDefaultProps: function getDefaultProps() {
        return {
            fieldInfo: {},
            layout: 'formField',
            noControl: false,
            isValid: [true, ''],
            lockable: false,
            locked: false,
            onStickyChange: function onStickyChange(isLocked) {/* set or clear a sticky */},
            width: '100%',
            marginLeft: '0',
            noLabel: false
        };
    },

    /* jshint ignore:start */
    render: function render() {
        var props = this.props;
        var fieldInfo = Object.assign({}, DEFAULTS, this.props.fieldInfo);

        var hasInfoTooltip = !!fieldInfo.helpText;
        var hasErrorTooltip = !this.props.isValid[0] && (this.props.isValid[1] || '').length > 0;

        var classes = (0, _compact3.default)([this.props.layout, determineFieldClass(this.props.children), ControlCommon.quadState(fieldInfo.disabled, fieldInfo.readOnly, this.props.isValid, this.props.noControl), hasInfoTooltip ? 'hasTooltip' : null, hasErrorTooltip ? 'hasErrorTooltip' : null, this.props.lockable ? 'lockable' : null]);

        var lockedClasses = (0, _compact3.default)(['fieldLock', this.props.locked ? 'fieldLockOn' : null]);
        var styles = {
            'width': this.props.width,
            'marginLeft': this.props.marginLeft
        };

        var statusIcon = hasInfoTooltip ? _react2.default.createElement('span', { className: 'statusIcon' }) : null;

        // If there is no label and no icon, we must render &nbsp; so the fields line up right.
        var label = fieldInfo.label || '\xA0';

        return _react2.default.createElement(
            'div',
            { className: classes.join(' '),
                'data-tooltip': fieldInfo.helpText,
                'data-error-tooltip': this.props.isValid[1],
                style: styles },
            when(!props.noLabel, _react2.default.createElement(
                'label',
                { className: 'formLabel' },
                label,
                statusIcon
            )),
            _react2.default.createElement(
                'div',
                { className: 'formElement' },
                this.props.children
            ),
            when(props.lockable, _react2.default.createElement('div', { className: lockedClasses.join(' '), onClick: this.toggleLock })),
            when(fieldInfo.subText, _react2.default.createElement(
                'p',
                { style: SUBTEXT_STYLE },
                _react2.default.createElement(
                    'em',
                    null,
                    fieldInfo.subText
                )
            ))
        );
    },
    /* jshint ignore:end */

    componentWillReceiveProps: function componentWillReceiveProps(newProps) {
        var wasInvalid = !this.props.isValid[0];

        // If the field has become valid, hide the error tooltip.
        if (wasInvalid && newProps.isValid[0]) {
            ControlCommon.hideErrorTooltip();
        }
    },

    componentDidUpdate: function componentDidUpdate(prevProps) {
        var wasInvalid = prevProps.isValid[0] === false,
            isStillInvalid = this.props.isValid[0] === false,
            validationMessageChanged = prevProps.isValid[1] !== this.props.isValid[1];

        if (wasInvalid && isStillInvalid && validationMessageChanged) {
            ControlCommon.refreshErrorTooltip();
        }
    },

    toggleLock: function toggleLock() {
        var isLocked = !this.props.locked;
        this.props.onStickyChange(isLocked);
        this.setState({ locked: isLocked });
    }
});

exports.default = FormField;