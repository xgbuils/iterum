const findEntryFn = require('../core/findEntryFn')
const slice = require('./slice')
const sameValueZero = require('../core/same-value-zero')

function includes (iterable, e, fromIndex = 0) {
    const sliceIterable = slice.gen(iterable, fromIndex)
    return !!findEntryFn(sliceIterable, value => sameValueZero(value, e))
}

module.exports = {
    fn: includes
}
