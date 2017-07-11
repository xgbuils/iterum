const repeatGen = require('./internal/repeatGen')

module.exports = function (iterable) {
    return this(repeatGen.bind(null, Infinity, iterable))
}
