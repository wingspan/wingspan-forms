/** @jsx React.DOM */
define([
    'underscore', 'jquery', 'react', 'kendo'
], function (_, $, React, kendo) {
    'use strict';

    /**
     * Hash of a javascript string
     *
     * http://stackoverflow.com/a/7616484/20003
     */
    /*jshint bitwise:false */
    function hashString(str) {
        var hash = 0, i, ch, l;
        if (str.length === 0) {
            return hash;
        }
        for (i = 0, l = str.length; i < l; i++) {
            ch  = str.charCodeAt(i);
            hash  = ((hash << 5) - hash) + ch;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }
    /*jshint bitwise:true */

    function hashRecord(record) {
        return hashString(JSON.stringify(record));
    }

    function addHashRecord(record) {
        return _.extend({ recordHash: hashRecord(record) }, record);
    }

    /**
     * Doesn't make any assumptions about the shape of the selection records. They don't
     * need an ID/valueField, we use the hash of the whole record as its identity.
     */
    var SelectionListDismissible = React.createClass({

        propTypes: {
            columns: React.PropTypes.array.isRequired,
            value: React.PropTypes.array.isRequired,
            onChange: React.PropTypes.func.isRequired
        },

        getDefaultProps: function () {
            return {
                height: '150'
            };
        },

        componentWillMount: function () {
            this.datastore = new kendo.data.DataSource({ data: this.props.value.map(addHashRecord) });
        },

        componentWillUpdate: function (nextProps) {
            if (nextProps.value !== this.props.value) {
                this.datastore.data(nextProps.value.map(addHashRecord));
            }
        },

        componentWillUnmount: function () {
            var $rootNode = $(this.getDOMNode());

            $rootNode.data('kendoGrid').destroy();
        },

        /* jshint ignore:start */
        render: function () {
            return (<div className={this.props.className} />);
        },
        /* jshint ignore:end */

        componentDidMount: function () {
            var $el = $(this.getDOMNode());

            var columns = [{
                title: '',
                template: '<span class="icon iconButton iconDelete" />',
                width: 34
            }].concat(this.props.columns);

            $el.kendoGrid({
                dataSource: this.datastore,
                height: this.props.height,
                columns: columns,
                sortable: this.props.sortable,
                editable: this.props.editable,
                pageable: false
            });

            $el.on('click', '.iconDelete', this.onButtonClick);
        },

        onButtonClick: function (e) {
            var rowUid = $(e.target).parents('tr').data('uid');
            var grid = $(this.getDOMNode()).data('kendoGrid');
            var recordHashToBeRemoved = grid.dataSource.getByUid(rowUid).recordHash;

            var newValue = _.filter(this.props.value, function (record) {
                return hashRecord(record) !== recordHashToBeRemoved;
            });

            this.props.onChange(newValue);
        }
    });

    return SelectionListDismissible;
});