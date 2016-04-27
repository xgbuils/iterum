function concat (Iterum) {
    return function (iterator2) {
        var iterator = this
        var state
        return new Iterum(function () {
            state = iterator.next()
            if (state.done && iterator !== iterator2) {
                iterator = iterator2
                state = iterator.next()
            }
            return state
        })
    }
}

module.exports = concat
