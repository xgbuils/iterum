function repeat (value, times) {
    times = typeof times === 'number' ? times : Infinity
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

module.exports = repeat
