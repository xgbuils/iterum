const {expect} = require('chai')
const Iterum = require('../../src/index.js')

describe('concat', function () {
    describe('concatenation using constructors', function () {
        it('given two no empty iterables returns Iterum instance concatenation', function () {
            const a = [0, 1, 2, 3]
            const b = [4, 8, 12, 16]
            const iterable = Iterum(a).concat(b)
            expect([...iterable]).to.be.deep.equal(a.concat(b))
        })

        it('concatenating empty iterable with no empty iterable works well', function () {
            const a = []
            const b = [4, 8, 12, 16]
            const iterable = Iterum(a).concat(b)
            expect([...iterable]).to.be.deep.equal(b)
        })

        it('concatenating no empty iterable with empty iterable works well', function () {
            const a = [0, 1, 2, 3]
            const b = []
            const iterable = Iterum(a).concat(b)
            expect([...iterable]).to.be.deep.equal(a)
        })

        it('concatenating empty iterable with empty iterable works well', function () {
            const a = []
            const b = []
            const iterable = Iterum(a).concat(b)
            expect([...iterable]).to.be.deep.equal([])
        })

        it('concatenating iterable with Iterum instance works well', function () {
            const a = [3, 5]
            const b = Iterum([4, 2])
            const iterable = Iterum(a).concat(b)
            expect([...iterable]).to.be.deep.equal([3, 5, 4, 2])
        })
    })

    describe('converting iterum instance to array', function () {
        it('returns the same as converting [Symbol.iterator]() iterator to array', function () {
            const a = [8, 7, 6, 5, 4, 3]
            const b = [4, 8, 12, 16]
            const iterum = Iterum(a).concat(b)
            const iterator = iterum[Symbol.iterator]()
            expect([...iterator]).to.be.deep.equal([...iterum])
        })
    })

    describe('inmutability', function () {
        it('concat method does not mutate object', function () {
            const a = [8, 7, 6, 5, 4, 3]
            const x = Iterum(a)
            x.concat([3, 6, 1])
            expect([...x]).to.be.deep.equal(a)
        })
    })

    describe('bad arguments', function () {
        it('throws an exception when the first argument is not a function or Iterum', function () {
            const a = [5, 6, 7, 8, 9, 10]
            function foo () {
                Iterum(a).concat(true)
            }
            expect(foo).to.throw(TypeError,
                /^true is not an Iterable instance$/)
        })
    })

    describe('static method', function () {
        it('normal behaviour', function () {
            const concatIterable = Iterum.concat(new Map([[true, 1], [false, 0]]), 'ac')
            expect([...concatIterable]).to.be.deep.equal([
                [true, 1],
                [false, 0],
                'a',
                'c'
            ])
        })

        it('replaces first parameter by empty iterable when is not an iterable', function () {
            const concatIterable = Iterum.concat(null, 'ac')
            expect([...concatIterable]).to.be.deep.equal(['a', 'c'])
        })
    })
})
