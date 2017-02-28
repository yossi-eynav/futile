'use strict';

const expect = require('chai').expect;
const should = require('chai').should(); // eslint-disable-line no-unused-vars

const interpolate = require('./');

describe('interpolate', () => {

    const name = 'Martin';


    it('interpolate function exist', () => expect(interpolate).to.exist);

    it('interpolate is a function', () => interpolate.should.be.a('function'));

    it('Interpolate can process string', () => expect(interpolate.bind(null, '')).to.not.throw(TypeError));

    it('Interpolate can not process non string', () => expect(interpolate.bind(null, {})).to.throw(TypeError));

    it('Interpolate string with \'$\' notation (ES)', () => {
        const res = interpolate('Hello, ${name}', {name}); // eslint-disable-line no-template-curly-in-string
        expect(interpolate(res)).to.equal(`Hello, ${name}`);
    });

    it('Interpolate string with \'%\' notation (YML)', () => {
        const res = interpolate('Hello, %{name}', {name});
        expect(res).to.equal(`Hello, ${name}`);
    });

    it('Interpolate string with \'{{}}\' notation (Handlebars)', () => {
        const res = interpolate('Hello, {{name}}', {name});
        expect(res).to.equal(`Hello, ${name}`);
    });

    it('Return Interpolated string with missing results untouched', () => {
        const res = interpolate('Hello, ${name} ${last_name}', {name}); // eslint-disable-line no-template-curly-in-string
        expect(res).to.equal(`Hello, ${name} \${last_name}`);
    });

    it('Return original string when no data passed', () => {
        const string = 'Hello, ${name}'; // eslint-disable-line no-template-curly-in-string
        const res = interpolate(string);
        expect(res).to.equal(string);
    });

});
