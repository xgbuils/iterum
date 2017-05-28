const IterArray = require('iterarray')

module.exports = function drop (iterable, n = 1) {
    return this(IterArray(iterable).slice(n, Infinity))
}
