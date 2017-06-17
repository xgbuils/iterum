const baseProduct = require('../core/baseProduct')

function power (iterarray, length) {
    return baseProduct.call(this, [iterarray], 1, length)
}

module.exports = power
