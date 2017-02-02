const validation = [['Function']]

function* filter (cb, context) {
    for (const [index, val] of this.entries()) {
        if (cb.call(context, val, index, this)) {
            yield val
        }
    }
}

module.exports = {
    gen: filter,
    validation
}
