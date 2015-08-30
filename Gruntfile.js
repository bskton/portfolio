/**
 * Created by ilya on 29.08.15.
 */

module.exports = function(grunt){

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        htmlhint: {
            build: {
                options: {
                    'tag-pair': true,
                    'tagname-lowercase': true,
                    'attr-lowercase': true,
                    'attr-value-double-quotes': true,
                    'doctype-first': true,
                    'spec-char-escape': true,
                    'id-unique': true,
                    'head-script-disabled': true,
                    'style-disabled': true
                },
                src: ['src/index.html']
            }
        },

        htmlmin: {
            build: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: '**/*.html',
                    dest: 'dist/'
                }]
            }
        },

        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            build: {
                src: ['src/css/**/*.css']
            }
        },

        cssc: {
            build: {
                options: {
                    consolidateViaDeclarations: true,
                    consolidateViaSelectors:    true,
                    consolidateMediaQueries:    true
                },
                files: {
                    'dist/css/main.css': 'src/css/main.css',
                    'dist/css/normalize.css': 'src/css/normalize.css'
                }
            }
        },

        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            build: {
                files: {
                    'dist/css/min.css': [
                        'dist/css/normalize.css',
                        'dist/css/main.css'
                    ]
                }
            }
        },

        responsive_images: {
            options: {
                engine: 'im'
            },
            logo: {
                options: {
                    sizes: [{
                        name: 'small',
                        width: 80,
                        quality: 70
                    },{
                        name: 'small',
                        width: 160,
                        suffix: "_2x",
                        quality: 30
                    },{
                        name: 'large',
                        width: 120,
                        quality: 70
                    },{
                        name: "large",
                        width: 240,
                        suffix: "_2x",
                        quality: 30
                    }]
                },
                files: {
                    'dist/images/udacity-logo.jpg': 'src/images/udacity-logo.jpg'
                }
            },
            main: {
                options: {
                    sizes: [{
                        name: 'small',
                        width: 320,
                        quality: 90
                    },{
                        name: 'small',
                        width: 640,
                        suffix: "_2x",
                        quality: 90
                    },{
                        name: 'medium',
                        width: 480,
                        quality: 90
                    },{
                        name: 'medium',
                        width: 480,
                        suffix: "_2x",
                        quality: 30
                    },{
                        name: 'large',
                        width: 960,
                        quality: 70
                    },{
                        name: "large",
                        width: 1920,
                        suffix: "_2x",
                        quality: 30
                    }]
                },
                files: {
                    'dist/images/main.jpg': 'src/images/main.jpg'
                }
            },
            build: {
                options: {
                    engine: 'im',
                    sizes: [{
                        width: 80,
                        quality: 50
                    },{
                        width: 120,
                        quality: 50
                    },{
                        width: 160,
                        quality: 50
                    },{
                        width: 240,
                        quality: 50
                    },{
                        width: 360,
                        quality: 50
                    }]
                },
                files: [{
                    expand: true,
                    src: ['*.{gif,jpg,png}'],
                    cwd: 'src/images/',
                    dest: 'dist/images/'
                }]
            }
        },

        clean: {
            build: ['dist'],
            css: ['dist/css/**/*.css', '!dist/css/**/*min.css']
        },

        watch: {
            html: {
                files: ['src/index.html'],
                tasks: ['buildhtml']
            },
            css: {
                files: ['src/css/**/*.css'],
                tasks: ['buildcss']
            }
        }
    });

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.registerTask('buildhtml', ['htmlhint', 'htmlmin']);
    grunt.registerTask('buildcss', ['csslint', 'cssc', 'cssmin']);
    grunt.registerTask('build', ['clean:build', 'buildhtml', 'buildcss']);
    grunt.registerTask('default', ['build']);
    grunt.registerTask('buildimages', ['responsive_images']);
};