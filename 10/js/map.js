import {enableForms, disableForms} from './forms-state.js';
import {createSimilarAd} from './ads-template.js';
import {getData} from './load.js';

const MAP_SCALE = 13;
const CITY_CENTER_LATITUDE = 35.68225;
const CITY_CENTER_LONGITUDE = 139.75383;
const MAP_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const MAP_ATTRIBUTES = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const SIMILAR_ADS_COUNT = 10;

const resetButton = document.querySelector('.ad-form__reset');
const addressField = document.querySelector('#address');
const filterParking = document.querySelector('#filter-parking');

disableForms();

const map = L.map('map-canvas')
  .on('load', () => {
    enableForms();
  })
  .setView(
    {
      lat: CITY_CENTER_LATITUDE,
      lng: CITY_CENTER_LONGITUDE,
    },
    MAP_SCALE,
  );

L.tileLayer(MAP_URL, { attribution: MAP_ATTRIBUTES }).addTo(map);
const markerGroup = L.layerGroup().addTo(map);

const createPinIcon = (url, size, anchor) => ({
  iconUrl: url,
  iconSize: size,
  iconAnchor: anchor,
});

const createMarker = (lat, lng, icon, isDraggable = false) => {
  const marker = L.marker({lat, lng}, {icon, draggable: isDraggable});

  return marker;
};

const mainPinIcon = L.icon(createPinIcon('img/main-pin.svg', [52, 52], [26, 52]));
const mainMarker = createMarker(CITY_CENTER_LATITUDE, CITY_CENTER_LONGITUDE, mainPinIcon, true);
mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  const {lat, lng} = evt.target.getLatLng();

  addressField.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
});

resetButton.addEventListener('click', () => {
  mainMarker.setLatLng({
    lat: CITY_CENTER_LATITUDE,
    lng: CITY_CENTER_LONGITUDE,
  });

  map.setView(
    {
      lat: CITY_CENTER_LATITUDE,
      lng: CITY_CENTER_LONGITUDE,
    },
    MAP_SCALE,
  );
});

const commonIcon = L.icon(createPinIcon('img/pin.svg', [40, 40], [20, 40]));

const similarAds = () => getData().then((ads) => ads.slice(0, SIMILAR_ADS_COUNT));

similarAds().then((ads) => ads.forEach((ad) => {
  const commonMarker = createMarker(ad.location.lat, ad.location.lng, commonIcon);

  commonMarker.addTo(markerGroup).bindPopup(createSimilarAd(ad));
}));

const hasFeature = (features, value) => features ? features.some((feature) => feature === value): false;

filterParking.addEventListener('change', () => {
  markerGroup.clearLayers();

  getData().then((ads) => ads.forEach((ad) => {
    if (hasFeature(ad.offer.features, 'parking')) {
      const marker = createMarker(ad.location.lat, ad.location.lng, commonIcon);

      marker.addTo(markerGroup).bindPopup(createSimilarAd(ad));
    }
  }));
});
