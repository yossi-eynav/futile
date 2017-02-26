const commodity = require('@fiverr/commodity');
console.log(commodity.shuffle([1, 2, 3]));
console.log(commodity.interpolate('Hello, ${name}', {name: 'Martin'}));


const shuffle = require('@fiverr/commodity/lib/shuffle');
console.log(shuffle([1, 2, 3]));

const interpolate = require('@fiverr/commodity/lib/interpolate');
console.log(interpolate('Hello, ${name}', {name: 'Martin'}));
