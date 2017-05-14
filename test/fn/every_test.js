const {expect} = require('chai')
const Iterum = require('../../src/index.js')

describe('every', function () {
    it('if predicate is true for every value, returns true', function () {
        const a = [2, 3, 5, 6]
        const value = Iterum(a)
            .every(e => e >= 2 && e <= 6)
        expect(value).to.be.equal(true)
    })

    it('if predicate returns false for some value, returns false', function () {
        const a = [1, 5, 2, 8, 12, 9, 3, 4]
        const value = Iterum(a)
            .every(e => e < 10)
        expect(value).to.be.equal(false)
    })

    describe('iterating over iterum instance', function () {
        it('does not mutate the behaviour of every', function () {
            const a = [5, 6, 7, 8, 9, 10]
            const iterum = Iterum(a)
            const predicate = e => e < 10
            let result = true
            for (const val of iterum.entries()) {
                if (predicate(val[1])) {
                    result = false
                    break
                }
            }
            expect(iterum.every(predicate)).to.be.deep.equal(result)
        })
    })

    describe('using third Iterum parameter of callback', function () {
        it('every method does not mutate iterum behaviour', function () {
            const value = Iterum([1, -4, 4, 2, 2, 5, -3, 0, 2, -4, 6])
                .every(function (e, index, iterum) {
                    return [...iterum
                        .slice(0, index)]
                        .reduce(function (a, b) {
                            return a + b
                        }, 0) > 5
                })
            expect(value).to.be.deep.equal(false)
        })
    })

    describe('bad arguments', function () {
        it('throws an exception when the first argument is not a function', function () {
            function foo () {
                Iterum([]).every(new Number(8))
            }
            expect(foo).to.throw(TypeError,
                /^8 is not a function$/)
        })
    })

    describe('static method', function () {
        it('normal behaviour', function () {
            const result = Iterum.every([5, 7, 10], e => e < 10)
            expect(result).to.be.equal(false)
        })

        it('replaces first parameter by empty iterable when is not an iterable', function () {
            const result = Iterum.every({a: 2}, e => e < 10)
            expect(result).to.be.equal(true)
        })
    })
})
