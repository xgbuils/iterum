const {expect} = require('chai')
const Iterum = require('../../src/index.js')
const {range} = Iterum

describe('concat', function () {
    describe('concatenation using constructors', function () {
        it('given two no empty iterables returns Iterum instance concatenation', function () {
            const values = [...range(0, 3, 1)
                .concat(range(4, 16, 4))]
            expect(values).to.be.deep.equal([0, 1, 2, 3, 4, 8, 12, 16])
        })

        it('concatenating empty iterable with no empty iterable works well', function () {
            const values = [...Iterum([])
                .concat(range(4, 16, 4))]
            expect(values).to.be.deep.equal([4, 8, 12, 16])
        })

        it('concatenating no empty iterable with empty iterable works well', function () {
            const values = [...range(0, 3, 1)
                .concat(Iterum([]))]
            expect(values).to.be.deep.equal([0, 1, 2, 3])
        })

        it('concatenating empty iterable with empty iterable works well', function () {
            const values = [...Iterum([])
                .concat(Iterum([]))]
            expect(values).to.be.deep.equal([])
        })

        it('concatenating iterable with Iterum instance works well', function () {
            const values = [...Iterum([3, 5])
                .concat(Iterum([4, 2]))]
            expect(values).to.be.deep.equal([3, 5, 4, 2])
        })
    })

    describe('converting iterum instance to array', function () {
        it('returns the same as converting [Symbol.iterator]() iterator to array', function () {
            const iterum = range(8, 3, -1)
                .concat(range(4, 16, 4))
            const iterator = iterum[Symbol.iterator]()
            expect([...iterator]).to.be.deep.equal([...iterum])
        })
    })

    describe('inmutability', function () {
        it('concat method does not mutate object', function () {
            const x = range(8, 3, -1)
            x.concat(range(4, 16, 4))
            expect([...x]).to.be.deep.equal([8, 7, 6, 5, 4, 3])
        })
    })

    describe('bad arguments', function () {
        it('throws an exception when the first argument is not a function or Iterum', function () {
            function foo () {
                range(5, 10, 1)
                .concat(true)
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
