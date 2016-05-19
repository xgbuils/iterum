function Repeat (value, times) {
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
}

Repeat.validArgs = [[], ['Number', 'Undefined']]

module.exports = Repeat
