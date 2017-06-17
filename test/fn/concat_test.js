const {expect} = require('chai')
const Iterum = require('../../src/index.js')

describe('concat', function () {
    describe('no empty Iterum instance with no empty iterable', function () {
        it('returns the correct iterable concatenation', function () {
            const a = [0, 1, 2, 3]
            const b = [4, 8, 12, 16]
            const iterable = Iterum(a).concat(b)
            expect([...iterable]).to.be.deep.equal([...a].concat([...b]))
        })
    })

    describe('empty Iterum instance with no empty iterable', function () {
        it('returns the correct iterable concatenation', function () {
            const a = []
            const b = [4, 8, 12, 16]
            const iterable = Iterum(a).concat(b)
            expect([...iterable]).to.be.deep.equal([...b])
        })
    })

    describe('no empty Iterum instance with empty iterable', function () {
        it('returns the correct iterable concatenation', function () {
            const a = [0, 1, 2, 3]
            const b = []
            const iterable = Iterum(a).concat(b)
            expect([...iterable]).to.be.deep.equal([...a])
        })
    })

    describe('empty Iterum instance with empty iterable', function () {
        it('returns empty iterable', function () {
            const a = []
            const b = []
            const iterable = Iterum(a).concat(b)
            expect([...iterable]).to.be.deep.equal([])
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
            const iterable = Iterum(a)
            iterable.concat([3, 6, 1])
            expect([...iterable]).to.be.deep.equal(a)
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
