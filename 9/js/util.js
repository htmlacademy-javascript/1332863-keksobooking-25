const getRandomInt = (firstNumber, secondNumber) => {
  const max = Math.floor(Math.max(Math.abs(firstNumber), Math.abs(secondNumber)));
  const min = Math.ceil(Math.min(Math.abs(firstNumber), Math.abs(secondNumber)));

  const result = Math.random() * (max - min + 1) + min;

  return Math.floor(result);
};

function getRandomFloat (firstNumber, secondNumber, digits) {
  const min = Math.min(Math.abs(firstNumber), Math.abs(secondNumber));
  const max = Math.max(Math.abs(firstNumber), Math.abs(secondNumber));

  const result = Math.random() * (max - min) + max;

  return +result.toFixed(digits);
}

const getRandomIndex = (array) => getRandomInt(0, array.length - 1);

export {getRandomInt, getRandomFloat, getRandomIndex};
