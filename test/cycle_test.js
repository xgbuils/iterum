const {expect} = require('chai')
const Iterum = require('../src/')

describe('cycle', function () {
    describe('method', function () {
        it('if parameter is negative, it always returns {value: undefined, done: true}', function () {
            const iterator = Iterum([8, 1]).cycle()[Symbol.iterator]()
            const array = []
            for (let i = 0; i < 10; ++i) {
                array.push(iterator.next().value)
            }
            expect(array).to.be.deep.equal([8, 1, 8, 1, 8, 1, 8, 1, 8, 1])
        })

        it('if iterable is empty, it returns empty iterable', function () {
            const iterable = Iterum([]).cycle()
            expect([...iterable]).to.be.deep.equal([])
        })

        it('cycle is not consumed on first traverse', function () {
            const iterable = Iterum([8]).cycle().take(5)
            const first = [...iterable]
            const second = [...iterable]
            expect(first).to.be.deep.equal(second)
        })
    })

    describe('function', function () {
        it('normal behaviour', function () {
            const iterable = Iterum.cycle([5, 7, 10]).take(10)
            expect([...iterable]).to.be.deep.equal([
                5, 7, 10, 5, 7, 10, 5, 7, 10, 5
            ])
        })

        it('throws an error if first parameter is not an iterable', function () {
            function test () {
                Iterum.cycle(null)
            }
            expect(test).to.throw(TypeError,
                /^null is not an iterable$/)
        })
    })
})
