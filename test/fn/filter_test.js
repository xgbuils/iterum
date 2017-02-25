const {expect} = require('chai')
const Iterum = require('../../src/index.js')

describe('filter', function () {
    it('omit odd numbers', function () {
        const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        const fn = e => e % 2 === 0
        const iterable = Iterum(a).filter(fn)
        expect([...iterable]).to.be.deep.equal([...a].filter(fn))
    })

    it('returns empty list, so any value of iterator is 3.14', function () {
        const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        const fn = e => e === 3.14
        const iterable = Iterum(a).filter(fn)
        expect([...iterable]).to.be.deep.equal([...a].filter(fn))
    })

    it('using context parameter', function () {
        const context = []
        const iterum = Iterum([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
            .filter(function (e) {
                const ok = e % 2 === 0
                if (!ok) {
                    this.push(e)
                }
                return ok
            }, context)
        for (const value of iterum) {} // eslint-disable-line no-unused-vars
        expect(context).to.be.deep.equal([1, 3, 5, 7, 9])
    })

    describe('converting iterum instance to array', function () {
        it('returns the same as converting [Symbol.iterator]() iterator to array', function () {
            const a = [8, 7, 6, 5, 4, 3]
            const filteredIterable = Iterum(a)
                .filter(e => e % 2 === 1)
            const iterator = filteredIterable[Symbol.iterator]()
            expect([...iterator]).to.be.deep.equal([...filteredIterable])
        })
    })

    describe('inmutability', function () {
        it('filter method does not mutate object', function () {
            const a = [8, 7, 6, 5, 4, 3]
            const iterable = Iterum(a)
            iterable.filter(e => e % 2 === 1)
            expect([...iterable]).to.be.deep.equal([...a])
        })
    })

    describe('using the whole parameters of callback', function () {
        it('filter method does not mutate iterum instance behaviour', function () {
            const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            const fn = (e, i, it) => {
                return e <= 8 && i % 2 === 0
                    && [...it.slice(i)].length <= 8
            }
            const iterable = Iterum(a).filter(fn)
            expect([...iterable]).to.be.deep.equal([...a].filter(fn))
        })
    })

    describe('bad arguments', function () {
        it('throws an exception when the first argument is not a function', function () {
            const a = [1, 4, 2, 7, 3]
            function foo () {
                Iterum(a).filter(null)
            }
            expect(foo).to.throw(TypeError,
                /^null is not a function$/)
        })
    })

    describe('static method', function () {
        it('normal behaviour', function () {
            const filterIterable = Iterum.filter([5, 7, 10], e => e % 2 === 1)
            expect([...filterIterable]).to.be.deep.equal([5, 7])
        })

        it('replaces first parameter by empty iterable when is not an iterable', function () {
            const filterIterable = Iterum.filter(true, e => e % 2 === 1)
            expect([...filterIterable]).to.be.deep.equal([])
        })
    })
})
