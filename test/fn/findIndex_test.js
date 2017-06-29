const {expect} = require('chai')
const Iterum = require('../../src/index.js')

describe('findIndex', function () {
    describe('method', function () {
        describe('if it exists element that predicate returns true', function () {
            it('returns its index', function () {
                const a = [5, 6, 7, 8, 9, 10]
                const index = Iterum(a).findIndex(e => e % 9 === 0)
                expect(index).to.be.equal(4)
            })
        })

        describe('if it does not exist element that predicate returns true', function () {
            it('returns -1', function () {
                const a = [5, 6, 7, 8, 9, 10]
                const index = Iterum(a).findIndex(e => e % 10 === 3)
                expect(index).to.be.equal(-1)
            })
        })

        describe('iterating over iterum instance', function () {
            it('does not mutate the behaviour of findIndex', function () {
                const a = [1, 7, 5, 2, 3, 5, 6]
                const predicate = e => e % 4 === 3
                const iterum = Iterum(a)
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
                const a = 'asdasf'
                function foo () {
                    Iterum(a).findIndex(new Number(8))
                }
                expect(foo).to.throw(TypeError,
                    /^8 is not a function$/)
            })
        })
    })

    describe('function', function () {
        it('normal behaviour', function () {
            const result = Iterum.findIndex(e => e > 7, [5, 7, 10])
            expect(result).to.be.equal(2)
        })

        it('throws an error if first parameter is not a function', function () {
            function test () {
                Iterum.findIndex(null, [5, 7, 10])
            }
            expect(test).to.throw(TypeError,
                /^null is not a function$/)
        })

        it('throws an error if second parameter is not an iterable', function () {
            function test () {
                Iterum.findIndex(e => e > 7, null)
            }
            expect(test).to.throw(TypeError,
                /^null is not an Iterable instance$/)
        })
    })
})
