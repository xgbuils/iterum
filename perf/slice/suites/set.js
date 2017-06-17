const suiteCollection = require('../../suiteCollectionFactory')
const suite = require('../../suiteFactory')

const iterumWithTraversingTest = require('../tests/iterumWithTraversing')
const imlazyWithTraversingTest = require('../tests/imlazyWithTraversing')

const iterumWithoutTraversingTest = require('../tests/iterumWithoutTraversing')
const imlazyWithoutTraversingTest = require('../tests/imlazyWithoutTraversing')

const small = require('../setup/small')
const medium = require('../setup/medium')
const big = require('../setup/big')

const set = require('../setup/set')

const testsWithTraversing = [
    iterumWithTraversingTest,
    imlazyWithTraversingTest
]
const testsWithoutTraversing = [
    iterumWithoutTraversingTest,
    imlazyWithoutTraversingTest
]

module.exports = suiteCollection({
    name: 'set',
    suites: [
        suite({
            name: 'small with traversing',
            setups: [
                small,
                set
            ],
            tests: testsWithTraversing
        }),
        suite({
            name: 'medium with traversing',
            setups: [
                medium,
                set
            ],
            tests: testsWithTraversing
        }),
        suite({
            name: 'big with traversing',
            setups: [
                big,
                set
            ],
            tests: testsWithTraversing
        }),
        suite({
            name: 'small without traversing',
            setups: [
                medium,
                set
            ],
            tests: testsWithoutTraversing
        }),
        suite({
            name: 'medium without traversing',
            setups: [
                medium,
                set
            ],
            tests: testsWithoutTraversing
        }),
        suite({
            name: 'big without traversing',
            setups: [
                big,
                set
            ],
            tests: testsWithoutTraversing
        })
    ]
})
