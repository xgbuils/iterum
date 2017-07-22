const IterArray = require('iterarray')

module.exports = function slice (start, end, iterable) {
    return IterArray(iterable).slice(start, end)
}
