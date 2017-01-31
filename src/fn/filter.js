function filter (validator, Iterum) {
    return function (cb, context) {
        validator.validate([['Function']], [cb, context])
        const iterum = this
        return Iterum(function* () {
            for (const [index, val] of iterum.entries()) {
                if (cb.call(context, val, index, iterum)) {
                    yield val
                }
            }
        })
    }
}

module.exports = filter
