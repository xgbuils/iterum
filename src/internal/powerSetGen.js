const combinationsGen = require('./combinationsGen')

module.exports = function* powerSet (iterable) {
    let index = 0
    while (true) {
        const combinations = combinationsGen.call(this, iterable, index)
        const {value, done} = combinations.next()
        if (done) {
            return
        }
        yield value
        yield* combinations
        ++index
    }
}
