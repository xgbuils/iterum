const {expect} = require('chai')
const Iterum = require('../../src/index.js')

describe('has', function () {
    describe('method', function () {
        describe('index greater than number of iterable values', function () {
            it('it returns false', function () {
                const arr = [0, 1, 2, 3]
                const result = Iterum(arr).has(6)
                expect(result).to.be.equal(false)
            })
        })

        describe('negative index', function () {
            it('it returns false', function () {
                const arr = [0, 1, 2, 8]
                const result = Iterum(arr).has(-3)
                expect(result).to.be.equal(false)
            })
        })

        describe('inner index', function () {
            it('returns the same as converting [Symbol.iterator]() iterator to array', function () {
                const set = new Set([4, 1, 7, 3, 9, 4, 2])
                const result = Iterum(set).has(2)
                expect(result).to.be.equal(true)
            })
        })

        describe('wrong arguments', function () {
            let arr
            beforeEach(function () {
                arr = [5, 6, 7, 8, 9, 10]
            })
            it('throws an exception when the does not have parameters', function () {
                function test () {
                    Iterum(arr).has()
                }
                expect(test).to.throw(TypeError,
                    /^undefined is not a number$/)
            })

            it('throws an exception when the first argument is not a number', function () {
                function test () {
                    Iterum(arr).has('foo')
                }
                expect(test).to.throw(TypeError,
                    /^foo is not a number$/)
            })
        })
    })

    describe('function', function () {
        it('normal behaviour', function () {
            const result = Iterum.has(1, [5, 7, 10])
            expect(result).to.be.equal(true)
        })

        it('throws an error if first parameter is not a number', function () {
            function test () {
                Iterum.has(false, [5, 7, 10])
            }
            expect(test).to.throw(TypeError,
                /^false is not a number$/)
        })

        it('throws an error if second parameter is not an iterable', function () {
            function test () {
                Iterum.has(1, false)
            }
            expect(test).to.throw(TypeError,
                /^false is not an Iterable instance$/)
        })
    })
})
