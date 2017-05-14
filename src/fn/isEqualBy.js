const sameValueZero = require('../core/same-value-zero')
const baseIsEqual = require('../core/baseIsEqual')

module.exports = function isEqualBy (x, y, cb) {
    return baseIsEqual(x, y, (a, b) => sameValueZero(cb(a), cb(b)))
}
