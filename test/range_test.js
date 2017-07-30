const {expect} = require('chai')
const Iterum = require('../src/')
const {range} = Iterum

describe('Iterum.range', function () {
    it('if end value is greater than start value it produces values', function () {
        const iterable = range(-4, -1)
        expect([...iterable]).to.be.deep.equal([-4, -3, -2, -1])
    })
    it('if start value is greater than end value it does not produce values', function () {
        const iterable = range(3, -1)
        expect([...iterable]).to.be.deep.equal([])
    })
    it('if start value is equal to end value it produces one value', function () {
        const iterable = range(-2, -2)
        expect([...iterable]).to.be.deep.equal([-2])
    })

    describe('converting iterum instance to array', function () {
        it('returns the same as converting [Symbol.iterator]() iterator to array', function () {
            const rangeIterable = range(2, 5)
            const iterator = rangeIterable[Symbol.iterator]()
            expect([...iterator]).to.be.deep.equal([...rangeIterable])
        })
    })

    describe('bad arguments', function () {
        it('throws an exception when it is not passed any parameter', function () {
            function foo () {
                range()
            }
            expect(foo).to.throw(TypeError,
                /undefined is not a number/)
        })

        it('throws an exception when it is not passed second parameter', function () {
            function foo () {
                range(2)
            }
            expect(foo).to.throw(TypeError,
                /undefined is not a number/)
        })

        it('throws an exception when is not passed number as second parameter', function () {
            function foo () {
                range(2, 'a')
            }
            expect(foo).to.throw(TypeError,
                /a is not a number/)
        })
    })
})
