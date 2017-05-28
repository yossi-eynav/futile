const expect = require('chai').expect;

const deepAssign = require('./');

describe('deepAssign', () => {

    it('function exist', () => expect(deepAssign).to.exist);

    it('mutates the original object', () => {
        const x = {a: 1};
        deepAssign(x, {b: 2});

        expect(x.b).to.equal(2);
    });

    it('prefers later values', () => {
        const x = {a: 1};
        deepAssign(x, {a: 2});

        expect(x.a).to.equal(2);
    });

    it('returns an object', () => {
        const x = {a: 1};
        const res = deepAssign(x, {b: 2});

        expect(res.a).to.equal(1);
        expect(res.b).to.equal(2);
    });

    it('assigns multiple objects', () => {
        const a = {a: 1};
        const b = {b: 2, c: 1};
        const c = {c: 3, d: {a: 0, b: 0, c: 3}};
        const d = {d: {a: 1, b: 2}};

        deepAssign(a, b, c, d);

        expect(a).to.deep.equal({a: 1, b: 2, c: 3, d: {a: 1, b: 2, c: 3}});
    });

    it('ignores random "null"s and "undefined"s in the arguments', () => {
        expect(deepAssign({a: 1}, null, {b: 2}, undefined))
            .to.deep.equal({a: 1, b: 2});

        expect(deepAssign({a: 1}, undefined))
            .to.deep.equal({a: 1});

        expect(deepAssign(undefined, {a: 1}))
            .to.equal(undefined);

        expect(deepAssign(null, {a: 1}))
            .to.equal(null);
    });

    it('does not assign other arguments', () => {
        const a = {a: 1};
        const b = {c: 3, d: {a: 0, b: 0, c: 3}};
        const c = {c: 1, d: {a: 1, b: 2}};

        deepAssign(a, b, c);

        expect(b).to.deep.equal({c: 3, d: {a: 0, b: 0, c: 3}});
    });

    it('merges deep objects', () => {
        const x = {a: 1, x: {a: 1}};
        deepAssign(x, {x: {b: 2}});

        expect(x.x.a).to.equal(1);
        expect(x.x.b).to.equal(2);
    });

    it('handles null and undefined', () => {
        const x = {a: 1, x: {a: 1, b: 2}};
        deepAssign(x, {x: {a: undefined}});
        deepAssign(x, {x: {b: null}});

        expect(x.x.a).to.equal(undefined);
        expect(x.x.b).to.equal(null);
    });

    it('assigns many', () => {
        const x = {a: 1, x: {a: 1, b: 2}};
        deepAssign(x, {x: {c: 3}}, {x: {d: 4}});

        expect(x.x.c).to.equal(3);
        expect(x.x.d).to.equal(4);
    });

    it('does not mutate other arguments', () => {
        const x = {a: 1};
        const b = {b: 2};
        const c = {c: 3};

        deepAssign(x, b, c);

        expect(x.b).to.equal(2);
        expect(b).to.have.keys('b');
    });

    it('assigns symbols', () => {
        const x = {a: 1};
        const y = {};
        const a = Symbol('a');
        const b = Symbol.for('b');
        const c = Symbol();

        y[a] = 10;
        y[b] = 10;
        y[c] = 10;

        deepAssign(x, y);

        expect(x[a]).to.equal(10);
        expect(x[b]).to.equal(10);
        expect(x[c]).to.equal(10);
    });

    it('assigns enumerable properties only', () => {
        const x = {a: 1};
        const y = {};

        Object.defineProperty(y, 'a', {
            enumerable: true,
            value: 10
        });
        Object.defineProperty(y, 'b', {
            enumerable: false,
            value: 10
        });

        deepAssign(x, y);

        expect(x.a).to.equal(10);
        expect(x.b).to.equal(undefined);
    });

    it('Does not break over primitives', () => {
        expect(deepAssign('hello', 'world')).to.equal('hello');
        expect(deepAssign(1, 2)).to.equal(1);
        expect(deepAssign(true, 'string')).to.equal(true);
        expect(deepAssign([], 'string')).to.deep.equal('string'.split(''));
        expect(deepAssign(null, {})).to.equal(null);
    });
});
