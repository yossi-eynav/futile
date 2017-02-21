# Commodity
Collection of low level Javascript helper functions targeting language primitives and native objects

[![build status](https://img.shields.io/circleci/project/github/fiverr/commodity.svg)](https://circleci.com/gh/fiverr/commodity)
[![pull requests](https://img.shields.io/github/issues-pr/fiverr/commodity.svg)](https://github.com/fiverr/commodity/pulls)
[![issues](https://img.shields.io/github/issues/fiverr/commodity.svg)](https://github.com/fiverr/commodity/issues)
[![npm package](https://badge.fury.io/js/%40fiverr%2Fcommodity.svg)](https://www.npmjs.com/package/@fiverr/commodity)

## Use commodity [Documentation](https://fiverr.github.io/commodity/)

Import the library
```javascript
const commodity = require('@fiverr/commodity');

commodity.shuffle([1, 2, 3]);
commodity.interpolate('Hello, ${name}', {name: 'Martin'});
```

Import individual methods
```javascript
const shuffle = require('@fiverr/commodity/lib/shuffle');
const interpolate = require('@fiverr/commodity/lib/interpolate');

shuffle([1, 2, 3]);
interpolate('Hello, ${name}', {name: 'Martin'});
```

## Working with __commodity__ repo

### Playground
The "playground" directory is a place you can write test modules, and include __commodity__ as a module.
It's node_modules contains a symlink to the parent directory so you're working with your actual work files.

The content of this directory is gitignored (short of example file and __commodity__ virtual module) so feel free to add your sandbox files there

### Tests and builds

#### Lint code
```sh
npm run lint
```

#### Test all
```sh
npm test
```

#### Test one
```sh
npm run testone lib/string/interpolate
```

#### Rebuild docs
```sh
npm run doc
```
## Contributing to __commodity__ repo
Each module contains an index file - the exported module, and a test file.
Modules should be commented in [JSDoc](http://usejsdoc.org/) so the automated documentation is up to date.

Each collection (e.g. `str`, `arr`) needs to expose all it's modules, and `lib` should expose all collections.

Pro git tip: Push to master with the new docs submodule
```sh
git push origin master --recurse-submodules=on-demand
```

## Version management
The version number specify `major`.`minor`.`patch`

Type | Content | Example
---- | ------- | -----------
patch | Internal fix | Performance updates, tests, small tweaks
minor | Interface change with full backward compatibility | Adding a new function
major | Interface change without full backward compatibility | Changing a function name or output, Removing a function
