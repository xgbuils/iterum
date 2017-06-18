const suiteCollection = require('../../suiteCollectionFactory')
const suite = require('../../suiteFactory')

const iterumPowerWithTraversingTest = require('../tests/iterumPowerWithTraversing')
const iterumProductWithTraversingTest = require('../tests/iterumProductWithTraversing')

const iterumPowerWithoutTraversingTest = require('../tests/iterumPowerWithoutTraversing')
const iterumProductWithoutTraversingTest = require('../tests/iterumProductWithoutTraversing')

const smallIterable = require('../setup/smallIterable')
const mediumIterable = require('../setup/mediumIterable')
const bigIterable = require('../setup/bigIterable')

const array = require('../setup/array')

const testsWithTraversing = [
    iterumPowerWithTraversingTest,
    iterumProductWithTraversingTest
]
const testsWithoutTraversing = [
    iterumPowerWithoutTraversingTest,
    iterumProductWithoutTraversingTest
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
                        smallIterable,
                        array
                    ],
                    tests: testsWithTraversing
                }),
                suite({
                    name: 'medium',
                    setups: [
                        mediumIterable,
                        array
                    ],
                    tests: testsWithTraversing
                }),
                suite({
                    name: 'big',
                    setups: [
                        bigIterable,
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
                        smallIterable,
                        array
                    ],
                    tests: testsWithoutTraversing
                }),
                suite({
                    name: 'medium',
                    setups: [
                        mediumIterable,
                        array
                    ],
                    tests: testsWithoutTraversing
                }),
                suite({
                    name: 'big',
                    setups: [
                        bigIterable,
                        array
                    ],
                    tests: testsWithoutTraversing
                })
            ]
        })
    ]
})
