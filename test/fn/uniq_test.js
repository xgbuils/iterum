const {expect} = require('chai')
const Iterum = require('../../src/index.js')

describe('.uniq', function () {
    it('filters values that are equal by sameValueZero', function () {
        const obj = {}
        const a = [NaN, 2, -0, null, obj, undefined, +0, obj]
        const iterable = Iterum(a).uniq()
        expect([...iterable]).to.be.deep.equal([NaN, 2, -0, null, obj, undefined])
    })

    describe('converting iterum instance to array', function () {
        it('returns the same as converting [Symbol.iterator]() iterator to array', function () {
            const a = [1, 4, 4, 1, 2, 3, 6]
            const iterable = Iterum(a)
                .uniq()
            const iterator = iterable[Symbol.iterator]()
            expect([...iterator]).to.be.deep.equal([...iterable])
        })
    })

    describe('inmutability', function () {
        it('uniq method does not mutate object', function () {
            const a = new Set([1, 6, 3, 6, 8, 4])
            const x = Iterum(a)
            x.uniq()
            expect([...x]).to.be.deep.equal([...a])
        })
    })

    describe('static method', function () {
        it('normal behaviour', function () {
            const iterable = Iterum.uniq([1, 1, 2, 2, 1, 2])
            expect([...iterable]).to.be.deep.equal([1, 2])
        })

        it('throws an error if first parameter is not an iterable', function () {
            function test () {
                Iterum.uniq(null)
            }
            expect(test).to.throw(TypeError,
                /^null is not an Iterable instance$/)
        })
    })
})
