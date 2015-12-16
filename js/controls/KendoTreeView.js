define([
    'underscore', 'react', 'kendo',
    '../ReactCommon'
], function (_, React, kendo, Common) {
    'use strict';

    void kendo;
    var PropTypes = React.PropTypes;

    var KendoTreeView = React.createClass({

        propTypes: {
            dataSource: PropTypes.object.isRequired,
            onExpand: PropTypes.func,
            onCollapse: PropTypes.func,
            onSelect: PropTypes.func
        },

        getDefaultProps: function () {
            return {
                onExpand: _.noop,
                onCollapse: _.noop,
                onSelect: _.noop
            };
        },

        componentDidMount: function () {
            var $el = Common.findWidget(this);

            function propCallback(callback) {
                // Return an event handler that invokes the callback with the relevant node data
                // The event can be canceled if the callback returns false
                return function (e) {
                    if (callback(this.dataItem(e.node)) === false) {
                        e.preventDefault();
                    }
                };
            }

            $el.kendoTreeView({
                dataSource: this.props.dataSource,
                expand: propCallback(this.props.onExpand),
                collapse: propCallback(this.props.onCollapse),
                select: propCallback(this.props.onSelect)
            });
        },

        componentWillUnmount: function () {
            Common.findWidget(this, 'kendoTreeView').destroy();
        },

        componentDidUpdate: function (prevProps) {
            if (this.props.dataSource !== prevProps.dataSource) {
                Common.findWidget(this, 'kendoTreeView').setDataSource(this.props.dataSource);
            }
        },

        /*jshint ignore:start */
        render: function () {
            return (<div className={this.props.className}/>);
        }
        /*jshint ignore:end */
    });

    return KendoTreeView;
});
