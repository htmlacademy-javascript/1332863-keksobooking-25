const DEFAULT_DEBOUNCE_DELAY = 500;

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

const showErrorMessage = (message, showTime) => {

  const alertContainer = document.createElement('div');
  alertContainer.style.position = 'absolute';
  alertContainer.style.zIndex = 100;
  alertContainer.style.top = 0;
  alertContainer.style.left = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, showTime);
};

const removeOnPushBtn = (buttonName, removingObj, evt) => {
  if (evt.key === buttonName) {
    evt.preventDefault();
    removingObj.remove();
  }
};

const debounce = (callback, timeoutDelay = DEFAULT_DEBOUNCE_DELAY) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { getRandomInt, getRandomFloat, getRandomIndex, showErrorMessage, debounce, removeOnPushBtn };
