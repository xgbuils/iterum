const {expect} = require('chai')
const Iterum = require('../../src/index.js')
const {toArray} = require('../utils/')

describe('.tap', function () {
    describe('method', function () {
        it('returns the same iterable', function () {
            const iterable = [2, 6, 4, 7]
            const fn = value => 2 * value
            const result = Iterum(iterable).tap(fn)
            expect(toArray(result)).to.be.deep.equal(toArray(iterable))
        })

        it('function is not called if iterable is not traversed', function () {
            const obj = {
                sideEffect: 0
            }
            const iterable = [2, 6, 4, 7]
            Iterum(iterable)
                .tap(() => {
                    ++obj.sideEffect
                })
            expect(obj.sideEffect).to.be.equal(0)
        })

        it('function is called if iterable is traversed', function () {
            const obj = {
                sideEffect: 0
            }
            const array = [2, 6, 4, 7]
            toArray(Iterum(array)
                .tap(() => {
                    ++obj.sideEffect
                }))
            expect(obj.sideEffect).to.be.equal(array.length)
        })
    })

    describe('function', function () {
        it('normal behaviour', function () {
            const array = [5, 7, 10]
            const iterable = Iterum.tap(e => e * 2, array)
            expect(toArray(iterable)).to.be.deep.equal(array)
        })

        it('throws an error if first parameter is not a function', function () {
            function test () {
                Iterum.tap(false, [5, 7, 10])
            }
            expect(test).to.throw(TypeError,
                /^false is not a function$/)
        })

        it('throws an error if second parameter is not an iterable', function () {
            function test () {
                Iterum.tap(e => e * 2, false)
            }
            expect(test).to.throw(TypeError,
                /^false is not an iterable$/)
        })
    })
})
