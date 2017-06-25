const filterGen = require('./internal/filterGen')

module.exports = function (iterable, cb) {
    return this(filterGen.bind(null, iterable, cb))
}
