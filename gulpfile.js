'use strict';

var config = require('./gulp.conf.json');
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var autoprefixer = require('autoprefixer-core');
var browserSync = require('browser-sync');
var del = require('del');
var mainBowerFiles = require('main-bower-files');
var series = require('stream-series');

gulp.task('clean', function (next) {
  del(getPath('build', '*.{css,js}'), next);
});

gulp.task('css', function () {
  return gulp.src(getPath('src', config.css.files))
  .pipe(plugins.concat(config.css.bundle))
  .pipe(plugins.sourcemaps.init())
  .pipe(plugins.postcss([autoprefixer({browsers: ['last 2 version']})]))
  .pipe(plugins.minifyCss({keepSpecialComments: 0}))
  .pipe(plugins.sourcemaps.write())
  .pipe(gulp.dest(config.path.build));
});

gulp.task('html:lint', function () {
  return gulp.src(getPath('app', config.html.files))
  .pipe(plugins.htmlhint({'doctype-first': false}))
  .pipe(plugins.htmlhint.reporter());
});

gulp.task('html', ['html:lint'], function () {
  return gulp.src(getPath('app', config.html.files))
  .pipe(plugins.minifyHtml({empty: true, spare: true, quotes: true}))
  .pipe(plugins.angularTemplatecache({
    root: 'app/modules'
  }))
  .pipe(plugins.concat(config.html.bundle))
  .pipe(plugins.uglify({mangle: true}))
  .pipe(gulp.dest(config.path.build));
});

gulp.task('js:deps', function () {
  return gulp.src(mainBowerFiles({
    filter: function (file) {
      var testingPackages = config.test.vendor.packages.join('|');
      var isJSFile = (file.substr(-3) === '.js');
      var isTestingPackage = new RegExp(testingPackages).test(file);
      return (isJSFile && ! isTestingPackage);
    }
  }))
  .pipe(plugins.concat(config.js.vendor.bundle))
  .pipe(plugins.uglify({mangle: true}))
  .pipe(gulp.dest(config.path.build));
});

gulp.task('js:deps:test', function () {
  return gulp.src(mainBowerFiles({
    filter: function (file) {
      var testingPackages = config.test.vendor.packages.join('|');
      var isJSFile = (file.substr(-3) === '.js');
      var isTestingPackage = new RegExp(testingPackages).test(file);
      return (isJSFile && isTestingPackage);
    }
  }))
  .pipe(plugins.concat(config.test.vendor.bundle))
  .pipe(plugins.uglify({mangle: true}))
  .pipe(gulp.dest(config.path.build));
});

gulp.task('js:lint', function () {
  return gulp.src(config.jshint.files)
  .pipe(plugins.jshint(config.jshint.config))
  .pipe(plugins.jshint.reporter('jshint-stylish'))
  .pipe(plugins.jshint.reporter('fail'));
});

gulp.task('js:style', function () {
  return gulp.src(config.jscs.files)
  .pipe(plugins.jscs());
});

gulp.task('js', ['js:style', 'js:lint', 'js:deps'], function () {
  return gulp.src(getPath('app', config.js.files))
  .pipe(plugins.angularFilesort())
  .pipe(plugins.concat(config.js.bundle))
  .pipe(plugins.ngAnnotate({'add': true, 'single_quotes': true}))
  .pipe(plugins.uglify({mangle: true}))
  .pipe(gulp.dest(config.path.build));
});

gulp.task('inject', ['clean', 'css', 'js', 'html'], function () {

  var files = {
    css: gulp.src(getPath('build', config.css.bundle), {read: false}),
    js: gulp.src(getPath('build', [
      config.js.vendor.bundle,
      config.js.bundle,
      config.html.bundle
    ]), {read: false})
  };

  return gulp.src(getPath('src', config.html.index.tpl))
  .pipe(plugins.inject(files.css,
    {addRootSlash: false, ignorePath: 'src/', starttag: '<!-- inject:css -->'}
  ))
  .pipe(plugins.inject(files.js,
    {addRootSlash: false, ignorePath: 'src/', starttag: '<!-- inject:js -->'}
  ))
  .pipe(plugins.rename(config.html.index.prod))
  .pipe(gulp.dest(config.path.src));
});

gulp.task('inject:dev', ['clean', 'css', 'js'], function () {

  var appFiles = getPath('app', config.js.files);
  var vendorFiles = mainBowerFiles({
    filter: function (file) {
      var testingPackages = config.test.vendor.packages.join('|');
      var isJSFile = (file.substr(-3) === '.js');
      var isTestingPackage = new RegExp(testingPackages).test(file);
      return (isJSFile && ! isTestingPackage);
    }
  });
  var files = {
    css: gulp.src(getPath('build', config.css.bundle), {read: false}),
    js: {
      app: gulp.src(appFiles).pipe(plugins.angularFilesort()),
      vendor: gulp.src(vendorFiles, {read: false})
    }
  };

  return gulp.src(getPath('src', config.html.index.tpl))
  .pipe(plugins.rename(config.html.index.dev))
  .pipe(plugins.inject(files.css,
    {relative: true, starttag: '<!-- inject:css -->'}
  ))
  .pipe(plugins.inject(
    series(files.js.vendor, files.js.app),
    {addRootSlash: false, ignorePath: '/src/', starttag: '<!-- inject:js -->'}
  ))
  .pipe(gulp.dest(config.path.src));
});

gulp.task('build', ['clean', 'css', 'js', 'html', 'inject']);
gulp.task('build:dev', ['clean', 'css', 'js:deps', 'inject:dev']);
gulp.task('build:test', ['build', 'js:deps:test']);

gulp.task('serve', ['build'], function () {

  browserSync.init({
    server: config.path.src,
    startPath: '/index.html'
  });

  gulp.watch(getPath('app', '**/*.html'), ['html']);
  gulp.watch(getPath('app', '**/*.js'), ['js']);
  gulp.watch(getPath('src', config.css.files), ['css']);
  gulp.watch(getPath('src', config.html.index.tpl), ['inject:dev']);

  gulp.watch(getPath('build', '*')).on('change', browserSync.reload);
});

gulp.task('serve:dev', ['build:dev'], function () {

  browserSync.init({
    server: config.path.src,
    startPath: '/index-dev.html'
  });

  gulp.watch(getPath('src', config.css.files), ['css']);
  gulp.watch(getPath('src', config.html.index.tpl), ['inject:dev']);

  gulp.watch(getPath('app', '**/*')).on('change', browserSync.reload);
  gulp.watch(getPath('build', '*')).on('change', browserSync.reload);
  gulp.watch(getPath('src', '**/*.js')).on('change', browserSync.reload);
});

var getPath = function (type, file) {
  if ( file === null || typeof file === 'string' ) {
    return config.path[type] + file;
  }
  var files = [], i;
  for ( i = 0; i < file.length; i++ ) {
    var fileName = file[i];
    if ( fileName[0] === '!' ) {
      fileName = '!' + config.path[type] + file[i].substring(1);
    } else {
      fileName = config.path[type] + file[i];
    }
    files.push(fileName);
  }
  return files;
};
