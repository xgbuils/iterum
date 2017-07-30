const {expect} = require('chai')
const sinon = require('sinon')
const Iterum = require('../src/')

describe('reduceRight', function () {
    describe('method', function () {
        it('returns correct value', function () {
            const cb = (a, b) => a - b
            const value = Iterum([1, 3, 5]).reduceRight(cb, 0)
            expect(value).to.be.deep.equal(-9)
        })

        it('without initial value', function () {
            const cb = sinon.spy(function (a, b) {
                return a + b
            })
            const iterum = Iterum([1, 3, 5])
            iterum.reduceRight(cb, 0)
            expect(cb.args).to.be.deep.equal([
                [0, 5],
                [5, 3],
                [8, 1]
            ])
        })

        describe('wrong arguments', function () {
            it('throws an exception if parameters are not passed', function () {
                function test () {
                    Iterum(new Set([1, 4, 2])).reduceRight()
                }
                expect(test).to.throw(TypeError,
                    /^undefined is not a function$/)
            })

            it('throws an exception if initial value parameter is not passed', function () {
                function test () {
                    Iterum(new Set([1, 4, 2])).reduceRight((a, b) => a + b)
                }
                expect(test).to.throw(TypeError,
                    /^argument 2 is required$/)
            })
        })
    })

    describe('function', function () {
        it('normal behaviour', function () {
            const result = Iterum.reduceRight((a, b) => a + b, 0, [5, 7, 10])
            expect(result).to.be.equal(22)
        })

        it('throws an error if first parameter is not an iterable', function () {
            function test () {
                Iterum.reduceRight({a: 2}, 0, [5, 7, 10])
            }
            expect(test).to.throw(TypeError,
                /^\[object Object\] is not a function$/)
        })

        it('throws an error if first parameter is not an iterable', function () {
            function test () {
                Iterum.reduceRight((a, b) => a + b, 0, {a: 2})
            }
            expect(test).to.throw(TypeError,
                /^\[object Object\] is not an iterable$/)
        })
    })
})
