const baseRange = require('../core/baseRange')

module.exports = function range (start, end) {
    return this(baseRange(start, end))
}
