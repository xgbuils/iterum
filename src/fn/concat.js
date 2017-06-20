const baseFlatten = require('../core/baseFlatten')

module.exports = function concat (firstIterable, secondIterable) {
    return this(baseFlatten.bind(null, [firstIterable, secondIterable], 1))
}
