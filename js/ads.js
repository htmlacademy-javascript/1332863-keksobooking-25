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

  const guestsRus = (similarAd.offer.guests % 10 !== 1 || similarAd.offer.guests === 11) ? 'гостей' : 'гостя';

  const pluralizeRus = (n, forms) => {
    if (n % 10 === 1 && n % 100 !== 11) {
      return forms[0];
    }

    if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
      return forms[1];
    }

    return forms[2];
  };

  const capacity = ad.querySelector('.popup__text--capacity');
  const {rooms, guests} = similarAd.offer;

  if (rooms && guests) {
    capacity.textContent = `${rooms} комнат${pluralizeRus(rooms, ['а', 'ы', ''])} для ${guests} ${guestsRus}`;
  } else if (rooms && !guests) {
    capacity.textContent = `${rooms} комнат${pluralizeRus(rooms, ['а', 'ы', ''])}`;
  } else if (!rooms && guests) {
    capacity.textContent = `Для ${guests} ${guestsRus}`;
  } else {
    capacity.remove();
  }

  const time = ad.querySelector('.popup__text--time');
  const {checkin, checkout} = similarAd.offer;

  if (checkin && checkout) {
    time.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  } else if (checkin && !checkout) {
    time.textContent = `Заезд после ${checkin}`;
  } else if (!checkin && checkout) {
    time.textContent = `Выезд до ${checkout}`;
  } else {
    time.remove();
  }

  const featuresList = ad.querySelectorAll('.popup__feature');
  const {features} = similarAd.offer;

  featuresList.forEach((featuresListItem) => {
    const hasData = features.some(
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
    const container = ad.querySelector('.popup__photos');
    const templateImg = container.querySelector('img');
    templateImg.remove();
    container.insertAdjacentHTML('afterbegin', photos.join(''));
  } else {
    ad.querySelector('.popup__photos').remove();
  }

  fragment.appendChild(ad);
});

mapCanvas.appendChild(fragment);
