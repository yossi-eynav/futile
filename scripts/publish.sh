echo "-= Running ESLint =-"
npm run lint -s
if [[ $? -ne 0 ]]; then
  echo "-= ESLint Failed =-"
  exit 1
else
  echo "-= ESLint Passed =-"
fi

echo ""

echo "-= Running tests =-"
npm test
if [[ $? -ne 0 ]]; then
  echo "-= Tests Failed =-"
  exit 1
else
  echo "-= Tests Passed =-"
fi
