const powerSetGen = require('./internal/powerSetGen')

module.exports = function powerSet (iterable) {
    return this(powerSetGen.bind(this, iterable))
}
