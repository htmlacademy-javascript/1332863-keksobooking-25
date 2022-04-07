import { sendData } from './api.js';
import { resetMap, renderAds } from './map-render.js';
import { disableButton, enableButton } from './forms-state.js';
import { getDefaultAds } from './map-filters.js';
import { removeOnPushBtn } from './util.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const MAXIMUM_PRICE = 100000;
const WHOLESALE_OFFER = '100';
const ZERO_GUESTS = '0';

const form = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const types = form.querySelector('#type');
const price = form.querySelector('#price');
const rooms = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');
const timein = form.querySelector('#timein');
const timeout = form.querySelector('#timeout');
const resetButton = form.querySelector('.ad-form__reset');
const submitButton = form.querySelector('.ad-form__submit');
const sliderElement = form.querySelector('.ad-form__slider');
const avatarDowloadField = form.querySelector('.ad-form__field');
const avatarChooser = avatarDowloadField.querySelector('.ad-form-header__input');
const avatarPreview = form.querySelector('.ad-form-header__preview > img');
const houseImgDowloadField = form.querySelector('.ad-form__upload');
const houseImgChooser = houseImgDowloadField.querySelector('.ad-form__input');
const houseImgContainer = form.querySelector('.ad-form__photo');

avatarDowloadField.addEventListener('change', () => {
  const avatarImg = avatarChooser.files[0];
  const fileName = avatarImg.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    avatarPreview.src = URL.createObjectURL(avatarImg);
  }
});

const houseImgPreview = document.createElement('img');
houseImgContainer.insertAdjacentElement('afterbegin', houseImgPreview);

houseImgDowloadField.addEventListener('change', () => {
  const houseImg = houseImgChooser.files[0];
  const fileName = houseImg.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    houseImgPreview.src = URL.createObjectURL(houseImg);
    houseImgPreview.style.width = '100%';
    houseImgPreview.style.height = '100%';
  }
});

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
  palace: 10000,
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

const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const errorButton = errorMessage.querySelector('.error__button');

const onSuccess = () => {
  document.body.insertAdjacentElement('beforeend', successMessage);

  successMessage.addEventListener('click', () => successMessage.remove());
  document.addEventListener('keydown', (evt) => removeOnPushBtn('Escape', successMessage, evt));

  form.reset();
  resetMap();
  mapFilters.reset();
  renderAds(getDefaultAds());
  enableButton(submitButton);
  sliderElement.noUiSlider.set(0);
  price.placeholder = '1000';
};

const onFail = () => {
  document.body.insertAdjacentElement('beforeend', errorMessage);

  errorButton.focus();
  errorButton.addEventListener('click', () => errorMessage.remove());
  errorMessage.addEventListener('click', () => errorMessage.remove());
  document.addEventListener('keydown', (evt) => removeOnPushBtn('Escape', errorMessage, evt));
  enableButton(submitButton);
};

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    const formData = new FormData(evt.target);
    disableButton(submitButton);
    sendData(formData)
      .then((response) => {
        if (response.ok) {
          onSuccess();
        }
      })
      .catch(() => {
        onFail();
      });
  }
});

resetButton.addEventListener('click', () => {
  sliderElement.noUiSlider.set(0);
  price.placeholder = '1000';
  mapFilters.reset();
  renderAds(getDefaultAds());
  resetMap();
});
