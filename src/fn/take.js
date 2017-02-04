const slice = require('./slice')
const validation = [['Number', 'Undefined']]

function* take (n = 1) {
    yield* slice.gen.call(this, 0, n)
}

module.exports = {
    gen: take,
    validation
}
