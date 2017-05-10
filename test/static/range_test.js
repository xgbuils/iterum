const {expect} = require('chai')
const Iterum = require('../../src/index.js')
const {range} = Iterum
const THRESHOLD_INFINITY_TEST = 50

describe('Iterum.range', function () {
    describe('range that increases', function () {
        it('if end value is greater than start value it produces values', function () {
            const iterable = range(-2, 8, 2)
            expect([...iterable]).to.be.deep.equal([-2, 0, 2, 4, 6, 8])
        })
        it('if start value is greater than end value it does not produce values', function () {
            const iterable = range(6, 0, 3)
            expect([...iterable]).to.be.deep.equal([])
        })
        it('if start value is equal to end value it produces one value', function () {
            const iterable = range(5, 5, 1)
            expect([...iterable]).to.be.deep.equal([5])
        })
    })

    describe('range that decreases', function () {
        it('if start value is greater than end value it produces values', function () {
            const iterable = range(6, 0, -1)
            expect([...iterable]).to.be.deep.equal([6, 5, 4, 3, 2, 1, 0])
        })
        it('if end value is greater than start value it does not produce values', function () {
            const iterable = range(10, 200, -2)
            expect([...iterable]).to.be.deep.equal([])
        })
        it('if end value is equal than start value it produces one value', function () {
            const iterable = range(150, 150, -3)
            expect([...iterable]).to.be.deep.equal([150])
        })
    })

    describe('range with 0 increment', function () {
        it('if start value is greater than end value it produces infinite `start` values', function () {
            const iterable = range(6, 0, 0)
            expect([...iterable.take(THRESHOLD_INFINITY_TEST)]).to.be
                .deep.equal([...Iterum([6]).repeat(THRESHOLD_INFINITY_TEST)])
        })
        it('if start value is greater than end value it produces infinite `start` values', function () {
            const iterable = range(10, 200, 0)
            expect([...iterable.take(THRESHOLD_INFINITY_TEST)]).to.be
                .deep.equal([...Iterum([10]).repeat(THRESHOLD_INFINITY_TEST)])
        })
        it('if end value is equal than start value it does not produce values', function () {
            const iterable = range(3, 3, 0)
            expect([...iterable.take(THRESHOLD_INFINITY_TEST)]).to.be
                .deep.equal([...Iterum([3]).repeat(THRESHOLD_INFINITY_TEST)])
        })
    })

    describe('range shorcuts', function () {
        it('range(a, b) is the same as range(a, b, 1)', function () {
            const a = 2
            const b = 4
            expect([...range(a, b)]).to.be.deep.equal([...range(a, b, 1)])
        })

        it('range(a) is the same as range(a, Infinity)', function () {
            const a = 6
            expect([...range(a).take(THRESHOLD_INFINITY_TEST)]).to.be
                .deep.equal([...range(a, Infinity).take(THRESHOLD_INFINITY_TEST)])
        })

        it('range() is the same as range(0)', function () {
            expect([...range().take(THRESHOLD_INFINITY_TEST)]).to.be
                .deep.equal([...range(0).take(THRESHOLD_INFINITY_TEST)])
        })
    })

    describe('converting iterum instance to array', function () {
        it('returns the same as converting [Symbol.iterator]() iterator to array', function () {
            const rangeIterable = range(8, 3, -1)
            const iterator = rangeIterable[Symbol.iterator]()
            expect([...iterator]).to.be.deep.equal([...rangeIterable])
        })
    })

    describe('bad arguments', function () {
        it('throws an exception when is not passed any parameter', function () {
            function foo () {
                range(null)
            }
            expect(foo).to.throw(TypeError,
                /null is not a number/)
        })

        it('throws an exception when is not passed number as second parameter', function () {
            function foo () {
                range(2, [2, 3])
            }
            expect(foo).to.throw(TypeError,
                /2,3 is not a number/)
        })
    })

    describe('If Iterum.range instance is passed as param of Iterum', function () {
        it('returns the same reference', function () {
            const a = range(6, 3, -2)
            const b = Iterum(a)
            expect(a).to.be.not.equal(b)
            expect([...a]).to.be.deep.equal([...b])
        })
    })
})
