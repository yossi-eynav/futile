if [ $# -eq 0 ]; then
  ./node_modules/mocha/bin/mocha $(find ./lib -name 'test.js') --debug
elif [[ -d ./lib/${@} ]]; then
  ./node_modules/mocha/bin/mocha $(find ./lib/${@} -name 'test.js') --debug
else
  echo "$@ has no benchmark"
fi
