'use strict';

// General
var gulp = require('gulp');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var rename = require("gulp-rename");
var order = require("gulp-order");
var sourcemaps = require('gulp-sourcemaps');

// CSS
var sass = require('gulp-sass');

// Javascript
var concat = require("gulp-concat");
var uglify = require('gulp-uglify');
var eslint = require('gulp-eslint');

// Gulp Sass
gulp.task('sass', function() {
  return gulp.src('./css/scss/main.scss')
            .pipe(sass.sync().on('error', sass.logError))
            .pipe(sass({outputStyle: 'compressed'}))
            .pipe(rename({
              extname: '.min.css'
            }))
            .pipe(gulp.dest('./dist/css'));
});

// Gulp Sass watch
gulp.task('sass:watch', function() {
  return gulp.watch('./css/scss/**/*.scss', ['sass']);
});

// Gulp Concat
gulp.task('concat', function() {
  return gulp.src('./js/**/*.js')
            .pipe(order([
              'vendor/jquery-3.1.1.min.js',
              'vendor/**/*.js',
              'plugins.js',
              'main.js',
              'components/**/*.js',
              'router.js'
            ]))
            .pipe(concat('main.js', {newLine: ';'}))
            .pipe(gulp.dest('./dist/js'));
});

// Gulp Concat with sourcemaps
gulp.task('concat:sourcemaps', function() {
  return gulp.src('./js/**/*.js')
            .pipe(sourcemaps.init())
            .pipe(order([
              'vendor/jquery-3.1.1.min.js',
              'vendor/**/*.js',
              'plugins.js',
              'main.js',
              'components/**/*.js',
              'router.js'
            ]))
            .pipe(concat('main.js', {newLine: ';'}))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('dist/js'));
});

// Gulp Compress
gulp.task('compress', function() {
  return gulp.src('dist/js/main.js')
            .pipe(uglify())
            .pipe(rename({
              extname: '.min.js'
            }))
            .pipe(gulp.dest('dist/js'));
});

// Gulp lint
gulp.task('lint', function() {
  // ESLint ignores files with "node_modules" paths.
  // So, it's best to have gulp ignore the directory as well.
  // Also, Be sure to return the stream from the task;
  // Otherwise, the task may end before the stream has finished.
  return gulp.src(['./js/**/*.js', '!./js/vendor/**'])
            // eslint() attaches the lint output to the "eslint" property
            // of the file object so it can be used by other modules.
            .pipe(eslint())
            // eslint.format() outputs the lint results to the console.
            // Alternatively use eslint.formatEach() (see Docs).
            .pipe(eslint.format())
            // To have the process exit with an error code (1) on
            // lint error, return the stream and pipe to failAfterError last.
            .pipe(eslint.failAfterError());
});

// Gulp Javascript task
gulp.task('js', ['concat', 'compress'], function() {});

// Gulp Javascript development task
gulp.task('js:dev', ['concat:sourcemaps'], function() {});

// Gulp Watch Javascript task
gulp.task('js:watch', function () {
  watch('./js/**/*.js', batch(function (events, done) {
    gulp.start('js:dev', done);
  }));
});

// Gulp dev
gulp.task('dev', ['sass:watch', 'js:watch'], function() {});

// Gulp default task
gulp.task('default', ['sass', 'concat', 'compress'], function() {});
