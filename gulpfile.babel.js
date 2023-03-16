import gulp from "gulp";
import babel from "gulp-babel";
import htmlmin from "gulp-htmlmin";
import terser from "gulp-terser";
import postcss from "gulp-postcss";
import imagemin from "gulp-imagemin";
import {gifsicle, mozjpeg, optipng, svgo} from "gulp-imagemin";

import {init, stream, reload} from "browser-sync"


//css
import autoprefixer from "autoprefixer";
import cssnano  from "cssnano"
import concat from "gulp-concat";

const css = [autoprefixer(),cssnano()]

gulp.task("html", () => {
    
    return gulp.src("./src/*.html")

    .pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true
    }))

    .pipe(gulp.dest("./public/"))

})

gulp.task("css", () => {

    return gulp.src("./src/css/*.css")

    .pipe(concat("style.css"))
    .pipe(postcss(css))

    .pipe(gulp.dest("./public/css/"))

})

gulp.task("babel", ()=> {

    return gulp.src("./src/js/*.js")

    .pipe(babel({
       
        plugins:["@babel/plugin-transform-runtime", "@babel/plugin-syntax-import-assertions"]
    }))
    .pipe(terser())

    .pipe(gulp.dest("./public/js/"))

})

gulp.task("img", () => {

    return gulp.src("./src/assets/images/*")

    .pipe(imagemin([svgo(), optipng(), optipng(), mozjpeg(), gifsicle() ]))

    .pipe(gulp.dest("./public/assets/images/"))

})


gulp.task("default", () => {

    init({
        server: "./public"
    })

    gulp.watch("./src/**/*.html" , gulp.series("html"))
    gulp.watch("./src/css/**/*.css" , gulp.series("css"))
    gulp.watch("./src/js/**/*.js" , gulp.series("babel"))
})


