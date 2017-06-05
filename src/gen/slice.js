const IterArray = require('iterarray')

module.exports = function slice (iterable, start, end) {
    return this(IterArray(iterable).slice(start, end))
}
