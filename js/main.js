const getRandomInt = (firstNumber, secondNumber) => {
  const max = firstNumber < secondNumber ? secondNumber : firstNumber;
  const min = firstNumber > secondNumber ? secondNumber : firstNumber;

  return Math.floor(Math.random() * (max - min + 1) + min);
};

getRandomInt(10, 20);

const getRandomFloat = (firstNumber, secondNumber, decimals) => {
  const max = Math.max(firstNumber, secondNumber);
  const min = Math.min(firstNumber, secondNumber);

  const intermediateResult = Math.random() * (max - min + 1) + min;

  return Number(Math.min(intermediateResult, max).toFixed(decimals).toString());
};

getRandomFloat(3.123456789123, 1.123, 10);
