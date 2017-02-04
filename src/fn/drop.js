const slice = require('./slice')
const validation = [['Number', 'Undefined']]

function* drop (n = 1) {
    yield* slice.gen.call(this, n)
}

module.exports = {
    gen: drop,
    validation
}
