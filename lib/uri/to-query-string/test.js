'use strict';

const assert = require('chai').assert;
const should = require('chai').should(); // eslint-disable-line no-unused-vars

const toQueryString = require('./');

describe('uri/to-query-string', () => {
    it('is a function', () => assert.typeOf(toQueryString, 'function'));
    it('returns a string', () => assert.typeOf(toQueryString({}), 'string'));
    it('return a string with correct key and value', () => toQueryString({key: 'value', key1: 'value1'}).should.equal('key=value&key1=value1'));
    it('encodes the values', () => toQueryString({price: '$24'}).should.equal('price=%2424'));
});
