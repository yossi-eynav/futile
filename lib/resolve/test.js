'use strict';

const expect = require('chai').expect;
const should = require('chai').should(); // eslint-disable-line no-unused-vars

const resolve = require('./');

describe('resolve', () => {

    const data_structure = {
        top: {
            middle: {
                low: 'value'
            }
        }
    };

    it('resolve function exist', () => expect(resolve).to.exist);

    it('resolve is a function', () => resolve.should.be.a('function'));

    it('resolve can process string', () => expect(resolve.bind(null, '')).to.not.throw(TypeError));

    it('resolve can not process non string', () => expect(resolve.bind(null, {})).to.throw(TypeError));

    it('Resolves to nested data structure', () => {
        const res = resolve('top.middle', data_structure);

        expect(JSON.stringify(res)).to.equal(JSON.stringify({low: 'value'}));
    });

    it('Resolves to an object', () => {
        const res = resolve('top.middle.low', data_structure);
        expect(res).to.equal('value');
    });

    it('Resolves from global object', () => {
        global.some = {nested: 'value'};

        const res = resolve('some.nested');
        expect(res).to.equal('value');
    });

    it('Resolves from global object when context is scoped', () => {
        global.some = {nested: 'value'};

        const lib = {
            resolve
        };

        const res = lib.resolve('some.nested');
        expect(res).to.equal('value');
    });

    it('Resolves missing data to \'undefined\'', () => {
        const res = resolve('missing.data', data_structure);
        expect(res).to.equal(undefined);
    });

});
