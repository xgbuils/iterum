const findEntry = require('./findEntry')
const sameValueZero = require('./internal/same-value-zero')

module.exports = function includes (e, iterable) {
    return !!findEntry(value => sameValueZero(value, e), iterable)
}
