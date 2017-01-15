function Repeat (validator, Iterum) {
    return function (value, times) {
        validator.validate([[], ['Number', 'Undefined']], [value, times])
        return Iterum(function () {
            times = times !== undefined ? times : Infinity
            var index = 0
            return {
                next: function () {
                    var done = index >= times
                    var result = {
                        value: done ? undefined : value,
                        done: done
                    }
                    ++index
                    return result
                }
            }
        })
    }
}

module.exports = Repeat
