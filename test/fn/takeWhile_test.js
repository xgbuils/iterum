const {expect} = require('chai')
const Iterum = require('../../src/index.js')
const {range} = Iterum

describe('takeWhile', function () {
    it('take while value is greater than 5', function () {
        const iterum = Iterum([7, 100, 4, 7, 2])
            .takeWhile(function (e) {
                return e > 5
            })
        expect([...iterum]).to.be.deep.equal([7, 100])
    })

    it('take while sum of first elements is not greater than 10', function () {
        const iterum = Iterum([2, 0, 3, 6, 1, 2])
            .takeWhile(function (e, index, itm) {
                return itm.slice(0, index + 1)
                    .reduce((a, b) => a + b) <= 10
            })
        expect([...iterum]).to.be.deep.equal([2, 0, 3])
    })

    it('take no value of iterable because condition never match', function () {
        const iterum = Iterum([2, 0, 3, 6, 1, 2])
            .takeWhile(e => e >= 7)
        expect([...iterum]).to.be.deep.equal([])
    })

    describe('converting iterum instance to array', function () {
        it('returns the same as converting [Symbol.iterator]() iterator to array', function () {
            const iterum = Iterum([7, 100, 4, 7, 2])
                .takeWhile(function (e) {
                    return e > 5
                })
            const iterator = iterum[Symbol.iterator]()
            expect([...iterator]).to.be.deep.equal([...iterum])
        })
    })

    describe('inmutability', function () {
        it('takeWhile method does not mutate object', function () {
            const x = range(8, 3, -1)
            x.takeWhile((_, i) => i < 2)
            expect([...x]).to.be.deep.equal([8, 7, 6, 5, 4, 3])
        })
    })

    describe('If it exists value that is an iterum instance,', function () {
        it('this value is interpreted as a sequence of values of this iterum instance', function () {
            const iterum = Iterum([1, range(1, 8).filter(e => e % 2 === 0), 8])
                .takeWhile(function (e) {
                    return e < 5
                })
            expect([...iterum]).to.be.deep.equal([1, 2, 4])
        })
    })

    describe('bad arguments', function () {
        it('throws an exception when the first argument is not a function', function () {
            function foo () {
                range(2, 9, 2).filter('fizz')
            }
            expect(foo).to.throw(TypeError,
                /^fizz is not a function$/)
        })
    })
})
