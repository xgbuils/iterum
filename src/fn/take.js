const takeWhile = require('./takeWhile')
const validation = [['Number', 'Undefined']]

function* take (n = 1) {
    yield* takeWhile.gen.call(this, (_, index) => index < n)
}

module.exports = {
    gen: take,
    validation
}
