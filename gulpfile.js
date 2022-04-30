const gulp = require('gulp');
const pg = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
 
function pug() {
    return gulp.src('src/pug/pages/*.pug')
    .pipe(pg({
        pretty: true
    })) 
    .pipe(gulp.dest('build'))
}

function scss() {
    return gulp.src('src/scss/*.scss')
    .pipe(sass({
        pretty: true
    }))
    .pipe(gulp.dest('build/css'))
}

function js() {
    return gulp.src('src/js/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(gulp.dest('build/js'))
}

function html() {
    return gulp.src('src/pug/pages/*.html')
    // .pipe(html({
    //     pretty: true
    // })) 
    .pipe(gulp.dest('build'))
}

function watch () {
    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    });
    gulp.watch('src/scss/**/*.scss').on('change', gulp.series(scss));
    gulp.watch('src/js/**/*.js').on('change', gulp.series(js));
    gulp.watch('src/pug/**/*.pug').on('change', gulp.series(pug));
    gulp.watch('src/pug/**/*.html').on('change', gulp.series(html));
}

gulp.task('styles', scss);
gulp.task('js', js);
gulp.task('pug', pug);
gulp.task('html', html);
gulp.task('watch', watch);
gulp.task('build', gulp.series(scss, js, pug, html));
gulp.task('default', gulp.series(scss, js, pug, html, 'watch'));