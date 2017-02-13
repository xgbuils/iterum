const {expect} = require('chai')
const Iterum = require('../../src/index.js')
const {range} = Iterum

describe('slice', function () {
    describe('given slice with `start` and `end` parameters inside of range', function () {
        it('it returns an iterable slice', function () {
            const values = [...range(0, 3, 1)
                .slice(1, 3)]
            expect(values).to.be.deep.equal([1, 2])
        })
    })

    describe('given slice with `start` and `end` parameters outside of range', function () {
        it('it returns an iterable that produces the same values', function () {
            const values = [...range(0, 3, 1)
                .slice(-1, 100)]
            expect(values).to.be.deep.equal([0, 1, 2, 3])
        })
    })

    describe('given slice without parameters', function () {
        it('it returns an iterable that produces the same values', function () {
            const values = [...range(0, 3, 1)
                .slice()]
            expect(values).to.be.deep.equal([0, 1, 2, 3])
        })
    })

    describe('given slice without `end` parameter', function () {
        it('it returns an iterable that slices the first `start` values', function () {
            const values = [...range(0, 3, 1)
                .slice(2)]
            expect(values).to.be.deep.equal([2, 3])
        })
    })

    describe('converting iterum instance to array', function () {
        it('returns the same as converting [Symbol.iterator]() iterator to array', function () {
            const sliceIterable = range(8, 3, -1).slice(2, 4)
            const iterator = sliceIterable[Symbol.iterator]()
            expect([...iterator]).to.be.deep.equal([...sliceIterable])
        })
    })

    describe('inmutability', function () {
        it('slice method does not mutate object', function () {
            const x = range(8, 3, -1)
            x.slice(1, 4)
            expect([...x]).to.be.deep.equal([8, 7, 6, 5, 4, 3])
        })
    })

    describe('bad arguments', function () {
        it('throws an exception when the first argument is not a Number or undefined', function () {
            function foo () {
                range(5, 10, 1)
                .slice(true)
            }
            expect(foo).to.throw(TypeError,
                /^true is not a number or undefined$/)
        })

        it('throws an exception when the second argument is not a Number or undefined', function () {
            function foo () {
                range(5, 10, 1)
                .slice(2, /^\d+/)
            }
            expect(foo).to.throw(TypeError,
                '/^\\d+/ is not a number or undefined')
        })
    })

    describe('static method', function () {
        it('normal behaviour', function () {
            const sliceIterable = Iterum.slice([5, 7, 10], 1, 8)
            expect([...sliceIterable]).to.be.deep.equal([7, 10])
        })

        it('replaces first parameter by empty iterable when is not an iterable', function () {
            const sliceIterable = Iterum.slice(false, 1, 8)
            expect([...sliceIterable]).to.be.deep.equal([])
        })
    })
})
