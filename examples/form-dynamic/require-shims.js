/* global require */
(function () {
    'use strict';

    require.config({
        baseUrl: 'js-built',
        paths: {
            'jquery': 'http://code.jquery.com/jquery-2.1.4',
            'kendo': 'https://kendo.cdn.telerik.com/2014.1.318/js/kendo.all.min',
            'underscore': 'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min',
            'react': 'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.3/react-with-addons',
            'react-dom': 'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.3/react-dom',
            'wingspan-forms': '/dist/wingspan-forms'
        },
        shim: {
            'underscore': { deps: [], exports: '_' },
            'underscore.string': { exports: '_s' },
            'jquery': { deps: [], exports: '$' },
            'kendo': { deps: ['jquery'], exports: 'kendo' },
            'react': { deps: [], exports: 'React'},
            'wingspan-forms': { deps: [], exports: 'WingspanForms' }
        }
    });
})();
