const dropWhileGen = require('./internal/dropWhileGen')

module.exports = function (iterable, cb) {
    return this(dropWhileGen.bind(null, iterable, cb))
}
