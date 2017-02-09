const {expect} = require('chai')
const Iterum = require('../../src/index.js')
const {range} = Iterum

describe('findEntry', function () {
    it('if it exists element that predicate returns true, then it returns the pair [key, value]', function () {
        const entry = range(7, 1, -2)
            .findEntry(function (e) {
                return e === 5
            })
        expect(entry).to.be.deep.equal([1, 5])
    })

    it('if it does not exist element that predicate returns true, then it returns -1', function () {
        const entry = range(7, 1, -2)
            .findEntry(function (e) {
                return e === 4
            })
        expect(entry).to.be.equal(undefined)
    })

    describe('iterating over iterum instance', function () {
        it('does not mutate the behaviour of findEntry', function () {
            function predicate (e) {
                return e === 3
            }
            const iterum = range(7, 1, -2)
            let entry
            for (const val of iterum.entries()) {
                if (predicate(val[1])) {
                    entry = val
                    break
                }
            }
            expect(iterum.findEntry(predicate)).to.be.deep.equal(entry)
        })
    })

    describe('using all parameters of findEntry callback', function () {
        it('findEntry method does not mutate iterum instance behaviour', function () {
            const entry = Iterum([1, -4, 4, 2, 2, 5, -3, 0, 2, -4, 6])
                .findEntry(function (e, index, iterum) {
                    return [...iterum
                        .slice(0, index)]
                        .length > 5
                })
            expect(entry).to.be.deep.equal([6, -3])
        })
    })

    describe('bad arguments', function () {
        it('throws an exception when the first argument is not a function', function () {
            function foo () {
                range(1, 6, 2).findEntry(true)
            }
            expect(foo).to.throw(TypeError,
                /^true is not a function$/)
        })
    })
})
