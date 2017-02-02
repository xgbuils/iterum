const validation = [['Function']]

function findEntry (cb, context) {
    for (const [index, val] of this.entries()) {
        if (cb.call(context || this, val, index, this)) {
            return [index, val]
        }
    }
}
module.exports = {
    fn: findEntry,
    validation
}
