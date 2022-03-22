import {enableForms, disableForms} from './forms-state.js';
import {generateAdData} from './ads-data.js';
import {createSimilarAd} from './ads-template.js';

disableForms();
const similarAds = generateAdData(10);

const mapScale = 12;
const cityCenterLatitude = 35.6895;
const cityCenterLongitude = 139.69171;
const mapURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const mapAttributes = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const resetButton = document.querySelector('.ad-form__reset');
const addressField = document.querySelector('#address');
const filterParking = document.querySelector('#filter-parking');

const map = L.map('map-canvas')
  .on('load', () => {
    enableForms();
  })
  .setView({
    lat: cityCenterLatitude,
    lng: cityCenterLongitude,
  }, mapScale);

L.tileLayer(mapURL, {attribution: mapAttributes,}).addTo(map);
const markerGroup = L.layerGroup().addTo(map);

const createPinIcon = (url, size, anchor) => ({
  iconUrl: url,
  iconSize: size,
  iconAnchor: anchor,
});

const createMarker = (lat, lng, icon, isDraggable = false) => {
  const marker = L.marker(
    {lat, lng},
    {icon, draggable: isDraggable}
  );

  return marker;
};

const mainPinIcon = L.icon(createPinIcon('img/main-pin.svg', [52, 52], [26, 52]));
const mainMarker = createMarker(cityCenterLatitude, cityCenterLongitude, mainPinIcon, true);
mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  addressField.value = evt.target.getLatLng();
});

resetButton.addEventListener('click', () => {
  mainMarker.setLatLng({
    lat: cityCenterLatitude,
    lng: cityCenterLongitude,
  });

  map.setView({
    lat: cityCenterLatitude,
    lng: cityCenterLongitude,
  }, mapScale);
});

const commonIcon = L.icon(createPinIcon('img/pin.svg', [40, 40], [20, 40]));

similarAds.forEach((ad) => {
  const commonMarker = createMarker(ad.location.lat, ad.location.lng, commonIcon);

  commonMarker
    .addTo(markerGroup)
    .bindPopup(createSimilarAd(ad));
});

const hasFeature = (features, value) => features.some((feature) => feature === value);

filterParking.addEventListener('change', () => {
  markerGroup.clearLayers();

  similarAds.forEach((ad) => {
    if (hasFeature(ad.offer.features, 'parking')) {
      const marker = createMarker(ad.location.lat, ad.location.lng, commonIcon);

      marker
        .addTo(markerGroup)
        .bindPopup(createSimilarAd(ad));
    }
  });
});
