import { sendData } from './load.js';

const MAXIMUM_PRICE = 100000;
const WHOLESALE_OFFER = '100';
const ZERO_GUESTS = '0';

const form = document.querySelector('.ad-form');
const types = form.querySelector('#type');
const price = form.querySelector('#price');
const rooms = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');
const timein = form.querySelector('#timein');
const timeout = form.querySelector('#timeout');
const resetButton = form.querySelector('.ad-form__reset');
const submitButton = form.querySelector('.ad-form__submit');
const sliderElement = document.querySelector('.ad-form__slider');

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'error-text',
});

timein.addEventListener('change', () => {
  timeout.value = timein.value;
});

timeout.addEventListener('change', () => {
  timein.value = timeout.value;
});

const HOUSING_TYPE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 0,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => Number(value),
  },
});

types.addEventListener('change', () => {
  const chosenType = types.querySelector('option:checked');
  const minPrice = HOUSING_TYPE[chosenType.value];

  price.min = minPrice;
  price.placeholder = minPrice;
});


sliderElement.noUiSlider.on('slide', () => {
  price.value = sliderElement.noUiSlider.get();
});

price.addEventListener('input', () => {
  sliderElement.noUiSlider.set(price.value);
});

const validatePrice = (value) => {
  const chosenType = types.querySelector('option:checked');

  return value <= MAXIMUM_PRICE && value >= HOUSING_TYPE[chosenType.value];
};

const priceErrorMessage = (value) => {
  const chosenType = types.querySelector('option:checked');

  if (value <= MAXIMUM_PRICE) {
    return `Минимальная цена для данного жилья - ${HOUSING_TYPE[chosenType.value]} руб.`;
  }
};

pristine.addValidator(price, validatePrice, priceErrorMessage);

const validateCapacity = () => {
  const roomsCount = rooms.querySelector('option:checked');
  const guestsCount = capacity.querySelector('option:checked');

  if (roomsCount.value === WHOLESALE_OFFER && guestsCount.value !== ZERO_GUESTS) {
    return false;
  }

  if (roomsCount.value === WHOLESALE_OFFER && guestsCount.value === ZERO_GUESTS) {
    return true;
  }

  if (roomsCount.value !== WHOLESALE_OFFER && guestsCount.value !== ZERO_GUESTS) {
    return +roomsCount.value >= +guestsCount.value;
  }
};

const capacityErrorMessage = () => {
  const roomsCount = rooms.querySelector('option:checked');
  const guestsCount = capacity.querySelector('option:checked');

  if (roomsCount.value === WHOLESALE_OFFER) {
    return 'Не для гостей';
  }

  if (guestsCount.value === ZERO_GUESTS) {
    return 'Укажите количество гостей';
  }

  return 'Количество гостей не должно превышать количество комнат';
};

pristine.addValidator(capacity, validateCapacity, capacityErrorMessage);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    const formData = new FormData(evt.target);
    sendData(formData, submitButton);
    evt.target.reset();
    sliderElement.noUiSlider.set(0);
    price.placeholder = '1000';
  }
});

resetButton.addEventListener('click', () => {
  sliderElement.noUiSlider.set(0);
  price.placeholder = '1000';
});
