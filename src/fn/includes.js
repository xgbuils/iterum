const findEntry = require('./findEntry')
const IterArray = require('iterarray')
const sameValueZero = require('../core/same-value-zero')

module.exports = function includes (iterable, e, fromIndex = 0) {
    const slicedIterable = IterArray(iterable).slice(fromIndex, Infinity)
    return !!findEntry(slicedIterable, value => sameValueZero(value, e))
}
