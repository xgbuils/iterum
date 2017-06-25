module.exports = function (a, b) {
    return a === b || Object.is(a, b)
}
