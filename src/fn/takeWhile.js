const validation = [['Function']]

function* takeWhile (cb, context) {
    for (const [index, val] of this.entries()) {
        if (cb.call(context, val, index, this)) {
            yield val
        } else {
            return
        }
    }
}

module.exports = {
    gen: takeWhile,
    validation
}
