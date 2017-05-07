'use strict';

const assert = require('chai').assert;
const should = require('chai').should(); // eslint-disable-line no-unused-vars

const queryStringToObj = require('./');

describe('uri/query-string-to-obj', () => {
    it('is a function', () => assert.typeOf(queryStringToObj, 'function'));
    it('returns an object', () => assert.typeOf(queryStringToObj(), 'object'));
    it('return an object with correct key and value', () => queryStringToObj('param1=1&param2=2').should.deep.equal({param1: '1', param2: '2'}));
    it('prefer later value', () => queryStringToObj('param1=1&param1=2').should.deep.equal({param1: '2'}));
    it('empty declaration is \'true\'', () => queryStringToObj('param1').should.deep.equal({param1: true}));
    it('decodes values', () => queryStringToObj('price=%2424').should.deep.equal({price: '$24'}));
});
