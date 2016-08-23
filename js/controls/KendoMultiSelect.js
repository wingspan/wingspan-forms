import kendo from 'kendo'
import React from 'react'
import { findWidget, noop, isEmpty, isObject, widgetConfig } from '../ReactCommon'

const PropTypes = React.PropTypes;

const CANNOT_CHANGE = ['template', 'dataSource', 'valueField', 'displayField', 'placeholder'];

function rawValue(props) {
    var value = props.value;

    if (isEmpty(value)) {
        return value;
    }

    value = Array.isArray(value) ? value : [value];

    return value.map(function (val) {
        return isObject(val) ? val[props.valueField] : val;
    });
}

function toPlainObject(data) {
    return data.toJSON();
}

var KendoMultiSelect = React.createClass({

    statics: { fieldClass: function () { return 'formFieldMultiselect'; } },

    propTypes: {
        value: PropTypes.array,
        onChange: PropTypes.func,
        id: PropTypes.string,
        dataSource: PropTypes.oneOfType([PropTypes.array.isRequired, PropTypes.object.isRequired]),
        displayField: PropTypes.string,
        valueField: PropTypes.string,
        disabled: PropTypes.bool,
        readonly: PropTypes.bool,
        options: PropTypes.object,
        placeholder: PropTypes.string,
        template: PropTypes.any
    },

    getDefaultProps: function() {
        return {
            disabled: false,
            readonly: false,
            value: [],
            onChange: noop
        };
    },

    /*jshint ignore:start */
    render: function () {
        return (<select id={this.props.id} multiple="multiple" />);
    },
    /*jshint ignore:end */

    componentDidMount: function () {
        var $el = findWidget(this);

        var widgetOptions = widgetConfig({
            dataTextField: this.props.displayField,
            dataValueField: this.props.valueField,
            dataSource: this.props.dataSource,
            placeholder: this.props.placeholder,
            itemTemplate: this.props.template,
            change: this.onChange
        }, this.props.options);

        var kendoWidget = $el.kendoMultiSelect(widgetOptions).data('kendoMultiSelect');

        // the 'value' method is a getter/setter that gets/sets the valueField. It will look up the record
        // in the store via the value set here.
        if (this.props.value) {
            kendoWidget.value(rawValue(this.props));
        }

        if (this.props.disabled) {
            // disabled beats readonly
            kendoWidget.enable(false);
        }
        else if (this.props.readonly) {
            kendoWidget.readonly(true);
        }
    },

    componentWillUnmount: function () {
        findWidget(this, 'kendoMultiSelect').destroy();
    },

    componentWillReceiveProps: function (nextProps) {
        console.assert(CANNOT_CHANGE.every(name => nextProps[name] == this.props[name]),
            'cannot change these props after mount', CANNOT_CHANGE);
    },

    componentDidUpdate: function (prevProps) {
        var kendoWidget = findWidget(this, 'kendoMultiSelect');

        if (prevProps.dataSource !== this.props.dataSource) {
            kendoWidget.setDataSource(this.props.dataSource);
        }

        if (this.props.value !== prevProps.value) {
            kendoWidget.value(rawValue(this.props));
        }

        if (this.props.disabled !== prevProps.disabled) {
            kendoWidget.enable(!this.props.disabled);
        }
        else if (this.props.readonly !== prevProps.readonly) {
            kendoWidget.readonly(this.props.readonly);
        }
    },

    onChange: function (event) {
        var kendoWidget = event.sender;
        var values = Object.assign({}, kendoWidget.value());
        var dataItems = kendoWidget.dataItems().map(toPlainObject);

        // Before we update the value, we need to clear the filter or some values may not
        // be recognized as being in the data source.
        if (kendoWidget.dataSource.filter()) {
            kendoWidget.dataSource.filter(null);
        }
        // To keep the "Flux" loop, we need to reset the widget value to props so that data flows down.
        kendoWidget.value(rawValue(this.props));

        // Provide both scalar and object values for clients
        this.props.onChange(values, dataItems);
    }
});

export default KendoMultiSelect
