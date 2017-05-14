const findIndex = require('./findIndex')
const slice = require('../gen/slice')

module.exports = function indexOf (iterable, e, fromIndex = 0) {
    const sliceIterable = slice(iterable, fromIndex)
    const index = findIndex(sliceIterable, value => value === e)
    return index === -1 ? -1 : fromIndex + index
}
