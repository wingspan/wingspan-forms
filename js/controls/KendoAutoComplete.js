import React from 'react'
import kendo from 'kendo'
import { findWidget } from '../ReactCommon'

const $ = kendo.jQuery;
const PropTypes = React.PropTypes;

function noResultsOnDataBound(e) {
    var widget = e.sender;
    var noItems = widget.list.find(".noResults");

    if (!widget.dataSource.view()[0]) {
        noItems.show();
        widget.popup.open();
    } else {
        noItems.hide();
    }
}

function noResultsOnClose(e) {
    var widget = e.sender;

    if (!widget.shouldClose && !widget.dataSource.view()[0]) {
        e.preventDefault();
    }
}

const KendoAutoComplete = React.createClass({

    statics: {
        fieldClass: function () {
            return 'formFieldAutocomplete';
        }
    },

    propTypes: {
        value: PropTypes.any,
        onChange: PropTypes.func,
        onSelect: PropTypes.func,
        id: PropTypes.string,
        dataSource: PropTypes.oneOfType([PropTypes.array.isRequired, PropTypes.object.isRequired]),
        dataTextField: PropTypes.string,
        disabled: PropTypes.bool,
        readonly: PropTypes.bool,
        options: PropTypes.object,
        noResultsMsg: PropTypes.string,
        placeholder: PropTypes.string,
        template: PropTypes.any
    },

    getDefaultProps: function () {
        return {
            disabled: false,
            readonly: false,
            onChange: $.noop,
            onSelect: $.noop
        };
    },

    componentDidMount: function () {
        var props = this.props;
        var $el = findWidget(this);

        var widgetOptions = $.extend({}, this.props.options, {
            dataSource: this.props.dataSource,
            dataTextField: this.props.dataTextField,
            placeholder: this.props.placeholder,
            template: this.props.template,
            change: this.onChange,
            select: this.onSelect
        });

        if (props.noResultsMsg) {
            widgetOptions.dataBound = noResultsOnDataBound;
            widgetOptions.close = noResultsOnClose;
            widgetOptions.headerTemplate = `<em class="noResults">${props.noResultsMsg}</em>`;
        }

        var autoComplete = $el.kendoAutoComplete(widgetOptions)
            .data('kendoAutoComplete');

        if (this.props.value) {
            autoComplete.value(this.props.value);
        }

        if (this.props.disabled) {
            autoComplete.enable(false);
        }
        else if (this.props.readonly) {
            autoComplete.readonly(true);
        }

        if (props.noResultsMsg) {
            autoComplete.element.on('blur', () => {
                autoComplete.shouldClose = true;
                autoComplete.close();
                autoComplete.shouldClose = false;
            })
        }
    },

    componentWillUnmount: function () {
        findWidget(this, 'kendoAutoComplete').destroy();
    },

    componentDidUpdate: function (prevProps) {
        var autoComplete = findWidget(this, 'kendoAutoComplete');

        if (prevProps.dataSource !== this.props.dataSource) {
            autoComplete.setDataSource(this.props.dataSource);
        }

        if (this.props.value !== prevProps.value) {
            autoComplete.value(this.props.value);
        }

        if (this.props.disabled !== prevProps.disabled) {
            autoComplete.enable(!this.props.disabled);
        }
        else if (this.props.readonly !== prevProps.readonly) {
            autoComplete.readonly(this.props.readonly);
        }
    },

    /*jshint ignore:start */
    render: function () {
        return (<input type="text" id={this.props.id} className="k-textbox" style={this.props.style} />);
    },
    /*jshint ignore:end */

    onChange: function (e) {
        var widget = e.sender;
        var value = widget.value();

        widget.value(this.props.value);

        this.props.onChange(value);
    },

    onSelect: function (e) {
        var widget = e.sender;

        this.props.onSelect(widget.dataItem(e.item.index()));
    }
});

export default KendoAutoComplete;
