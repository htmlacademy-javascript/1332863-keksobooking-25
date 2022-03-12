import {createSimilarAds} from './data.js';
import {pluralizeRus} from './pluralize-rus.js';

const similarAds = createSimilarAds(4);
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
  const titleNode = ad.querySelector('.popup__title');
  const addressNode = ad.querySelector('.popup__text--address');
  const priceNode = ad.querySelector('.popup__text--price');
  const typeNode = ad.querySelector('.popup__type');
  const descriptionNode = ad.querySelector('.popup__description');
  const capacity = ad.querySelector('.popup__text--capacity');
  const time = ad.querySelector('.popup__text--time');
  const featuresList = ad.querySelectorAll('.popup__feature');
  const galleryContainer = ad.querySelector('.popup__photos');
  const {
    title,
    address,
    price,
    type,
    rooms,
    guests,
    checkin,
    checkout,
    features,
    description,
    photos } = similarAd.offer;

  const photoList = photos.map((photo) => `<img src="${photo}"class="popup__photo" width="45" height="40" alt="Фотография жилья">`);

  insertData(avatar, similarAd.author.avatar, 'src');
  insertData(titleNode, title);
  insertData(addressNode, address);
  insertData(priceNode, `${price} ₽/ночь`);
  insertData(typeNode, offerType[type]);
  insertData(descriptionNode, description);
  insertCapacityData(capacity, rooms, guests);
  insertTimeData(time, checkin, checkout);
  makeFeatureList(featuresList, features);
  makeGallery(galleryContainer, photoList);

  fragment.appendChild(ad);
});

mapCanvas.appendChild(fragment);
