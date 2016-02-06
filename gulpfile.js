/**
 * Created by Rusak Oleg on 02.02.2016.
 */

'use strict';
var fs              = require('fs');
var gulp            = require('gulp');
var gutil           = require('gulp-util');
var gulpJsdoc2md    = require('gulp-jsdoc-to-markdown');
var concat          = require('gulp-concat');
var rename          = require('gulp-rename');

gulp.task('docs', function () {
    return gulp.src('app/*.js')
        .pipe(concat('README.md'))
        .pipe(gulpJsdoc2md({ template: fs.readFileSync('./jsdoc2md/README.hbs', 'utf8') }))
        .on('error', function (err) {
            gutil.log(gutil.colors.red('jsdoc2md failed'), err.message)
        })
        .pipe(gulp.dest('./'))
});

gulp.task('example', function (callback) {
    gulp.src('app/*')
        .pipe(gulp.dest('example/plugin-tags-input'))
        .on('error', function (err) {
            gutil.log(gutil.colors.red('copy plugin tags-input failed'), err.message);
        });

    gulp.src('node_modules/javascript-auto-complete/auto-complete.*')
        .pipe(gulp.dest('example/javascript-auto-complete'))
        .on('error', function (err) {
            gutil.log(gutil.colors.red('copy plugin autocomplite failed'), err.message);
        });
});

gulp.task('default', ['docs', 'example']);