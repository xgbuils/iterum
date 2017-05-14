const baseZip = require('../core/baseZip')

module.exports = function* zip (...iterables) {
    yield* baseZip(e => e, null, iterables)
}
