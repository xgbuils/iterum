const map = {
    type: type => type.toLowerCase(),
    instance: type => `${type} instance`
}

function errorHandler (err) {
    if (err) {
        const {expected} = err
        if (!expected) {
            throw TypeError(`it is required argument ${err.nth + 1}`)
        }
        const expectedChunk = Object.keys(expected)
            .filter(key => expected[key].length > 0)
            .map(function (key) {
                const [firstType] = expected[key]
                const article = /^[aeiou]/i.test(firstType) ? 'an' : 'a'
                const expectedTypes = [`${article} ${firstType}`]
                    .concat(expected[key].slice(1))
                return expectedTypes
                    .map(type => map[key](type))
                    .join(' or ')
            })
            .join(', or ')
        throw TypeError(`${err.value} is not ${expectedChunk}`)
    }
}

module.exports = errorHandler
