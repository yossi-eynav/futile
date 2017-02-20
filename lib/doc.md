# Commodity

## Collection of low level Javascript helper functions targeting language primitives and native objects

Import the library
```javascript
const commodity = require('commodity');

commodity.shuffle([1, 2, 3]);
commodity.interpolate('Hello, ${name}', {name: 'Martin'});
```

Import individual methods
```javascript
const shuffle = require('commodity/lib/shuffle');
const interpolate = require('commodity/lib/interpolate');

shuffle([1, 2, 3]);
interpolate('Hello, ${name}', {name: 'Martin'});
```
