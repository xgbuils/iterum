const baseZip = require('../core/baseZip')

module.exports = function zip (firstIterable, secondIterable) {
    return this(baseZip(e => e, null, [firstIterable, secondIterable]))
}
