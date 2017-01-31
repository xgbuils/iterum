function slice (validator, Iterum) {
    return function (start = 0, end = Infinity) {
        validator.validate([['Number', 'Undefined'], ['Number', 'Undefined']], [start, end])
        const iterum = this
        return Iterum(function* () {
            for (const [index, val] of iterum.entries()) {
                if (index >= end) {
                    return
                } else if (index >= start) {
                    yield val
                }
            }
        })
    }
}

module.exports = slice
