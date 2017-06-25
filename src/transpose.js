const isEmpty = require('is-empty-iterable')
const baseZip = require('./internal/baseZip')

module.exports = function transpose (iterables) {
    const generator = isEmpty(iterables)
        ? function* () {}
        : baseZip.bind(null, e => e, null, iterables)
    return this(generator)
}
