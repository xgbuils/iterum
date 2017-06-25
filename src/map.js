const mapGen = require('./internal/mapGen')

module.exports = function map (iterable, cb) {
    return this(mapGen.bind(null, iterable, cb))
}
