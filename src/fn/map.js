function map (iterumStateCreator, validator, Iterum) {
    return function (cb, context) {
        validator.validate([['Function']], [cb, context])
        var iterum = this
        return Iterum(function* () {
            let index = 0
            for (let val of iterum) {
                yield cb.call(context, val, index, iterum)
                ++index
            }
        })
    }
}

module.exports = map
