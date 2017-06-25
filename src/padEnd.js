const padEndGen = require('./internal/padEndGen')

module.exports = function (iterable, length, value) {
    return this(padEndGen.bind(null, iterable, length, value))
}
