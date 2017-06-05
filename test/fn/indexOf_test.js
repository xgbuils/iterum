const {expect} = require('chai')
const Iterum = require('../../src/index.js')

describe('indexOf', function () {
    it('given iterable [5, 6, 7, 8, 9, 10], 7 is in 2 position', function () {
        const a = [5, 6, 7, 8, 9, 10]
        const index = Iterum(a).indexOf(7)
        expect(index).to.be.equal(2)
    })

    it('given iterable "asdfghjkl", "a" is in 0 position', function () {
        const a = 'asdfgajkl'
        const index = Iterum(a).indexOf('a')
        expect(index).to.be.equal(0)
    })

    it('given iterable [1, 5, 3, 8, 2], 2 is in 5 position', function () {
        const a = [1, 5, 3, 8, 2]
        const index = Iterum(a)
            .indexOf(2)
        expect(index).to.be.equal(4)
    })

    it('given iterable "aaaaaaaaaaa" and indexOf has param "b", it returns -1', function () {
        const a = 'aaaaaaaaaaa'
        const index = new Iterum(a)
            .indexOf('b')
        expect(index).to.be.equal(-1)
    })

    it('given iterable [1, 4, 2, 3, 2, 7, 5] and indexOf has params 7, it returns 5', function () {
        const a = [1, 4, 2, 3, 2, 7, 5]
        const result = Iterum(a).indexOf(7)
        expect(result).to.be.equal(5)
    })

    describe('iterating over iterum instance', function () {
        it('does not mutate the behaviour of indexOf', function () {
            const a = [1, 4, 2, 3, 8, 5, 6]
            const elem = 8
            const iterum = Iterum(a)
            let index
            for (const val of iterum.entries()) {
                if (val[1] === elem) {
                    [index] = val
                    break
                }
            }
            expect(iterum.indexOf(elem)).to.be.equal(index)
        })
    })

    describe('wrong arguments', function () {
        it('throws an exception if parameters are not passed', function () {
            function foo () {
                Iterum(new Set([1, 4, 2])).indexOf()
            }
            expect(foo).to.throw(TypeError,
                /^argument 1 is required$/)
        })
    })

    describe('static method', function () {
        it('normal behaviour', function () {
            const result = Iterum.indexOf([5, 7, 10], 7)
            expect(result).to.be.equal(1)
        })

        it('replaces first parameter by empty iterable when is not an iterable', function () {
            const result = Iterum.indexOf({}, 7)
            expect(result).to.be.equal(-1)
        })
    })
})
