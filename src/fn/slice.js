const validation = [['Number', 'Undefined'], ['Number', 'Undefined']]

function* slice (start = 0, end = Infinity) {
    for (const [index, val] of this.entries()) {
        if (index >= end) {
            return
        } else if (index >= start) {
            yield val
        }
    }
}

module.exports = {
    gen: slice,
    validation
}
