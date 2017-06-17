module.exports = function* concat (firstIterable, secondIterable) {
    yield* firstIterable
    yield* secondIterable
}
