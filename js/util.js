const DEFAULT_DEBOUNCE_DELAY = 500;

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

export { showErrorMessage, debounce, removeOnPushBtn };
