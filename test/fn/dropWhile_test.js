const {expect} = require('chai')
const Iterum = require('../../src/index.js')
const {Range} = Iterum

describe('dropWhile', function () {
    it('drop while value is greater than 5', function () {
        const iterum = Iterum([7, 100, 4, 7, 2])
            .dropWhile(function (e) {
                return e > 5
            })
        expect([...iterum]).to.be.deep.equal([4, 7, 2])
    })

    it('drop while sum of first elements is not greater than 10', function () {
        const iterum = Iterum([2, 0, 3, 6, 1, 2])
            .dropWhile(function (e, index, itm) {
                return itm.slice(0, index + 1)
                    .reduce((a, b) => a + b) <= 10
            })
        expect([...iterum]).to.be.deep.equal([6, 1, 2])
    })

    it('dropping to end of iterable because condition always match', function () {
        const iterum = Iterum([2, 0, 3, 6, 1, 2])
            .dropWhile(function (e) {
                return e < 7
            })
        expect([...iterum]).to.be.deep.equal([])
    })

    describe('converting iterum instance to array', function () {
        it('returns the same as converting [Symbol.iterator]() iterator to array', function () {
            const iterum = Iterum([7, 100, 4, 7, 2])
                .dropWhile(function (e) {
                    return e > 5
                })
            const iterator = iterum[Symbol.iterator]()
            expect([...iterator]).to.be.deep.equal([...iterum])
        })
    })

    describe('inmutability', function () {
        it('dropWhile method does not mutate object', function () {
            const x = Range(8, 3, -1)
            x.dropWhile((_, i) => i < 2)
            expect([...x]).to.be.deep.equal([8, 7, 6, 5, 4, 3])
        })
    })

    describe('If it exists value that is an iterum instance,', function () {
        it('this value is interpreted as a sequence of values of this iterum instance', function () {
            const iterum = Iterum([1, Range(1, 3).repeat(2), 8])
                .dropWhile(function (e) {
                    return e < 3
                })
            expect([...iterum]).to.be.deep.equal([3, 1, 2, 3, 8])
        })
    })

    describe('bad arguments', function () {
        it('throws an exception when the first argument is not a function', function () {
            function foo () {
                Range(2, 9, 2).filter(false)
            }
            expect(foo).to.throw(TypeError,
                /^false is not a function$/)
        })
    })
})
