function map (Iterum) {
    return function (cb, context) {
        var index = 0
        var iterator = this
        context = context || iterator
        return new Iterum(function () {
            var state = context.next()
            var done = state.done
            var result = {
                value: done ? undefined : cb(state.value, index, iterator),
                done: done
            }
            ++index
            return result
        })
    }
}

module.exports = map
