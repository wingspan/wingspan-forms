/* global require */
(function () {
    'use strict';

    require.config({
        baseUrl: 'js-built',
        paths: {
            'underscore': '../lib/underscore',
            'underscore.string': '../lib/underscore.string',
            'jquery': '../lib/jquery',
            'kendo': '../lib/kendo-ui/js/kendo.web',
            'moment': '../lib/moment',
            'react': '../lib/react-with-addons',
            'es5-shim': '../lib/es5-shim',
            'text': '../lib/text',
            'q': '../lib/q',
            'wingspan-forms': '../lib/wingspan-forms/wingspan-forms',
            'wingspan-contrib': '../lib/wingspan-contrib',
            'wingspan-data': '../lib/wingspan-data'
        },
        shim: {
            'underscore': { deps: [], exports: '_' },
            'underscore.string': { exports: '_s' },
            'jquery': { deps: [], exports: '$' },
            'kendo': { deps: [], exports: 'kendo' },
            'moment': { deps: [], exports: 'moment' },
            'react': { deps: [], exports: 'React'},
            'q': { deps: [], exports: 'Q'},
            'wingspan-forms': { deps: ['underscore', 'react', 'jquery', 'kendo', 'moment', 'underscore.string', 'wingspan-contrib', 'wingspan-data'], exports: 'WingspanForms' },
            'wingspan-contrib': { deps: ['underscore', 'jquery', 'underscore.string', 'moment', 'q'], exports: 'WingspanContrib' },
            'wingspan-data': { deps: ['underscore', 'jquery', 'kendo', 'q'], exports: 'WingspanData' }
        }
    });
})();
