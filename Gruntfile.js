/*global module:false*/
module.exports = function (grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

        // Task configuration.
//        jshint: {
//            platform: 'webapp/js/platform/**/*.js',
//            tmf: 'webapp/js/tmf/**/*.js',
//
//            options: {
//                jshintrc: '.jshintrc'
//            }
//        },

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
                    'js-built': 'js'
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

                wrap: {
                    "startFile": "almond-begin.txt",
                    "endFile": "almond-end.txt"
                },


                baseUrl: 'js-built',

                paths: {
                    textassets: '../textassets', // all assets loaded via `text!` must be rooted here so the JSX compiler works.
                    text: '../bower_components/requirejs-text/text',
                    underscore: '../bower_components/underscore/underscore',
                    'underscore-string': '../bower_components/underscore.string/lib/underscore.string',
                    jquery: '../bower_components/jquery/jquery',
                    kendo: '../bower_components/kendo-ui/src/js/kendo.web',
                    moment: '../bower_components/momentjs/moment',
                    react: '../bower_components/react/react',
                    stacktrace: '../bower_components/stacktrace/stacktrace',
                    almond: '../bower_components/almond/almond'
                },

                shim: {
                    'underscore': { deps: [], exports: '_' },
                    'underscore-string': { exports: ['_s'] },
                    'jquery': { deps: [], exports: '$' },
                    'kendo': { deps: [], exports: 'kendo' },
                    'react': { deps: [], exports: 'React'}
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
                    out: 'dist/wingspan-forms.js',
                    include: ['almond', 'wingspan-forms'],
                    exclude: ['jquery', 'underscore', 'react', 'require', 'text', 'underscore-string', 'kendo']
                }
            },
            compileQuickStart: {
                options: {
                    out: 'dist/wingspan-forms-quickstart.js',
                    include: ['almond', 'wingspan-forms'],
                    exclude: ['react', 'kendo', 'jquery']
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
                    'dist/wingspan-forms.css': 'styles/app.less'
                }
            }
        },

        copy: {
            main: {
                files: [
                    {expand: true, src: ['styles/assets/**'], dest: 'dist/assets/', flatten: true, filter: 'isFile'}
                ]
            }
        },

        qunit: {
            files: ['test/**/*.html']
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['bower:install', 'react', 'less', 'copy', 'requirejs:compile']);
    grunt.registerTask('devel', ['bower:install', 'react', 'less', 'copy']);
};
