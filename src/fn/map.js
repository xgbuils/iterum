const validation = [['Function']]

function* map (cb, context) {
    for (const [index, val] of this.entries()) {
        yield cb.call(context, val, index, this)
    }
}

module.exports = {
    gen: map,
    validation
}
