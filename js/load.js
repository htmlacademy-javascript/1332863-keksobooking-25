const URL_FOR_GET = 'https://24.javascript.pages.academy/keksobooking/data';
const URL_FOR_SEND = 'https://24.javascript.pages.academy/keksobooking/';

const getData = () => fetch(URL_FOR_GET).then((response) => response.json());

const sendData = (onSuccess, onFail) => {
  fetch(URL_FOR_SEND, {method: 'POST'})
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getData, sendData};
