const Iterable = require('../core/iterable')
const validation = [[Iterable], Infinity]

function* concat (...iterables) {
    const iterumIterables = iterables
      .map(iterable => this.constructor(iterable))
    for (const val of this) {
        yield val
    }
    for (const iterable of iterumIterables) {
        for (const val of iterable) {
            yield val
        }
    }
}

module.exports = {
    gen: concat,
    validation
}
