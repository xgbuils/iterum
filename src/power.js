const powerGen = require('./internal/powerGen')

module.exports = function power (iterable, exponent) {
    return this(powerGen.bind(this, iterable, exponent))
}
