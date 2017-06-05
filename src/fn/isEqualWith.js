const baseIsEqual = require('../core/baseIsEqual')

module.exports = function isEqualWith (x, y, comparator) {
    return baseIsEqual(x, y, comparator)
}
