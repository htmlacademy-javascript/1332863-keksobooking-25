import {createSimilarAds} from './data.js';

const similarAds = createSimilarAds(1);
const mapCanvas = document.querySelector('#map-canvas');
const templateFragment = document.querySelector('#card').content;
const template = templateFragment.querySelector('.popup');
const fragment = document.createDocumentFragment();

similarAds.forEach((similarAd) => {
  const ad = template.cloneNode(true);
  const adMetrics = ad.children;

  if (similarAd.author.avatar) {
    adMetrics[0].src = similarAd.author.avatar;
  } else {
    adMetrics[0].remove();
  }

  if (similarAd.offer.title) {
    adMetrics[1].textContent = similarAd.offer.title;
  } else {
    adMetrics[1].remove();
  }

  if (similarAd.offer.address) {
    adMetrics[2].textContent = similarAd.offer.address;
  } else {
    adMetrics[2].remove();
  }

  if (similarAd.offer.price) {
    adMetrics[3].textContent = `${similarAd.offer.price} ₽/ночь`;
  } else {
    adMetrics[3].remove();
  }

  const offerType = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalow: 'Бунгало',
    hotel: 'Отель'
  };

  if (similarAd.offer.type) {
    adMetrics[4].textContent = offerType[similarAd.offer.type];
  } else {
    adMetrics[4].remove();
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

  if (similarAd.offer.rooms && similarAd.offer.guests) {
    adMetrics[5].textContent = `${similarAd.offer.rooms} ${rooms} для ${similarAd.offer.guests} ${guests}`;
  } else if (similarAd.offer.rooms && !similarAd.offer.guests) {
    adMetrics[5].textContent = `${similarAd.offer.rooms} ${rooms}`;
  } else if (!similarAd.offer.guests && similarAd.offer.guests) {
    adMetrics[5].textContent = `Для ${similarAd.offer.guests} ${guests}`;
  } else {
    adMetrics[5].remove();
  }

  if (similarAd.offer.checkin && similarAd.offer.checkout) {
    adMetrics[6].textContent = `Заезд после ${similarAd.offer.checkin}, выезд до ${similarAd.offer.checkout}`;
  } else if (similarAd.offer.checkin && !similarAd.offer.checkout) {
    adMetrics[6].textContent = `Заезд после ${similarAd.offer.checkin}`;
  } else if (!similarAd.offer.checkin && similarAd.offer.checkout) {
    adMetrics[6].textContent = `Выезд до ${similarAd.offer.checkout}`;
  } else {
    adMetrics[6].remove();
  }

  const featuresData = similarAd.offer.features;
  const featuresList = adMetrics[7].querySelectorAll('.popup__feature');

  featuresList.forEach((featuresListItem) => {
    const hasData = featuresData.some(
      (feature) => featuresListItem.classList.contains(`popup__feature--${feature}`),
    );

    if (!hasData) {
      featuresListItem.remove();
    }
  });

  if (similarAd.offer.description) {
    adMetrics[8].textContent = similarAd.offer.description;
  } else {
    adMetrics[8].remove();
  }

  const photos = similarAd.offer.photos.map((photo) => `<img src="${photo}"class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
  adMetrics[9].innerHTML = photos;

  fragment.appendChild(ad);
});

mapCanvas.appendChild(fragment);
