const takeWhileGen = require('./internal/takeWhileGen')

module.exports = function (cb, iterable) {
    return this(takeWhileGen.bind(null, iterable, cb))
}
