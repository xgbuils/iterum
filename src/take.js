const IterArray = require('iterarray')

module.exports = function take (n, iterarray) {
    return this(IterArray(iterarray).slice(0, n))
}
