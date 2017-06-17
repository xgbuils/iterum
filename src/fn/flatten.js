const baseFlatten = require('../core/baseFlatten')

module.exports = function flatten (iterable, n) {
    return this(baseFlatten(iterable, n))
}
