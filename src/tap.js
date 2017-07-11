const mapGen = require('./internal/mapGen')

module.exports = function (cb, iterable) {
    return this(mapGen.bind(null, val => {
        cb(val)
        return val
    }, iterable))
}
