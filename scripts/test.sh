ARG=$1

if [ $# -eq 0 ]; then
  ARG="$(find ./lib -name 'test.js')"
fi

./node_modules/mocha/bin/mocha ${ARG}
