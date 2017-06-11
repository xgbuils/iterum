arraySmallerStartSuite = require('./array_smaller_start')
arrayBiggerStartSuite = require('./array_bigger_start')
noIndexableSmallerStartSuite = require('./no_indexable_smaller_start')
noIndexableBiggerStartSuite = require('./no_indexable_bigger_start')

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
}]