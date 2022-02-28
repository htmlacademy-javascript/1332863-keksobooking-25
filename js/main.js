const SIMILAR_AD_COUNT = 10;
const MINIMUM_TWO_DIGIT_NUMBER = 10;

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

const getRandomInt = (firstNumber, secondNumber) => {
  const max = Math.floor(Math.max(Math.abs(firstNumber), Math.abs(secondNumber)));
  const min = Math.ceil(Math.min(Math.abs(firstNumber), Math.abs(secondNumber)));

  const result = Math.random() * (max - min + 1) + min;

  return Math.floor(result);
};

const getRandomFloat = (firstNumber, secondNumber, decimals) => {
  const max = Math.max(Math.abs(firstNumber), Math.abs(secondNumber));
  const min = Math.min(Math.abs(firstNumber), Math.abs(secondNumber));

  const result = Math.random() * (max - min + 1) + min;

  return Number(Math.min(result, max).toFixed(decimals));
};

const getRandomIndex = (array) => getRandomInt(0, array.length - 1);

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
    avatar: `img/avaters/user${getUniqueImgNumber()}.png`,
  },
  offer: {
    title: 'title',
    address: `${getRandomFloat(35.65000, 35.70000, 5)}, ${getRandomFloat(139.70000, 139.80000, 5)}`,
    price: getRandomInt(10, 50000),
    type: TYPE_OF_HOUSING[getRandomIndex(TYPE_OF_HOUSING)],
    rooms: getRandomInt(1, 50),
    guests: getRandomInt(1, 50),
    checkin: CHECKIN_TIME[getRandomIndex(CHECKIN_TIME)],
    checkout: CHECKOUT_TIME[getRandomIndex(CHECKOUT_TIME)],
    features: creatUniqueArray(FEATURES),
    description: 'description',
    photos: PHOTOS[getRandomIndex(PHOTOS)],
  },
  location: {
    lat: getRandomFloat(35.65000, 35.70000, 5),
    lng: getRandomFloat(139.70000, 139.80000, 5),
  },
});

const similarAds = Array.from({length: SIMILAR_AD_COUNT}, createSimilarAd);

const someFunc = () => similarAds ;
someFunc();
