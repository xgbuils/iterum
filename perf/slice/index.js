const arraySmallerStartSuite = require('./array_smaller_start')
const arrayBiggerStartSuite = require('./array_bigger_start')
const createNewArraySliceWithoutTraversingSuite = require('./create_new_array_slice_without_traversing')
const noIndexableSmallerStartSuite = require('./no_indexable_smaller_start')
const noIndexableBiggerStartSuite = require('./no_indexable_bigger_start')
const createNewSetSliceWithoutTraversingSuite = require('./create_new_set_slice_without_traversing')
const twoCallsSuite = require('./two_calls')

module.exports = [{
    name: 'array - small start index',
    suite: arraySmallerStartSuite
}, {
    name: 'array - big start index',
    suite: arrayBiggerStartSuite
}, {
    name: 'array - create new sliced iterable (no traversing)',
    suite: createNewArraySliceWithoutTraversingSuite
}, {
    name: 'no indexable iterable - small start index',
    suite: noIndexableSmallerStartSuite
}, {
    name: 'no indexable iterable - big start index',
    suite: noIndexableBiggerStartSuite
}, {
    name: 'no indexable iterable - create new sliced iterable (no traversing)',
    suite: createNewSetSliceWithoutTraversingSuite
}, {
    name: 'two calls',
    suite: twoCallsSuite
}]
