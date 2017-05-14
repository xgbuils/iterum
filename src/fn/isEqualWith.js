const sameValueZero = require('../core/same-value-zero')
const baseIsEqual = require('../core/baseIsEqual')

module.exports = function isEqualWith (x, y, comparator = sameValueZero) {
    return baseIsEqual(x, y, comparator)
}
