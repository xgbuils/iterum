const sameValueZero = require('../core/same-value-zero')
const baseIsEqual = require('../core/baseIsEqual')
const Iterable = require('../core/iterable')

module.exports = {
    fn (iterable) {
        return baseIsEqual.call(this, iterable, sameValueZero)
    },
    validation: [[Iterable]]
}
