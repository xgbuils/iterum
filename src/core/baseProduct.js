const IterArray = require('iterarray')
const baseMap = require('./baseMap')

function baseProduct (iterables, modulo, length) {
    const cache = []
    const stepsIterator = (function* () {
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
        yield steps.slice()
        let pos = 0

        while (pos < length) {
            ++steps[pos]
            if (cache[pos % modulo].has(steps[pos])) {
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
    })()

    return baseMap(stepsIterator, function (steps) {
        return toProductItem(cache, steps, length, modulo)
    })
}

function toProductItem (cache, steps, length, modulo) {
    return function* () {
        for (let i = 0; i < length; ++i) {
            yield cache[i % modulo].nth(steps[i] || 0)
        }
    }
}

module.exports = baseProduct
