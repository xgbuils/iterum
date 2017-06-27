const {expect} = require('chai')
const Iterum = require('../../src/index.js')

describe('indexOfFrom', function () {
    it('given iterable [5, 6, 7, 8, 9, 10], 7 is in 2 position', function () {
        const a = [5, 6, 7, 8, 9, 10]
        const index = Iterum(a).indexOfFrom(7, 2)
        expect(index).to.be.equal(2)
    })

    it('given iterable "asdfghjkl", "a" is in 0 position', function () {
        const a = 'asdfgajkl'
        const index = Iterum(a).indexOfFrom('a', 1)
        expect(index).to.be.equal(5)
    })

    it('given iterable [1, 5, 3, 8, 2], 2 is in 5 position', function () {
        const a = [1, 5, 3, 8, 2]
        const index = Iterum(a).indexOfFrom(2, 3)
        expect(index).to.be.equal(4)
    })

    it('given iterable "aaaaaaaaaaa" and indexOfFrom has param "b" & 2, it returns -1', function () {
        const a = 'aaaaaaaaaaa'
        const index = new Iterum(a).indexOfFrom('b', 2)
        expect(index).to.be.equal(-1)
    })

    it('given iterable [1, 4, 2, 3, 2, 7, 5] and indexOfFrom has params 7 & 0, it returns 5', function () {
        const a = [1, 4, 2, 3, 2, 7, 5]
        const result = Iterum(a).indexOfFrom(7, 0)
        expect(result).to.be.equal(5)
    })

    describe('wrong arguments', function () {
        it('throws an exception if parameters are not passed', function () {
            function foo () {
                Iterum(new Set([1, 4, 2])).indexOfFrom()
            }
            expect(foo).to.throw(TypeError,
                /^argument 1 is required$/)
        })

        it('throws an exception if one parameter is only passed', function () {
            function foo () {
                Iterum(new Set([1, 4, 2])).indexOfFrom(Symbol())
            }
            expect(foo).to.throw(TypeError,
                /^undefined is not a number$/)
        })

        it('throws an exception if second parameter is not a number', function () {
            function foo () {
                Iterum(new Set([1, 4, 2])).indexOfFrom(Symbol(), 'bar')
            }
            expect(foo).to.throw(TypeError,
                /^bar is not a number$/)
        })
    })

    describe('static method', function () {
        it('normal behaviour', function () {
            const result = Iterum.indexOfFrom([5, 7, 10], 7, 1)
            expect(result).to.be.equal(1)
        })

        it('throws an error if first parameter is not an iterable', function () {
            function test () {
                Iterum.indexOfFrom(null, 7, 8)
            }
            expect(test).to.throw(TypeError,
                /^null is not an Iterable instance$/)
        })
    })
})
