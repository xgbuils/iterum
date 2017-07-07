const combinationsGen = require('./internal/combinationsGen')

module.exports = function (n, iterable) {
    return this(combinationsGen.bind(this, n, iterable))
}
