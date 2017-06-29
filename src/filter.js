const filterGen = require('./internal/filterGen')

module.exports = function (cb, iterable) {
    return this(filterGen.bind(null, iterable, cb))
}
