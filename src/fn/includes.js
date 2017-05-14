const findEntry = require('./findEntry')
const slice = require('../gen/slice')
const sameValueZero = require('../core/same-value-zero')

module.exports = function includes (iterable, e, fromIndex = 0) {
    const sliceIterable = slice(iterable, fromIndex)
    return !!findEntry(sliceIterable, value => sameValueZero(value, e))
}
