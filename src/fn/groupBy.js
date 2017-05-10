const baseGroup = require('../core/baseGroup')
const validation = [[], ['Function']]

function groupBy (iterable, cb = e => e) {
    return baseGroup(iterable, {
        obj: new Map(),
        add (key, val) {
            const {obj} = this
            let arr
            if (obj.has(key)) {
                arr = obj.get(key)
            } else {
                arr = []
                obj.set(key, arr)
            }
            arr.push(val)
        }
    }, cb)
}

module.exports = {
    fn: groupBy,
    validation,
    wrapResult: true
}
