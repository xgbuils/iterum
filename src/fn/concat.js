const Iterable = require('../core/iterable')
const validation = [[Iterable], Infinity]

function* concat (...iterables) {
    for (const val of this) {
        yield val
    }
    for (const iterable of iterables) {
        for (const val of iterable) {
            yield val
        }
    }
}

module.exports = {
    gen: concat,
    validation
}
