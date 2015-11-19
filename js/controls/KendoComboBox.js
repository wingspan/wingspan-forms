define([
    'react',
    '../mixins/SelectWidgetMixin',
    '../ImmutableOptimizations'
], function (React, SelectWidgetMixin, ImmutableOptimizations) {
    'use strict';

    var PropTypes = React.PropTypes;

    function resetCustomValue(mixinOnChange, e) {
        var widget = e.sender;

        if (widget.value() && widget.select() === -1) {
            //custom has been selected
            widget.value(''); //reset widget
            // Also clear the filter that the custom value applied so all the options are available
            if (widget.options.filter !== 'none') {
                widget.dataSource.filter(null);
            }
        }

        // Call the base onChange so that the value in props is put back
        mixinOnChange.call(this, e);
    }

    var KendoComboBox = React.createClass({
        mixins: [
            SelectWidgetMixin('kendoComboBox'),
            ImmutableOptimizations(['onChange'])
        ],

        propTypes: {
            id: PropTypes.string,
            value: PropTypes.any,
            onChange: PropTypes.func,
            autoBind: PropTypes.bool,
            dataSource: PropTypes.oneOfType([PropTypes.array.isRequired, PropTypes.object.isRequired]),
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
                this.onChange = resetCustomValue.bind(this, this.onChange);
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

    return KendoComboBox;
});
