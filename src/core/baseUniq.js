function* baseUniq (iterable, used, cb) {
    for (const val of iterable) {
        const key = cb ? cb(val) : val
        if (!used.has(key)) {
            yield val
            used.add(key)
        }
    }
}

module.exports = baseUniq
