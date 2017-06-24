const suitesCollection = require('./suiteCollectionFactory')
const slice = require('./slice/suites/')
const permutations = require('./permutations/suites/')
const product = require('./product/suites/')
const power = require('./power/suites/')

suitesCollection({
    name: 'benchmark',
    suites: [
        slice,
        product,
        power,
        permutations
    ]
})()
