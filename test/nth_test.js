const {expect} = require('chai')
const Iterum = require('../src/')

describe('nth', function () {
    describe('method', function () {
        describe('index greater than number of iterable values', function () {
            it('it returns undefined', function () {
                const arr = [0, 1, 2, 3]
                const result = Iterum(arr).nth(6)
                expect(result).to.be.equal(undefined)
            })
        })

        describe('negative index', function () {
            it('it returns false', function () {
                const arr = [0, 1, 2, 8]
                const result = Iterum(arr).nth(-3)
                expect(result).to.be.equal(undefined)
            })
        })

        describe('inner index', function () {
            it('returns the same as converting [Symbol.iterator]() iterator to array', function () {
                const set = new Set([4, 1, 7, 3, 9, 4, 2])
                const result = Iterum(set).nth(0)
                expect(result).to.be.equal(4)
            })
        })

        describe('wrong arguments', function () {
            let arr
            beforeEach(function () {
                arr = [5, 6, 7, 8, 9, 10]
            })
            it('throws an exception when the does not have parameters', function () {
                function test () {
                    Iterum(arr).nth()
                }
                expect(test).to.throw(TypeError,
                    /^undefined is not a number$/)
            })

            it('throws an exception when the first argument is not a number', function () {
                function test () {
                    Iterum(arr).nth('foo')
                }
                expect(test).to.throw(TypeError,
                    /^foo is not a number$/)
            })
        })
    })

    describe('function', function () {
        it('normal behaviour', function () {
            const result = Iterum.nth(2, [5, 7, 10])
            expect(result).to.be.equal(10)
        })

        it('throws an error if first parameter is not a number', function () {
            function test () {
                Iterum.nth(false, [5, 7, 10])
            }
            expect(test).to.throw(TypeError,
                /^false is not a number$/)
        })

        it('throws an error if second parameter is not an iterable', function () {
            function test () {
                Iterum.nth(2, false)
            }
            expect(test).to.throw(TypeError,
                /^false is not an iterable$/)
        })
    })
})
