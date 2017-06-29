const padEndGen = require('./internal/padEndGen')

module.exports = function (length, value, iterable) {
    return this(padEndGen.bind(null, iterable, length, value))
}
