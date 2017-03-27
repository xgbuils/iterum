const {expect} = require('chai')
const Iterum = require('../../src/index.js')

function cmpX (a, b) {
    return a.x === b.x
}

function cmpPair (a, b) {
    return a[0] - a[1] === b[0] - b[1]
}

describe('.uniqWith', function () {
    it('filters values that are equal by property x', function () {
        const a = [{x: 2}, {x: 1}, {x: 2}, {x: 3}]
        const iterable = Iterum(a).uniqWith(cmpX)
        expect([...iterable]).to.be.deep.equal([{x: 2}, {x: 1}, {x: 3}])
    })

    it('filters values that are equal by diff of pair elements', function () {
        const a = [[5, 2], [2, 0], [2, 3], [-2, -1], [3, 0], [1, 4]]
        const iterable = Iterum(a).uniqWith(cmpPair)
        expect([...iterable]).to.be.deep.equal([[5, 2], [2, 0], [2, 3], [1, 4]])
    })

    describe('converting iterum instance to array', function () {
        it('returns the same as converting [Symbol.iterator]() iterator to array', function () {
            const a = [{x: 2}, {x: 1}, {x: 2}, {x: 3}]
            const iterable = Iterum(a)
                .uniqWith(cmpX)
            const iterator = iterable[Symbol.iterator]()
            expect([...iterator]).to.be.deep.equal([...iterable])
        })
    })

    describe('inmutability', function () {
        it('map method does not mutate object', function () {
            const a = new Set([[5, 2], [2, 0], [2, 3], [-2, -1], [3, 0], [1, 4]])
            const x = Iterum(a)
            x.uniqWith(cmpPair)
            expect([...x]).to.be.deep.equal([...a])
        })
    })

    describe('static method', function () {
        it('normal behaviour', function () {
            const iterable = Iterum.uniqWith([{x: 2}, {x: 1}, {x: 2}, {x: 3}], cmpX)
            expect([...iterable]).to.be.deep.equal([{x: 2}, {x: 1}, {x: 3}])
        })

        it('replaces first parameter by empty iterable when is not an iterable', function () {
            const iterable = Iterum.uniqWith(/a+/, cmpPair)
            expect([...iterable]).to.be.deep.equal([])
        })
    })
})
