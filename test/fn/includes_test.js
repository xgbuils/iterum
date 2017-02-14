const {expect} = require('chai')
const Iterum = require('../../src/')
const {range} = Iterum

describe('includes', function () {
    it('range iterable between 5 and 10 includes 7', function () {
        const result = range(5, 10, 1).includes(7)
        expect(result).to.be.equal(true)
    })

    it('iterable that produces NaN value includes NaN', function () {
        const result = Iterum([5, 'a', NaN]).includes(NaN)
        expect(result).to.be.equal(true)
    })

    it('iterable that produces -0 value includes +0', function () {
        const result = Iterum([-0, 'a', 12]).includes(+0)
        expect(result).to.be.equal(true)
    })

    it('range iterable between 5 and 10 does not include 0', function () {
        const result = range(5, 10, 1).includes(0)
        expect(result).to.be.equal(false)
    })

    it('range iterable between 5 and 10 does not include 5 starting from index 1', function () {
        const result = range(5, 10, 1).includes(0, 1)
        expect(result).to.be.equal(false)
    })

    it('range iterable between 5 and 10 includes 5 starting from index 4', function () {
        const result = range(5, 10, 1).includes(10, 4)
        expect(result).to.be.equal(true)
    })

    describe('iterating over iterum instance', function () {
        it('does not mutate the behaviour of includes', function () {
            const elem = 8
            const iterum = range(5, 10, 1)
            let result
            for (const val of iterum.entries()) {
                if (val[1] === elem || Object.is(val[1], elem)) {
                    result = true
                    break
                }
            }
            expect(iterum.includes(elem)).to.be.equal(result)
        })
    })

    describe('static method', function () {
        it('normal behaviour', function () {
            const result = Iterum.includes([5, 7, 10], 7)
            expect(result).to.be.equal(true)
        })

        it('replaces first parameter by empty iterable when is not an iterable', function () {
            const result = Iterum.includes({}, 7)
            expect(result).to.be.equal(false)
        })
    })
})
