const suiteCollection = require('../../suiteCollectionFactory')
const suite = require('../../suiteFactory')

const iterumWithTraversingTest = require('../tests/iterumWithTraversing')
const imlazyWithTraversingTest = require('../tests/imlazyWithTraversing')

const iterumWithoutTraversingTest = require('../tests/iterumWithoutTraversing')
const imlazyWithoutTraversingTest = require('../tests/imlazyWithoutTraversing')

const iterumTwoCallsWithTraversingTest = require('../tests/iterumTwoCallsWithTraversing')
const imlazyTwoCallsWithTraversingTest = require('../tests/imlazyTwoCallsWithTraversing')

const small = require('../setup/small')
const medium = require('../setup/medium')
const big = require('../setup/big')

const set = require('../setup/set')

const testsWithTraversing = [
    iterumWithTraversingTest,
    imlazyWithTraversingTest
]
const testsTwoCallsWithTraversing = [
    iterumTwoCallsWithTraversingTest,
    imlazyTwoCallsWithTraversingTest
]
const testsWithoutTraversing = [
    iterumWithoutTraversingTest,
    imlazyWithoutTraversingTest
]

module.exports = suiteCollection({
    name: 'set',
    suites: [
        suiteCollection({
            name: 'with traversing',
            suites: [
                suite({
                    name: 'small',
                    setups: [
                        small,
                        set
                    ],
                    tests: testsWithTraversing
                }),
                suite({
                    name: 'medium',
                    setups: [
                        medium,
                        set
                    ],
                    tests: testsWithTraversing
                }),
                suite({
                    name: 'big',
                    setups: [
                        big,
                        set
                    ],
                    tests: testsWithTraversing
                })
            ]
        }),
        suiteCollection({
            name: 'two calls with traversing',
            suites: [
                suite({
                    name: 'small',
                    setups: [
                        small,
                        set
                    ],
                    tests: testsTwoCallsWithTraversing
                }),
                suite({
                    name: 'medium',
                    setups: [
                        medium,
                        set
                    ],
                    tests: testsTwoCallsWithTraversing
                }),
                suite({
                    name: 'big',
                    setups: [
                        big,
                        set
                    ],
                    tests: testsTwoCallsWithTraversing
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
                        set
                    ],
                    tests: testsWithoutTraversing
                }),
                suite({
                    name: 'medium',
                    setups: [
                        medium,
                        set
                    ],
                    tests: testsWithoutTraversing
                }),
                suite({
                    name: 'big',
                    setups: [
                        big,
                        set
                    ],
                    tests: testsWithoutTraversing
                })
            ]
        })
    ]
})
