import {getRandomInt, getRandomFloat, getRandomIndex} from './util.js';

const MINIMUM_TWO_DIGIT_NUMBER = 10;
const MINIMUM_ROOM_NUMBERS = 1;
const MAXIMUM_ROOM_NUMBERS = 50;
const MINIMUM_GUESTS_NUMBERS = 1;
const MAXIMUM_GUESTS_NUMBERS = 50;
const MINIMUM_PRICE = 100;
const MAXIMUM_PRICE = 50000;
const LATITUDE_FROM = 35.65000;
const LATITUDE_TO = 35.70000;
const LONGITUDE_FROM = 139.70000;
const LONGITUDE_TO = 139.80000;
const NUMBERS_AFTER_POINT = 5;

const TYPE_OF_HOUSING = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const CHECKIN_TIME = [
  '12:00',
  '13:00',
  '14:00'
];

const CHECKOUT_TIME = [
  '12:00',
  '13:00',
  '14:00'
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

let imgNumber = 0;

const getUniqueImgNumber = () => {
  imgNumber++;

  return imgNumber < MINIMUM_TWO_DIGIT_NUMBER ? `0${imgNumber}` : imgNumber;
};

const creatUniqueArray = (array) => {
  const features = array.slice();

  return features.slice(0, getRandomInt(1, features.length - 1));
};

const createSimilarAd = () => ({
  author: {
    avatar: `img/avatars/user${getUniqueImgNumber()}.png`,
  },
  offer: {
    title: 'Сдаётся хата с краю',
    address: `${getRandomFloat(LATITUDE_FROM, LATITUDE_TO, NUMBERS_AFTER_POINT)}, ${getRandomFloat(LONGITUDE_FROM, LONGITUDE_TO, NUMBERS_AFTER_POINT)}`,
    price: getRandomInt(MINIMUM_PRICE, MAXIMUM_PRICE),
    type: TYPE_OF_HOUSING[getRandomIndex(TYPE_OF_HOUSING)],
    rooms: getRandomInt(MINIMUM_ROOM_NUMBERS, MAXIMUM_ROOM_NUMBERS),
    guests: getRandomInt(MINIMUM_GUESTS_NUMBERS, MAXIMUM_GUESTS_NUMBERS),
    checkin: CHECKIN_TIME[getRandomIndex(CHECKIN_TIME)],
    checkout: CHECKOUT_TIME[getRandomIndex(CHECKOUT_TIME)],
    features: creatUniqueArray(FEATURES),
    description: 'Сдам хату с клопами и алкашами. Клопы сильно кусаются (и алкаши тоже), если съезжаете деньги не возвращаю!',
    photos: PHOTOS,
  },
  location: {
    lat: getRandomFloat(LATITUDE_FROM, LATITUDE_TO, NUMBERS_AFTER_POINT),
    lng: getRandomFloat(LONGITUDE_FROM, LONGITUDE_TO, NUMBERS_AFTER_POINT),
  },
});

const createSimilarAds = (similarAdCount) => Array.from({length: similarAdCount}, createSimilarAd);

export {createSimilarAds};
