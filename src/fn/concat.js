function concat (Iterum) {
    return function (iterator2) {
        var iterator = this
        var done = false
        var state
        return new Iterum(function () {
            if (!done) {
                state = iterator.next()
                done = state.done
            }
            if (iterator !== iterator2 && done) {
            	iterator = iterator2
            	state = iterator.next()
                done = state.done
            }
            return state
        })
    }
}

module.exports = concat
