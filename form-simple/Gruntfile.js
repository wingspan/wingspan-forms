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
                    'dist/SimpleForm.css': 'styles/SimpleForm.less'
                }
            }
        }

    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-react');

    // Default task.
    grunt.registerTask('default', []);
};
