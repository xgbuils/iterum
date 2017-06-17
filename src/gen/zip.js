const baseZip = require('../core/baseZip')

module.exports = function* zip (firstIterable, secondIterable) {
    yield* baseZip(e => e, null, [firstIterable, secondIterable])
}
