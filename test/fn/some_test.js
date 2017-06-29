const {expect} = require('chai')
const Iterum = require('../../src/index.js')

describe('some', function () {
    describe('method', function () {
        let iterable
        beforeEach(function () {
            iterable = [5, 6, 7, 8, 9, 10]
        })
        it('if predicate is true for some value, returns true', function () {
            const value = Iterum(iterable)
                .some(e => e % 2 === 0)
            expect(value).to.be.equal(true)
        })

        it('if predicate return false for every value, returns false', function () {
            const value = Iterum(iterable)
                .some(e => e > 20)
            expect(value).to.be.equal(false)
        })

        describe('iterating over iterum instance', function () {
            it('does not mutate the behaviour of some', function () {
                const predicate = e => e % 2 === 0
                const iterum = Iterum(iterable)
                let result = false
                for (const val of iterum.entries()) {
                    if (predicate(val[1])) {
                        result = true
                        break
                    }
                }
                expect(iterum.some(predicate)).to.be.deep.equal(result)
            })
        })

        describe('wrong arguments', function () {
            it('throws an exception when the first argument is not a function', function () {
                function foo () {
                    Iterum(iterable).some('bar')
                }
                expect(foo).to.throw(TypeError,
                    /^bar is not a function$/)
            })
        })
    })

    describe('function', function () {
        it('normal behaviour', function () {
            const result = Iterum.some(e => e % 2 === 0, [5, 7, 11])
            expect(result).to.be.equal(false)
        })

        it('throws an error if first parameter is not a function', function () {
            function test () {
                Iterum.some(/a+/, [5, 7, 11])
            }
            expect(test).to.throw(TypeError,
               '/a+/ is not a function')
        })

        it('throws an error if second parameter is not an iterable', function () {
            function test () {
                Iterum.some(e => e % 2 === 0, /a+/)
            }
            expect(test).to.throw(TypeError,
               '/a+/ is not an Iterable instance')
        })
    })
})
