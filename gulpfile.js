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
        .pipe(gulpJsdoc2md({ template: fs.readFileSync('./jsdoc2md/readme.hbs', 'utf8') }))
        .on('error', function (err) {
            gutil.log(gutil.colors.red('jsdoc2md failed'), err.message)
        })
        .pipe(gulp.dest('./'))
});