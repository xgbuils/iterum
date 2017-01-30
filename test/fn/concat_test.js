var expect = require('chai').expect
var Iterum = require('../../src/index.js')
var Range = Iterum.Range

describe('concat', function () {
    describe('concatenation using constructors', function () {
        it('given two no empty iterables returns Iterum instance concatenation', function () {
            var values = [...Range(0, 3, 1)
                .concat(Range(4, 16, 4))]
            expect(values).to.be.deep.equal([0, 1, 2, 3, 4, 8, 12, 16])
        })

        it('concatenating empty iterable with no empty iterable works well', function () {
            var values = [...Iterum([])
                .concat(Range(4, 16, 4))]
            expect(values).to.be.deep.equal([4, 8, 12, 16])
        })

        it('concatenating no empty iterable with empty iterable works well', function () {
            var values = [...Range(0, 3, 1)
                .concat(Iterum([]))]
            expect(values).to.be.deep.equal([0, 1, 2, 3])
        })

        it('concatenating empty iterable with empty iterable works well', function () {
            var values = [...Iterum([])
                .concat(Iterum([]))]
            expect(values).to.be.deep.equal([])
        })

        it('concatenating iterable with Iterum instance works well', function () {
            var values = [...Iterum([3, 5])
                .concat(Iterum([4, 2]))]
            expect(values).to.be.deep.equal([3, 5, 4, 2])
        })
    })

    describe('converting iterum instance to array', function () {
        it('returns the same as converting [Symbol.iterator]() iterator to array', function () {
            var iterum = Range(8, 3, -1)
                .concat(Range(4, 16, 4))
            var iterator = iterum[Symbol.iterator]()
            expect([...iterator]).to.be.deep.equal([...iterum])
        })
    })

    describe('inmutability', function () {
        it('concat method does not mutate object', function () {
            var x = Range(8, 3, -1)
            x.concat(Range(4, 16, 4))
            expect([...x]).to.be.deep.equal([8, 7, 6, 5, 4, 3])
        })
    })

    describe('If it exists value that is an iterum instance,', function () {
        describe('this value is interpreted as a sequence of values of this iterum instance', function () {
            it('passing iterum instance in concat method', function () {
                var values = [...Iterum([8])
                    .concat(Iterum([100, Range(1, 5)]))]
                expect(values).to.be.deep.equal([8, 100, 1, 2, 3, 4, 5])
            })
        })
    })

    describe('bad arguments', function () {
        it('throws an exception when the first argument is not a function or Iterum', function () {
            function foo () {
                Range(5, 10, 1)
                .concat(true)
            }
            expect(foo).to.throw(TypeError,
                /^true is not an Iterable instance$/)
        })
    })
})
