const permutationsGen = require('./internal/permutationsGen')

module.exports = function permutations (iterable) {
    return this(permutationsGen.bind(this, iterable))
}
