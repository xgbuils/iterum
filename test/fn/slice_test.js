var expect = require('chai').expect
var Iterum = require('../../src/index.js')
var Range = Iterum.Range

describe('slice', function () {
    describe('given slice with `start` and `end` parameters inside of range', function () {
        it('generator that returns an iterator slice', function () {
            var values = [...Range(0, 3, 1)
                .slice(1, 3)]
            expect(values).to.be.deep.equal([1, 2])
        })
    })

    describe('given slice with `start` and `end` parameters outside of range', function () {
        it('generator that returns an iterator slice', function () {
            var values = [...Range(0, 3, 1)
                .slice(-1, 100)]
            expect(values).to.be.deep.equal([0, 1, 2, 3])
        })
    })

    describe('given slice without `start` and `end` parameters outside of range', function () {
        it('generator that returns an iterator the same iterator', function () {
            var values = [...Range(0, 3, 1)
                .slice()]
            expect(values).to.be.deep.equal([0, 1, 2, 3])
        })
    })

    describe('given slice without `end` parameter', function () {
        it('generator that returns an iterator that is cut only by `start` parameter', function () {
            var values = [...Range(0, 3, 1)
                .slice(2)]
            expect(values).to.be.deep.equal([2, 3])
        })
    })

    describe('If it exists value that is an iterum instance,', function () {
        it('this value is interpreted as a sequence of values of this iterum instance', function () {
            var values = [...Iterum([Range(5, 2, -1), 8]).slice(1, 2)]
            expect(values).to.be.deep.equal([4])
        })
    })

    describe('converting iterum instance to array', function () {
        it('returns the same as converting [Symbol.iterator]() iterator to array', function () {
            var sliceIterable = Range(8, 3, -1).slice(2, 4)
            var iterator = sliceIterable[Symbol.iterator]()
            expect([...iterator]).to.be.deep.equal([...sliceIterable])
        })
    })

    describe('inmutability', function () {
        it('slice method does not mutate object', function () {
            var x = Range(8, 3, -1)
            x.slice(1, 4)
            expect([...x]).to.be.deep.equal([8, 7, 6, 5, 4, 3])
        })
    })

    describe('bad arguments', function () {
        it('throws an exception when the first argument is not a Number or undefined', function () {
            function foo () {
                Range(5, 10, 1)
                .slice(true)
            }
            expect(foo).to.throw(TypeError,
                /^true is not a number or undefined$/)
        })

        it('throws an exception when the second argument is not a Number or undefined', function () {
            function foo () {
                Range(5, 10, 1)
                .slice(2, /^\d+/)
            }
            expect(foo).to.throw(TypeError,
                '/^\\d+/ is not a number or undefined')
        })
    })
})
