const traverseArraySuite = require('./traverse_array')
const traverseSetSuite = require('./traverse_set')

module.exports = [{
    name: 'traverse array',
    suite: traverseArraySuite
}, {
    name: 'traverse set',
    suite: traverseSetSuite
}]
