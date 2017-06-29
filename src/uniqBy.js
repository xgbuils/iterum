const baseUniq = require('./internal/baseUniq')

module.exports = function uniqBy (cb, iterable) {
    return this(baseUniq.bind(null, iterable, () => new Set(), cb))
}
