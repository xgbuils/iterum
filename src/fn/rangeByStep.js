const baseRange = require('../core/baseRange')

module.exports = function rangeByStep (start, end, step) {
    return this(baseRange.bind(null, start, end, step))
}
