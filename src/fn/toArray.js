function toArray () {
    return function () {
        var state
        var values = []
        while (!(state = this.next()).done) {
            values.push(state.value)
        }
        return values
    }
}

module.exports = toArray
