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

        subgrunt: {
            options: {},
            'wingspan-forms': {
                'bower_components/wingspan-forms': ['default']
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
                    paths: ['styles'],
                    ieCompat: true,
                    yuicompress: true,
                    report: 'min',
                    relativeUrls: true
                },
                files: {
                    'webapp/styles/App.css': 'webapp/styles/App.less'
                }
            }
        },

        copy: {
            'libs': {
                files: [
                    {
                        expand: true,
                        src: [
                            'bower_components/jquery/jquery.js',
                            'bower_components/momentjs/moment.js',
                            'bower_components/underscore/underscore.js',
                            'bower_components/react/react-with-addons.js',
                            'bower_components/react/JSXTransformer.js',
                            'bower_components/require-jsx/jsx.js',
                            'bower_components/underscore.string/lib/underscore.string.js',
                            'bower_components/es5-shim/es5-shim.js',
                            'bower_components/requirejs/require.js',
                            'bower_components/requirejs-text/text.js'
                        ],
                        dest: 'webapp/lib',
                        flatten: true,
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/kendo-ui/src/',
                        src: ['js/kendo.web.js', 'styles/kendo.common.css', 'styles/kendo.default.css', 'styles/Default/**', 'styles/textures/**'],
                        dest: 'webapp/lib/kendo-ui/',
                        flatten: false
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/wingspan-forms/dist/',
                        src: ['**'],
                        dest: 'webapp/lib/wingspan-forms/',
                        flatten: false
                    }
                ]
            }
        },

        clean: ['bower_components', 'webapp/js-built', 'webapp/libs', 'webapp/styles/App.css', 'webapp/Page.js']
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-subgrunt');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['bower:install', 'subgrunt', 'copy', 'react', 'less']);
};
