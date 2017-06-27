const {expect} = require('chai')
const Iterum = require('../../src/index.js')

describe('.uniqBy', function () {
    it('filters values that are equal by sameValueZero applying Math.floor', function () {
        const a = [2.1, 1.2, 2.3]
        const iterable = Iterum(a).uniqBy(Math.floor)
        expect([...iterable]).to.be.deep.equal([2.1, 1.2])
    })

    it('filters values that are equal by sameValueZero applying parseInt', function () {
        const a = ['abc', '2.3', '3.5', '2.1', 'cba']
        const iterable = Iterum(a).uniqBy(parseInt)
        expect([...iterable]).to.be.deep.equal(['abc', '2.3', '3.5'])
    })

    describe('converting iterum instance to array', function () {
        it('returns the same as converting [Symbol.iterator]() iterator to array', function () {
            const a = [1, 4.3, 4.1, 1, 2.5, 3, 6]
            const iterable = Iterum(a)
                .uniqBy(Math.ceil)
            const iterator = iterable[Symbol.iterator]()
            expect([...iterator]).to.be.deep.equal([...iterable])
        })
    })

    describe('inmutability', function () {
        it('uniqBy method does not mutate object', function () {
            const a = new Set([1, 6, 3, 6, 8, 4])
            const x = Iterum(a)
            x.uniqBy(e => e % 3)
            expect([...x]).to.be.deep.equal([...a])
        })
    })

    describe('static method', function () {
        it('normal behaviour', function () {
            const iterable = Iterum.uniqBy([1, 6, 3, 6, 8, 4], e => e % 3)
            expect([...iterable]).to.be.deep.equal([1, 6, 8])
        })

        it('throws an error if first parameter is not an iterable', function () {
            function test () {
                Iterum.uniqBy(undefined, e => e % 3)
            }
            expect(test).to.throw(TypeError,
                /^undefined is not an Iterable instance$/)
        })
    })
})
