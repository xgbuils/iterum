const baseProduct = require('../core/baseProduct')
const baseMap = require('../core/baseMap')

function product (iterables) {
    const IterumConstructor = this
    const product = baseProduct.call(this, iterables, Infinity)

    return IterumConstructor(baseMap(product, function (item) {
        return IterumConstructor(item)
    }))
}

module.exports = product
