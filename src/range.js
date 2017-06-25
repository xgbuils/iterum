const baseRange = require('./internal/baseRange')

module.exports = function range (start, end) {
    return this(baseRange.bind(null, start, end))
}
