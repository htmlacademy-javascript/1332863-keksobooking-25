const getRandomInt = (firstNumber, secondNumber) => {
  const max = firstNumber < secondNumber ? secondNumber : firstNumber;
  const min = firstNumber > secondNumber ? secondNumber : firstNumber;

  return Math.floor(Math.random() * (max - min + 1) + min);
};

getRandomInt(10, 20);

const getRandomFloat = (firstNumber, secondNumber, decimals) => {
  const max = firstNumber < secondNumber ? secondNumber : firstNumber;
  const min = firstNumber > secondNumber ? secondNumber : firstNumber;

  const intermediateResult = +(Math.random() * (max - min + 1) + min).toFixed(decimals);

  return intermediateResult > max ? +max.toFixed(decimals).toString() : +intermediateResult.toString();
};

getRandomFloat(3.14151234231423, 1.123, 10);
