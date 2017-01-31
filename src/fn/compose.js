const initArrayStatus = require('../core/init-array-status')
const createNewIterator = require('../core/create-new-iterator')

function compose (...generators) {
    return function* (...args) {
        const state = {
            index: 0,
            newItem: true
        }
        state.nextParamsCallback = function (...nextParams) {
            state.nextParams = nextParams
        }
        yield* composeGeneratorCreator(state, initArrayStatus(generators, args))
    }
}

function* composeGeneratorCreator (state, array) {
    const last = array[array.length - 1]
    const context = {}
    while (true) {
        next(context, state, array)
        if (state.index < 0) {
            return
        }
        yield last.state.value
    }
}

function next (context, state, array) {
    const {length} = array
    let {index} = state
    while (index >= 0 && index < length) {
        const item = array[index]
        if (state.newItem) {
            createNewIterator(context, item, array[index - 1], state)
        }
        const s = item.state = item.itor.next()
        const {done} = s
        const inc = done ? -1 : 1
        index += inc
        if (inc > 0 && state.newItem && index < length) {
            array[index].args = state.nextParams
        }
        state.newItem = !done
    }
    state.newItem = index < length
    state.index = --index
}

module.exports = compose
