const basePower = require('../core/basePower')

module.exports = function power (iterable, exponent) {
    return this(basePower.bind(this, iterable, exponent))
}
