var config = require('./gulp.conf.json');
var autoprefixer = require('autoprefixer-core');
var del = require('del');
var gulp = require('gulp');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var plugins = require('gulp-load-plugins')();
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('clean', function (next) {
  del(config.build + '/*.{css,js}', next);
});

gulp.task('css', function () {
  return gulp.src(config.css)
  .pipe(plugins.concat('main.min.css'))
  .pipe(sourcemaps.init())
  .pipe(postcss([autoprefixer({browsers: ['last 2 version']})]))
  .pipe(plugins.minifyCss({
    keepSpecialComments: 0
  }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(config.build));
});

gulp.task('jscs', function () {
  return gulp.src(config.jscs)
  .pipe(jscs())
});

gulp.task('jslint', function () {
  return gulp.src(config.jslint)
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe(jshint.reporter('fail'));
});

gulp.task('js', ['jscs', 'jslint'], function () {
  return gulp.src(config.js)
  .pipe(plugins.concat('main.min.js'))
  .pipe(plugins.ngAnnotate({
    add: true,
    single_quotes: true
  }))
  .pipe(plugins.uglify({
    mangle: true
  }))
  .pipe(gulp.dest(config.build));
});

gulp.task('build', ['clean', 'css', 'js']);
