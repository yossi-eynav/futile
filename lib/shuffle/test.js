'use strict';

const expect = require('chai').expect;
const should = require('chai').should(); // eslint-disable-line no-unused-vars

const shuffle = require('./');

describe('shuffle', () => {

    it('shuffle function exist', () => expect(shuffle).to.exist);

    it('shuffle is a function', () => shuffle.should.be.a('function'));

    it('shuffle can process array', () => expect(shuffle.bind(null, [])).to.not.throw(TypeError));

    it('shuffle can not process non array', () => expect(shuffle.bind(null, {})).to.throw(TypeError));

    it('Returns shuffled array', () => {
        const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const res = shuffle(array, false);

        expect(array.join(',')).to.not.equal(res.join(','));
    });

    it('Shuffled array is the same length', () => {
        const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const res = shuffle(array, false);

        expect(array.length).to.equal(res.length);
    });

    it('Shuffles array and mutates the original', () => {
        const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const orig = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        shuffle(array);

        expect(array.join(',')).to.not.equal(orig.join(','));
    });

    it('Shuffled array have same members as original array', () => {
        const array = Array.apply(null, {length: 100}).map(Number.call, Number); // eslint-disable-line prefer-spread
        const origSum = array.reduce((a, b) => a + b);

        shuffle(array);
        const sum = array.reduce((a, b) => a + b);

        expect(sum).to.equal(origSum);
    });

    it('Shuffles array without mutation', () => {
        const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const orig = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        shuffle(array, false);

        expect(array.join(',')).to.equal(orig.join(','));
    });

});
