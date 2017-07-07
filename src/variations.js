const variationsGen = require('./internal/variationsGen')

module.exports = function (n, iterable) {
    return this(variationsGen.bind(this, n, iterable))
}
