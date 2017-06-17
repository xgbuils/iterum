const suitesCollection = require('./suiteCollectionFactory')
const slice = require('./slice/suites/')

suitesCollection({
    name: 'benchmark',
    suites: [
        slice
    ]
})()
