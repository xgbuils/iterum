function concat (validator, Iterum, Iterable) {
    return function (...iterables) {
        validator.validate([[Iterable], Infinity], iterables)
        var first = this
        iterables = iterables.map(iterable => Iterum(iterable))
        return Iterum(function* () {
            for (let val of first) {
                yield val
            }
            for (let iterable of iterables) {
                for (let val of iterable) {
                    yield val
                }
            }
        })
    }
}

module.exports = concat
