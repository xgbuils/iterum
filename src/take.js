const IterArray = require('iterarray')

module.exports = function take (n, iterable) {
    return this(IterArray(iterable).slice(0, n))
}
