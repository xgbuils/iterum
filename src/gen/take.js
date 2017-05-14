const slice = require('./slice')

module.exports = function* take (iterable, n = 1) {
    yield* slice(iterable, 0, n)
}
