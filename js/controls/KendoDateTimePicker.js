import React from 'react'
import DateWidgetMixin from '../mixins/DateWidgetMixin'

const KendoDateTimePicker = React.createClass({
    mixins: [DateWidgetMixin('kendoDateTimePicker')],

    statics: {
        fieldClass: function () { return 'formFieldDatetimepicker'; }
    },

    getDefaultProps: function () {
        return {
            format: 'MM/dd/yyyy h:mm tt'
        };
    },

    /*jshint ignore:start */
    render: function () {
        return (this.props.noControl
            ? (<span>{this.renderValue()}</span>)
            : (<input type="text" />));
    }
    /*jshint ignore:end */
});

export default KendoDateTimePicker;
