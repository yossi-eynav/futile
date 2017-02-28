'use strict';

const expect = require('chai').expect;
const should = require('chai').should(); // eslint-disable-line no-unused-vars

const safe = require('./');

describe('safe', () => {

    it('safe function exist', () => expect(safe).to.exist);

    it('safe is a function', () => safe.should.be.a('function'));

    it('Runs a function correctly', () => {
        let a_variable = 'Goodbye';

        function a_function() {
            a_variable = 'Hello';
        }

        safe(a_function);

        expect(a_variable).to.equal('Hello');
    });

    it('Returns a correct value from a function', () => {
        function a_function(arg) {
            return arg;
        }
        const res = safe(a_function, null, 'Hello');

        expect(res).to.equal('Hello');
    });

    it('Runs function with correct context', () => {
        function a_function() {
            return this.arg;
        }
        const res = safe(a_function, {
            arg: 'Hello'
        });

        expect(res).to.equal('Hello');
    });

    it('Safely fails to run something that is not a function', () => expect(safe(null)).to.equal(undefined));

});
