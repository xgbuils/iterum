var gulp = require('gulp')
var mocha = require('gulp-mocha')
var eslint = require('gulp-eslint')

gulp.task('test', function () {
    gulp.src([
        // generators
        './test/constructors/function_test.js',
        './test/constructors/range_test.js',
        './test/constructors/repeat_test.js',
        './test/constructors/empty_test.js',
        './test/constructors/list_test.js',
        './test/constructors/value_test.js',
        // methods
        './test/fn/concat_test.js',
        './test/fn/every_test.js',
        './test/fn/filter_test.js',
        './test/fn/indexOf_test.js',
        './test/fn/map_test.js',
        './test/fn/slice_test.js',
        './test/fn/some_test.js',
        // static functions
        './test/fn/compose_test.js',
        // core
        './test/core/create-new-iterator_test.js',
        './test/core/init-array-status_test.js'
    ])
    .pipe(mocha())
})

gulp.task('lint', function () {
    return gulp.src(['./**/*.js', '!./test/input/**/*.js', '!./test/output/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
})
