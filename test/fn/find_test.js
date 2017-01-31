const {expect} = require('chai')
const Iterum = require('../../src/index.js')
const {Range} = Iterum

describe('find', function () {
    it('if it exists element that predicate returns true, then it returns the pair [key, value]', function () {
        const value = Range(-5, 8, 3)
            .find(function (e) {
                return e % 4 === 0
            })
        expect(value).to.be.equal(4)
    })

    it('if it does not exist element that predicate returns true, then it returns -1', function () {
        const value = Range(-5, 8, 3)
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
            const iterum = Range(7, 1, -2)
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

    describe('If it exists value that is an iterum instance,', function () {
        it('this value is interpreted as a sequence of values of this iterum instance', function () {
            const value = Iterum([100, Range(2, -Infinity, -1), 55])
                .find(function (e) {
                    return e < 0
                })
            expect(value).to.be.equal(-1)
        })
    })

    describe('bad arguments', function () {
        it('throws an exception when the first argument is not a function', function () {
            function foo () {
                Range(1, 6, 2).find('foo')
            }
            expect(foo).to.throw(TypeError,
                /^foo is not a function$/)
        })
    })
})
