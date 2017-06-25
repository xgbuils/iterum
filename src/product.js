const productGen = require('./internal/productGen')

module.exports = function (iterable) {
    return this(productGen.bind(this, iterable))
}
