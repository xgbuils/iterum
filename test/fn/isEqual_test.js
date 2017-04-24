const {expect} = require('chai')
const Iterum = require('../../src/index.js')

describe('.isEqual', function () {
    it('returns true if every value of iterables is equal using sameValueZero', function () {
        const obj = {}
        const a = new Set([NaN, 2, -0, +0, obj])
        const b = [NaN, 2, -0, obj]
        expect(Iterum(a).isEqual(b)).to.be.equal(true)
    })

    it('returns false if some value of iterables is not equal using sameValueZero', function () {
        const obj = {}
        const a = [NaN, 2, undefined, obj]
        const b = [NaN, 2, 0, obj]
        expect(Iterum(a).isEqual(b)).to.be.equal(false)
    })

    it('returns false if iterables has different number of values', function () {
        const obj = {}
        const a = [2, 0]
        const b = [2, 0, obj]
        expect(Iterum(a).isEqual(b)).to.be.equal(false)
    })

    describe('inmutability', function () {
        it('isEqual method does not mutate iterable object', function () {
            const a = [1, 6, 3]
            const b = [6, 8, 4]
            const x = Iterum(a)
            x.isEqual(b)
            expect([...x]).to.be.deep.equal([...a])
        })
    })

    describe('static method', function () {
        it('normal behaviour', function () {
            const result = Iterum.isEqual([1, 1, 1], [1, 1, 1])
            expect(result).to.be.equal(true)
        })

        it('replaces first parameter by empty iterable when is not an iterable', function () {
            const result = Iterum.isEqual(/a+/, [])
            expect(result).to.be.deep.equal(true)
        })
    })
})
