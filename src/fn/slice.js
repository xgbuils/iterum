function slice (validator, Iterum) {
    return function (start = 0, end = Infinity) {
        validator.validate([['Number', 'Undefined'], ['Number', 'Undefined']], [start, end])
        var iterum = this
        return Iterum(function* () {
            let index = 0
            for (let val of iterum) {
                if (index >= end) {
                    return
                } else if (index >= start) {
                    yield val
                }
                ++index
            }
        })
    }
}

module.exports = slice
