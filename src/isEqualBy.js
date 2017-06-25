const sameValueZero = require('./internal/same-value-zero')
const baseIsEqual = require('./internal/baseIsEqual')

module.exports = function isEqualBy (x, y, cb) {
    return baseIsEqual(x, y, (a, b) => sameValueZero(cb(a), cb(b)))
}
