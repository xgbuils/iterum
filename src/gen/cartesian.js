function* cartesian (...iterables) {
    const stack = []
    const length = iterables.length - 1
    const arr = Array(length)
    let index = 0
    const generators = iterables
        .map(iterable => iterable[Symbol.iterator].bind(iterable))
    let iterator = generators[index]()
    while (index >= 0) {
        const status = iterator.next()
        if (status.done) {
            --index
            iterator = stack.pop()
        } else if (index < length) {
            arr[index] = status.value
            index = stack.push(iterator)
            iterator = generators[index]()
        } else {
            yield arr.concat([status.value])
        }
    }
}

module.exports = cartesian
