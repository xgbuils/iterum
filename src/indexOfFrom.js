const findIndex = require('./findIndex')
const IterArray = require('iterarray')

module.exports = function indexOfFrom (e, fromIndex, iterable) {
    const slicedIterable = IterArray(iterable).slice(fromIndex, Infinity)
    const index = findIndex(value => value === e, slicedIterable)
    return index === -1 ? -1 : fromIndex + index
}
