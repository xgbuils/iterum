const mapGen = require('./internal/mapGen')

module.exports = function map (cb, iterable) {
    return this(mapGen.bind(null, cb, iterable))
}
