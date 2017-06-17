const baseFlatten = require('../core/baseFlatten')

module.exports = function concat (firstIterable, secondIterable) {
    return this(baseFlatten([firstIterable, secondIterable], 1))
}
