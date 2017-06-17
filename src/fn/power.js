const baseProduct = require('../core/baseProduct')
const baseMap = require('../core/baseMap')

function power (iterarray, length) {
    const IterumConstructor = this
    const product = baseProduct.call(this, [iterarray], 1, length)

    return IterumConstructor(baseMap(product, function (item) {
        return IterumConstructor(item)
    }))
}

module.exports = power
