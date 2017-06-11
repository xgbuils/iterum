module.exports = function (indentation, string, prefix) {
    return new Promise(resolve => {
        process.stdout.write(' '.repeat(indentation) + (prefix || '') + string)
        resolve()
    })
}
