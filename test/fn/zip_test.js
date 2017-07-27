const {expect} = require('chai')
const Iterum = require('../../src/index.js')

describe('zip', function () {
    describe('method', function () {
        it('zip iterables with the same number of values', function () {
            const iterable = Iterum([1, 2, 3]).zip('abc')
            expect([...iterable]).to.be.deep.equal([
                [1, 'a'],
                [2, 'b'],
                [3, 'c']
            ])
        })

        it('zip iterables with distinct number of values', function () {
            const iterable = Iterum([1, 2]).zip(
                new Set([true, false, null])
            )
            expect([...iterable]).to.be.deep.equal([
                [1, true],
                [2, false]
            ])
        })

        describe('wrong arguments', function () {
            it('zip with 0 iterable params', function () {
                function test () {
                    Iterum([1, 2, 3]).zip()
                }
                expect(test).to.throw(TypeError,
                    /^undefined is not an iterable$/)
            })
            it('throws an exception when the first argument is not a function', function () {
                function test () {
                    Iterum([2, 3]).zip({})
                }
                expect(test).to.throw(TypeError,
                    /^\[object Object\] is not an iterable$/)
            })
        })
    })

    describe('function', function () {
        it('normal behaviour', function () {
            const iterable = Iterum.zip([4, 6, 9], [5, 7, 10])
            expect([...iterable]).to.be.deep.equal([[4, 5], [6, 7], [9, 10]])
        })

        it('throws an error if first parameter is not an iterable', function () {
            function test () {
                Iterum.zip(new Number(6), [4, 6, 9])
            }
            expect(test).to.throw(TypeError,
                /^6 is not an iterable$/)
        })

        it('throws an error if second parameter is not an iterable', function () {
            function test () {
                Iterum.zip([5, 7, 10], new Number(6))
            }
            expect(test).to.throw(TypeError,
                /^6 is not an iterable$/)
        })
    })
})
