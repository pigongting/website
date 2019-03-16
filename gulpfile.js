var gulp = require('gulp');
var del = require('del');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var fileinclude  = require('gulp-file-include');
var uglify  = require('gulp-uglify');
var sourcemaps  = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');

function clean() {
  return del('dist/**', {force:true});
}

function html() {
  return gulp.src('src/**/pages/**/*.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      context: {
        version: '?=1'
      },
      indent: true
     }))
    .pipe(gulp.dest('dist/'));
}

function css() {
  var processors = [
    autoprefixer({browsers: ['last 20 version']}),
    cssnano
  ];

  return gulp.src("src/cdn/**/css/**/*.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest("dist/cdn/"));
}

function js() {
  return gulp.src("src/cdn/**/javascript/**/*.js", { sourcemaps: true })
    .pipe(uglify())
    .pipe(gulp.dest("dist/cdn/", { sourcemaps: '.' }));
}

function media() {
  return gulp.src("src/cdn/**/media/*")
    .pipe(gulp.dest("dist/cdn/"))
}

function server(argument) {
  browserSync.init({
    server: {
      baseDir: "dist"
    },
    port: 3000
  });

  gulp.watch("src/**/pages/**/*.html", html);
  gulp.watch("src/cdn/**/css/**/*.scss", css);

  gulp.watch("dist").on('change', browserSync.reload);
}

// exports.default = gulp.series(clean, html);
exports.default = gulp.series(clean, html, css, js, media, server);
