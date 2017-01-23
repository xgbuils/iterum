function map (validator, Iterum) {
    return function (cb, context) {
        validator.validate([['Function']], [cb, context])
        var iterum = this
        return Iterum(function* () {
            for (let [index, val] of iterum.entries()) {
                yield cb.call(context, val, index, iterum)
            }
        })
    }
}

module.exports = map
