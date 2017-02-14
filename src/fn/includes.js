const findEntry = require('./findEntry')
const slice = require('./slice')

function includes (e, fromIndex = 0) {
    const sliceIterable = slice.gen.call(this, fromIndex)
    return !!findEntry.fn
        .call(sliceIterable, value => value === e || Object.is(value, e))
}

module.exports = {
    fn: includes
}
