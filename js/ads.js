import {createSimilarAds} from './data.js';

const similarAds = createSimilarAds(1);
const mapCanvas = document.querySelector('#map-canvas');
const templateFragment = document.querySelector('#card').content;
const template = templateFragment.querySelector('.popup');
const fragment = document.createDocumentFragment();
const offerType = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель'
};

const ONE_ITEM = 1;
const TWO_ITEMS = 2;
const FOUR_ITEMS = 4;
const TEN_ITEMS = 10;
const ELEVEN_ITEMS = 11;
const TWENTY_ITEMS = 20;
const DIVIDER_TEN = 10;
const DIVIDER_ONE_HUNDRED = 100;

const pluralizeRus = (number, wordEndForms) => {
  if (number % DIVIDER_TEN === ONE_ITEM && number % DIVIDER_ONE_HUNDRED !== ELEVEN_ITEMS) {
    return wordEndForms[0];
  }

  if (number % DIVIDER_TEN >= TWO_ITEMS && number % DIVIDER_TEN <= FOUR_ITEMS && (number % DIVIDER_ONE_HUNDRED < TEN_ITEMS || number % DIVIDER_ONE_HUNDRED >= TWENTY_ITEMS)) {
    return wordEndForms[1];
  }

  return wordEndForms[2];
};

const insertData = (node, data, prop='textContent') => {
  if (data) {
    node[prop] = data;
  } else {
    node.remove();
  }
};

const insertCapacityData = (node, roomsData, guestsData) => {
  if (roomsData && guestsData) {
    node.textContent = `${roomsData} комнат${pluralizeRus(roomsData, ['а', 'ы', ''])} для ${guestsData} гост${pluralizeRus(guestsData, ['я', 'ей', 'ей'])}`;
  } else if (roomsData && !guestsData) {
    node.textContent = `${roomsData} комнат${pluralizeRus(roomsData, ['а', 'ы', ''])}`;
  } else if (!roomsData && guestsData) {
    node.textContent = `Для ${guestsData} гост${pluralizeRus(guestsData, ['я', 'ей', 'ей'])}`;
  } else {
    node.remove();
  }
};

const insertTimeData = (node, checkInData, checkOutData) => {
  if (checkInData && checkOutData) {
    node.textContent = `Заезд после ${checkInData}, выезд до ${checkOutData}`;
  } else if (checkInData && !checkOutData) {
    node.textContent = `Заезд после ${checkInData}`;
  } else if (!checkInData && checkOutData) {
    node.textContent = `Выезд до ${checkOutData}`;
  } else {
    node.remove();
  }
};

const makeFeatureList = (featureNodes, featureData) => {
  featureNodes.forEach((featureNodesItem) => {
    const hasData = featureData.some(
      (feature) => featureNodesItem.classList.contains(`popup__feature--${feature}`),
    );

    if (!hasData) {
      featureNodesItem.remove();
    }
  });
};

const makeGallery = (node, photoListData) => {
  if (photoListData.join()) {
    const templateImg = node.querySelector('img');
    templateImg.remove();
    node.insertAdjacentHTML('afterbegin', photoListData.join(''));
  } else {
    node.remove();
  }
};

similarAds.forEach((similarAd) => {
  const ad = template.cloneNode(true);
  const avatar = ad.querySelector('.popup__avatar');
  const title = ad.querySelector('.popup__title');
  const address = ad.querySelector('.popup__text--address');
  const price = ad.querySelector('.popup__text--price');
  const type = ad.querySelector('.popup__type');
  const description = ad.querySelector('.popup__description');
  const capacity = ad.querySelector('.popup__text--capacity');
  const {rooms, guests} = similarAd.offer;
  const time = ad.querySelector('.popup__text--time');
  const {checkin, checkout} = similarAd.offer;
  const featuresList = ad.querySelectorAll('.popup__feature');
  const {features} = similarAd.offer;
  const galleryContainer = ad.querySelector('.popup__photos');
  const photoList = similarAd.offer.photos.map((photo) => `<img src="${photo}"class="popup__photo" width="45" height="40" alt="Фотография жилья">`);

  insertData(avatar, similarAd.author.avatar, 'src');
  insertData(title, similarAd.offer.title);
  insertData(address, similarAd.offer.address);
  insertData(price, `${similarAd.offer.price} ₽/ночь`);
  insertData(type, offerType[similarAd.offer.type]);
  insertData(description, similarAd.offer.description);
  insertCapacityData(capacity, rooms, guests);
  insertTimeData(time, checkin, checkout);
  makeFeatureList(featuresList, features);
  makeGallery(galleryContainer, photoList);

  fragment.appendChild(ad);
});

mapCanvas.appendChild(fragment);
