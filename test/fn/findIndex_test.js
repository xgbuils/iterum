const {expect} = require('chai')
const Iterum = require('../../src/index.js')
const {range} = Iterum

describe('findIndex', function () {
    it('if it exists element that predicate returns true, then it returns its index', function () {
        const index = range(5, 10, 1)
            .findIndex(function (e) {
                return e % 9 === 0
            })
        expect(index).to.be.equal(4)
    })

    it('if it does not exist element that predicate returns true, then it returns -1', function () {
        const index = range(5, 10, 1)
            .findIndex(function (e) {
                return e % 9 === 0
            })
        expect(index).to.be.equal(4)
    })

    describe('iterating over iterum instance', function () {
        it('does not mutate the behaviour of findIndex', function () {
            function predicate (e) {
                return e % 4 === 0
            }
            const iterum = range(5, 10, 1)
            let index
            for (const val of iterum.entries()) {
                if (predicate(val[1])) {
                    [index] = val
                    break
                }
            }
            expect(iterum.findIndex(predicate)).to.be.equal(index)
        })
    })

    describe('using all parameters of findIndex callback', function () {
        it('findIndex method does not mutate iterum instance behaviour', function () {
            const index = Iterum([1, -4, 4, 2, 2, 5, -3, 0, 2, -4, 6])
                .findIndex(function (e, index, iterum) {
                    return [...iterum
                        .slice(0, index)]
                        .length > 5
                })
            expect(index).to.be.deep.equal(6)
        })
    })

    describe('bad arguments', function () {
        it('throws an exception when the first argument is not a function', function () {
            function foo () {
                range(5, 10, 1)
                .findIndex(new Number(8))
            }
            expect(foo).to.throw(TypeError,
                /^8 is not a function$/)
        })
    })
})
