const baseProduct = require('../core/baseProduct')

function product (iterables) {
    return baseProduct.call(this, iterables, Infinity)
}

module.exports = product
