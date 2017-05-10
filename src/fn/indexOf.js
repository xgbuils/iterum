const findIndex = require('./findIndex.js')
const slice = require('./slice')

function indexOf (iterable, e, fromIndex = 0) {
    const sliceIterable = slice.gen(iterable, fromIndex)
    const index = findIndex.fn(sliceIterable, value => value === e)
    return index === -1 ? -1 : fromIndex + index
}

module.exports = {
    fn: indexOf
}
