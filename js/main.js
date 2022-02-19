// eslint-disable-next-line strict
'use strict';

const getRandomInt = (num1, num2) => {
  if (num1 > num2) {
    return Math.floor(Math.random() * (num1 - num2 + 1) + num2);
  }
  return Math.floor(Math.random() * (num2 - num1 + 1) + num1);
};

getRandomInt(10, 20);


const getRandomFloat = (num1, num2, decimals) => {
  if (num1 > num2) {
    return +(Math.random() * (num1 - num2) + num2).toFixed(decimals);
  }
  return +(Math.random() * (num2 - num1) + num1).toFixed(decimals);
};

getRandomFloat(3.1415, 0, 10);
