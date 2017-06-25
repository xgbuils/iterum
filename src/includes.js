const findEntry = require('./findEntry')
const sameValueZero = require('./internal/same-value-zero')

module.exports = function includes (iterable, e) {
    return !!findEntry(iterable, value => sameValueZero(value, e))
}
