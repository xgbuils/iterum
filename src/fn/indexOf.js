const findIndex = require('./findIndex')
const IterArray = require('iterarray')

module.exports = function indexOf (iterable, e, fromIndex = 0) {
    const slicedIterable = IterArray(iterable).slice(fromIndex, Infinity)
    const index = findIndex(slicedIterable, value => value === e)
    return index === -1 ? -1 : fromIndex + index
}
