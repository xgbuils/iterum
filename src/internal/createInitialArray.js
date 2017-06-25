module.exports = function createInitialArray (iterator, size) {
    const array = []
    for (let i = 0; i < size; ++i) {
        const {value, done} = iterator.next()
        if (!done) {
            array.push(value)
        }
    }
    return array
}
