const {expect} = require('chai')
const Iterum = require('../../src/index.js')

describe('.powerSet', function () {
    describe('method', function () {
        context('given empty iterable', function () {
            it('power set is an iterable with empty iterable', function () {
                const arr = []
                const iterable = Iterum(arr).powerSet(3)
                expect([...iterable].map(e => [...e]))
                    .to.be.deep.equal([[]])
            })
        })
        context('given iterable with one element', function () {
            it('power set is an iterable with empty iterable', function () {
                const arr = [2]
                const iterable = Iterum(arr).powerSet()
                expect([...iterable].map(e => [...e]))
                    .to.be.deep.equal([
                        [],
                        [2]
                    ])
            })
        })

        context('given iterable with several elements', function () {
            it('power set is an iterable with empty iterable', function () {
                const arr = [1, 2, 3]
                const iterable = Iterum(arr).powerSet()
                expect([...iterable].map(e => [...e]))
                    .to.be.deep.equal([
                        [],
                        [1], [2], [3],
                        [1, 2], [1, 3], [2, 3],
                        [1, 2, 3]
                    ])
            })
        })

        it('iterable is not consumed on first iteration', function () {
            const iterable = Iterum([1, 2]).powerSet()
            const first = [...iterable]
            const second = [...iterable]
            expect(first.map(e => [...e]))
                .to.be.deep.equal(second.map(e => [...e]))
        })

        it('iterables within iterable are not consumed on first iteration', function () {
            const iterator = Iterum([1, 2]).powerSet()[Symbol.iterator]()
            iterator.next()
            const nestedIterable = iterator.next().value
            const first = [...nestedIterable]
            const second = [...nestedIterable]
            expect(first).to.be.deep.equal(second)
        })
    })

    describe('function', function () {
        it('normal behaviour', function () {
            const iterable = Iterum.powerSet([5, 7])
            expect([...iterable].map(e => [...e])).to.be.deep.equal([
                [],
                [5], [7],
                [5, 7]
            ])
        })

        it('throws an error if first parameter is not an iterable', function () {
            function test () {
                Iterum.powerSet(true)
            }
            expect(test).to.throw(TypeError,
                /^true is not an iterable$/)
        })
    })
})
