const Iterable = require('../core/iterable')
const sameValueZero = require('../core/same-value-zero')
const baseIsEqual = require('../core/baseIsEqual')
const validation = [[], [Iterable], ['Function', 'Undefined']]

module.exports = {
    fn (x, y, comparator = sameValueZero) {
        return baseIsEqual(x, y, comparator)
    },
    validation
}
