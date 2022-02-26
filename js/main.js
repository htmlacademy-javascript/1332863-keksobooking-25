const getRandomInt = (firstNumber, secondNumber) => {
  const max = Math.floor(Math.max(Math.abs(firstNumber), Math.abs(secondNumber)));
  const min = Math.ceil(Math.min(Math.abs(firstNumber), Math.abs(secondNumber)));

  const result = Math.random() * (max - min + 1) + min;

  return Math.floor(result);
};

getRandomInt(10, 20);

const getRandomFloat = (firstNumber, secondNumber, decimals) => {
  const max = Math.max(Math.abs(firstNumber), Math.abs(secondNumber));
  const min = Math.min(Math.abs(firstNumber), Math.abs(secondNumber));

  const result = Math.random() * (max - min + 1) + min;

  return Number(Math.min(result, max).toFixed(decimals).toString());
};

getRandomFloat(3.123456789123, 1.123, 10);
