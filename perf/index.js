const suitesCollection = require('./suiteCollectionFactory')
const slice = require('./slice/suites/')
const product = require('./product/suites/')

suitesCollection({
    name: 'benchmark',
    suites: [
        slice,
        product
    ]
})()
