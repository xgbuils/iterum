var gulp = require('gulp')
var mocha = require('gulp-mocha')
var eslint = require('gulp-eslint')

gulp.task('test', function () {
    gulp.src([
        './test/next/function_test.js',
        './test/next/range_test.js',
        './test/next/value_test.js',
        './test/next/empty_test.js',
        './test/fn/map_test.js',
        './test/fn/compose_test.js'
    ])
    .pipe(mocha())
})

gulp.task('lint', function () {
    return gulp.src(['./**/*.js', '!./test/input/**/*.js', '!./test/output/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
})
