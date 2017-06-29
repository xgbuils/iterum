const powerGen = require('./internal/powerGen')

module.exports = function power (exponent, iterable) {
    return this(powerGen.bind(this, iterable, exponent))
}
