const slice = require('./slice')
const validation = [[], ['Number', 'Undefined']]

function* take (iterable, n = 1) {
    yield* slice.gen(iterable, 0, n)
}

module.exports = {
    gen: take,
    validation
}
