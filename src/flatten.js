const flattenGen = require('./internal/flattenGen')

module.exports = function flatten (n, iterable) {
    return this(flattenGen.bind(null, iterable, n))
}
