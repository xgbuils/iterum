const sameValueZero = require('./internal/same-value-zero')
const baseIsEqual = require('./internal/baseIsEqual')

module.exports = function isEqualBy (cb, x, y) {
    return baseIsEqual(x, y, (a, b) => sameValueZero(cb(a), cb(b)))
}
