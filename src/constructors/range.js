function Range (a, b, inc) {
    inc || (inc = 1)
    var sign = inc > 0 ? 1 : -1
    var value = a - inc
    return {
        next: function () {
            value += inc
            var done = (b - value) * sign < 0
            return {
                value: done ? undefined : value,
                done: done
            }
        }
    }
}

Range.validArgs = [['Number'], ['Number'], ['Number', 'Undefined']]

module.exports = Range
