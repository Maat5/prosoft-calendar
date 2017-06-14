var gulp = require('gulp');
var clean = require('gulp-clean');
var stylus = require('gulp-stylus');
var minify = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var autoprefixer = require('autoprefixer-stylus');
var browserSync = require('browser-sync');

/* App build config */
var build = require('./build.config');

/* Clean task*/
gulp.task('clean', function() {
  return gulp.src(build.buildSrc, { read: false })
    .pipe(clean());
});

/* Build CSS */
gulp.task('stylus', function() {
  return gulp.src(build.cssSrc + 'app.styl')
    .pipe(stylus({
      use: [autoprefixer({ browsers: ['last 2 versions'] })]
    }))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest(build.buildCss))
});

/* Minify libs CSS */
gulp.task('libsStyle', function() {
  return gulp.src([
      build.bowerSrc + 'font-awesome/css/font-awesome.css',
      build.bowerSrc + 'bootstrap/dist/css/bootstrap.min.css',
      build.bowerSrc + 'angular-bootstrap/ui-bootstrap.csp.css'
    ])
    .pipe(concat('libs.min.css'))
    .pipe(minify())
    .pipe(gulp.dest('build/assets/css/'));
});

/* Concat repo JS*/
gulp.task('appScripts', function() {
  return gulp.src(build.src + '**/*.js')
    .pipe(concat('app.min.js'))
    // .pipe(uglify({ mangle: false }))
    .pipe(gulp.dest(build.buildJs));
});

/* External JS libs*/
gulp.task('libsScipts', function() {
  return gulp.src([
      build.bowerSrc + 'angular/angular.js',
      build.bowerSrc + 'angular-ui-router/release/angular-ui-router.min.js',
      build.bowerSrc + 'angular-bootstrap/ui-bootstrap.min.js',
      build.bowerSrc + 'moment/min/moment.min.js',
      build.bowerSrc + 'lodash/dist/lodash.min.js'
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify({ mangle: false }))
    .pipe(gulp.dest(build.buildJs))
});

/* Load templates */
gulp.task('templates', function() {
  return gulp.src(build.src + '*/*.html')
    .pipe(gulp.dest(build.buildHtml))
});

gulp.task('images', function() {
  return gulp.src(build.imgSrc + '*')
    .pipe(gulp.dest(build.buildImg))
});

/* Load index.html */
gulp.task('index', function() {
  return gulp.src(build.src + '*.html')
    .pipe(gulp.dest(build.buildSrc))
});

/* Server init */
gulp.task('browserSync', function() {
  browserSync({
    host: build.host,
    port: build.port,
    // open: 'external',
    server: {
      baseDir: build.buildSrc
    }
  })
});

/* Watch files */
gulp.task('watch', function() {
  gulp.watch([build.src + '**/*'], ['build', browserSync.reload]);
});

/* Build */
gulp.task('build', [
  'stylus',
  'libsStyle',
  'images',
  'appScripts',
  'libsScipts',
  'templates',
  'index'
]);

/* Init app*/
gulp.task('default', ['clean'], function() {
  gulp.start('build');
  gulp.start('browserSync');
  gulp.start('watch');
});
