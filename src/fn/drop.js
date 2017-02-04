const dropWhile = require('./dropWhile')
const validation = [['Number', 'Undefined']]

function* drop (n = 1) {
    yield* dropWhile.gen.call(this, (_, index) => index < n)
}

module.exports = {
    gen: drop,
    validation
}
