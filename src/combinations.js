const combinationsGen = require('./internal/combinationsGen')

module.exports = function (iterable, n) {
    return this(combinationsGen.bind(this, iterable, n))
}
