const validation = [['Function']]
const baseGroup = require('../core/baseGroup')

function groupBy (cb = e => e) {
    return this.constructor(baseGroup(this, {
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
    }, cb))
}

module.exports = {
    fn: groupBy,
    validation
}
