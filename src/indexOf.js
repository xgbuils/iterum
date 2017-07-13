const findIndex = require('./findIndex')
const sameValueZero = require('./internal/same-value-zero')

module.exports = function indexOf (e, iterable) {
    return findIndex(value => sameValueZero(value, e), iterable)
}
