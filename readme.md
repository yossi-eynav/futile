# futile
> Collection of low level ECMAScript helper functions targeting language primitives and native objects


[![build status](https://circleci.com/gh/fiverr/futile.svg?style=shield)](https://circleci.com/gh/fiverr/futile)
[![pull requests](https://img.shields.io/github/issues-pr/fiverr/futile.svg)](https://github.com/fiverr/futile/pulls)
[![issues](https://img.shields.io/github/issues/fiverr/futile.svg)](https://github.com/fiverr/futile/issues)
[![npm package](https://badge.fury.io/js/%40fiverr%2Ffutile.svg)](https://www.npmjs.com/package/@fiverr/futile)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/8d8a0b4da74f4b4ba30a356a4e2094e3)](https://www.codacy.com/app/omrilotan/futile)

[![bitHound Overall Score](https://www.bithound.io/github/fiverr/commodity/badges/score.svg)](https://www.bithound.io/github/fiverr/commodity)
[![bitHound Code](https://www.bithound.io/github/fiverr/commodity/badges/code.svg)](https://www.bithound.io/github/fiverr/commodity)
[![bitHound Dependencies](https://www.bithound.io/github/fiverr/commodity/badges/dependencies.svg)](https://www.bithound.io/github/fiverr/commodity/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/fiverr/commodity/badges/devDependencies.svg)](https://www.bithound.io/github/fiverr/commodity/master/dependencies/npm)

## Use futile [Documentation](https://fiverr.github.io/futile/)

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

## Working with __futile__ repo

### Playground
The "playground" directory is a place you can write test modules, and include __futile__ as a module.
It's node_modules contains a symlink to the parent directory so you're working with your actual work files.

The content of this directory is gitignored (short of example file and __futile__ virtual module) so feel free to add your sandbox files there

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

#### Coverage
```sh
npm run coverage
```

#### Rebuild docs
```sh
npm run doc
```
## Contributing to __futile__ repo
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
minor | Interface change with full backward compatibility | Adding a new function, Bug fix
major | Interface change without full backward compatibility | Changing a function name or output, Removing a function
