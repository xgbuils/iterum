const sameValueZero = require('../core/same-value-zero')
const baseIsEqual = require('../core/baseIsEqual')
const Iterable = require('../core/iterable')

module.exports = {
    fn (iterable, comparator = sameValueZero) {
        return baseIsEqual.call(this, iterable, comparator)
    },
    validation: [[Iterable], ['Function', 'Undefined']]
}
