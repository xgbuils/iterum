const sameValueZero = require('../core/same-value-zero')
const baseIsEqual = require('../core/baseIsEqual')

module.exports = function isEqual (x, y) {
    return baseIsEqual(x, y, sameValueZero)
}
