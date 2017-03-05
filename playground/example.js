const futile = require('@fiverr/futile');
console.log(futile.shuffle([1, 2, 3]));
console.log(futile.interpolate('Hello, ${name}', {name: 'Martin'})); // eslint-disable-line no-template-curly-in-string


const shuffle = require('@fiverr/futile/lib/shuffle');
console.log(shuffle([1, 2, 3]));

const interpolate = require('@fiverr/futile/lib/interpolate');
console.log(interpolate('Hello, ${name}', {name: 'Martin'})); // eslint-disable-line no-template-curly-in-string
