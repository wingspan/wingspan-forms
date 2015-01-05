/** @jsx React.DOM */
define([
    'react', 'wingspan-forms'
], function (React, Forms) {
    'use strict';

    var FormField = Forms.FormField;
    var KendoText = Forms.KendoText;

    function entrypoint() {

        var jsx = (
            <FormField isValid={[true, '']} layout="formFieldInline" width="200px">
                <KendoText value="Hello World!" />
            </FormField>
        );
        React.renderComponent(jsx, document.getElementById('root'));
    }

    return {
        entrypoint: entrypoint
    };
});
