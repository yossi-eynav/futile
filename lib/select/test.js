'use strict';

const expect = require('chai').expect;

const select = require('./');

describe('select', () => {

    it('function exist', () => expect(select).to.exist);

    it('should return an empty object', () => {
        const orig = {a:1, b:2, c:3, d:4, e:5, f:6, g:7, h:8, i:9};
        const res = select(orig);

        expect(res).to.deep.equal({});
    });

    it('should return a shallow clone the original object', () => {
        const orig = {a:1, b:2, c:3, d:4, e:5, f:6, g:7, h:8, i:9};
        const clone = Object.assign({}, orig);
        const res = select(orig, () => true);

        orig.j = 10;

        expect(res).to.not.deep.equal(orig);
        expect(res).to.deep.equal(clone);
    });

    it('should filter members by value', () => {
        const orig = {a:1, b:2, c:3, d:4, e:5, f:6, g:7, h:8, i:9};
        const res = select(orig, (key, val) => val > 4);

        expect(res).to.include.keys(...'efghi'.split(''));
        expect(res).to.not.include.keys(...'abcd'.split(''));
    });

    it('should filter members by key', () => {
        const orig = {a:1, b:2, c:3, d:4, e:5, f:6, g:7, h:8, i:9};
        const res = select(orig, (key) => ~'abcd'.indexOf(key));

        expect(res).to.not.include.keys(...'efghi'.split(''));
        expect(res).to.include.keys(...'abcd'.split(''));
    });
});
