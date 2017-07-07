module.exports = {
    toNestedArray (iterable) {
        return [...iterable].map(item => [...item])
    },
    toArray (iterable) {
        return [...iterable]
    }
}
