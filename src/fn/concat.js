const Iterable = require('../core/iterable')
const validation = [[Iterable], Infinity]

function* concat (...iterables) {
    yield* this
    for (const iterable of iterables) {
        yield* iterable
    }
}

module.exports = {
    gen: concat,
    validation
}
