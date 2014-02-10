/*global module:false*/
module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

        bower: {
            install: {
                options: {
                    copy: false,
                    install: true,
                    verbose: false,
                    cleanTargetDir: false,
                    cleanBowerDir: false,
                    bowerOptions: {}
                }
            }
        },

        react: {
            options: {
                extension: 'js'
            },
            app: {
                files: {
                    'webapp/js-built': 'webapp/js'
                }
            }
        },

        less: {
            development: {
                options: {
                    paths: [
                        'styles'
                    ],
                    ieCompat: true,
                    yuicompress: true,
                    report: 'min'
                },
                files: {
                    'webapp/styles/App.css': 'webapp/styles/App.less'
                }
            }
        },

        requirejs: {
            options: {

                optimize: 'none',
                inlineText: true,
                useStrict: true,
                skipPragmas: true,
                preserveLicenseComments: true,

                baseUrl: 'webapp/js-built',

                paths: {
                    'underscore': '../lib/underscore',
                    'underscore-string': '../lib/underscore.string',
                    'jquery': '../lib/jquery',
                    'kendo': '../lib/kendo.web',
                    'moment': '../lib/moment',
                    'react': '../lib/react',
                    'es5-shim': '../lib/es5-shim',
                    'text': '../lib/text',
                    'wingspan-forms': '../lib/wingspan-forms',
                    'textassets': '../textassets' // all assets loaded via `text!` must be rooted here (to avoid JSX compilation)
                },

                shim: {
                    'underscore': { deps: [], exports: '_' },
                    'underscore-string': { exports: '_s' },
                    'jquery': { deps: [], exports: '$' },
                    'kendo': { deps: [], exports: 'kendo' },
                    'moment': { deps: [], exports: 'moment' },
                    'react': { deps: [], exports: 'React'},
                    'wingspan-forms': { deps: ['underscore', 'react', 'jquery', 'kendo', 'moment', 'underscore-string'], exports: 'Wingspan'}
                },

                uglify: {
                    toplevel: true,
                    ascii_only: true,
                    beautify: true,
                    max_line_length: 1000,
                    defines: { DEBUG: ['name', 'false'] },
                    no_mangle: true
                }
            },
            compile: {
                options: {
                    out: 'webapp/Page.js',
                    include: ['Page']
                }
            }
        },

        copy: {
            lib: {
                files: [
                    {
                        expand: true,
                        src: [
                            'bower_components/requirejs/require.js',
                            'bower_components/underscore/underscore.js',
                            'bower_components/underscore.string/lib/underscore.string.js',
                            'bower_components/jquery/jquery.js',
                            'bower_components/kendo-ui/src/js/kendo.web.js',
                            'bower_components/momentjs/moment.js',
                            'bower_components/react/react.js',
                            'bower_components/es5-shim/es5-shim.js',
                            'bower_components/requirejs-text/text.js',
                            'bower_components/wingspan-forms/dist/wingspan-forms.js'
                        ],
                        dest: 'webapp/lib',
                        flatten: true,
                        filter: 'isFile'
                    }
                ]
            }
        },

        clean: ['bower_components', 'webapp/js-built', 'webapp/lib', 'webapp/styles/App.css', 'webapp/Page.js']

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-subgrunt');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['bower:install', 'copy:lib', 'react', 'less', 'requirejs']);
    grunt.registerTask('devel', ['bower:install', 'copy:lib', 'react', 'less']);
};
