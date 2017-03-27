const findEntry = require('./findEntry')
const slice = require('./slice')
const sameValueZero = require('../core/same-value-zero')

function includes (e, fromIndex = 0) {
    const sliceIterable = slice.gen.call(this, fromIndex)
    return !!findEntry.fn
        .call(sliceIterable, value => sameValueZero(value, e))
}

module.exports = {
    fn: includes
}
