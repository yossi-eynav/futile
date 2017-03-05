# Futile

## Collection of low level ECMAScript helper functions targeting language primitives and native objects

[Fork me](https://github.com/fiverr/futile)

Install
```sh
npm install @fiverr/futile --save
```

Import the library
```javascript
const futile = require('@fiverr/futile');

futile.shuffle([1, 2, 3]);
futile.interpolate('Hello, ${name}', {name: 'Martin'});
```

Import individual methods
```javascript
const shuffle = require('@fiverr/futile/lib/shuffle');
const interpolate = require('@fiverr/futile/lib/interpolate');

shuffle([1, 2, 3]);
interpolate('Hello, ${name}', {name: 'Martin'});
```
