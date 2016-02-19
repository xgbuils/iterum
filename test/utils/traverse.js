function traverse (iterator, cb, n) {
    if (!(typeof cb === 'function')) {
        n = cb
        cb = function () {}
    }
    var node = iterator.next()
    var i = 0
    while ((n !== undefined && i < n) || (n === undefined && !node.done)) {
        cb(node)
        node = iterator.next()
        ++i
    }
    // return last node
    return node
}

module.exports = traverse