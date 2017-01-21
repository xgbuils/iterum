function Repeat (validator, Iterum) {
    return function (value, times = Infinity) {
        validator.validate([[], ['Number', 'Undefined']], [value, times])
        return Iterum(function* () {
            for (let i = 0; i < times; ++i) {
                yield value
            }
        })
    }
}

module.exports = Repeat
