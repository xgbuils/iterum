function concat (validator, Iterum, Iterable) {
    return function (...iterables) {
        validator.validate([[Iterable], Infinity], iterables)
        const iterum = this
        const iterumIterables = iterables.map(iterable => Iterum(iterable))
        return Iterum(function* () {
            for (const val of iterum) {
                yield val
            }
            for (const iterable of iterumIterables) {
                for (const val of iterable) {
                    yield val
                }
            }
        })
    }
}

module.exports = concat
