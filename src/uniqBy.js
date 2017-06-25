const baseUniq = require('./internal/baseUniq')

module.exports = function uniqBy (iterable, cb) {
    return this(baseUniq.bind(null, iterable, () => new Set(), cb))
}
