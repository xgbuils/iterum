function* baseZip (cbAll, cbSome, iterables) {
    const iterableList = [...iterables]
    const iterators = iterableList.map(iterable => iterable[Symbol.iterator]())
    let cb = cbAll
    while (cb) {
        const states = iterators.map(iterator => iterator.next())
        const firstDone = states[0].done
        const index = states.findIndex(state => !firstDone === state.done)
        const applySome = index !== -1
        cb = applySome ? cbSome : cbAll
        if (cb && (applySome || !firstDone)) {
            yield cb(states.map(state => state.value))
        } else {
            return
        }
    }
}

module.exports = baseZip
