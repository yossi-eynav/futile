const expect = require('chai').expect;

const stripOperators = require('./');

describe('stripOperators', () => {

    it('function exist', () => expect(stripOperators).to.exist);

    it('returns same string', () => expect(stripOperators('hello world')).to.equal('hello world'));
    it('strips regexp operators', () => expect(stripOperators('h||ello (?wor[ld]')).to.equal('hello world'));
});
