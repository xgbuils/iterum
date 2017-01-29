var expect = require('chai').expect
var Iterum = require('../../src/index.js')
var Range = Iterum.Range

describe('findEntry', function () {
    it('if it exists element that predicate returns true, then it returns the pair [key, value]', function () {
        var entry = Range(7, 1, -2)
            .findEntry(function (e) {
                return e === 5
            })
        expect(entry).to.be.deep.equal([1, 5])
    })

    it('if it does not exist element that predicate returns true, then it returns -1', function () {
        var entry = Range(7, 1, -2)
            .findEntry(function (e) {
                return e === 4
            })
        expect(entry).to.be.equal(undefined)
    })

    describe('iterating over iterum instance', function () {
        it('do not mutate the behaviour of findEntry', function () {
            function predicate (e) {
                return e === 3
            }
            var iterum = Range(7, 1, -2)
            let entry
            for (let val of iterum.entries()) {
                if (predicate(val[1])) {
                    entry = val
                    break
                }
            }
            expect(iterum.findEntry(predicate)).to.be.deep.equal(entry)
        })
    })

    describe('using all generator parameters of callback', function () {
        it('findEntry method does not mutate iterum instance behaviour', function () {
            var entry = Iterum([1, -4, 4, 2, 2, 5, -3, 0, 2, -4, 6])
                .findEntry(function (e, index, iterum) {
                    return [...iterum
                        .slice(0, index)]
                        .length > 5
                })
            expect(entry).to.be.deep.equal([6, -3])
        })
    })

    describe('If it exists value that is an iterum instance,', function () {
        it('this value is interpreted as a sequence of values of this iterum instance', function () {
            var index = Iterum([100, Range(2, 1, -1), 100])
                .findEntry(function (e) {
                    return e === 1
                })
            expect(index).to.be.deep.equal([2, 1])
        })
    })

    describe('bad arguments', function () {
        it('throws an exception when the first argument is not a function', function () {
            function foo () {
                Range(1, 6, 2).findEntry(true)
            }
            expect(foo).to.throw(TypeError,
                /^true is not a function$/)
        })
    })
})
