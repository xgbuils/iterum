const baseRepeat = require('../core/baseRepeat')

module.exports = function repeat (iterable, times) {
    return this(baseRepeat.bind(null, iterable, times))
}
