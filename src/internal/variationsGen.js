const combinationsGen = require('./combinationsGen')
const permutationsGen = require('./permutationsGen')
const mapGen = require('./mapGen')
const flattenGen = require('./flattenGen')

module.exports = function (k, iterable) {
    const combinations = combinationsGen.call(this, k, iterable)
    const permutationsOfCombinations = mapGen(combination => {
        return this(permutationsGen.bind(this, combination))
    }, combinations)
    return flattenGen(1, permutationsOfCombinations)
}
