const gulp = require("gulp");
const babel = require("gulp-babel");
const htmlmin = require("gulp-htmlmin");
const terser = require("gulp-terser");
const postcss = require("gulp-postcss");
//css
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

const css = [autoprefixer(), cssnano()];

function html() {
  return gulp
    .src("./src/*.html")

    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
      })
    )

    .pipe(gulp.dest("./public/"));
}

function styles() {
  return gulp
    .src("./src/css/*.css")
    .pipe(postcss(css))
    .pipe(gulp.dest("./public/css"));
}

function traspilerJs() {
  return gulp
    .src("./src/js/*.js")
    .pipe(terser())
    .pipe(gulp.dest("./public/js"));
}

exports.default = gulp.series(html, styles, traspilerJs);
