const form = document.querySelector('.ad-form');

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'error-text',
});

pristine.addValidator(form.querySelector('#price'), (value) => value <= 100000, 'Не больше 100 000 руб.');

const capacity = document.querySelector('#capacity');
const rooms = form.querySelector('#room_number');

const validateCapacity = () => {
  const roomsValue = rooms.querySelector('option:checked');
  const guestsValue = capacity.querySelector('option:checked');

  if (roomsValue.value === '100' && guestsValue.value !== '0') {
    return false;
  }

  if (guestsValue.value !== '0') {
    return +roomsValue.value >= +guestsValue.value;
  }
};

const capacityErrorMessage = () => {
  const roomsValue = rooms.querySelector('option:checked');
  const guestsValue = capacity.querySelector('option:checked');

  if (roomsValue.value === '100') {
    return 'Не для гостей';
  }

  if (guestsValue.value === '0') {
    return 'Укажите количество гостей';
  }

  return 'Количество гостей не должно превышать количество комнат';
};

pristine.addValidator(capacity, validateCapacity, capacityErrorMessage);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  pristine.validate();
});
