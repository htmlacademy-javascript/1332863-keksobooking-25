import {createSimilarAds} from './data.js';

const similarAds = createSimilarAds(1);
const mapCanvas = document.querySelector('#map-canvas');
const templateFragment = document.querySelector('#card').content;
const template = templateFragment.querySelector('.popup');
const fragment = document.createDocumentFragment();

similarAds.forEach((similarAd) => {
  const ad = template.cloneNode(true);

  if (similarAd.author.avatar) {
    ad.querySelector('.popup__avatar').src = similarAd.author.avatar;
  } else {
    ad.querySelector('.popup__avatar').remove();
  }

  if (similarAd.offer.title) {
    ad.querySelector('.popup__title').textContent = similarAd.offer.title;
  } else {
    ad.querySelector('.popup__title').remove();
  }

  if (similarAd.offer.address) {
    ad.querySelector('.popup__text--address').textContent = similarAd.offer.address;
  } else {
    ad.querySelector('.popup__text--address').remove();
  }

  if (similarAd.offer.price) {
    ad.querySelector('.popup__text--price').textContent = `${similarAd.offer.price} ₽/ночь`;
  } else {
    ad.querySelector('.popup__text--price').remove();
  }

  const offerType = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalow: 'Бунгало',
    hotel: 'Отель'
  };

  if (similarAd.offer.type) {
    ad.querySelector('.popup__type').textContent = offerType[similarAd.offer.type];
  } else {
    ad.querySelector('.popup__type').remove();
  }

  const guests = (similarAd.offer.guests % 10 !== 1 || similarAd.offer.guests === 11) ? 'гостей' : 'гостя';
  let rooms;

  if (similarAd.offer.rooms % 10 === 1 && similarAd.offer.rooms !== 11) {
    rooms = 'комната';
  } else if (similarAd.offer.rooms % 10 === 2 && similarAd.offer.rooms !== 12 ||
             similarAd.offer.rooms % 10 === 3 && similarAd.offer.rooms !== 13 ||
             similarAd.offer.rooms % 10 === 4 && similarAd.offer.rooms !== 14 ) {
    rooms = 'комнаты';
  } else {
    rooms = 'комнат';
  }

  const capacity = ad.querySelector('.popup__text--capacity');

  if (similarAd.offer.rooms && similarAd.offer.guests) {
    capacity.textContent = `${similarAd.offer.rooms} ${rooms} для ${similarAd.offer.guests} ${guests}`;
  } else if (similarAd.offer.rooms && !similarAd.offer.guests) {
    capacity.textContent = `${similarAd.offer.rooms} ${rooms}`;
  } else if (!similarAd.offer.guests && similarAd.offer.guests) {
    capacity.textContent = `Для ${similarAd.offer.guests} ${guests}`;
  } else {
    capacity.remove();
  }

  const time = ad.querySelector('.popup__text--time');

  if (similarAd.offer.checkin && similarAd.offer.checkout) {
    time.textContent = `Заезд после ${similarAd.offer.checkin}, выезд до ${similarAd.offer.checkout}`;
  } else if (similarAd.offer.checkin && !similarAd.offer.checkout) {
    time.textContent = `Заезд после ${similarAd.offer.checkin}`;
  } else if (!similarAd.offer.checkin && similarAd.offer.checkout) {
    time.textContent = `Выезд до ${similarAd.offer.checkout}`;
  } else {
    time.remove();
  }

  const featuresData = similarAd.offer.features;
  const featuresList = ad.querySelectorAll('.popup__feature');

  featuresList.forEach((featuresListItem) => {
    const hasData = featuresData.some(
      (feature) => featuresListItem.classList.contains(`popup__feature--${feature}`),
    );

    if (!hasData) {
      featuresListItem.remove();
    }
  });

  if (similarAd.offer.description) {
    ad.querySelector('.popup__description').textContent = similarAd.offer.description;
  } else {
    ad.querySelector('.popup__description').remove();
  }

  const photos = similarAd.offer.photos.map((photo) => `<img src="${photo}"class="popup__photo" width="45" height="40" alt="Фотография жилья">`);

  if (photos.join()) {
    ad.querySelector('.popup__photos').innerHTML = photos;
  } else {
    ad.querySelector('.popup__photos').remove();
  }

  fragment.appendChild(ad);
});

mapCanvas.appendChild(fragment);
