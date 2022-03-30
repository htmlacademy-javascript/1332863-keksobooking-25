const URL_FOR_GET = 'https://25.javascript.pages.academy/keksobooking/data';
const URL_FOR_SEND = 'https://25.javascript.pages.academy/keksobooking';
const ALERT_SHOW_TIME = 3000;

const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const errorButton = errorMessage.querySelector('.error__button');
const mainContainer = document.querySelector('main');

const onSuccess = () => {
  mainContainer.insertAdjacentElement('afterbegin', successMessage);
  setTimeout((() => successMessage.remove()), ALERT_SHOW_TIME);
};

const onFail = () => {
  mainContainer.insertAdjacentElement('afterbegin', errorMessage);
};

errorButton.addEventListener('click', () => errorMessage.remove());

const showErrorMessage = () => {
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

  alertContainer.textContent = 'Ошибка при получении данных, повторите попытку позже.';

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};


const getData = () => fetch(URL_FOR_GET).then((response) => response.ok ? response.json(): showErrorMessage());

const sendData = (data) => {
  fetch(URL_FOR_SEND, {method: 'POST', body: data})
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
