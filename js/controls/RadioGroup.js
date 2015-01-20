define([
    'react',
    './Radio'
], function (React, Radio) {
    'use strict';

    var PropTypes = React.PropTypes;

    var RadioGroup = React.createClass({displayName: "RadioGroup",

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

            function renderRadio(option) {
                return (React.createElement(Radio, {
                    key: option.value,
                    name: props.name,
                    value: option.value,
                    onChange: props.onChange,
                    checked: (option.value == props.value)
                }, option.label));
            }

            React.Children.forEach(this.props.children, function (radio) {
                // The use of double-equals is intentional here, so that numbers represented as strings will match.
                radio.props.checked = (radio.props.value == props.value);
            });

            return React.createElement("fieldset", { className: props.className },
                this.props.dataSource ? this.props.dataSource.map(renderRadio) : this.props.children);
        }
    });


    return RadioGroup;
});