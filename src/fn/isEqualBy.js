const Iterable = require('../core/iterable')
const sameValueZero = require('../core/same-value-zero')
const baseIsEqual = require('../core/baseIsEqual')
const validation = [[], [Iterable], ['Function']]

module.exports = {
    fn (x, y, cb) {
        return baseIsEqual(x, y, (a, b) => sameValueZero(cb(a), cb(b)))
    },
    validation
}
