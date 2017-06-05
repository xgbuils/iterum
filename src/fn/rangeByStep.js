const baseRange = require('../core/baseRange')

module.exports = function rangeByStep (start, end, step) {
    return this(baseRange(start, end, step))
}
