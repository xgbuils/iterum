const flattenGen = require('./internal/flattenGen')

module.exports = function concat (firstIterable, secondIterable) {
    return this(flattenGen.bind(null, 1, [secondIterable, firstIterable]))
}
