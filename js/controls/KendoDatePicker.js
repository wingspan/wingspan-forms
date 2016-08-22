import React from 'react'
import DateWidgetMixin from '../mixins/DateWidgetMixin'


const KendoDatePicker = React.createClass({
    mixins: [DateWidgetMixin('kendoDatePicker')],

    statics: {
        fieldClass: function () { return 'formFieldDatepicker'; }
    },

    getDefaultProps: function () {
        return {
            format: 'dd-MMM-yyyy'
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

export default KendoDatePicker;
