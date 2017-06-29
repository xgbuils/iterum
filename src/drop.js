const IterArray = require('iterarray')

module.exports = function drop (n, iterable) {
    return this(IterArray(iterable).slice(n, Infinity))
}
