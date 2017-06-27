const {expect} = require('chai')
const Iterum = require('../../src/index.js')

describe('takeWhile', function () {
    it('take while value is greater than 5', function () {
        const iterum = Iterum([7, 100, 4, 7, 2])
            .takeWhile(e => e > 5)
        expect([...iterum]).to.be.deep.equal([7, 100])
    })

    it('take while values while are is not greater than 10', function () {
        const iterum = Iterum([2, 0, 3, 6, 1, 2])
            .takeWhile(e => e % 5 !== 1)
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
                .takeWhile(e => e > 5)
            const iterator = iterum[Symbol.iterator]()
            expect([...iterator]).to.be.deep.equal([...iterum])
        })
    })

    describe('inmutability', function () {
        it('takeWhile method does not mutate object', function () {
            const a = [2, 5, 7, 8]
            const x = Iterum(a)
            x.takeWhile((_, i) => i < 2)
            expect([...x]).to.be.deep.equal(a)
        })
    })

    describe('bad arguments', function () {
        it('throws an exception when the first argument is not a function', function () {
            const a = new Set([3, 1, 6])
            function foo () {
                Iterum(a).takeWhile('fizz')
            }
            expect(foo).to.throw(TypeError,
                /^fizz is not a function$/)
        })
    })

    describe('static method', function () {
        it('normal behaviour', function () {
            const takeWhileIterable = Iterum.takeWhile([5, 7, 10], e => e < 6)
            expect([...takeWhileIterable]).to.be.deep.equal([5])
        })

        it('throws an error if first parameter is not an iterable', function () {
            function test () {
                Iterum.takeWhile(null, e => e < 6)
            }
            expect(test).to.throw(TypeError,
                /^null is not an Iterable instance$/)
        })
    })
})
