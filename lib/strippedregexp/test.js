const expect = require('chai').expect;
const assert = require('chai').assert;

const StrippedRegExp = require('./');

describe('StrippedRegExp', () => {

    it('function exist', () => expect(StrippedRegExp).to.exist);

    it('does not throw errors where RegExo does', () => {
        assert.throws(() => new RegExp('weird stuff)'), SyntaxError); // eslint-disable-line no-invalid-regexp
        assert.doesNotThrow(() => new StrippedRegExp('weird stuff)'), SyntaxError);
    });

    it('RegExp works as expected', () => {
        const parent = JSON.stringify(
            'weird stuff'.match(new RegExp('weird stuff'))
        );

        const child = JSON.stringify(
            'weird stuff'.match(new StrippedRegExp('weird stuff'))
        );

        expect(parent).to.equal(child);
    });

    it('StrippedRegExp finds operator characters as string', () => {
        expect('weird stuf|f|'.match(new StrippedRegExp('f|')).filter((i) => i === 'f').length).to.equal(1);
        expect('weird stuf|f|'.match(new StrippedRegExp('f|', 'g')).filter((i) => i === 'f').length).to.equal(2);
    });

    it('StrippedRegExp acceps RegExp as first argument', () => {
        expect('weird stuf|f|'.match(new StrippedRegExp(/f|u/)).filter((i) => ~['f', 'u'].indexOf(i)).length).to.equal(1);
        expect('weird stuf|f|'.match(new StrippedRegExp(/f|u/g)).filter((i) => ~['f', 'u'].indexOf(i)).length).to.equal(3);
    });
});
