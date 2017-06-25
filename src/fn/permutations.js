const basePermutations = require('../core/basePermutations')

module.exports = function permutations (iterable) {
    return this(basePermutations.bind(this, iterable))
}
