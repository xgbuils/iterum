const slice = require('./slice')

module.exports = function* drop (iterable, n = 1) {
    yield* slice(iterable, n)
}
