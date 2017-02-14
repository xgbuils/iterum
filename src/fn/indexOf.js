const findIndex = require('./findIndex.js')
const slice = require('./slice')

function indexOf (e, fromIndex = 0) {
    const sliceIterable = slice.gen.call(this, fromIndex)
    const index = findIndex.fn.call(sliceIterable, value => value === e)
    return index === -1 ? -1 : fromIndex + index
}

module.exports = {
    fn: indexOf
}
