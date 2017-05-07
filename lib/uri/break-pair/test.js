'use strict';

const expect = require('chai').expect;
const should = require('chai').should(); // eslint-disable-line no-unused-vars

const breakPair = require('./');

describe('uri/break-pair', () => {
    it('breaks key-value pairs', () => breakPair('key=value').should.deep.equal({key: 'value'}));
    it('decodes values', () => breakPair('price=%2424').should.deep.equal({price: '$24'}));
    it('converts no value to true', () => breakPair('key').should.deep.equal({key: true}));
    it('returns empty object when key is empty', () => breakPair('').should.deep.equal({}));
    it('breaks when non string is passed', () => expect(() => breakPair(1)).to.throw(Error));
});
