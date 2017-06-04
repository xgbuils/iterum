const baseProduct = require('../core/baseProduct')

function power (iterarray, length) {
    return baseProduct.call(this, [iterarray], length, 1)
}

module.exports = power
