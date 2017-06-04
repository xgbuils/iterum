const baseProduct = require('../core/baseProduct')
const IterArray = require('iterarray')

function product (...iterables) {
    const {length} = iterables
    const cache = iterables.map(iterable => IterArray(iterable))
    return baseProduct.call(this, cache, length, length)
}

module.exports = product
