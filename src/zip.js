const baseZip = require('./internal/baseZip')

module.exports = function (firstIterable, secondIterable) {
    return this(baseZip.bind(null, e => e, null, [secondIterable, firstIterable]))
}
