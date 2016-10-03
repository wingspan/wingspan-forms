import React from 'react'
import SelectWidgetMixin from '../mixins/SelectWidgetMixin'

const PropTypes = React.PropTypes;

function resetCustomValue(e) {
    var widget = e.sender;

    if (widget.value() && (widget.select() === -1)) {
        //custom has been selected
        widget.value('');
        // Also clear the filter that the custom value applied so all the options are available
        if (widget.options.filter !== 'none') {
            widget.dataSource.filter(null);
        }
    }
}

const KendoComboBox = React.createClass({
    mixins: [SelectWidgetMixin('kendoComboBox')],

    propTypes: {
        id: PropTypes.string,
        value: PropTypes.any,
        onChange: PropTypes.func,
        autoBind: PropTypes.bool,
        dataSource: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
        displayField: PropTypes.string,
        valueField: PropTypes.string,
        disabled: PropTypes.bool,
        readonly: PropTypes.bool,
        options: PropTypes.object,
        filter: PropTypes.string,
        placeholder: PropTypes.string,
        template: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
        preventCustomValues: PropTypes.bool
    },

    statics: {
        fieldClass: function () { return 'formFieldCombobox'; }
    },

    getDefaultProps: function () {
        return {
            filter: 'startswith',
            options: {
                highlightFirst: false
            }
        };
    },

    componentWillMount: function () {
        // Preventing custom values requires us to hook the change event before the mixin's
        // default behavior because we don't want the custom value to be passed to our parent.
        if (this.props.preventCustomValues) {
            this.onChange = (e) => {
                resetCustomValue(e);
                Object.getPrototypeOf(this).onChange.call(this, e);
            }
        }
    },

    /*jshint ignore:start */
    render: function () {
        return (this.props.noControl
            ? (<span id={this.props.id}>{this.renderValue()}</span>)
            : (<input id={this.props.id}/>));
    }
    /*jshint ignore:end */
});

export default KendoComboBox;