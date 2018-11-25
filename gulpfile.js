const gulp = require('gulp'),
      del  = require('del'),
      sync = require('browser-sync').create()
      pug  = require('gulp-pug'),
      sass = require('gulp-sass'),
      autopref = require('gulp-autoprefixer');

gulp.task('clean', function() {
    return del(['./project/*']);
});

gulp.task('pug', function() {
    return gulp.src('./src/pug/**/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('./project'))
        .pipe(sync.stream());
});

gulp.task('sass', function() {
    return gulp.src('./src/sass/main.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(autopref({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./project'))
        .pipe(sync.stream());
});

gulp.task('img', function() {
    return gulp.src('./src/img/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(gulp.dest('./project/img'))
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

    gulp.watch('./src/pug/**/*.pug', gulp.series('pug'));
    gulp.watch('./src/sass/**/*.sass', gulp.series('sass'));
    gulp.watch('./src/img/**/*.+(png|jpg|jpeg|gif|svg)', gulp.series('img'));
});

gulp.task('build', gulp.series('clean', gulp.parallel('pug', 'sass', 'img')));

gulp.task('default', gulp.series('clean', 'build', 'browser-sync'));
