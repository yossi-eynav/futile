if [ $# -eq 0 ]; then
  ./node_modules/mocha/bin/mocha $(find ./lib -name 'benchmark.js') --slow 0 --no-timeouts
elif [[ -f ./lib/${@}/benchmark.js ]]; then
  ./node_modules/mocha/bin/mocha $(find ./lib/${@} -name 'benchmark.js') --slow 0 --no-timeouts
else
  echo "$@ has no benchmark"
fi
