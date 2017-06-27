const {expect} = require('chai')
const Iterum = require('../../src/index.js')
const {range} = Iterum

describe('slice', function () {
    describe('given slice with `start` and `end` parameters inside of range', function () {
        it('it returns an iterable slice', function () {
            const a = [0, 1, 2, 3]
            const iterable = Iterum(a).slice(1, 3)
            expect([...iterable]).to.be.deep.equal([1, 2])
        })
    })

    describe('given slice with `start` and `end` parameters outside of range', function () {
        it('it returns an iterable that produces the same values', function () {
            const a = [0, 1, 2, 8]
            const iterable = Iterum(a).slice(-1, 100)
            expect([...iterable]).to.be.deep.equal([...a])
        })
    })

    describe('converting iterum instance to array', function () {
        it('returns the same as converting [Symbol.iterator]() iterator to array', function () {
            const a = new Set([4, 1, 7, 3, 9, 4, 2])
            const sliceIterable = Iterum(a).slice(2, 4)
            const iterator = sliceIterable[Symbol.iterator]()
            expect([...iterator]).to.be.deep.equal([...sliceIterable])
        })
    })

    describe('infinity cases', function () {
        it('slice infinite iterables', function () {
            const iterable = range(0, Infinity).slice(1, 4)
            expect([...iterable]).to.be.deep.equal([1, 2, 3])
        })

        it('slice iterable where some element produces an infinite loop', function () {
            const iterable = Iterum([[1], [2], [3], range(0, Infinity)])
                .map(e => [...e])
                .slice(1, 3)
            expect([...iterable]).to.be.deep.equal([[2], [3]])
        })

        it('slice(range(0, Infinity), Infinity, Infinity) returns empty iterable', function () {
            const iterable = range(0, Infinity).slice(Infinity, Infinity)
            expect([...iterable]).to.be.deep.equal([])
        })
    })

    describe('inmutability', function () {
        it('slice method does not mutate object', function () {
            const a = [1, 5, 3, 3, 2, 6]
            const x = Iterum(a)
            x.slice(1, 4)
            expect([...x]).to.be.deep.equal(a)
        })
    })

    describe('bad arguments', function () {
        let iterable
        beforeEach(function () {
            iterable = [5, 6, 7, 8, 9, 10]
        })
        it('throws an exception when the does not have parameters', function () {
            function test () {
                Iterum(iterable).slice()
            }
            expect(test).to.throw(TypeError,
                /^undefined is not a number$/)
        })

        it('throws an exception when the first argument is not a number', function () {
            function test () {
                Iterum(iterable).slice(true)
            }
            expect(test).to.throw(TypeError,
                /^true is not a number$/)
        })

        it('throws an exception when it has just one parameter', function () {
            function test () {
                Iterum(iterable).slice(3)
            }
            expect(test).to.throw(TypeError,
                /^undefined is not a number$/)
        })

        it('throws an exception when the second argument is not a number', function () {
            function test () {
                Iterum(iterable).slice(2, /^\d+/)
            }
            expect(test).to.throw(TypeError,
                '/^\\d+/ is not a number')
        })
    })

    describe('static method', function () {
        it('normal behaviour', function () {
            const sliceIterable = Iterum.slice([5, 7, 10], 1, 8)
            expect([...sliceIterable]).to.be.deep.equal([7, 10])
        })

        it('throws an error if first parameter is not an iterable', function () {
            function test () {
                Iterum.slice(false, 3, 5)
            }
            expect(test).to.throw(TypeError,
                /^false is not an Iterable instance$/)
        })
    })
})
