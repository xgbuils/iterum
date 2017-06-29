const dropWhileGen = require('./internal/dropWhileGen')

module.exports = function (cb, iterable) {
    return this(dropWhileGen.bind(null, iterable, cb))
}
