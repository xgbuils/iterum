const IterArray = require('iterarray')

module.exports = function has (n, iterable) {
    return IterArray(iterable).has(n)
}
