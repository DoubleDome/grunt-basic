module.exports = function (grunt) {
    // Load NPM modules
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    // Load custom tasks
    grunt.loadTasks('tasks');

    // config var
    var config = {
        /* Meta Data
        ---------------------------------------------- */
        data:grunt.file.readJSON('package.json'),

        /* File Paths
        ---------------------------------------------- */
        paths:{
            folder:{
                build: 'build/',
                release: 'release/',
                temp: '.tmp/'
            },
            source:{
                index: '<%= paths.folder.build %>index.html',
                html: '<%= paths.folder.build %>**/*.html',
                less: '<%= paths.folder.build %>**/*.less',
                css: '<%= paths.folder.build %>**/*.css'
            },
            output:{
                index: '<%= paths.folder.release %>index.html',
                global: '<%= paths.folder.release %>css/global.css'
            }
        },
        /* File Operation Tasks
        ---------------------------------------------- */
        watch:{
            source:{
                files:[
                    '<%= paths.folder.build %>**/*'
                ],
                tasks:['release']
            },
            scss:{
                files:[
                    '<%= paths.folder.build %>**/*.scss'
                ],
                tasks:['compass']
            }
        },
        copy:{
            release:{
                files:[
                    {
                        cwd:'<%= paths.folder.build %>',
                        src:['**/*'],
                        dest:'<%= paths.folder.release %>',
                        expand:true
                    }
                ]
            }
        },
        clean:{
            prepareRelease:'<%= paths.folder.release %>',
            tidyRelease:[
                '<%= paths.folder.release %>test',
                '<%= paths.folder.release %>*.styl',
                '<%= paths.folder.release %>**/sass',
                '<%= paths.folder.release %>**/less',
                '<%= paths.folder.release %>**/*.coffee',
                '<%= paths.folder.release %>*.DS_Store'
            ]
        },
        /* Server Tasks
        ---------------------------------------------- */
        connect:{
            build:{
                options:{
                    base:'<%= paths.folder.build %>',
                    port:'8080',
                    keepalive:true
                }
            },
            release:{
                options:{
                    base:'<%= paths.folder.release %>',
                    port:'8081',
                    keepalive:true
                }
            }
        },
        /* JS Tasks
        --------------------------------------------------- */
        requirejs:{
            main:{
                options:{
                    name: 'main',
                    baseUrl: '<%= paths.folder.build %>scripts',
                    out: '<%= paths.folder.release %>scripts/main.js'
                }
            }
        },
        /* SASS Tasks
        --------------------------------------------------- */
        compass:{
            build:{
                options:{
                    sassDir:'<%= paths.folder.build %>sass',
                    cssDir:'<%= paths.folder.build %>css',
                    imagesDir: '<%= paths.folder.build %>img',
                    httpImagesPath: '/img/join',
                    httpGeneratedImagesPath: '../img',
                    relativeAssets: true
                }
            }
        },
        sass: {
            build: {
                options: {
                    style: 'expanded'
                },
                files: {
                    '<%= paths.folder.build %>css/modules.css': '<%= paths.folder.build %>sass/modules.scss'
                }
            }
        },
        /* Utility
        --------------------------------------------------- */
        concurrent: {
            grind: {
                tasks:[
                    'connect:build:keepalive',
                    'watch'
                ]
            }
        }
    };

    // Custom tasks
    grunt.registerTask('release', [
        'clean:prepareRelease',
        'copy:release',
        'clean:tidyRelease'
    ]);

    grunt.registerTask('grind', [
        'concurrent:grind'
    ]);

    // Kick-off Grunt
    grunt.initConfig(config);
};


