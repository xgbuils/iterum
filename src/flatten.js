const flattenGen = require('./internal/flattenGen')

module.exports = function flatten (iterable, n) {
    return this(flattenGen.bind(null, iterable, n))
}
