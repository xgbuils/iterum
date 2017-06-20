const IterArray = require('iterarray')

module.exports = function drop (iterarray, n) {
    return this(IterArray(iterarray).slice(n, Infinity))
}
