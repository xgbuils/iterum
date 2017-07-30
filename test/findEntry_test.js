const {expect} = require('chai')
const Iterum = require('../src/')

describe('findEntry', function () {
    describe('method', function () {
        describe('if it exists element that predicate returns true', function () {
            it('returns the pair [key, value] that predicate firstly matches', function () {
                const a = [7, 5, 3, 1]
                const entry = Iterum(a).findEntry(e => e === 5)
                expect(entry).to.be.deep.equal([1, 5])
            })
        })

        describe('if it does not exist element that predicate returns true', function () {
            it('returns undefined', function () {
                const a = [7, 5, 3, 1]
                const entry = Iterum(a).findEntry(e => e === 4)
                expect(entry).to.be.equal(undefined)
            })
        })

        describe('iterating over Iterum instance', function () {
            it('does not mutate the behaviour of findEntry', function () {
                const a = [7, 5, 3, 1]
                const predicate = e => e === 3
                const iterum = Iterum(a)
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
                const a = [1, 3, 5]
                function foo () {
                    Iterum(a).findEntry(true)
                }
                expect(foo).to.throw(TypeError,
                    /^true is not a function$/)
            })
        })
    })

    describe('function', function () {
        it('normal behaviour', function () {
            const result = Iterum.findEntry(e => e % 4 === 3, [5, 7, 10])
            expect(result).to.be.deep.equal([1, 7])
        })

        it('throws an error if first parameter is not a function', function () {
            function test () {
                Iterum.findEntry(false, [5, 7, 10])
            }
            expect(test).to.throw(TypeError,
                /^false is not a function$/)
        })

        it('throws an error if second parameter is not an iterable', function () {
            function test () {
                Iterum.findEntry(e => e % 4 === 3, false)
            }
            expect(test).to.throw(TypeError,
                /^false is not an iterable$/)
        })
    })
})
