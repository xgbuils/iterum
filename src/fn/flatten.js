const Iterable = require('../core/iterable')
const validation = [[], ['Number', 'Undefined']]
const typeVerify = require('type-verify')

function* flatten (iterable, n = 1) {
    let iterator = iterable[Symbol.iterator]()
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
            push = !done && typeVerify(value, [Iterable]) && stack.length < n
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
