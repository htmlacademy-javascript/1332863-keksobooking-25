import { disableMapForm } from './forms-state.js';
import { showErrorMessage } from './util.js';

const URL_FOR_GET = 'https://25.javascript.pages.academy/keksobooking/data';
const URL_FOR_SEND = 'https://25.javascript.pages.academy/keksobooking';
const MESSAGE_TEXT = 'Ошибка при получении данных для карты, повторите попытку позже.';
const ALERT_SHOW_TIME = 7500;

const alertNotDownloadedData = () => {
  disableMapForm();
  showErrorMessage(MESSAGE_TEXT, ALERT_SHOW_TIME);
};

const getData = () => fetch(URL_FOR_GET).then((response) => response.ok ? response.json(): alertNotDownloadedData());

const sendData = (data) => fetch(URL_FOR_SEND, {method: 'POST', body: data});

export { getData, sendData };
