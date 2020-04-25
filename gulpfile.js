'use strict';

var gulp = require('gulp'),
    concatCss = require('gulp-concat-css'),
    minifyCSS = require('gulp-minify-css'),
    uglyfly = require('gulp-uglyfly'),
    cache = require('gulp-cache'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    image = require('gulp-image'),
    gulpSequence = require('gulp-sequence'),
    debug = require('gulp-debug'),
    gutil = require('gulp-util'),
    rename = require("gulp-rename"),
    imageminJpegRecompress = require('imagemin-jpeg-recompress'),
    imageminPngquant = require('imagemin-pngquant'),
    svgSprite = require("gulp-svg-sprites"),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    csso = require('gulp-csso'),
    fs = require('fs');

var pathSource = '.';
var pathDestination = '..';

gulp.task('css', function() {
    gulp.src(pathSource + './_css/*.css')
        .pipe(minifyCSS({keepBreaks: false}))
        .pipe(gulp.dest(pathDestination + '/css/'));
});

gulp.task('styles', function () {
    return gulp.src( './scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: '',
            errLogToConsole: true
        }))
        .pipe(autoprefixer({browsers: ['last 4 versions']}))
        .pipe(csso())
        .pipe(rename({suffix: '.min', basename: "style"}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./css/'));
});

gulp.task('js', function() {
    gulp.src(['./js/*.js', '!./js/scripts.min.js'] )
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.min.js'))
        //.pipe(uglyfly())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./js/'))
});

gulp.task('js_prod', function() {
    gulp.src(['./js/*.js', '!./js/scripts.min.js'] )
        .pipe(concat('scripts.min.js'))
        .pipe(uglyfly())
        .pipe(gulp.dest('./js/'))
});

gulp.task('images', function() {
    gulp.src('./img/*')
        .pipe(imagemin(cache(imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))))
        .pipe(gulp.dest('../dist/img'))
});

gulp.task('default', ['css', 'js']);
gulp.task('everything', ['css', 'js', 'images', 'uploads', 'sprites']);
gulp.task('uploads', gulpSequence('css', 'uploads') );

gulp.task('watch', function() {
    gulp.watch(['./js/*.js', '!./js/scripts.min.js'], ['js']);
    gulp.watch(['./scss/*.scss'], ['styles'] );
});
