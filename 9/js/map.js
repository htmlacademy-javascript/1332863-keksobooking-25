import {enableForms, disableForms} from './forms-state.js';
import {generateAdData} from './ad-data.js';
import {createSimilarAd} from './ad-template.js';

disableForms();

const resetButton = document.querySelector('.ad-form__reset');
const addressField = document.querySelector('#address');
const similarAds = generateAdData(10);

const map = L.map('map-canvas')
  .on('load', () => {
    enableForms();
  })
  .setView({
    lat: 35.6895,
    lng: 139.69171,
  }, 14);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainMarker = L.marker(
  {
    lat: 35.6895,
    lng: 139.69171,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  addressField.value = evt.target.getLatLng();
});

resetButton.addEventListener('click', () => {
  mainMarker.setLatLng({
    lat: 35.6895,
    lng: 139.69171,
  });

  map.setView({
    lat: 35.6895,
    lng: 139.69171,
  }, 14);
});

similarAds.forEach((ad) => {
  const marker = L.marker(
    {
      lat: ad.location.lat,
      lng: ad.location.lng,
    },
    {
      icon,
    });

  marker
    .addTo(map)
    .bindPopup(createSimilarAd(ad));
});
