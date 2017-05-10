const Iterable = require('../core/iterable')
const sameValueZero = require('../core/same-value-zero')
const baseIsEqual = require('../core/baseIsEqual')
const validation = [[], [Iterable]]

module.exports = {
    fn (x, y) {
        return baseIsEqual(x, y, sameValueZero)
    },
    validation
}
