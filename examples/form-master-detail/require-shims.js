/* global require */
(function () {
    'use strict';

    require.config({
        baseUrl: 'js-built',
        paths: {
            underscore: '../bower_components/underscore/underscore',
            'underscore-string': '../bower_components/underscore.string/lib/underscore.string',
            jquery: '../bower_components/jquery/jquery',
            kendo: '../bower_components/kendo-ui/src/js/kendo.web',
            moment: '../bower_components/momentjs/moment',
            react: '../bower_components/react/react',
            'es5-shim': '../bower_components/es5-shim/es5-shim',
            'text': '../bower_components/requirejs-text/text',
            'wingspan-forms': '../bower_components/wingspan-forms/dist/wingspan-forms',
            textassets: '../textassets' // all assets loaded via `text!` must be rooted here (to avoid JSX compilation)
        },
        shim: {
            'underscore': { deps: [], exports: '_' },
            'underscore-string': { exports: '_s' },
            'jquery': { deps: [], exports: '$' },
            'kendo': { deps: [], exports: 'kendo' },
            'moment': { deps: [], exports: 'moment' },
            'react': { deps: [], exports: 'React'},
            'wingspan-forms': { deps: ['underscore', 'react', 'jquery', 'kendo', 'moment', 'underscore-string'], exports: 'Wingspan'}
        }
    });
})();
