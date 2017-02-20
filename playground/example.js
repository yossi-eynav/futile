const commodity = require('commodity');
console.log(commodity.shuffle([1, 2, 3]));
console.log(commodity.interpolate('Hello, ${name}', {name: 'Martin'}));


const shuffle = require('commodity/lib/shuffle');
console.log(shuffle([1, 2, 3]));

const interpolate = require('commodity/lib/interpolate');
console.log(interpolate('Hello, ${name}', {name: 'Martin'}));
