const baseIsEqual = require('./internal/baseIsEqual')

module.exports = function isEqualWith (x, y, comparator) {
    return baseIsEqual(x, y, comparator)
}
