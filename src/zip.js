const baseZip = require('./internal/baseZip')

module.exports = function zip (firstIterable, secondIterable) {
    return this(baseZip.bind(null, e => e, null, [secondIterable, firstIterable]))
}
