/** @jsx React.DOM */
(function () {
    'use strict';

    var FormField = WingspanForms.FormField;
    var KendoText = WingspanForms.KendoText;

    window.entrypoint = function (rootElement) {

        var jsx = (
            React.createElement(FormField, {isValid: [true, ''], layout: "formFieldInline", width: "200px"}, 
                React.createElement(KendoText, {value: "Hello World!"})
            )
            );
        React.renderComponent(jsx, rootElement);
    }
})();
