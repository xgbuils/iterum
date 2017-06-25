const suitesCollection = require('./suiteCollectionFactory')

const combinations = require('./combinations/suites/')
const permutations = require('./permutations/suites/')
const power = require('./power/suites/')
const product = require('./product/suites/')
const slice = require('./slice/suites/')

suitesCollection({
    name: 'benchmark',
    suites: [
        combinations,
        permutations,
        power,
        product,
        slice
    ]
})()
