function concat (validator, Iterum) {
    return function (generator, ...args) {
        validator.validate([['Function', Iterum]], [generator])
        var first = this
        var second = generator instanceof Iterum ? generator : Iterum(generator, ...args)
        return Iterum(function* () {
            for (let val of first) {
                yield val
            }
            for (let val of second) {
                yield val
            }
        })
    }
}

module.exports = concat
