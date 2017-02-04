const validation = [['Function']]

function* dropWhile (cb, context) {
    let next = false
    for (const [index, val] of this.entries()) {
        if (next) {
            yield val
        } else if (!cb.call(context, val, index, this)) {
            next = true
            yield val
        }
    }
}

module.exports = {
    gen: dropWhile,
    validation
}
