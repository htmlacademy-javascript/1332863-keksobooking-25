const form = document.querySelector('.ad-form');
const rooms = form.querySelector('#room_number');
const capacity = document.querySelector('#capacity');

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'error-text',
});

pristine.addValidator(form.querySelector('#price'), (value) => value <= 100000, 'Не больше 100 000 руб.');

const validateCapacity = () => {
  const roomsCount = rooms.querySelector('option:checked');
  const guestsCount = capacity.querySelector('option:checked');

  if (roomsCount.value === '100' && guestsCount.value !== '0') {
    return false;
  }

  if (guestsCount.value !== '0') {
    return +roomsCount.value >= +guestsCount.value;
  }
};

const capacityErrorMessage = () => {
  const roomsCount = rooms.querySelector('option:checked');
  const guestsCount = capacity.querySelector('option:checked');

  if (roomsCount.value === '100') {
    return 'Не для гостей';
  }

  if (guestsCount.value === '0') {
    return 'Укажите количество гостей';
  }

  return 'Количество гостей не должно превышать количество комнат';
};

pristine.addValidator(capacity, validateCapacity, capacityErrorMessage);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  pristine.validate();
});
