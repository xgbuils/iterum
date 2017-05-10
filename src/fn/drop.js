const slice = require('./slice')
const validation = [[], ['Number', 'Undefined']]

function* drop (iterable, n = 1) {
    yield* slice.gen(iterable, n)
}

module.exports = {
    gen: drop,
    validation
}
