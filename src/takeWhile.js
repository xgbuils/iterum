const takeWhileGen = require('./internal/takeWhileGen')

module.exports = function (iterable, cb) {
    return this(takeWhileGen.bind(null, iterable, cb))
}
