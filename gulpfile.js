const gulp = require('gulp');

gulp.task('now:config', () => {
    return gulp
        .src(['now/*'])
        .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['now:config']);