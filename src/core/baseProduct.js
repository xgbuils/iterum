const IterArray = require('iterarray')

function baseProduct (iterables, modulo, length) {
    const IterumConstructor = this
    return IterumConstructor(function* () {
        const cache = []
        for (const iterable of iterables) {
            cache.push(IterArray(iterable))
        }
        if (length === undefined) {
            ({length} = cache) // eslint-disable-line no-param-reassign
        }
        if (cache.length === 0 || cache.some(c => !c.has(0))) {
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
