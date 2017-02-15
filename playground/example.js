const commodity = require('commodity');
console.log(commodity.arr.shuffle([1, 2, 3]));
console.log(commodity.str.interpolate('Hello, ${name}', {name: 'Martin'}));


const flat = require('commodity/lib/flat');
console.log(flat.shuffle([1, 2, 3]));
console.log(flat.interpolate('Hello, ${name}', {name: 'Martin'}));


const arr = require('commodity/lib/arr');
console.log(arr.shuffle([1, 2, 3]));

const str = require('commodity/lib/str');
console.log(str.interpolate('Hello, ${name}', {name: 'Martin'}));
