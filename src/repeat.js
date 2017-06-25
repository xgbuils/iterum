const repeatGen = require('./internal/repeatGen')

module.exports = function repeat (iterable, times) {
    return this(repeatGen.bind(null, iterable, times))
}
