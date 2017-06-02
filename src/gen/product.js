const IterArray = require('iterarray')
const map = require('./map')

function* product (...iterables) {
    const {length} = iterables
    const cache = iterables.map(iterable => IterArray(iterable))
    const iterable = IterArray(function* () {
        if (cache.some(c => !c.has(0))) {
            return
        }
        const steps = [0]
        yield steps.slice()
        let pos = 0

        while (pos < length) {
            ++steps[pos]
            if (cache[pos].has(steps[pos])) {
                steps.fill(0, 0, pos)
                yield steps.slice()
                pos = 0
            } else {
                ++pos
                if (pos >= steps.length) {
                    steps.push(0)
                }
            }
        }
    })

    yield * map(iterable, steps => cacheToItem(cache, steps))
}

function cacheToItem (cache, steps) {
    return cache.map((c, i) => c.nth(steps[i] || 0))
}

module.exports = product
