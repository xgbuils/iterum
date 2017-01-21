function repeat (validator, Iterum) {
    return function (times = Infinity) {
        validator.validate([['Number', 'Undefined']], [times])
        var iterum = this
        return Iterum(function* () {
            for (let i = 0; i < times; ++i) {
                yield iterum
            }
        })
    }
}

module.exports = repeat
