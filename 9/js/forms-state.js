const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('fieldset');
const slider = adForm.querySelector('.ad-form__slider');
const mapFilter = document.querySelector('.map__filters');
const mapFilterElements = mapFilter.querySelectorAll('.map__filter');
const mapFilterFeatures = mapFilter.querySelectorAll('.map__features');

const disableForms = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilter.classList.add('map__filters--disabled');
  adFormElements.forEach((element) => element.setAttribute('disabled', ''));
  mapFilterElements.forEach((element) => element.setAttribute('disabled', ''));
  mapFilterFeatures.forEach((element) => element.setAttribute('disabled', ''));
  slider.style.display = 'none';
};

const enableForms = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilter.classList.remove('map__filters--disabled');
  adFormElements.forEach((element) => element.removeAttribute('disabled', ''));
  mapFilterElements.forEach((element) => element.removeAttribute('disabled', ''));
  mapFilterFeatures.forEach((element) => element.removeAttribute('disabled', ''));
  slider.style.display = 'block';
};

export {disableForms, enableForms};
