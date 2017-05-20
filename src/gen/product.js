function* product (...iterables) {
    const {length} = iterables
    const iterators = iterables
        .map(iterable => iterable[Symbol.iterator]())
    const states = iterators.map(it => it.next())
    if (states.some(({done}) => done)) {
        return
    }
    const cache = states.map(({value}) => [value])
    const steps = Array(length).fill(0)
    yield cacheToItem(cache, steps)
    let index = 0
    let pos = 0
    let iterator = iterators[index]

    while (index < length) {
        ++steps[pos]
        let newItem
        if (pos < index) {
            newItem = steps[pos] < cache[pos].length
        } else {
            const {done, value} = iterator.next()
            newItem = !done
            if (!done) {
                cache[pos].push(value)
            } else {
                ++index
            }
        }

        if (newItem) {
            steps.fill(0, 0, pos)
            yield this(cacheToItem(cache, steps))
            pos = 0
        } else {
            ++pos
            iterator = iterators[pos]
        }
    }
}

function cacheToItem (cache, steps) {
    return cache.map((c, i) => c[steps[i]])
}

module.exports = product
