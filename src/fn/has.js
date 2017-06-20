const IterArray = require('iterarray')

module.exports = function has (iterarray, n) {
    return IterArray(iterarray).has(n)
}
