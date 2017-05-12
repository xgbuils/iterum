const isEmpty = require('is-empty-iterable')
const validation = [[], ['Number', 'Undefined']]

function* repeat (iterable, times = Infinity) {
    if (times <= 0 || isEmpty(iterable)) {
        return
    }
    for (let i = 0; i < times; ++i) {
        yield* iterable
    }
}

module.exports = {
    gen: repeat,
    validation
}
