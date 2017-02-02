const validation = [['Number', 'Undefined']]

function* repeat (times = Infinity) {
    for (let i = 0; i < times; ++i) {
        yield this
    }
}

module.exports = {
    gen: repeat,
    validation
}
