const sameValueZero = require('./internal/same-value-zero')
const baseIsEqual = require('./internal/baseIsEqual')

module.exports = function isEqual (x, y) {
    return baseIsEqual(x, y, sameValueZero)
}
