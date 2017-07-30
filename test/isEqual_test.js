const {expect} = require('chai')
const Iterum = require('../src/')

describe('.isEqual', function () {
    describe('method', function () {
        it('returns true if every value of iterables is equal using sameValueZero', function () {
            const obj = {}
            const a = new Set([NaN, 2, -0, +0, obj])
            const b = [NaN, 2, -0, obj]
            expect(Iterum(a).isEqual(b)).to.be.equal(true)
        })

        it('returns false if some value of iterables is not equal using sameValueZero', function () {
            const obj = {}
            const a = [NaN, 2, undefined, obj]
            const b = [NaN, 2, 0, obj]
            expect(Iterum(a).isEqual(b)).to.be.equal(false)
        })

        it('returns false if iterables has different number of values', function () {
            const obj = {}
            const a = [2, 0]
            const b = [2, 0, obj]
            expect(Iterum(a).isEqual(b)).to.be.equal(false)
        })

        describe('empty iterables', function () {
            describe('method', function () {
                it('empty array is equal than empty string', function () {
                    const a = ''
                    const b = []
                    expect(Iterum(a).isEqual(b)).to.be.equal(true)
                })
            })
        })

        describe('inmutability', function () {
            it('isEqual method does not mutate iterable object', function () {
                const a = [1, 6, 3]
                const b = [6, 8, 4]
                const x = Iterum(a)
                x.isEqual(b)
                expect([...x]).to.be.deep.equal([...a])
            })
        })

        describe('no iterable arguments', function () {
            describe('method', function () {
                it('returns false if the argument is not an iterable', function () {
                    const a = '3'
                    const b = 3
                    expect(Iterum(a).isEqual(b)).to.equal(false)
                })
            })

            describe('function', function () {
                it('returns false if first argument is not an iterable', function () {
                    const a = null
                    const b = ''
                    expect(Iterum.isEqual(a, b)).to.equal(false)
                })

                it('returns false if second argument is not an iterable', function () {
                    const a = [20]
                    const b = 20
                    expect(Iterum.isEqual(a, b)).to.equal(false)
                })

                it('returns false if both arguments are not iterables', function () {
                    const a = null
                    const b = null
                    expect(Iterum.isEqual(a, b)).to.equal(false)
                })
            })
        })
    })

    describe('function', function () {
        it('normal behaviour', function () {
            const result = Iterum.isEqual([1, 1, 1], [1, 1, 1])
            expect(result).to.be.equal(true)
        })
    })
})
