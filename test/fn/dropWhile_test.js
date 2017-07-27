const {expect} = require('chai')
const Iterum = require('../../src/index.js')
const {range} = Iterum

describe('dropWhile', function () {
    describe('method', function () {
        it('drop iterable values while value is greater than 5', function () {
            const iterable = Iterum([7, 100, 4, 7, 2])
                .dropWhile(e => e > 5)
            expect([...iterable]).to.be.deep.equal([4, 7, 2])
        })

        it('drop values while are less than 10', function () {
            const iterable = range(0, 15)
                .dropWhile(e => e < 10)
                .slice(0, 5)
            expect([...iterable]).to.be.deep.equal([10, 11, 12, 13, 14])
        })

        it('dropping to end of iterable because condition always match', function () {
            const iterable = Iterum([2, 0, 3, 6, 1, 2])
                .dropWhile(e => e < 7)
            expect([...iterable]).to.be.deep.equal([])
        })

        describe('converting iterable instance to array', function () {
            it('returns the same as converting [Symbol.iterator]() iterator to array', function () {
                const iterable = Iterum([7, 100, 4, 7, 2])
                    .dropWhile(e => e > 5)
                const iterator = iterable[Symbol.iterator]()
                expect([...iterator]).to.be.deep.equal([...iterable])
            })
        })

        describe('inmutability', function () {
            it('dropWhile method does not mutate object', function () {
                const a = [1, 2, 0, -6, 3, 7, 4, 5, 1]
                const iterable = Iterum(a)
                iterable.dropWhile((_, i) => i < 2)
                expect([...iterable]).to.be.deep.equal([...a])
            })
        })

        describe('bad arguments', function () {
            it('throws an exception when the first argument is not a function', function () {
                function foo () {
                    Iterum([3]).dropWhile(false)
                }
                expect(foo).to.throw(TypeError,
                    /^false is not a function$/)
            })
        })
    })

    describe('function', function () {
        it('normal behaviour', function () {
            const iterable = Iterum.dropWhile(e => e < 6, [5, 7, 10])
            expect([...iterable]).to.be.deep.equal([7, 10])
        })

        it('throws an error if first parameter is not a function', function () {
            function test () {
                Iterum.dropWhile(5, [5, 7, 10])
            }
            expect(test).to.throw(TypeError,
                /^5 is not a function$/)
        })

        it('throws an error if second parameter is not an iterable', function () {
            function test () {
                Iterum.dropWhile(e => e > 5, 5)
            }
            expect(test).to.throw(TypeError,
                /^5 is not an iterable$/)
        })
    })
})
