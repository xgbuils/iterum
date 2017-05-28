const IterArray = require('iterarray')

module.exports = function take (iterable, n = 1) {
    return this(IterArray(iterable).slice(0, n))
}
