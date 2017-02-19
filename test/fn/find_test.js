const {expect} = require('chai')
const Iterum = require('../../src/index.js')

describe('find', function () {
    it('if it exists element that predicate returns true, then it returns the pair [key, value]', function () {
        const a = [-5, -2, 1, 4, 7]
        const value = Iterum(a)
            .find(function (e) {
                return e % 4 === 0
            })
        expect(value).to.be.equal(4)
    })

    it('if it does not exist element that predicate returns true, then it returns -1', function () {
        const a = [-5, -2, 1, 4, 7]
        const value = Iterum(a)
            .find(function (e) {
                return e > 8
            })
        expect(value).to.be.equal(undefined)
    })

    describe('iterating over iterum instance', function () {
        it('does not mutate the behaviour of find', function () {
            function predicate (e) {
                return e === 3
            }
            const a = [7, 5, 3, 1]
            const iterum = Iterum(a)
            let value
            for (const val of iterum.entries()) {
                if (predicate(val[1])) {
                    [, value] = val
                    break
                }
            }
            expect(iterum.find(predicate)).to.be.deep.equal(value)
        })
    })

    describe('using all parameters of callback', function () {
        it('find method does not mutate iterum instance behaviour', function () {
            const value = Iterum([1, -4, 4, 2, 2, 5, -3, 0, 2, -4, 6])
                .find(function (e, index, iterum) {
                    return [...iterum
                        .slice(0, index)]
                        .length > 3
                })
            expect(value).to.be.equal(2)
        })
    })

    describe('bad arguments', function () {
        it('throws an exception when the first argument is not a function', function () {
            function foo () {
                Iterum(new Set([1, 4, 2])).find('foo')
            }
            expect(foo).to.throw(TypeError,
                /^foo is not a function$/)
        })
    })

    describe('static method', function () {
        it('normal behaviour', function () {
            const result = Iterum.find([5, 7, 10], e => e === 5)
            expect(result).to.be.equal(5)
        })

        it('replaces first parameter by empty iterable when is not an iterable', function () {
            const result = Iterum.find(Symbol.hasInstance, e => e === 5)
            expect(result).to.be.equal(undefined)
        })
    })
})
