module.exports = function (iterum) {
    return {
        iterator: iterum.generator(),
        stack: [],
        iterum: iterum,
        index: 0
    }
}
