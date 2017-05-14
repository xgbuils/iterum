const isEmpty = require('is-empty-iterable')

module.exports = function* repeat (iterable, times = Infinity) {
    if (times <= 0 || isEmpty(iterable)) {
        return
    }
    for (let i = 0; i < times; ++i) {
        yield* iterable
    }
}
