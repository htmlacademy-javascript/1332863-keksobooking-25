const MAXIMUM_PRICE = 100000;
const WHOLESALE_OFFER = '100';
const ZERO_GUESTS = '0';
const form = document.querySelector('.ad-form');
const rooms = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'error-text',
});

pristine.addValidator(form.querySelector('#price'), (value) => value <= MAXIMUM_PRICE, 'Не больше 100 000 руб.');

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

  pristine.validate();
});
