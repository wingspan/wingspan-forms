/** @jsx React.DOM */
define([
    'react', 'wingspan-forms'
], function (React, Forms) {
    'use strict';

    var FormField = Forms.FormField;
    var KendoText = Forms.KendoText;

    function entrypoint() {
        var jsx = (<div>Hello, JSX Transformer!</div>);
        React.renderComponent(jsx, document.getElementById('root'));
    }

    return {
        entrypoint: entrypoint
    };
});
