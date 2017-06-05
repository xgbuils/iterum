const findEntry = require('./findEntry')
const sameValueZero = require('../core/same-value-zero')

module.exports = function includes (iterable, e) {
    return !!findEntry(iterable, value => sameValueZero(value, e))
}
