const {expect} = require('chai')
const Iterum = require('../src/')

describe('includes', function () {
    describe('method', function () {
        it('given iterable [5, 6, 7, 8, 9, 10], 7 is included', function () {
            const a = [5, 6, 7, 8, 9, 10]
            const result = Iterum(a).includes(7)
            expect(result).to.be.equal(true)
        })

        it('given iterable "asdfghjkl", "a" is included', function () {
            const a = 'asdfgajkl'
            const result = Iterum(a).includes('a')
            expect(result).to.be.equal(true)
        })

        it('given iterable [1, 5, 3, 8, 2], 2 is included', function () {
            const a = [1, 5, 3, 8, 2]
            const result = Iterum(a)
                .includes(2)
            expect(result).to.be.equal(true)
        })

        it('given iterable "aaaaaaaaaaa" and includes has param "b", it returns false', function () {
            const a = 'aaaaaaaaaaa'
            const result = new Iterum(a)
                .includes('b')
            expect(result).to.be.equal(false)
        })

        it('given iterable [1, 4, 2, 3, 2, 7, 5] and 7 param, it returns true', function () {
            const a = [1, 4, 2, 3, 2, 7, 5]
            const result = Iterum(a).includes(7)
            expect(result).to.be.equal(true)
        })

        it('includes with NaN', function () {
            const a = [4, NaN, 3, 2]
            const result = Iterum(a).includes(NaN)
            expect(result).to.be.equal(true)
        })

        it('includes with +0', function () {
            const a = [1, 4, -0, 3]
            const result = Iterum(a).includes(+0)
            expect(result).to.be.equal(true)
        })

        describe('iterating over iterum instance', function () {
            it('does not mutate the behaviour of includes', function () {
                const a = [1, 4, 2, 3, 8, 5, 6]
                const elem = 8
                const iterum = Iterum(a)
                let result = false
                for (const val of iterum.entries()) {
                    if (val[1] === elem || Object.is(val[1], elem)) {
                        result = true
                        break
                    }
                }
                expect(iterum.includes(elem)).to.be.equal(result)
            })
        })

        describe('wrong arguments', function () {
            it('throws an exception if parameters are not passed', function () {
                function foo () {
                    Iterum(new Set([2, 2, 2])).includes()
                }
                expect(foo).to.throw(TypeError,
                    /^argument 1 is required$/)
            })
        })
    })

    describe('function', function () {
        it('normal behaviour', function () {
            const result = Iterum.includes(7, [5, 7, 10])
            expect(result).to.be.equal(true)
        })

        it('throws an error if second parameter is not an iterable', function () {
            function test () {
                Iterum.includes(7, {})
            }
            expect(test).to.throw(TypeError,
                /^\[object Object\] is not an iterable$/)
        })
    })
})
