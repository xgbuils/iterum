const arraySmallerStartSuite = require('./array_smaller_start')
const arrayBiggerStartSuite = require('./array_bigger_start')
const noIndexableSmallerStartSuite = require('./no_indexable_smaller_start')
const noIndexableBiggerStartSuite = require('./no_indexable_bigger_start')
const twoCallsSuite = require('./two_calls')

module.exports = [{
    name: 'array - small start index',
    suite: arraySmallerStartSuite
}, {
    name: 'array - big start index',
    suite: arrayBiggerStartSuite
}, {
    name: 'no indexable iterable - small start index',
    suite: noIndexableSmallerStartSuite
}, {
    name: 'no indexable iterable - big start index',
    suite: noIndexableBiggerStartSuite
}, {
    name: 'two calls',
    suite: twoCallsSuite
}]
