const {expect} = require('chai')
const Iterum = require('../../src/index.js')

describe('.map', function () {
    it('behaves like Array.prototype.map for Iterum instance', function () {
        const a = [2, 6, 4, 7]
        const fn = value => 2 * value
        const iterable = Iterum(a).map(fn)
        expect([...iterable]).to.be.deep.equal([...a].map(fn))
    })

    describe('converting iterum instance to array', function () {
        it('returns the same as converting [Symbol.iterator]() iterator to array', function () {
            const a = [1, 4, 2, 3, 6]
            const mapIterable = Iterum(a)
                .map(value => 2 * value)
            const iterator = mapIterable[Symbol.iterator]()
            expect([...iterator]).to.be.deep.equal([...mapIterable])
        })
    })

    describe('inmutability', function () {
        it('map method does not mutate object', function () {
            const a = new Set([1, 6, 3, 8, 4])
            const x = Iterum(a)
            x.map(function (e) {
                return e + 2
            })
            expect([...x]).to.be.deep.equal([...a])
        })
    })

    describe('using index parameter of callback', function () {
        it('map method does not mutate object', function () {
            const a = [1, 0, 2, 4]
            const fn = (e, i) => e * i
            const iterable = Iterum(a)
                .map(fn)
            expect([...iterable]).to.be.deep.equal([...a].map(fn))
        })
    })

    describe('using some parameters of callback', function () {
        it('map method does not mutate iterum instance behaviour', function () {
            const a = [1, 2, 3]
            const fn = (e, i, it) => [...it.concat([e])]
            const iterable = Iterum(a).map(fn)
            expect([...iterable]).to.be.deep.equal([...a].map(fn))
        })
    })

    describe('using all parameters of callback', function () {
        it('map method does not mutate iterum instance behaviour', function () {
            const a = [1, 2, 3, 4, 5, 6]
            const fn = (e, index, iterum) => [...iterum.slice(index + e)]
            const iterable = Iterum(a).map(fn)
            expect([...iterable]).to.be.deep.equal([...a].map(fn))
        })
    })

    describe('bad arguments', function () {
        it('throws an exception when the first argument is not a function', function () {
            const a = new Map([['a', 'A'], ['b', 'B']])
            function foo () {
                Iterum(a).map({})
            }
            expect(foo).to.throw(TypeError,
                /^\[object Object\] is not a function$/)
        })
    })

    describe('static method', function () {
        it('normal behaviour', function () {
            const mapIterable = Iterum.map([5, 7, 10], e => e * 2)
            expect([...mapIterable]).to.be.deep.equal([10, 14, 20])
        })

        it('replaces first parameter by empty iterable when is not an iterable', function () {
            const mapIterable = Iterum.map(false, e => e * 2)
            expect([...mapIterable]).to.be.deep.equal([])
        })
    })
})
