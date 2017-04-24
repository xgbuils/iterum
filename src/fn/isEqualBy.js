const sameValueZero = require('../core/same-value-zero')
const baseIsEqual = require('../core/baseIsEqual')
const Iterable = require('../core/iterable')

module.exports = {
    fn (iterable, cb) {
        return baseIsEqual.call(this, iterable, (a, b) => sameValueZero(cb(a), cb(b)))
    },
    validation: [[Iterable], ['Function']]
}
