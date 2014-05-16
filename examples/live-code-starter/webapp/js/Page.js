/** @jsx React.DOM */
define([
    'react', 'wingspan-forms'
], function (React, Forms) {
    'use strict';

    var FormField = Forms.FormField;
    var KendoText = Forms.KendoText;
    var KendoComboBox = Forms.KendoComboBox;
    var AutoControl = Forms.AutoControl;

    var PrettyJSON = React.createClass({
        render: function () {
            return <pre>{JSON.stringify(this.props.value, undefined, 2)}</pre>;
        }
    });

    var App = React.createClass({
        getInitialState: function () {
            return {

            };
        },
        render: function () {

        },

        onChange: function (fieldName, fieldValue) {

        }
    });


    function entrypoint() {
        React.renderComponent(<App />, document.getElementById('root'));
        Forms.ControlCommon.attachFormTooltips($('body'));
    }

    return {
        entrypoint: entrypoint
    };
});
