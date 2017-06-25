const IterArray = require('iterarray')

module.exports = function take (iterarray, n) {
    return this(IterArray(iterarray).slice(0, n))
}
