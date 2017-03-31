function baseGroup (iterum, used, cb) {
    for (const val of iterum) {
        const key = cb ? cb(val) : val
        used.add(key, val)
    }
    return used.obj
}

module.exports = baseGroup
