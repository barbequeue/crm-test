const gulp = require('gulp'),
      del  = require('del'),
      sync = require('browser-sync'),
      pug  = require('gulp-pug'),
      sass = require('gulp-sass'),
      concat = require('gulp-concat'),
      autopref = require('gulp-autoprefixer')
      clean = require('clean-css');

var sassDir = [
    './src/common.blocks/**/*.sass',
    './src/library.blocks/**/*.sass'
];

gulp.task('clean', function() {
    return del(['./project/*']);
});

gulp.task('pug', function() {
    return gulp.src('./src/**/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('./project'))
        .pipe(sync.stream());
});

gulp.task('img', function() {
    return gulp.src('./src/img/**/*.*')
        .pipe(gulp.dest('./project/img'))
        .pipe(sync.stream());
});

gulp.task('sass', function() {
    return gulp.src(sassDir)
        .pipe(sass())
        .pipe(concat('project.css'))
        .pipe(autopref({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./project'))
        .pipe(sync.stream());
});

gulp.task('browser-sync', function() {
    sync.init({
        server: {
            baseDir: './project'
        },
        notify: false,
        open: false
    });

    gulp.watch('./src/**/*.pug', gulp.series('pug'));
    gulp.watch(sassDir, gulp.series('sass'));
});

gulp.task('default', gulp.series('clean', gulp.parallel('pug', 'sass', 'img'), 'browser-sync'));
