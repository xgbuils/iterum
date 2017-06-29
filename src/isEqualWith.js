const baseIsEqual = require('./internal/baseIsEqual')

module.exports = function isEqualWith (comparator, x, y) {
    return baseIsEqual(x, y, comparator)
}
