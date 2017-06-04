function baseProduct (cache, length, modulo) {
    const IterumConstructor = this
    return IterumConstructor(function* () {
        if (cache.some(c => !c.has(0))) {
            return
        }
        const steps = [0]
        yield IterumConstructor(cacheToItem(cache, steps.slice(), length, modulo))
        let pos = 0

        while (pos < length) {
            ++steps[pos]
            if (cache[pos % modulo].has(steps[pos])) {
                steps.fill(0, 0, pos)
                yield IterumConstructor(cacheToItem(cache, steps.slice(), length, modulo))
                pos = 0
            } else {
                ++pos
                if (pos >= steps.length) {
                    steps.push(0)
                }
            }
        }
    })
}

function cacheToItem (cache, steps, length, modulo) {
    return function* () {
        for (let i = 0; i < length; ++i) {
            yield cache[i % modulo].nth(steps[i] || 0)
        }
    }
}

module.exports = baseProduct
