const isEmpty = require('is-empty-iterable')
const baseZip = require('../core/baseZip')

module.exports = function transpose (iterables) {
    const iterable = isEmpty(iterables)
        ? []
        : baseZip(e => e, null, iterables)
    return this(iterable)
}
