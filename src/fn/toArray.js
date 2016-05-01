function toArray () {
    return function () {
        var iterator = this.generator()
        var state
        var values = []
        while (!(state = iterator.next()).done) {
            values.push(state.value)
        }
        return values
    }
}

module.exports = toArray
