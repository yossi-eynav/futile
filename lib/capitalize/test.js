const expect = require('chai').expect;
const should = require('chai').should(); // eslint-disable-line no-unused-vars

const capitalize = require('./');

describe('capitalize', () => {

    it('function exist', () => expect(capitalize).to.exist);

    it('should capitalise first char only', () => expect(capitalize('hello world')).to.equal('Hello world'));

    it('should capitalise first char of each word', () => expect(capitalize('hello world', true)).to.equal('Hello World'));

    it('should capitalise foreign language', () => expect(capitalize('á-char ü-char', true)).to.equal('Á-char Ü-char'));

    it('should return numbers as is', () => expect(capitalize('1234')).to.equal('1234'));

});
