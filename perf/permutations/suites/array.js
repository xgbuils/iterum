const suiteCollection = require('../../suiteCollectionFactory')
const suite = require('../../suiteFactory')

const iterumWithTraversingTest = require('../tests/iterumWithTraversing')
const esIterWithTraversingTest = require('../tests/esIterWithTraversing')

const iterumWithoutTraversingTest = require('../tests/iterumWithoutTraversing')
const esIterWithoutTraversingTest = require('../tests/esIterWithoutTraversing')

const small = require('../setup/small')
const medium = require('../setup/medium')
const big = require('../setup/big')

const array = require('../setup/array')

const testsWithTraversing = [
    iterumWithTraversingTest,
    esIterWithTraversingTest
]
const testsWithoutTraversing = [
    iterumWithoutTraversingTest,
    esIterWithoutTraversingTest
]

module.exports = suiteCollection({
    name: 'array',
    suites: [
        suiteCollection({
            name: 'with traversing',
            suites: [
                suite({
                    name: 'small',
                    setups: [
                        small,
                        array
                    ],
                    tests: testsWithTraversing
                }),
                suite({
                    name: 'medium',
                    setups: [
                        medium,
                        array
                    ],
                    tests: testsWithTraversing
                }),
                suite({
                    name: 'big',
                    setups: [
                        big,
                        array
                    ],
                    tests: testsWithTraversing
                })
            ]
        }),
        suiteCollection({
            name: 'without traversing',
            suites: [
                suite({
                    name: 'small',
                    setups: [
                        small,
                        array
                    ],
                    tests: testsWithoutTraversing
                }),
                suite({
                    name: 'medium',
                    setups: [
                        medium,
                        array
                    ],
                    tests: testsWithoutTraversing
                }),
                suite({
                    name: 'big',
                    setups: [
                        big,
                        array
                    ],
                    tests: testsWithoutTraversing
                })
            ]
        })
    ]
})
