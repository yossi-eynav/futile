# Commodity

## Collection of low level Javascript helper functions targeting language primitives and native objects

Import the library
```javascript
const commodity = require('commodity');

commodity.arr.shuffle([1, 2, 3]);
commodity.str.interpolate('Hello, ${name}', {name: 'Martin'});
```

Import a flat version of the library
```javascript
const flat = require('commodity/lib/flat');

flat.shuffle([1, 2, 3]);
flat.interpolate('Hello, ${name}', {name: 'Martin'});
```

Import a subset of the library
```javascript
const arr = require('commodity/lib/arr');
const str = require('commodity/lib/str');

arr.shuffle([1, 2, 3]);
str.interpolate('Hello, ${name}', {name: 'Martin'});
```

Import the methods straight up
```javascript
const shuffle = require('commodity/lib/arr/shuffle');
const interpolate = require('commodity/lib/str/interpolate');

shuffle([1, 2, 3]);
interpolate('Hello, ${name}', {name: 'Martin'});
```
