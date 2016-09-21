import React from 'react'
import DateWidgetMixin from '../mixins/DateWidgetMixin'

/**
 * value interface is ISO-8601, with the date portion omitted.
 * HH:MM:SS
 */
const KendoTimePicker = React.createClass({
    mixins: [DateWidgetMixin('kendoTimePicker')],

    statics: {
        fieldClass: function () { return 'formFieldDatepicker'; }
    },

    getDefaultProps: function () {
        return {
            format: 'h:mm tt' // display format
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

export default KendoTimePicker;
