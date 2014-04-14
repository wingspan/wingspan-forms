/*global module:false*/
module.exports = function (grunt) {
    'use strict';

    var requireConfig = {

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
            lodash: '../bower_components/lodash/dist/lodash.compat',
            'underscore-string': '../bower_components/underscore.string/lib/underscore.string',
            jquery: '../bower_components/jquery/jquery',
            kendo: '../bower_components/kendo-ui/src/js/kendo.web',
            moment: '../bower_components/momentjs/moment',
            react: '../bower_components/react/react-with-addons',
            q: '../bower_components/q/q',
            'wingspan-data': '../bower_components/wingspan-data/dist/wingspan-data',
            'wingspan-contrib': '../bower_components/wingspan-contrib/dist/wingspan-contrib',
            almond: '../bower_components/almond/almond'
        },

        shim: {
            'lodash': { deps: ['underscore'], exports: '_' }, // lodash loads second so we can use lodash.noConflict to disambiguate. App require config needs to mirror this! TODO
            'underscore': { deps: [], exports: '_' },
            'underscore-string': { deps: ['underscore'], exports: ['_s'] },
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
    };

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

        subgrunt: {
            options: {},
            'wingspan-data': {
                'bower_components/wingspan-data': ['default']
            },
            'wingspan-contrib': {
                'bower_components/wingspan-contrib': ['default']
            }
        },

        react: {
            options: {
                extension: 'js'
            },
            lib: {
                files: {
                    'js-built': 'js'
                }
            },
            spec: {
                files: {
                    'spec-built': 'spec'
                }
            }
        },

        requirejs: {
            options: requireConfig,
            compile: {
                options: {
                    out: 'dist/wingspan-forms.js',
                    include: ['almond', 'wingspan-forms'],
                    exclude: ['jquery', 'underscore', 'react', 'require', 'text', 'underscore-string', 'kendo', 'q',
                        'wingspan-contrib', 'wingspan-data', 'lodash']
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

        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },

        clean: ['bower_components', 'js-built', 'spec-built', 'dist']
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-subgrunt');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['bower:install', 'subgrunt', 'react:lib', 'less', 'copy', 'requirejs:compile']);
    grunt.registerTask('devel', ['bower:install', 'subgrunt', 'react:lib', 'less', 'copy']);
    grunt.registerTask('test', ['default', 'react:spec', 'karma']);
};
