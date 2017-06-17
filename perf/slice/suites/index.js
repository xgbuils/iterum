const suiteCollection = require('../../suiteCollectionFactory')
const arraySuite = require('./array')
const setSuite = require('./set')

module.exports = suiteCollection({
    name: 'slice',
    suites: [
        arraySuite,
        setSuite
    ]
})
