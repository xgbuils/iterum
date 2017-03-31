const {expect} = require('chai')
const Iterum = require('../../src/index.js')

describe('.groupBy', function () {
    it('filters values that are equal by sameValueZero applying e => e % 3', function () {
        const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        const iterable = Iterum(a).groupBy(e => e % 3)
        expect([...iterable]).to.be.deep.equal([
            [1, [1, 4, 7, 10]],
            [2, [2, 5, 8]],
            [0, [3, 6, 9]]
        ])
    })

    it('filters values that are equal by sameValueZero applying parseInt', function () {
        const a = ['abc', '2.3', '3.5', '2.1', 'cba']
        const iterable = Iterum(a).groupBy(parseInt)
        expect([...iterable]).to.be.deep.equal([
            [NaN, ['abc', 'cba']],
            [2, ['2.3', '2.1']],
            [3, ['3.5']]
        ])
    })

    it('returned value is an iterum instance and can be chained with other methods', function () {
        const a = ['abc', '2.3', '3.5', '2.1', 'cba']
        const iterable = Iterum(a).groupBy(parseInt)
            .map(e => e[0])
        expect([...iterable]).to.be.deep.equal([NaN, 2, 3])
    })

    describe('converting iterum instance to array', function () {
        it('returns the same as converting [Symbol.iterator]() iterator to array', function () {
            const a = [1, 4.3, 4.1, 1, 2.5, 3, 6]
            const iterable = Iterum(a)
                .groupBy(Math.ceil)
            const iterator = iterable[Symbol.iterator]()
            expect([...iterator]).to.be.deep.equal([...iterable])
        })
    })

    describe('inmutability', function () {
        it('groupBy method does not mutate object', function () {
            const a = new Set([1, 6, 3, 6, 8, 4])
            const x = Iterum(a)
            x.groupBy(e => e % 3)
            expect([...x]).to.be.deep.equal([...a])
        })
    })

    describe('static method', function () {
        it('normal behaviour', function () {
            const iterable = Iterum.groupBy([1, 9, 6, 3, 6, 0, 2, 8, 5, 4, 7], e => e * e % 5)
            expect([...iterable]).to.be.deep.equal([
                [1, [1, 9, 6, 6, 4]],
                [4, [3, 2, 8, 7]],
                [0, [0, 5]]
            ])
        })

        it('replaces first parameter by empty iterable when is not an iterable', function () {
            const iterable = Iterum.groupBy(null, e => e % 3)
            expect([...iterable]).to.be.deep.equal([])
        })
    })
})
