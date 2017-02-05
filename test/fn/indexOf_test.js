const {expect} = require('chai')
const Iterum = require('../../src/index.js')
const {range} = Iterum

describe('indexOf', function () {
    it('in range iterable between 5 and 10, 7 is in 2 position', function () {
        const index = Iterum(range(5, 10, 1))
            .indexOf(7)
        expect(index).to.be.deep.equal(2)
    })

    it('in range iterable between 5 and 10, 5 is in 0 position', function () {
        const index = Iterum(range(5, 10, 1))
            .indexOf(5)
        expect(index).to.be.deep.equal(0)
    })

    it('in range iterable between 5 and 10, 10 is in 5 position', function () {
        const index = Iterum(range(5, 10, 1))
            .indexOf(10)
        expect(index).to.be.deep.equal(5)
    })

    it('in range iterable between 5 and 10, with 0 it returns -1', function () {
        const index = new Iterum(range(5, 10, 1))
            .indexOf(0)
        expect(index).to.be.deep.equal(-1)
    })

    describe('If it exists value that is an iterum instance,', function () {
        it('this value is interpreted as a sequence of values of this iterum instance', function () {
            const index = new Iterum([0, range(5, 10, 1)]).indexOf(6)
            expect(index).to.be.deep.equal(2)
        })
    })

    describe('iterating over iterum instance', function () {
        it('does not mutate the behaviour of indexOf', function () {
            const elem = 8
            const iterum = Iterum(range(5, 10, 1))
            let index
            for (const val of iterum.entries()) {
                if (val[1] === elem) {
                    [index] = val
                    break
                }
            }
            expect(iterum.indexOf(elem)).to.be.deep.equal(index)
        })
    })
})
