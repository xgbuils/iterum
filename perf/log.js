module.exports = function(indentation, string, prefix) {
    return new Promise((resolve) => {
        prefix = prefix || ''
        process.stdout.write(' '.repeat(indentation) + prefix + string)
        resolve()
    })
}