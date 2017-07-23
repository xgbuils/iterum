const groupByGen = require('./internal/groupByGen')

module.exports = function (n, iterable) {
    if (n <= 0) {
        return this([])
    }
    return this(groupByGen.bind(this, iterable, (_, index) => {
        return Math.floor(index / n)
    }))
}
