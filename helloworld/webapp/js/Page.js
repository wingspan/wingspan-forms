/** @jsx React.DOM */
(function () {
    'use strict';

    var FormField = WingspanForms.FormField;
    var KendoText = WingspanForms.KendoText;

    window.entrypoint = function (rootElement) {

        var jsx = (
            <FormField isValid={[true, '']} layout="formFieldInline" width="200px">
                <KendoText value="Hello World!" />
            </FormField>
            );
        React.renderComponent(jsx, rootElement);
    }
})();
