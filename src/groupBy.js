const groupByGen = require('./internal/groupByGen')

module.exports = function (cb, iterable) {
    return this(groupByGen.bind(this, iterable, cb))
}
