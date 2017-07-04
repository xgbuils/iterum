const suiteCollection = require('../../suiteCollectionFactory')
const suite = require('../../suiteFactory')

const iterumMethod = require('../tests/iterumMethod')
const iterumFunction = require('../tests/iterumFunction')
const imlazy = require('../tests/imlazy')
const ramda = require('../tests/ramda')
const immutable = require('../tests/immutable')
const native = require('../tests/native')

const cb = require('../setup/cb')

const smallIterable = require('../setup/smallIterable')
const mediumIterable = require('../setup/mediumIterable')
const bigIterable = require('../setup/bigIterable')

const fewMaps = require('../setup/fewMaps')
const enoughMaps = require('../setup/enoughMaps')
const manyMaps = require('../setup/manyMaps')

const array = require('../setup/array')

const tests = [
    iterumMethod,
    iterumFunction,
    imlazy,
    ramda,
    immutable,
    native
]

module.exports = suiteCollection({
    name: 'array',
    suites: [
        suiteCollection({
            name: 'iterable size',
            suites: [
                suite({
                    name: 'small',
                    setups: [
                        cb,
                        smallIterable,
                        enoughMaps,
                        array
                    ],
                    tests
                }),
                suite({
                    name: 'medium',
                    setups: [
                        cb,
                        mediumIterable,
                        enoughMaps,
                        array
                    ],
                    tests
                }),
                suite({
                    name: 'big',
                    setups: [
                        cb,
                        bigIterable,
                        enoughMaps,
                        array
                    ],
                    tests
                })
            ]
        }),
        suiteCollection({
            name: 'number of maps',
            suites: [
                suite({
                    name: 'few',
                    setups: [
                        cb,
                        mediumIterable,
                        fewMaps,
                        array
                    ],
                    tests
                }),
                suite({
                    name: 'enough',
                    setups: [
                        cb,
                        mediumIterable,
                        enoughMaps,
                        array
                    ],
                    tests
                }),
                suite({
                    name: 'a lot of',
                    setups: [
                        cb,
                        mediumIterable,
                        manyMaps,
                        array
                    ],
                    tests
                })
            ]
        })
    ]
})
