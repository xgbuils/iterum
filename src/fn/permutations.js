const basePermutations = require('../core/basePermutations')
//const baseMap = require('../core/baseMap')

module.exports = function permutations (iterable) {
    return this(basePermutations.bind(this, iterable))
}
