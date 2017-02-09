const Iterable = require('../core/iterable')
const validation = [['Number', 'Undefined']]

function* flatten (n = 1) {
    let iterator = this[Symbol.iterator]()
    const stack = []

    while (true) {
        let done
        let value
        let pop
        let push
        do {
            const state = iterator.next()
            ;({value, done} = state)
            pop = done && stack.length > 0
            push = !done && value instanceof Iterable && stack.length < n
            if (pop) {
                iterator = stack.pop()
            } else if (push) {
                stack.push(iterator)
                iterator = value[Symbol.iterator]()
            }
        } while (pop || push)
        if (done) {
            return
        }
        yield value
    }
}

module.exports = {
    gen: flatten,
    validation
}
