'use strict';

const expect = require('chai').expect;
const assert = require('chai').assert;
const should = require('chai').should(); // eslint-disable-line no-unused-vars

const validValue = require('./');

describe('uri/valid-value', () => {
    it('is a function', () => assert.typeOf(validValue, 'function'));
    it('undefined is true', () => expect(validValue()).to.be.equal(true));
    it('empty string is fine', () => expect(validValue('')).to.be.equal(''));
    it('umbers are converted to strings', () => expect(validValue(2)).to.be.equal('2'));
    it('decodes values', () => {
        expect(validValue('%2424')).to.be.equal('$24');
        expect(validValue('25%25')).to.be.equal('25%');
    });
});
