const repeatGen = require('./internal/repeatGen')

module.exports = function repeat (times, iterable) {
    return this(repeatGen.bind(null, times, iterable))
}
