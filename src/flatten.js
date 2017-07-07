const flattenGen = require('./internal/flattenGen')

module.exports = function (n, iterable) {
    return this(flattenGen.bind(null, n, iterable))
}
