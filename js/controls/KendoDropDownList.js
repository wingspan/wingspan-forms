import React from 'react'
import SelectWidgetMixin from '../mixins/SelectWidgetMixin'

const PropTypes = React.PropTypes;

const KendoDropDownList = React.createClass({
    mixins: [SelectWidgetMixin('kendoDropDownList')],

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
        optionLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        template: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
    },

    statics: {
        fieldClass: function () { return 'formFieldCombobox'; }
    },

    /*jshint ignore:start */
    render: function () {
        return (this.props.noControl
            ? (<span id={this.props.id}>{this.renderValue()}</span>)
            : (<input id={this.props.id}/>));
    }
    /*jshint ignore:end */
});

export default KendoDropDownList;