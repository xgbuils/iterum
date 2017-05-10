const Iterable = require('../core/iterable')
const validation = [[], [Iterable], Infinity]
const baseZip = require('../core/baseZip')

function* zip (...iterables) {
    yield* baseZip(e => e, null, iterables)
}

module.exports = {
    gen: zip,
    validation
}
