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
  slider.setAttribute('disabled', true);
};

const disableMapForm = () => {
  mapFilter.classList.add('map__filters--disabled');
  mapFilterElements.forEach((element) => element.setAttribute('disabled', ''));
  mapFilterFeatures.forEach((element) => element.setAttribute('disabled', ''));
};

const disableButton = (btn) => {
  btn.disabled = true;
  btn.style.opacity = 0.4;
};

const enableButton = (btn) => {
  btn.disabled = false;
  btn.style.opacity = 1;
};

const enableForms = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilter.classList.remove('map__filters--disabled');
  adFormElements.forEach((element) => element.removeAttribute('disabled', ''));
  mapFilterElements.forEach((element) => element.removeAttribute('disabled', ''));
  mapFilterFeatures.forEach((element) => element.removeAttribute('disabled', ''));
  slider.removeAttribute('disabled');
};

export {disableForms, enableForms, disableMapForm, disableButton, enableButton};
