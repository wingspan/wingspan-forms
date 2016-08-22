import React from 'react'
import Radio from './Radio'

var PropTypes = React.PropTypes;

var RadioGroup = React.createClass({
    displayName: "RadioGroup",

    propTypes: {
        name: PropTypes.string,
        value: PropTypes.any,
        onChange: PropTypes.func,
        dataSource: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.any,
            label: PropTypes.string
        })),
        className: PropTypes.string
    },

    statics: { fieldClass: function () { return 'formFieldRadio'; } },

    render: function () {
        var props = this.props;
        var children;

        function renderRadio(option) {
            return (React.createElement(Radio, {
                key: option.value,
                name: props.name,
                value: option.value,
                onChange: props.onChange,
                checked: (option.value == props.value)
            }, option.label));
        }

        function setRadioChecked(child) {
            if (!child.props.hasOwnProperty('value')) {
                return child;
            }
            // The use of double-equals is intentional here, so that numbers represented as strings will match.
            let checked = child.props.value == props.value;
            return React.cloneElement(child, { checked: checked });
        }

        if (props.dataSource) {
            children = props.dataSource.map(renderRadio);
        } else {
            children = React.Children.map(props.children, setRadioChecked);
        }

        return React.createElement("fieldset", { className: props.className }, children);
    }
});

export default RadioGroup;