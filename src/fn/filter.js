function filter (validator, Iterum) {
    return function (cb, context) {
        validator.validate([['Function']], [cb, context])
        var iterum = this
        return Iterum(function* () {
            let index = 0
            for (let val of iterum) {
                if (cb.call(context, val, index, iterum)) {
                    yield val
                }
                ++index
            }
        })
    }
}

module.exports = filter
