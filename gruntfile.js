module.exports = function (grunt) {

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
            preview:{
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
                    cssDir:'<%= paths.folder.build %>css'
                }
            }
        }
    };

    // Load NPM tasks
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    // Custom tasks
    grunt.registerTask('release', [
        'clean:prepareRelease',
        'copy:release',
        'clean:tidyRelease'
    ]);



    // Kick-off Grunt
    grunt.initConfig(config);
};


