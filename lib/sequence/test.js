'use strict';

const expect = require('chai').expect;
const assert = require('chai').assert;
const should = require('chai').should(); // eslint-disable-line no-unused-vars

const sequence = require('./');

describe('sequence', () => {


    it('function exist', () => expect(sequence).to.exist);

    it('is a function', () => sequence.should.be.a('function'));

    it('Returns does not break when empty', () => expect(sequence()).to.equal(undefined));

    it('Runs a synchronous flow to the end', (done) => {
        let res = 1;

        assert.doesNotThrow(() => {
            sequence(
                (next) => next(),
                (next) => {
                    assert.equal(res, 1);
                    next(done);
                },
                (next) => next()
            );

            res = 10;
        });
    });

    it('Runs an asynchronous flow to the end', (done) => {
        let res = 1;

        assert.doesNotThrow(() => {
            sequence(
                (next) => setTimeout(next, 0),
                (next) => {
                    assert.equal(res, 10);
                    next(done);
                },
                (next) => next()
            );

            res = 10;
        });
    });
});
