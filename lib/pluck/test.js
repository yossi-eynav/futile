'use strict';

const expect = require('chai').expect;
const should = require('chai').should(); // eslint-disable-line no-unused-vars

const pluck = require('./');

describe('pluck', () => {

    const _array = [
        { my_key: 'a' },
        { my_key: 'b' },
        { my_key: 'c' },
        { my_key: 'd' }
    ];

    it('pluck function exist', () => expect(pluck).to.exist);

    it('pluck is a function', () => pluck.should.be.a('function'));

    it('pluck can process array', () => expect(pluck.bind(null, [])).to.not.throw(TypeError));

    it('pluck can not process non array', () => expect(pluck.bind(null, {})).to.throw(TypeError));

    it('Plucks a key from array of objects to it\'s own array', () => {
        const array = _array.map((item) => item);
        const res = pluck(array, 'my_key');

        expect(res.join(',')).to.equal('a,b,c,d');
    });

    it('Returns array of \'undefined\'s when key is missing', () => {
        const array = _array.map((item) => item);
        const res = pluck(array, 'missing_key');

        expect(res.map((item) => typeof item).join(',')).to.equal('undefined,undefined,undefined,undefined');
    });

});
