const IterArray = require('iterarray')

module.exports = function nth (iterarray, n) {
    return IterArray(iterarray).nth(n)
}
