const {expect} = require('chai')
const Iterum = require('../../src/index.js')

describe('drop', function () {
    it('drop 2 values', function () {
        const iterum = Iterum([7, 100, 4, 7, 2])
            .drop(3)
        expect([...iterum]).to.be.deep.equal([7, 2])
    })

    it('drop 1 value by default', function () {
        const iterum = Iterum([2, 0, 3, 6, 1, 2])
            .drop()
        expect([...iterum]).to.be.deep.equal([0, 3, 6, 1, 2])
    })

    it('drop more values than iterable provide', function () {
        const iterum = Iterum([2, 0, 3, 6, 1, 2])
            .drop(10)
        expect([...iterum]).to.be.deep.equal([])
    })

    describe('converting iterum instance to array', function () {
        it('returns the same as converting [Symbol.iterator]() iterator to array', function () {
            const iterum = Iterum([7, 100, 4, 7, 2])
                .drop(2)
            const iterator = iterum[Symbol.iterator]()
            expect([...iterator]).to.be.deep.equal([...iterum])
        })
    })

    describe('inmutability', function () {
        it('drop method does not mutate object', function () {
            const a = 'dropdropdrop'
            const x = Iterum(a)
            x.drop(4)
            expect([...x]).to.be.deep.equal([...a])
        })
    })

    describe('bad arguments', function () {
        it('throws an exception when the first argument is not a function', function () {
            function foo () {
                Iterum('bar').filter(23)
            }
            expect(foo).to.throw(TypeError,
                /^23 is not a function$/)
        })
    })

    describe('static method', function () {
        it('normal behaviour', function () {
            const dropIterable = Iterum.drop([5, 7, 10], 2)
            expect([...dropIterable]).to.be.deep.equal([10])
        })

        it('replaces first parameter by empty iterable when is not an iterable', function () {
            const dropIterable = Iterum.drop(true, 5)
            expect([...dropIterable]).to.be.deep.equal([])
        })
    })
})
