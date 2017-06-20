function* baseUniq (iterable, usedCreator, cb) {
    const used = usedCreator()
    for (const val of iterable) {
        const key = cb ? cb(val) : val
        if (!used.has(key)) {
            yield val
            used.add(key)
        }
    }
}

module.exports = baseUniq
