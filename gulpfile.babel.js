const gulp = require("gulp");
const babel = require("gulp-babel");
const htmlmin = require("gulp-htmlmin");
const terser = require("gulp-terser");
const postcss = require("gulp-postcss");

const { init } = require("browser-sync");

//css
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const concat = require("gulp-concat");

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

    .pipe(concat("style.css"))
    .pipe(postcss(css))

    .pipe(gulp.dest("./public/css/"));
}

function traspilerJs() {
  return gulp
    .src("./src/js/*.js")

    .pipe(
      babel({
        plugins: [
          "@babel/plugin-transform-runtime",
          "@babel/plugin-syntax-import-assertions",
        ],
      })
    )
    .pipe(terser())

    .pipe(gulp.dest("./public/js/"));
}

function build() {
  init({
    server: "./public",
  });

  gulp.watch("./src/**/*.html", gulp.series(html));
  gulp.watch("./src/css/**/*.css", gulp.series(styles));
  gulp.watch("./src/js/**/*.js", gulp.series(traspilerJs));
}

exports.default = build;
