const IterArray = require('iterarray')
const MAX_LENGTH = 10

module.exports = function (iterable) {
    const array = [...IterArray(iterable).slice(0, MAX_LENGTH + 1)]
    let ellipsis = ''
    if (array.length > MAX_LENGTH) {
        array.pop()
        ellipsis = '...'
    }
    return `(${array.join(' ')}${ellipsis})`
}
