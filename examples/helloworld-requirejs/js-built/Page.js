/** @jsx React.DOM */
define([
    'react', 'wingspan-forms'
], function (React, Forms) {
    'use strict';

    var FormField = Forms.FormField;
    var KendoText = Forms.KendoText;

    function entrypoint() {

        var jsx = (
            React.createElement(FormField, {isValid: [true, ''], layout: "formFieldInline", width: "200px"}, 
                React.createElement(KendoText, {value: "Hello World!"})
            )
        );
        React.renderComponent(jsx, document.getElementById('root'));
    }

    return {
        entrypoint: entrypoint
    };
});
