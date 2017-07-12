const isEmpty = require('is-empty-iterable')
const baseZip = require('./internal/baseZip')

module.exports = function (iterables) {
    const generator = isEmpty(iterables)
        ? function* () {}
        : baseZip.bind(null, e => e, e => e, iterables)
    return this(generator)
}
