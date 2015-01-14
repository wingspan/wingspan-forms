define([
    'underscore', 'react',
    '../mixins/SelectWidgetMixin',
    '../ImmutableOptimizations'
], function (_, React, SelectWidgetMixin, ImmutableOptimizations) {
    'use strict';

    var PropTypes = React.PropTypes;

    var KendoDropDownList = React.createClass({
        mixins: [
            SelectWidgetMixin('kendoDropDownList'),
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

    return KendoDropDownList;
});
