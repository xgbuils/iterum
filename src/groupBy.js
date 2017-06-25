const groupByGen = require('./internal/groupByGen')

module.exports = function (iterable, cb) {
    return this(groupByGen.bind(this, iterable, cb))
}
