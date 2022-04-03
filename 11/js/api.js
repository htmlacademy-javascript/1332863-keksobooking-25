import {disableMapForm, disableButton, enableButton} from './forms-state.js';
import {showErrorMessage} from './util.js';

const URL_FOR_GET = 'https://25.javascript.pages.academy/keksobooking/data';
const URL_FOR_SEND = 'https://25.javascript.pages.academy/keksobooking';
const ALERT_SHOW_TIME = 7500;
const SUCCESS_SHOW_TIME = 2500;
const MESSAGE_TEXT = 'Ошибка при получении данных для карты, повторите попытку позже.';

const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const errorButton = errorMessage.querySelector('.error__button');
const mainContainer = document.querySelector('main');

const onSuccess = () => {
  mainContainer.insertAdjacentElement('afterbegin', successMessage);
  setTimeout((() => successMessage.remove()), SUCCESS_SHOW_TIME);
};

const onFail = () => {
  mainContainer.insertAdjacentElement('afterbegin', errorMessage);
};

errorButton.addEventListener('click', () => errorMessage.remove());

const alertNotDownloadedData = () => {
  disableMapForm();
  showErrorMessage(MESSAGE_TEXT, ALERT_SHOW_TIME);
};

const getData = () => fetch(URL_FOR_GET).then((response) => response.ok ? response.json(): alertNotDownloadedData());

const sendData = (data, btn) => {
  disableButton(btn);
  fetch(URL_FOR_SEND, {method: 'POST', body: data})
    .then((response) => {
      if (response.ok) {
        onSuccess();
        enableButton(btn);
      } else {
        onFail();
        enableButton(btn);
      }
    })
    .catch(() => {
      onFail();
      enableButton(btn);
    });
};

export {getData, sendData};
