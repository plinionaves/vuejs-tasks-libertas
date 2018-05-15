const gulp = require('gulp');

gulp.task('now:config', () => {
    return gulp
        .src(['artifacts/now.json'])
        .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['now:config']);