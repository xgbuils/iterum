const {expect} = require('chai')
const sinon = require('sinon')
const Iterum = require('../src/')

describe('reduce', function () {
    describe('method', function () {
        it('returns correct value', function () {
            const cb = (a, b) => a - b
            const value = Iterum([1, 3, 5]).reduce(cb, 0)
            expect(value).to.be.deep.equal(-9)
        })

        it('without initial value', function () {
            const cb = sinon.spy(function (a, b) {
                return a + b
            })
            const iterum = Iterum([1, 3, 5])
            iterum.reduce(cb, 0)
            expect(cb.args).to.be.deep.equal([
                [0, 1],
                [1, 3],
                [4, 5]
            ])
        })

        describe('wrong arguments', function () {
            it('throws an exception if parameters are not passed', function () {
                function test () {
                    Iterum(new Set([1, 4, 2])).reduce()
                }
                expect(test).to.throw(TypeError,
                    /^undefined is not a function$/)
            })

            it('throws an exception if initial value parameter is not passed', function () {
                function test () {
                    Iterum(new Set([1, 4, 2])).reduce((a, b) => a + b)
                }
                expect(test).to.throw(TypeError,
                    /^argument 2 is required$/)
            })
        })
    })

    describe('function', function () {
        it('normal behaviour', function () {
            const result = Iterum.reduce((a, b) => a + b, 0, [5, 7, 10])
            expect(result).to.be.equal(22)
        })

        it('throws an error if first parameter is not a function', function () {
            function test () {
                Iterum.reduce(42, 0, [5, 7, 10])
            }
            expect(test).to.throw(TypeError,
                /^42 is not a function$/)
        })

        it('throws an error if third parameter is not an iterable', function () {
            function test () {
                Iterum.reduce((a, b) => a + b, 0, 42)
            }
            expect(test).to.throw(TypeError,
                /^42 is not an iterable$/)
        })
    })
})
