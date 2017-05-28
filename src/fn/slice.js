const IterArray = require('iterarray')

module.exports = function slice (iterable, start = 0, end = Infinity) {
    return IterArray(iterable).slice(start, end)
}
