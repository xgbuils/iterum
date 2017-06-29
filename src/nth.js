const IterArray = require('iterarray')

module.exports = function nth (n, iterable) {
    return IterArray(iterable).nth(n)
}
