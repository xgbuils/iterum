const findIndex = require('./findIndex')

module.exports = function indexOfFrom (iterarray, e, fromIndex) {
    const slicedIterable = iterarray.slice(fromIndex, Infinity)
    const index = findIndex(slicedIterable, value => value === e)
    return index === -1 ? -1 : fromIndex + index
}
