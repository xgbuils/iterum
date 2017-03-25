function reverseCompose (...generators) {
    return generators.reduce(function (resultGen, gen) {
        return function* (y) {
            for (const val of resultGen(y)) {
                yield* gen(val)
            }
        }
    }, function* (x) {
        yield x
    })
}

module.exports = reverseCompose
