function map (Iterum) {
    return function (cb, context) {
        var index = 0
        var iterator = this
        context = context || iterator
        return new Iterum(function () {
            var state = iterator.next()
            var done = state.done
            var result = {
                value: done ? undefined : cb.call(context, state.value, index, iterator),
                done: done
            }
            ++index
            return result
        })
    }
}

module.exports = map
