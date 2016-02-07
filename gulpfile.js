/**
 * Created by Rusak Oleg on 02.02.2016.
 */

//todo: gulp задачу для минификации файлов
//todo: добавить стили к автокомплиту

'use strict';
const fs              = require('fs');
const runSequence     = require('run-sequence');
const gulp            = require('gulp');
const gutil           = require('gulp-util');
const gulpJsdoc2md    = require('gulp-jsdoc-to-markdown');
const concat          = require('gulp-concat');
const rename          = require('gulp-rename');
const babel           = require('gulp-babel');
const uglify          = require('gulp-uglify');
const stylus          = require('gulp-stylus');
const jade            = require('gulp-jade');

gulp.task('docs', function () {
    return gulp.src('app/*.js')
        .pipe(concat('README.md'))
        .pipe(gulpJsdoc2md({ template: fs.readFileSync('./jsdoc2md/readme.hbs', 'utf8') }))
        .on('error', function (err) {
            gutil.log(gutil.colors.red('jsdoc2md failed'), err.message)
        })
        .pipe(gulp.dest('./'))
});

gulp.task('public', (callback) => {
    runSequence(['babel', 'stylus', 'jade'], ['compress'], 'example', callback);
});

gulp.task('example', function (callback) {
    gulp.src('node_modules/javascript-auto-complete/auto-complete.*')
        .pipe(gulp.dest('public/example/javascript-auto-complete'))
        .on('end', function() {
            gulp.src('public/tags-input/*')
                .pipe(gulp.dest('public/example/tags-input'))
                .on('end', function() {
                    callback();
                });
        });
});

gulp.task('babel', () => {
        gulp.src(['app/tags-input/tags.js'])
            .pipe(babel())
            .pipe(gulp.dest('public/tags-input'));

        gulp.src(['app/example/service.js'])
            .pipe(babel())
            .pipe(gulp.dest('public/example'));
    }
);

gulp.task('compress', function() {
    return gulp.src(['public/tags-input/tags.js', 'public/example/service.js'], {base: './'})
        .pipe(uglify())
        .pipe(rename(function (path) {
            path.extname = ".min.js";
        }))
        .pipe(gulp.dest("./"));
});

//todo: add stylus support
gulp.task('stylus', function (callback) {
    return gulp.src('app/tags-input/*.styl')
        .pipe(stylus())
        .pipe(gulp.dest('public/tags-input'))
        .on('end', function() {
            gulp.src('app/example/*.styl')
                .pipe(stylus())
                .pipe(gulp.dest('public/example'))
        });
});

gulp.task('jade', function (callback) {
    return gulp.src('app/example/*.jade')
        .pipe(jade({
            pretty: false
        }))
        .pipe(gulp.dest('public/example'));
});

gulp.task('default', ['docs', 'public']);