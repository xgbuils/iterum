var gulp = require('gulp')
var mocha = require('gulp-mocha')
var eslint = require('gulp-eslint')

gulp.task('test', function () {
    gulp.src('./test/**/*_test.js')
        .pipe(mocha())
})

gulp.task('lint', function () {
    return gulp.src(['./**/*.js', '!./test/input/**/*.js', '!./test/output/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
})
